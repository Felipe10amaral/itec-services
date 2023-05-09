import connection from './config/database'
import { app } from './app'
import { env } from './env'

connection
  .then(() => {
    console.log('database is connected')
    app.listen(env.PORT, () => {
      console.log(` 🚀 Server is running on port ${env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
