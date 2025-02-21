import {atom} from 'recoil'

interface userInfo {
    name : string | null;
    email : string | null;
    id : string | null;
}

export const Useratom = atom<userInfo>({
    key : "useratom",
    default : {
        name : null,
        email : null,
        id : null
    }
})