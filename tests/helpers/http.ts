import type { Request, Response } from 'express';

/** Cria um Request falso. Passe o que o teste precisar: mockReq({ params: { id: '1' } }). */
export function mockReq(over: Partial<Request> = {}): Request {
  return { params: {}, body: {}, ...over } as Request;
}

export interface ResEspiao {
  status: jest.Mock;
  json: jest.Mock;
  send: jest.Mock;
}

/**
 * Cria um Response falso com espiões (jest.fn) em status/json/send.
 * status/send/json devolvem o próprio res (encadeável, como no Express real).
 * Depois dá pra checar: expect(res.status).toHaveBeenCalledWith(404).
 */
export function mockRes(): Response & ResEspiao {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res as unknown as Response & ResEspiao;
}
