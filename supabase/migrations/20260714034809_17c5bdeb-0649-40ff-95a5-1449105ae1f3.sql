UPDATE public.products
SET image_url = CASE slug
  WHEN 'vastu-shanti-kit' THEN '/products/vastu-shanti-kit.jpg'
  WHEN 'vastu-yantra-set' THEN '/products/vastu-yantra-set.jpg'
  WHEN 'griha-pravesh-pooja-kit' THEN '/products/pooja-kit.jpg'
  WHEN 'satyanarayan-pooja-kit' THEN '/products/pooja-kit.jpg'
  WHEN 'himalayan-pink-bathing-salt' THEN '/products/bathing-salt.jpg'
  WHEN 'lavender-bathing-salt' THEN '/products/bathing-salt.jpg'
  WHEN 'organic-moringa-powder' THEN '/products/moringa-powder.jpg'
  WHEN 'moringa-immunity-blend' THEN '/products/moringa-powder.jpg'
  WHEN 'rose-beetroot-lip-balm' THEN '/products/lip-balm.jpg'
  WHEN 'honey-vanilla-lip-balm' THEN '/products/lip-balm.jpg'
  ELSE image_url
END
WHERE slug IN (
  'vastu-shanti-kit',
  'vastu-yantra-set',
  'griha-pravesh-pooja-kit',
  'satyanarayan-pooja-kit',
  'himalayan-pink-bathing-salt',
  'lavender-bathing-salt',
  'organic-moringa-powder',
  'moringa-immunity-blend',
  'rose-beetroot-lip-balm',
  'honey-vanilla-lip-balm'
);