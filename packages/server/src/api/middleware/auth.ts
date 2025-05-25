/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { logger } from '../../lib/logger/logger';
import * as config from '../config/config';

const { UNAUTHORIZED } = StatusCodes;

export const fabricAPIKeyStrategy: HeaderAPIKeyStrategy =
    new HeaderAPIKeyStrategy(
        { header: 'X-API-Key', prefix: '' },
        false,
        function (apikey, done) {
            logger.debug({ apikey }, 'Checking X-API-Key');
            if (apikey === config.org1ApiKey) {
                const user = config.mspIdOrg1;
                logger.debug('User set to %s', user);
                done(null, user);
            } else if (apikey === config.org2ApiKey) {
                const user = config.mspIdOrg2;
                logger.debug('User set to %s', user);
                done(null, user);
            } else {
                logger.debug({ apikey }, 'No valid X-API-Key');
                return done(null, false);
            }
        },
    );

export const authenticateApiKey = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    passport.authenticate(
        'headerapikey',
        { session: false },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any, user: Express.User, _info: any) => {
            if (err) return next(err);
            if (!user)
                return res.status(UNAUTHORIZED).json({
                    status: getReasonPhrase(UNAUTHORIZED),
                    reason: 'NO_VALID_APIKEY',
                    timestamp: new Date().toISOString(),
                });

            req.logIn(user, { session: false }, async (err) => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        },
    )(req, res, next);
};
