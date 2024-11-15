-- Insert initial organization plans
INSERT INTO public.organization_plans (id, name) VALUES
('FREE', 'Free Plan'),
('PRO', 'Pro Plan'),
('ENTERPRISE', 'Enterprise Plan');


INSERT INTO public.membership_roles (id, name) VALUES
('OWNER', 'Owner'),
('ADMIN', 'Admin'),
('MEMBER', 'Member');