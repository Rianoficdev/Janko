-- JANKO - Fase 1 schema completo para Supabase
-- Rode este arquivo no Supabase SQL Editor.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'product_type') then
    create type public.product_type as enum ('affiliate', 'dropshipping');
  end if;

  if not exists (select 1 from pg_type where typname = 'product_status') then
    create type public.product_status as enum ('draft', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'source_platform') then
    create type public.source_platform as enum ('amazon', 'shopee', 'aliexpress', 'manual');
  end if;

  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type public.payment_status as enum ('pending', 'approved', 'failed', 'refunded');
  end if;

  if not exists (select 1 from pg_type where typname = 'analytics_event_type') then
    create type public.analytics_event_type as enum ('view', 'click', 'conversion', 'add_to_cart', 'checkout_start', 'purchase');
  end if;

  if not exists (select 1 from pg_type where typname = 'import_status') then
    create type public.import_status as enum ('pending', 'success', 'failed');
  end if;

  if not exists (select 1 from pg_type where typname = 'admin_role') then
    create type public.admin_role as enum ('admin');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image text,
  featured boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  images text[] not null default '{}',
  price numeric(12, 2) not null default 0 check (price >= 0),
  "oldPrice" numeric(12, 2) check ("oldPrice" is null or "oldPrice" >= 0),
  category uuid references public.categories(id) on delete set null,
  tags text[] not null default '{}',
  type public.product_type not null default 'affiliate',
  status public.product_status not null default 'draft',
  "affiliateUrl" text,
  commission numeric(8, 2) not null default 0 check (commission >= 0),
  "sourcePlatform" public.source_platform not null default 'manual',
  sku text unique,
  stock integer not null default 0 check (stock >= 0),
  clicks bigint not null default 0 check (clicks >= 0),
  conversions bigint not null default 0 check (conversions >= 0),
  featured boolean not null default false,
  "seoTitle" text,
  "seoDescription" text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  constraint products_affiliate_url_required check (
    type <> 'affiliate' or "affiliateUrl" is not null
  )
);

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  role public.admin_role not null default 'admin',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  customer_name text,
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  shipping numeric(12, 2) not null default 0 check (shipping >= 0),
  discount numeric(12, 2) not null default 0 check (discount >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  currency text not null default 'BRL',
  payment_method text,
  shipping_address jsonb not null default '{}'::jsonb,
  tracking_code text,
  metadata jsonb not null default '{}'::jsonb,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  title text not null,
  sku text,
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  product_snapshot jsonb not null default '{}'::jsonb,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  event public.analytics_event_type not null,
  source text,
  session_id text,
  visitor_id text,
  user_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  user_agent text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists public.import_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references public.admin_users(id) on delete set null,
  product_id uuid references public.products(id) on delete set null,
  url text not null,
  platform public.source_platform not null default 'manual',
  status public.import_status not null default 'pending',
  raw_payload jsonb not null default '{}'::jsonb,
  error_message text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists set_order_items_updated_at on public.order_items;
create trigger set_order_items_updated_at
before update on public.order_items
for each row execute function public.set_updated_at();

drop trigger if exists set_import_logs_updated_at on public.import_logs;
create trigger set_import_logs_updated_at
before update on public.import_logs
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.admin_users enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.analytics_events enable row level security;
alter table public.import_logs enable row level security;

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
on public.categories
for select
to anon, authenticated
using (true);

drop policy if exists "Admin can manage categories" on public.categories;
create policy "Admin can manage categories"
on public.categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
on public.products
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admin can manage products" on public.products;
create policy "Admin can manage products"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Authenticated can read own admin user" on public.admin_users;
create policy "Authenticated can read own admin user"
on public.admin_users
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Admin can manage admin users" on public.admin_users;
create policy "Admin can manage admin users"
on public.admin_users
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can manage orders" on public.orders;
create policy "Admin can manage orders"
on public.orders
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can manage order items" on public.order_items;
create policy "Admin can manage order items"
on public.order_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can insert analytics events" on public.analytics_events;
create policy "Public can insert analytics events"
on public.analytics_events
for insert
to anon
with check (true);

drop policy if exists "Admin can manage analytics events" on public.analytics_events;
create policy "Admin can manage analytics events"
on public.analytics_events
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can manage import logs" on public.import_logs;
create policy "Admin can manage import logs"
on public.import_logs
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create index if not exists categories_slug_idx on public.categories(slug);
create index if not exists categories_featured_idx on public.categories(featured);

create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_status_idx on public.products(status);
create index if not exists products_type_idx on public.products(type);
create index if not exists products_featured_idx on public.products(featured);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_source_platform_idx on public.products("sourcePlatform");
create index if not exists products_status_type_featured_idx on public.products(status, type, featured);

create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_payment_status_idx on public.orders(payment_status);
create index if not exists orders_created_at_idx on public.orders("createdAt" desc);

create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);

create index if not exists analytics_events_product_id_idx on public.analytics_events(product_id);
create index if not exists analytics_events_event_idx on public.analytics_events(event);
create index if not exists analytics_events_source_idx on public.analytics_events(source);
create index if not exists analytics_events_created_at_idx on public.analytics_events("createdAt" desc);

create index if not exists import_logs_admin_user_id_idx on public.import_logs(admin_user_id);
create index if not exists import_logs_product_id_idx on public.import_logs(product_id);
create index if not exists import_logs_platform_idx on public.import_logs(platform);
create index if not exists import_logs_status_idx on public.import_logs(status);
create index if not exists import_logs_created_at_idx on public.import_logs("createdAt" desc);

comment on table public.products is 'Catalogo JANKO: produtos afiliados e dropshipping.';
comment on column public.products.type is 'affiliate: redireciona para affiliateUrl. dropshipping: usa carrinho/checkout interno.';
comment on column public.products.status is 'draft: invisivel; published: visivel na loja; archived: fora do catalogo.';
comment on table public.analytics_events is 'Eventos publicos de analytics. Insert publico, leitura/admin por RLS.';
