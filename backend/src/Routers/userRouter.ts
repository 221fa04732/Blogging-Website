import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import {userSignup, userSignin} from '@kumarmrityunjay/medium-package'
import { hashPasswordWithSalt } from '../Secure/hashPassword'
import { generateSalt } from '../Secure/CreateSalt'
import { lower } from '../OtherFun/lower'
import { setSignedCookie, deleteCookie, getSignedCookie } from 'hono/cookie'
  

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string, 
        JWT_SECRET : string,
        COOKIES_SECRET : string
    }
}>()

userRouter.post('/signup', async (c) => {

    const body =await c.req.json();
    const verifyUser = userSignup.safeParse(body)

    if(!verifyUser.success){
        c.status(202)
        return c.json({
            msg : "Input Is Invalid"
        })
    }

    const email = lower(body.email)
    const name = lower(body.name)

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const alreadyExitUser = await prisma.user.findFirst({
            where:{
                email : email
            }
        })

        if(alreadyExitUser){
            c.status(202)
            return c.json({
                msg : "User Already Registered"
            })
        }

        const salt = generateSalt()
        const hashPassword =await hashPasswordWithSalt(body.password, salt)

        const user = await prisma.user.create({
            data: {
                email : email,
                name : name,
                password : hashPassword,
                salt : salt
            },
        })

        const token =await sign({id : user.id}, c.env.JWT_SECRET);
        await setSignedCookie(c, "authToken", token, c.env.COOKIES_SECRET, {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            path : "/",
            maxAge: 60 * 60 * 24 * 7
        })

        c.status(200)
        return c.json({
            name : user.name,
            email : user.email,
            id : user.id,
            msg  :"Account Created Successfully",
        })
    }
    catch(e){
        c.status(404)
        return c.json({
            msg : "Internal Server Error"
        })
    }

})


userRouter.post('/signin', async (c)=>{
        
    const body =await c.req.json();
    const verifyBody =userSignin.safeParse(body);

    if(!verifyBody.success){
        c.status(202)
        return c.json({
            msg : "Input Is Invalid"
        })
    }
    
    const email = lower(body.email)

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const user = await prisma.user.findUnique({
            where:{
                email : email
            }
        })

        if(!user){
            c.status(202)
            return c.json({
                msg : "Email Not Found"
            })
        }

        const salt = user.salt
        const hashPassword =await hashPasswordWithSalt(body.password, salt)

        if(user.password != hashPassword){
            c.status(202)
            return c.json({
                msg : "Password Is Incorrect"
            })
        }
        
        const token = await sign({id: user.id}, c.env.JWT_SECRET)
        await setSignedCookie(c, "authToken", token, c.env.COOKIES_SECRET, {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            path : "/",
            maxAge: 60 * 60 * 24 * 7
        })

        c.status(200)
        return c.json({
            name : user.name,
            email : user.email,
            id : user.id,
            msg : "Logged In Successfully",
        })
    }
    catch(e){
        c.status(404)
        return c.json({
            msg : "Internal Server Error"
        })
    }

})


userRouter.use('/me', async(c, next)=>{
    try{
        const token = await getSignedCookie(c, c.env.COOKIES_SECRET, "authToken")
        if(!token){
            c.status(401)
            return c.json({
            msg : "Unauthorized Access"
            })
        }
        
        const verifyToken = await verify(token, c.env.JWT_SECRET);
        if(verifyToken){
            const id = verifyToken.id;
            if(id){
                const prisma = new PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL
                }).$extends(withAccelerate())
    
                const user =await prisma.user.findFirst({
                    where:{
                        id : id
                    }
                })
                
                if(user){
                    c.status(200)
                    return c.json({
                        name : user.name,
                        email : user.email,
                        id : user.id
                    })
                }
            }
        }
    }
    catch(e){
        c.status(401)
        return c.json({
            msg : "Verification Failed"
        })
    }

})


userRouter.get('/logout', async(c)=>{

    try{
        await setSignedCookie(c, "authToken", "", c.env.COOKIES_SECRET, {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            path : "/",
            maxAge: 0
        })
    
        deleteCookie(c, 'authToken' ,{
            path : '/',
            secure : true
        })

        c.status(200)    
        return c.json({
            msg : "Logged Out"
        })
    }

    catch(e){
        c.status(404)
        return c.json({
            msg : "Internal Server Error"
        })
    }
    
})