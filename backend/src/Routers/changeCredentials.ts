import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { changeUsernameVerify } from '../Types/changeUsername'
import { changePasswordVerify } from '../Types/changePassword'
import { lower } from '../OtherFun/lower'
import { hashPasswordWithSalt } from '../Secure/hashPassword'

export const cnangeCredentials = new Hono<{
    Bindings:{
        DATABASE_URL: string, 
        JWT_SECRET : string,
    },
    Variables: {
        userId: any;
    }
}>()


cnangeCredentials.use('/*', async(c, next)=>{
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


cnangeCredentials.put('/userName', async(c)=>{

    const body = await c.req.json();
    const {success} = changeUsernameVerify.safeParse(body);

    if(!success || body.name === ""){
        c.status(202)
        return c.json({
            msg : "Input Is Invalid"
        })
    }

    const userName = lower(body.name)

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{

        const userId=c.get('userId')
        await prisma.user.update({
            where : {
                id : userId
            },
            data :{
                name : userName
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


cnangeCredentials.put('/password', async(c)=>{

    const body = await c.req.json();
    const {success} = changePasswordVerify.safeParse(body);

    if(!success || body.oldPassword === "" || body.newPassword === ""){
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

        const user : any = await prisma.user.findFirst({
            where :{
                id : userId
            }
        })

        const salt = user.salt;
        const oldHashPassword = await hashPasswordWithSalt(body.oldPassword, salt)

        if(oldHashPassword === user.password){
            const newHashPassword = await hashPasswordWithSalt(body.newPassword, salt)

            await prisma.user.update({
                where : {
                    id : userId
                },
                data : {
                    password : newHashPassword
                }
            })

            c.status(200)
            return c.json({
                msg : "Update Successful"
            })
        }

        c.status(202)
        return c.json({
            msg : "Incorrect Current Password"
        })
        
    }
    catch(e){
        c.status(404)
        return c.json({
            msg  :"Internal Server Error"
        })
    }

})