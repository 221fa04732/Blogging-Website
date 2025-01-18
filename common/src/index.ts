import z from 'zod'

export const userSignup = z.object({
    email : z.string().email(),
    name : z.string(),
    password : z.string().min(8)
})

export const userSignin = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export const createPost = z.object({
    title : z.string(),
    content : z.string(),
})

export const updatePost = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
})

export type userSignupType = z.infer<typeof userSignup>
export type userSigninType = z.infer<typeof userSignin>
export type createPostType = z.infer<typeof createPost>
export type updatePostType = z.infer<typeof updatePost>