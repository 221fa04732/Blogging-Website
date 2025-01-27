import zod from 'zod'

export const changePasswordVerify = zod.object({
    newPassword : zod.string(),
    oldPassword : zod.string()
})