import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'ASkdjsadjioa23249u9U**&#*hjfha8a_)d9aja0923_?;a9234uasdasioy893y423jky8dfs09ui984yna00a0-0-nn4981y98jkndjah',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
