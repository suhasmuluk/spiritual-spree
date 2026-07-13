UPDATE public.products SET image_url = CASE slug
  WHEN 'vastu-shanti-kit' THEN '/__l5e/assets-v1/a0e48a3d-154b-42c2-8263-92f4222b68e2/vastu-shanti-kit.jpg'
  WHEN 'navagraha-vastu-kit' THEN '/__l5e/assets-v1/bdbd075a-c8cd-4b8a-b6a3-4dfec335a3ea/navagraha-vastu-kit.jpg'
  WHEN 'lakshmi-pooja-kit' THEN '/__l5e/assets-v1/82436ffa-c4b6-4ad1-a30a-52a26bc2f67d/lakshmi-pooja-kit.jpg'
  WHEN 'satyanarayan-pooja-kit' THEN '/__l5e/assets-v1/e6f8da4e-f36b-4495-927e-07478d0b6468/satyanarayan-pooja-kit.jpg'
  WHEN 'himalayan-bathing-salt' THEN '/__l5e/assets-v1/35b0e71d-7e14-47b1-8fdc-42e65515ef41/himalayan-bathing-salt.jpg'
  WHEN 'eucalyptus-mint-salt' THEN '/__l5e/assets-v1/86a00bf4-d9d9-4bde-9ba9-0e158f75c3b9/eucalyptus-mint-salt.jpg'
  WHEN 'pure-moringa-powder' THEN '/__l5e/assets-v1/a7d1311d-2303-474d-8197-bd4fe0338b97/pure-moringa-powder.jpg'
  WHEN 'moringa-tulsi-blend' THEN '/__l5e/assets-v1/3d102827-4fe6-4e62-85fc-bfbb61c168b6/moringa-tulsi-blend.jpg'
  WHEN 'rose-shea-lip-balm' THEN '/__l5e/assets-v1/dfd56e02-2a65-4c7e-a0b1-a3b772e91adf/rose-shea-lip-balm.jpg'
  WHEN 'honey-vanilla-lip-balm' THEN '/__l5e/assets-v1/141565e7-19c2-414f-a70c-85e2a400107d/honey-vanilla-lip-balm.jpg'
END
WHERE slug IN ('vastu-shanti-kit','navagraha-vastu-kit','lakshmi-pooja-kit','satyanarayan-pooja-kit','himalayan-bathing-salt','eucalyptus-mint-salt','pure-moringa-powder','moringa-tulsi-blend','rose-shea-lip-balm','honey-vanilla-lip-balm');