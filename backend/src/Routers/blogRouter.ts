import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { createPost, updatePost } from '@kumarmrityunjay/medium-package'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string, 
        JWT_SECRET : string,
    },
    Variables: {
        userId: any;
    }
}>()


blogRouter.use('/*', async(c, next)=>{
    try{
        const header = c.req.header('Authorization');
        if(!header){
            c.status(202)
            return c.json({
            msg : "Unauthorized Access"
            })
        }

        const token = header.split(" ")[1];
        const verifyToken = await verify(token, c.env.JWT_SECRET);
        if(verifyToken){
            c.set("userId", verifyToken.id)
            await next();
            return;
        }
    }
    catch(e){
        return c.json({
            msg : "Verification Failed"
        })
    }

})

blogRouter.post('/new-post', async(c)=>{
    const body = await c.req.json();
    const {success} = createPost.safeParse(body);
    if(!success || body.title === "" || body.content === ""){
        c.status(202)
        return c.json({
            msg : "Input Is Invalid"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{

        const userId=c.get('userId')
        const blog = await prisma.post.create({
            data :{
                title :body.title,
                content : body.content,
                authorId : userId
            }
        })

        c.status(200)
        return c.json({
            msg : "Post Published"
        })
    }
    catch(e){
        c.status(404)
        return c.json({
            msg  :"Internal Server Error"
        })
    }

})


blogRouter.put('/update-post', async(c)=>{

    const body = await c.req.json();
    const { success } = updatePost.safeParse(body);
    if(!success){
        c.status(202)
        return c.json({
            msg : "Input Is Invalid"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },
            data :{
                title : body.title,
                content : body.content,
            }
        })

        c.status(200)
        return c.json({
            msg : "Update Successful"
        })
    }
    catch(e){
        c.status(404)
        return c.json({
            msg  :"Internal Server Error"
        })
    }
})


blogRouter.get('/unique/:id', async(c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())  

    try {
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            },
            include: {
                author: {
                  select: {
                    name: true, 
                    email : true
                  },
                },
            },
        })
    
        c.status(200)
        return c.json({
            blog
        })
    }
    catch(e){
        c.status(404)
        return c.json({
            msg : "Internal Server Error"
        })
    }


})


blogRouter.get('/bulk', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findMany({
            include: {
                author: {
                  select: {
                    name: true, 
                  },
                },
            },
        });
        c.status(200)
        return c.json({
            blog
        })  
    }
    catch(e){
        c.status(404)
        return c.json({
            msg : "Internal Server Error"
        })
    }

})