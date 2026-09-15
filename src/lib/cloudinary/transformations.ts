import type { CloudinaryTransformOptions } from '@/types'

export function optimizedCloudinaryUrl(url: string, options: CloudinaryTransformOptions = {}) {
  if (!url.includes('res.cloudinary.com/')) return url
  const { width, height, crop = 'limit', quality = 'auto', format = 'auto' } = options
  const transforms = [`f_${format}`, `q_${quality}`, width ? `w_${width}` : '', height ? `h_${height}` : '', width || height ? `c_${crop}` : ''].filter(Boolean).join(',')
  return transforms ? url.replace('/upload/', `/upload/${transforms}/`) : url
}