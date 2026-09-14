import { cloudinaryConfig, isCloudinaryConfigured } from './config'

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  width: number
  height: number
}

export async function uploadImage(file: File): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured) throw new Error('Cloudinary environment variables are not configured')
  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', cloudinaryConfig.uploadPreset ?? '')
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName ?? ''}/image/upload`, { method: 'POST', body })
  if (!response.ok) throw new Error('Cloudinary upload failed')
  return response.json() as Promise<CloudinaryUploadResult>
}