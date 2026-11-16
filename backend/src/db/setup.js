import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const here = new URL('.', import.meta.url)

try {
  const schema = await readFile(fileURLToPath(new URL('./schema.sql', here)), 'utf8')
  const seed = await readFile(fileURLToPath(new URL('./seed.sql', here)), 'utf8')
  await pool.query(schema)
  await pool.query(seed)
  console.log('Database ready: books table created and sample books added.')
} catch (error) {
  console.error('Could not set up the database:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
