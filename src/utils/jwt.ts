import jwt, { SignOptions } from 'jsonwebtoken';

export function generateAccessToken(userId: string): string {
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = { expiresIn: '15m' };
  return jwt.sign({ userId }, secret, options);
}

export function generateRefreshToken(userId: string): string {
  const secret = process.env.JWT_REFRESH_SECRET as string;
  const options: SignOptions = { expiresIn: '7d' };
  return jwt.sign({ userId }, secret, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { userId: string };
}