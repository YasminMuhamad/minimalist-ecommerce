import { appEnv } from '@/config/env'

export const cloudinaryConfig = appEnv.cloudinary
export const isCloudinaryConfigured = Object.values(cloudinaryConfig).every(Boolean)