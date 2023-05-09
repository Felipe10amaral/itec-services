import { env } from '../env'
import mongoose from 'mongoose'

const databaseUrl = env.DATABASE_URL

export default mongoose.connect(databaseUrl)
