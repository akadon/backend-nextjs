import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { connectDB } from './db/mongo';
import { dbconnect  } from './db/mysql';
import {connectRedi} from './db/connectRedis';
import {signJwt  , verifyJwt} from './db/jwt';
import  {  typeDefs  }  from  "./schemas";
import  {  resolvers  }  from  "./resolvers";
import Cors from 'cors';


function Middleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise(async (resolve, reject) => {
    const token = req.headers.authorization || '';
    // const user = await getUser(token);
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  origin: [
    'https://studio.apollographql.com',
    'http://localhost:8000',
    'http://localhost:3000',
  ],
});

const server = new ApolloServer({
  typeDefs,  
  resolvers,
  csrfPrevention: true,
  context: ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => ({
    req,
    res,
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(verifyJwt(req.cookies.jwt!,"accessTokenPublicKey")!=null){
    await Middleware(req, res, cors);
    await startServer;
    await server.createHandler({ path: '/api/graphql' })(req, res);  
  }else{
    res.status(403).json({txt:"log in"});
  }
}
