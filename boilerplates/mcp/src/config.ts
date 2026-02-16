import dotenv from 'dotenv'

dotenv.config()


export enum PLATFORMS {
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  MOBILE = 'mobile',
  // DESKTOP = 'desktop',
}

const PLATFORMS_ARRAY = Object.values(PLATFORMS);

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  repoUrl: process.env.REPO_URL ?? '',
  repoDir: process.env.REPO_DIR ?? '',
  boilerplateDir: process.env.BOILERPLATE_DIR ?? '',
  platforms: PLATFORMS_ARRAY
}

