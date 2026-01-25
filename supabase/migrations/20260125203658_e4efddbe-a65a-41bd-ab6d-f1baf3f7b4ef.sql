-- Fix: Add explicit INSERT policy to user_roles table
-- This prevents unauthorized users from granting themselves admin privileges
-- Only existing admins should be able to assign roles

-- Create policy that denies all INSERT operations by default
-- Only admins can insert new role assignments
CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Also add DELETE and UPDATE policies to complete the protection
CREATE POLICY "Only admins can remove roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));