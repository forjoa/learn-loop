import { afterEach, describe, expect, it, vi } from 'vitest'
import { isTokenValid } from './auth.ts'

const respondWith = (status: number) => vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status })))

describe('isTokenValid', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('is true for a token the backend accepts', async () => {
        respondWith(200)

        await expect(isTokenValid('token')).resolves.toBe(true)
    })

    it('is false for an expired or revoked token', async () => {
        respondWith(401)

        await expect(isTokenValid('token')).resolves.toBe(false)
    })

    it('throws instead of reporting invalid when the server is down', async () => {
        respondWith(503)

        await expect(isTokenValid('token')).rejects.toThrow()
    })
})
