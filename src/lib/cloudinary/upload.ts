import { cloudinaryConfig, isCloudinaryConfigured } from './config'

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  width: number
  height: number
}

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const maxImageSize = 10 * 1024 * 1024

export function validateImageFile(file: File) {
  if (!allowedImageTypes.includes(file.type)) throw new Error('Unsupported image type')
  if (file.size > maxImageSize) throw new Error('Image exceeds the 10 MB limit')
}

export async function uploadImage(file: File): Promise<CloudinaryUploadResult> {
  validateImageFile(file)
  if (!isCloudinaryConfigured) throw new Error('Cloudinary environment variables are not configured')
  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', cloudinaryConfig.uploadPreset ?? '')
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName ?? ''}/image/upload`, { method: 'POST', body })
  if (!response.ok) throw new Error('Cloudinary upload failed')
  const result = await response.json() as Partial<CloudinaryUploadResult>
  if (typeof result.secure_url !== 'string' || typeof result.public_id !== 'string') throw new Error('Cloudinary returned an invalid image')
  return result as CloudinaryUploadResult
}