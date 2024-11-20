-- Insert initial organization plans
INSERT INTO public.organization_plans (id, name, stripe_product_id, stripe_monthly_price_id, stripe_yearly_price_id) VALUES
('FREE', 'Free Plan', 'prod_RFZXb39DknLReH', 'price_1QN4OgAW9GKpzbri1XrcuG3s', 'price_1QN57fAW9GKpzbriBW6xe84Y'),
('PRO', 'Pro Plan', 'prod_RFYjsXwrn15haw', 'price_1QN3bbAW9GKpzbrin389BoO1', 'price_1QN4ihAW9GKpzbri8jA8fDZW'),
('ENTERPRISE', 'Enterprise Plan', 'prod_RFYj1dgDuDU9iV', 'price_1QN3bvAW9GKpzbrijAZk6vaT', 'price_1QN58ZAW9GKpzbri8m3migFb');

INSERT INTO public.membership_roles (id, name) VALUES
('OWNER', 'Owner'),
('ADMIN', 'Admin'),
('MEMBER', 'Member');