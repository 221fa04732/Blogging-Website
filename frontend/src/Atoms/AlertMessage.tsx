import {atom} from 'recoil'

export const AlertMessageatom = atom({
    key : "AlertMessage",
    default : {
        show : false,
        message : 'Thanks For Visiting ❤️',
        status : 200
    }
})