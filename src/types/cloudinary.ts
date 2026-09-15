export interface CloudinaryTransformOptions {
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'limit' | 'thumb'
  quality?: string | number
  format?: 'auto' | 'webp' | 'avif'
}