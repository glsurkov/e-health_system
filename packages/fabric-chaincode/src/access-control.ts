import * as crypto from 'crypto';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Context, Contract } from 'fabric-contract-api';

export class AccessControlChaincode extends Contract {
    async InitLedger(_ctx: Context): Promise<void> {
        console.info('Ledger initialized');
    }

    // Проверка подписи RSA
    async verifyBlindSignature(
        ctx: Context,
        mu: string,
        s_mu: string,
        e: string,
        n: string,
    ): Promise<boolean> {
        const muBN = BigInt(mu);
        const sMuBN = BigInt(s_mu);
        const eBN = BigInt(e);
        const nBN = BigInt(n);
        const recovered = sMuBN ** eBN % nBN;
        return recovered === muBN;
    }

    // Регистрация доступа
    async registerAccess(
        ctx: Context,
        mu: string,
        mp: string,
        role: string,
    ): Promise<void> {
        const hashMu = crypto.createHash('sha256').update(mu).digest('hex');
        const hashMp = crypto.createHash('sha256').update(mp).digest('hex');
        const key = `PERMISSION_${hashMu}_${hashMp}`;
        const record = { hashMu, hashMp, role };
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(record)));
    }

    // Генерация токена доступа
    async generateToken(
        ctx: Context,
        mu: string,
        mp: string,
        timestamp: string,
        nonce: string,
    ): Promise<string> {
        const hMu = crypto.createHash('sha256').update(mu).digest('hex');
        const hMp = crypto.createHash('sha256').update(mp).digest('hex');
        const token = crypto
            .createHash('sha256')
            .update(`${hMu}|${hMp}|${timestamp}|${nonce}`)
            .digest('hex');

        const log = {
            hMu,
            hMp,
            timestamp,
            nonce,
            token,
            accessType: 'read',
        };

        const logKey = `LOG_${Date.now()}_${hMu}`;
        await ctx.stub.putState(logKey, Buffer.from(JSON.stringify(log)));
        return token;
    }

    // Проверка логов
    async queryLogs(ctx: Context, hMu: string): Promise<string> {
        const iterator = await ctx.stub.getStateByPartialCompositeKey('LOG_', [
            hMu,
        ]);
        const results: any[] = [];
        while (true) {
            const res = await iterator.next();
            if (res.value) {
                results.push(JSON.parse(res.value.value.toString()));
            }
            if (res.done) break;
        }
        return JSON.stringify(results);
    }
}
