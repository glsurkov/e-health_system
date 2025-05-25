/*
 * SPDX-License-Identifier: Apache-2.0
 */

import pino from 'pino';
import * as config from '../../api/config/config';

export const logger = pino({
    level: config.logLevel,
});
