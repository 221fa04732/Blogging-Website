import Alert from '@mui/material/Alert';
import {AlertMess} from '../Atoms/AlertMess'
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

export default function AlertMessage(props : {
    Messagetype : number,
    message : string
}) {

    const [visible, setVisible] = useRecoilState(AlertMess)

    useEffect(()=>{
        const alert = setTimeout(()=>{
            setVisible(0);
        },3000)
    
        return() => clearTimeout(alert)

    }, [visible])

  return (
    <div className={`fixed right-0 z-30  ${visible ? "block" : 'hidden'}`}>
        <Alert></Alert>
        <div>{props.message}</div>
    </div>
  );

}


// 0 -> success
// 1 -> info
// 2 -> warning
// 3 -> error

