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
    const verifyEmail = userSignup.safeParse('email', body.email);
    if(!verifyEmail.success){
        c.status(202)
        return c.json({
            msg : "Invalid Email"
        })
    }
    const verifyPassword = userSignup.safeParse('Password', body.password);
    if(!verifyPassword.success){
        c.status(202)
        return c.json({
            msg : "Invalid Password"
        })
    }
    const verifyUsername = userSignup.safeParse('name', body.name);
    if(!verifyUsername.success){
        c.status(202)
        return c.json({
            msg : "Invalid UserName"
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
            msg : "User Already Exit"
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
        name : user.name,
        email : user.email,
        id : user.id,
        msg  :"SignUp Sucessfully",
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
            email : body.email
        }
    })

    if(!user){
        c.status(202)
        return c.json({
            msg : "Email Not Registred"
        })
    }

    if(user.password != body.password){
        c.status(202)
        return c.json({
            msg : "Incorrect Password"
        })
    }
    
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    c.status(200)
    return c.json({
        token : token,
        name : user.name,
        email : user.email,
        id : user.id,
        msg : "SignIn Sucessfully",
    })
}
catch(e){
    c.status(404)
    return c.json({
    msg : "Server Error"
    })
}

})