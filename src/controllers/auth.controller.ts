import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }
    const result = await authService.register(name, email, password);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token obrigatório' });
    }
    const result = await authService.refresh(refreshToken);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token obrigatório' });
    }
    await authService.logout(refreshToken);
    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await authService.getMe(req.userId!);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}