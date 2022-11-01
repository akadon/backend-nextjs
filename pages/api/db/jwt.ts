import jwt, { SignOptions } from 'jsonwebtoken' ;

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: SignOptions
) => {
  let privateKey = '';
  if (keyName === 'accessTokenPrivateKey') {
    privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
  } else if (keyName === 'refreshTokenPrivateKey') {
    privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;
  }

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  let publicKey = '';
  if (keyName === 'accessTokenPublicKey') {
    publicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;
  } else if (keyName === 'refreshTokenPublicKey') {
    publicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY as string;
  }

  try {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as T;
  } catch (error) {
    return null;
  }
};
