CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT coalesce(lower(auth.jwt() ->> 'email') = 'hiteshyadav@gmail.com', false);
$$;