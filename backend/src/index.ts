import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './Routers/userRouter'
import { blogRouter } from './Routers/blogRouter'
import { cnangeCredentials } from './Routers/changeCredentials'

const app = new Hono<{}>()

// add queing to serve frequent request

app.use(cors());

app.route('/api/v1/user', userRouter);

app.route('/api/v1/blog', blogRouter);

app.route('/api/v1/changeCredentials', cnangeCredentials);

export default app
