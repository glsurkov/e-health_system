import { NextFunction, Request, RequestHandler, Response } from 'express';

export const withErrorHandling = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.resolve(handler(req, res, next));
        } catch (error) {
            next(error);
        }
    };
};

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error('Unhandled error:', err);

    res.status(500).json({
        error: 'Internal Server Error',
        message: err?.message || 'Unknown error',
    });
}
