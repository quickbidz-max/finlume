-- =============================================================
-- Finlume — Supabase Postgres Schema + Row Level Security
-- Run this in your Supabase SQL Editor to set up the database.
-- =============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================
-- TRANSACTIONS
-- =============================================================
CREATE TABLE IF NOT EXISTS transactions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount        NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  category      TEXT NOT NULL,
  source_tag    TEXT,
  date          DATE NOT NULL,
  note          TEXT,
  currency      TEXT NOT NULL DEFAULT 'USD',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own transactions"
  ON transactions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS transactions_user_date_idx ON transactions (user_id, date DESC);

-- =============================================================
-- INCOME SOURCES
-- =============================================================
CREATE TABLE IF NOT EXISTS income_sources (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  currency    TEXT NOT NULL DEFAULT 'USD',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, name)
);

ALTER TABLE income_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own income sources"
  ON income_sources FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- BILLS
-- =============================================================
CREATE TABLE IF NOT EXISTS bills (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  total_amount  NUMERIC(12, 2) NOT NULL CHECK (total_amount > 0),
  split_type    TEXT NOT NULL CHECK (split_type IN ('equal', 'custom')),
  date          DATE NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'settled')),
  share_token   TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  currency      TEXT NOT NULL DEFAULT 'USD',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Bill owners can manage their bills"
  ON bills FOR ALL
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Anyone can read a bill via share_token (for shareable links)
CREATE POLICY "Public share_token read"
  ON bills FOR SELECT
  USING (share_token IS NOT NULL);

-- =============================================================
-- BILL PARTICIPANTS
-- =============================================================
CREATE TABLE IF NOT EXISTS bill_participants (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id       UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  owed_amount   NUMERIC(12, 2) NOT NULL CHECK (owed_amount >= 0),
  paid_status   TEXT NOT NULL DEFAULT 'unpaid' CHECK (paid_status IN ('paid', 'unpaid')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE bill_participants ENABLE ROW LEVEL SECURITY;

-- Bill owners can manage all participants on their bills
CREATE POLICY "Bill owner manages participants"
  ON bill_participants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM bills b WHERE b.id = bill_id AND b.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bills b WHERE b.id = bill_id AND b.owner_id = auth.uid()
    )
  );

-- Participants can read their own rows
CREATE POLICY "Participants can read own row"
  ON bill_participants FOR SELECT
  USING (auth.uid() = user_id);

-- Public read via bill share_token
CREATE POLICY "Public read for shareable bills"
  ON bill_participants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bills b WHERE b.id = bill_id AND b.share_token IS NOT NULL
    )
  );

-- =============================================================
-- STREAK RECORDS
-- =============================================================
CREATE TABLE IF NOT EXISTS streak_records (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak      INTEGER NOT NULL DEFAULT 0,
  last_activity_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE streak_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own streak"
  ON streak_records FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- CATEGORY OVERRIDES (for auto-categorization)
-- =============================================================
CREATE TABLE IF NOT EXISTS category_overrides (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  keyword     TEXT NOT NULL,
  category    TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, keyword)
);

ALTER TABLE category_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own overrides"
  ON category_overrides FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- BUDGETS
-- =============================================================
CREATE TABLE IF NOT EXISTS budgets (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category      TEXT NOT NULL,
  limit_amount  NUMERIC(12, 2) NOT NULL CHECK (limit_amount > 0),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, category)
);

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own budgets"
  ON budgets FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- USER REWARDS (milestones, points, cashback)
-- =============================================================
CREATE TABLE IF NOT EXISTS user_rewards (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  points            INTEGER NOT NULL DEFAULT 0,
  claimed_cashback  NUMERIC(12, 2) NOT NULL DEFAULT 0.0,
  coffee_redeemed   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own rewards"
  ON user_rewards FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- REWARD REDEMPTIONS (gift codes)
-- =============================================================
CREATE TABLE IF NOT EXISTS reward_redemptions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id     TEXT NOT NULL,
  reward_title  TEXT NOT NULL,
  points_cost   INTEGER NOT NULL,
  voucher_code  TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'active',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own redemptions"
  ON reward_redemptions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- RECURRING BILLS
-- =============================================================
CREATE TABLE IF NOT EXISTS recurring_bills (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  amount            NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  category          TEXT NOT NULL,
  frequency         TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
  due_date          DATE NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'USD',
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  last_billed_date  DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE recurring_bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own recurring bills"
  ON recurring_bills FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS recurring_bills_user_idx ON recurring_bills (user_id);

-- =============================================================
-- DEBTS
-- =============================================================
CREATE TABLE IF NOT EXISTS debts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  type              TEXT NOT NULL CHECK (type IN ('loan', 'credit_card', 'personal')),
  total_amount      NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
  remaining_amount  NUMERIC(12, 2) NOT NULL CHECK (remaining_amount >= 0),
  interest_rate     NUMERIC(5, 2) NOT NULL DEFAULT 0.0 CHECK (interest_rate >= 0),
  due_date          DATE,
  emi_amount        NUMERIC(12, 2) NOT NULL DEFAULT 0.0 CHECK (emi_amount >= 0),
  currency          TEXT NOT NULL DEFAULT 'USD',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own debts"
  ON debts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS debts_user_idx ON debts (user_id);

-- =============================================================
-- SAVINGS GOALS
-- =============================================================
CREATE TABLE IF NOT EXISTS savings_goals (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  target_amount   NUMERIC(12, 2) NOT NULL CHECK (target_amount > 0),
  current_amount  NUMERIC(12, 2) NOT NULL DEFAULT 0.0 CHECK (current_amount >= 0),
  target_date     DATE NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'USD',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own savings goals"
  ON savings_goals FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS savings_goals_user_idx ON savings_goals (user_id);

CREATE OR REPLACE FUNCTION delete_user_account()
RETURNS void AS $$
BEGIN
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION mark_participant_paid(token TEXT, participant_id UUID)
RETURNS void AS $$
DECLARE
  v_bill_id UUID;
BEGIN
  SELECT id INTO v_bill_id FROM bills WHERE share_token = token;
  IF v_bill_id IS NULL THEN
    RAISE EXCEPTION 'Invalid share token';
  END IF;

  -- Update participant paid status
  UPDATE bill_participants
  SET paid_status = 'paid'
  WHERE id = participant_id AND bill_id = v_bill_id;

  -- Automatically update bill status to settled if all participants are paid
  IF NOT EXISTS (
    SELECT 1 FROM bill_participants
    WHERE bill_id = v_bill_id AND paid_status = 'unpaid'
  ) THEN
    UPDATE bills SET status = 'settled' WHERE id = v_bill_id;
  ELSE
    UPDATE bills SET status = 'pending' WHERE id = v_bill_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;