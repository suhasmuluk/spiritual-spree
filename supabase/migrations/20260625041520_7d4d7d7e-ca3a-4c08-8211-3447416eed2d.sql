
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS section text NOT NULL DEFAULT 'astro-veda';

ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_section_check;
ALTER TABLE public.categories
  ADD CONSTRAINT categories_section_check CHECK (section IN ('astro-veda','wellness-veda'));

INSERT INTO public.categories (slug, name, section) VALUES
  ('vastu-kits',     'Vastu Kits',      'astro-veda'),
  ('pooja-kits',     'Pooja Kits',      'astro-veda'),
  ('bathing-salt',   'Bathing Salt',    'wellness-veda'),
  ('moringa-powder', 'Moringa Powder',  'wellness-veda'),
  ('lip-balm',       'Lip Balm',        'wellness-veda')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, section = EXCLUDED.section;

WITH c AS (SELECT id, slug FROM public.categories)
INSERT INTO public.products (slug, name, description, price, image_url, stock, featured, eco_friendly, category_id, highlights) VALUES
  ('vastu-shanti-kit',     'Vastu Shanti Kit',        'Complete Vastu correction kit with yantras, crystals and sacred herbs for home harmony.', 1499, 'https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=800', 25, true,  true, (SELECT id FROM c WHERE slug='vastu-kits'),     '["Energised Yantras","Natural Crystals","Vedic Guidebook"]'::jsonb),
  ('navagraha-vastu-kit',  'Navagraha Vastu Kit',     'Balance the nine planetary energies of your space with this authentic Vedic kit.',          1899, 'https://images.unsplash.com/photo-1545153996-d9c4d3d3b8a4?w=800', 18, false, true, (SELECT id FROM c WHERE slug='vastu-kits'),     '["9 Graha Yantras","Sacred Threads","Mantra Booklet"]'::jsonb),
  ('lakshmi-pooja-kit',    'Lakshmi Pooja Kit',       'Everything required for a complete Lakshmi pooja — samagri, diyas, chandan and instructions.', 899,  'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800', 40, true,  true, (SELECT id FROM c WHERE slug='pooja-kits'),     '["Authentic Samagri","Eco Packaging","Step-by-Step Guide"]'::jsonb),
  ('satyanarayan-pooja-kit','Satyanarayan Pooja Kit', 'Traditional kit for the Satyanarayan vrat with all sacred items neatly arranged.',          1199, 'https://images.unsplash.com/photo-1604593019021-9d24a9b25c1f?w=800', 30, false, true, (SELECT id FROM c WHERE slug='pooja-kits'),     '["Complete Samagri","Pure Ingredients","Vidhi Booklet"]'::jsonb),
  ('himalayan-bathing-salt','Himalayan Bathing Salt', 'Pink Himalayan salt infused with rose and lavender essentials for a relaxing soak.',        499,  'https://images.unsplash.com/photo-1556228724-4f4f6cdba4e1?w=800', 80, true,  true, (SELECT id FROM c WHERE slug='bathing-salt'),   '["100% Natural","Detoxifying","Skin Softening"]'::jsonb),
  ('eucalyptus-mint-salt', 'Eucalyptus Mint Salt',    'A cooling, refreshing bath salt to ease tired muscles after a long day.',                    549,  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800', 60, false, true, (SELECT id FROM c WHERE slug='bathing-salt'),   '["Cooling Blend","Stress Relief","Aromatherapy"]'::jsonb),
  ('pure-moringa-powder',  'Pure Moringa Powder',     'Cold-dried organic moringa leaf powder — a daily superfood for immunity and energy.',        399,  'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800', 100,true,  true, (SELECT id FROM c WHERE slug='moringa-powder'), '["Single Origin","No Additives","Lab Tested"]'::jsonb),
  ('moringa-tulsi-blend',  'Moringa Tulsi Blend',     'A wellness blend of moringa and tulsi for daily detox and respiratory health.',             449,  'https://images.unsplash.com/photo-1597393756416-d2c20fafe44a?w=800', 70, false, true, (SELECT id FROM c WHERE slug='moringa-powder'), '["Ayurvedic","Antioxidant","Energy Boost"]'::jsonb),
  ('rose-shea-lip-balm',   'Rose & Shea Lip Balm',    'Hydrating lip balm with rose extract and pure shea butter for soft, supple lips.',           199,  'https://images.unsplash.com/photo-1599733589046-9a4d39de6e36?w=800', 120,true,  true, (SELECT id FROM c WHERE slug='lip-balm'),       '["Beeswax Free","Vegan","Natural Tint"]'::jsonb),
  ('honey-vanilla-lip-balm','Honey Vanilla Lip Balm', 'A nourishing balm with raw honey and vanilla for everyday lip care.',                        199,  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800', 110,false, true, (SELECT id FROM c WHERE slug='lip-balm'),       '["Raw Honey","Cold Pressed Oils","Long Lasting"]'::jsonb)
ON CONFLICT (slug) DO NOTHING;
