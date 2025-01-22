import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {userSignup, userSignin} from '@kumarmrityunjay/medium-package'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string, 
        JWT_SECRET : string,
    }
}>()

userRouter.post('/signup', async (c) => {
    const body =await c.req.json();
    const verifyBody = userSignup.safeParse(body);
    if(!verifyBody.success){
        c.status(202)
        return c.json({
            msg : "Invalid Input"
        })
    }

//  connection
const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const alreadyExitUser = await prisma.user.findFirst({
        where:{
            email : body.email
        }
    })

    if(alreadyExitUser){
        c.status(202)
        return c.json({
            msg : "User already exit"
        })
    }

    const user = await prisma.user.create({
    data: {
        email : body.email,
        name : body.name,
        password : body.password
    },
    })

    const token =await sign({id : user.id}, c.env.JWT_SECRET);

    c.status(200)
    return c.json({
        token : token,
        name : body.name,
        msg  :"Sucessfully Signup",
    })
}
catch(e){
    c.status(404)
    return c.json({
    msg : "Server Error"
    })
}

})


userRouter.post('/signin', async (c)=>{
    const body =await c.req.json();
    const verifyBody =userSignin.safeParse(body);
    if(!verifyBody.success){
        c.status(202)
        return c.json({
            msg : "Invalid Input"
        })
    }

const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
}).$extends(withAccelerate())

try{
    const user =await prisma.user.findUnique({
    where:{
        email : body.email,
        password: body.password
    }
    })

    if(!user){
        c.status(202)
        return c.json({
            msg : "User not found"
        })
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    c.status(200)
    return c.json({
        token : token,
        name : user.name,
        msg : "Sucessfully Signin",
    })
}
catch(e){
    c.status(404)
    return c.json({
    msg : "Server Error"
    })
}

})