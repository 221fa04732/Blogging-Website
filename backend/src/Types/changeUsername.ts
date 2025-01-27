import zod from "zod"

export const changeUsernameVerify = zod.object({
    name : zod.string()
})