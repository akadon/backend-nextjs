import { NextApiRequest, NextApiResponse } from 'next';
import {signJwt,verifyJwt} from './db/jwt';
import {connectDB} from './db/mongo';
import {connectRedi} from './db/connectRedis';
import {dbconnect} from './db/mysql';
import { v4 as uuidv4 } from 'uuid';
import {  escape,sanitize } from 'sanitizer';
import { genSalt , hash , compare  } from 'bcrypt';


export default async function handler(req: NextApiRequest,res: NextApiResponse<any>) {
  if(req.cookies.jwt == null){
    const argsbody =  JSON.parse(req.body) || req.body;
    if(argsbody.username != null && argsbody.userpw != null){
      let dbuser = await dbconnect('user').select("*").where({name: argsbody.username}).then((out:any)=> {return out});
      if(dbuser.length==0){
        let hashpw =  await hash(argsbody.userpw, await genSalt(10));
        dbconnect('user')
        .insert([{ name: argsbody.username ,pw: hashpw}]
        ).then()
      }else{
        const uid = uuidv4();
        connectRedi.set(uid, Date.now(),{EX: 60*60*24, NX: true});  
        compare(argsbody.userpw, dbuser[0].pw, function(err, result) {
          if (result) {
            res.status(200).json(signJwt('{"id": "'+uid+'","name": "'+escape(argsbody.username)+'","date":"'+Date.now()+'"}',"accessTokenPrivateKey"));
         }else{
          res.status(403).json({txt:"error"});
         }
      });
      }
    }else{
      res.status(403).json({txt:"error"});
    }
  }else{
    res.status(200).json(verifyJwt(req.cookies.jwt!,"accessTokenPublicKey"));
  }
}



