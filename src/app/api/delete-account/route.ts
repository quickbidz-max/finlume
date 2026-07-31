import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase environment variables not configured." },
        { status: 500 }
      );
    }

    // Verify token and retrieve user session
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized user or invalid session." },
        { status: 401 }
      );
    }

    const adminClient = getSupabaseAdmin();

    // 1. First attempt executing the RPC function defined in schema.sql: delete_user_account()
    const { error: rpcError } = await adminClient.rpc("delete_user_account");

    if (!rpcError) {
      return NextResponse.json({
        success: true,
        message: "Account and all associated records deleted via RPC function.",
      });
    }

    // 2. Fallback: Manually delete records from all tables specified in schema.sql
    // Tables with user_id column
    const userTables = [
      "transactions",
      "income_sources",
      "bill_participants",
      "streak_records",
      "category_overrides",
      "budgets",
      "user_rewards",
      "reward_redemptions",
      "recurring_bills",
      "debts",
      "savings_goals",
    ];

    for (const table of userTables) {
      try {
        await adminClient.from(table).delete().eq("user_id", user.id);
      } catch (err) {
        console.warn(`Cleanup note for table ${table}:`, err);
      }
    }

    // Bills table uses owner_id
    try {
      await adminClient.from("bills").delete().eq("owner_id", user.id);
    } catch (err) {
      console.warn("Cleanup note for table bills:", err);
    }

    // 3. Permanently delete user from Supabase Auth
    const { error: deleteAuthError } =
      await adminClient.auth.admin.deleteUser(user.id);

    if (deleteAuthError) {
      return NextResponse.json(
        { error: deleteAuthError.message || "Failed to delete user account." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Account and associated data deleted successfully.",
    });
  } catch (error: any) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
