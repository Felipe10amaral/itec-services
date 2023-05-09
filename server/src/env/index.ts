import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), // 3 ambientes possiveis
  PORT: z.coerce.number().default(3333), // coerce converte para numero
  DATABASE_URL: z.string().default('mongodb://127.0.0.1:27017/itec'),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env) // safeParse vai tentar validar se possui essa informações dentro de dotenv

// verifica se teve sucesso na validacao
if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format()) // pega todos erros se houver e formata de uma forma mais amigavel

  throw new Error('Invalid environment varable ')
}

export const env = _env.data // caso tudo dê certo
