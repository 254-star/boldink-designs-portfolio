CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  budget text,
  project_type text,
  message text NOT NULL,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No client access to contact submissions"
  ON public.contact_submissions
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
CREATE INDEX contact_submissions_ip_hash_idx ON public.contact_submissions (ip_hash, created_at DESC);