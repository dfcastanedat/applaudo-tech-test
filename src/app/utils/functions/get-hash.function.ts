import * as md5 from 'md5';

export const getHash = (
  ts: string,
  privateKey: string,
  publicKey: string
): string => {
  return md5(ts + privateKey + publicKey);
};
