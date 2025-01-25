import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {userSignup, userSignin} from '@kumarmrityunjay/medium-package'
import { hashPasswordWithSalt } from '../Secure/hashPassword'
import { generateSalt } from '../Secure/CreateSalt'
import { lower } from '../OtherFun/lower'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string, 
        JWT_SECRET : string,
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

        c.status(200)
        return c.json({
            token : token,
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

            c.status(200)
            return c.json({
                token : token,
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