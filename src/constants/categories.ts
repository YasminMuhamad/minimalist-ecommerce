import type { Category } from '@/types'

export const fallbackCategories: Category[] = [
  { id: 'clothing', name: { ar: 'الملابس', en: 'Clothing' }, slug: 'clothing', isActive: true, sortOrder: 1 },
  { id: 'personalCare', name: { ar: 'العناية الشخصية', en: 'Personal Care' }, slug: 'personal-care', isActive: true, sortOrder: 2 },
  { id: 'home', name: { ar: 'مستلزمات المنزل', en: 'Home Supplies' }, slug: 'home', isActive: true, sortOrder: 3 },
  { id: 'office', name: { ar: 'أدوات المكتب', en: 'Office Tools' }, slug: 'office', isActive: true, sortOrder: 4 },
  { id: 'accessories', name: { ar: 'إكسسوارات عامة', en: 'General Accessories' }, slug: 'accessories', isActive: true, sortOrder: 5 },
]