import { describe, expect, it } from 'vitest'
import { getUserId } from './token.ts'

function makeFakeJwt(payload: Record<string, unknown>) {
    const encode = (obj: unknown) => btoa(JSON.stringify(obj))
    return `${encode({ alg: 'none' })}.${encode(payload)}.signature`
}

describe('getUserId', () => {
    it('decodes the userId from the token payload', () => {
        const token = makeFakeJwt({ userId: 'user-42', role: 'STUDENT' })

        expect(getUserId(token)).toBe('user-42')
    })
})
