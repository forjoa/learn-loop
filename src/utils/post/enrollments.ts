import { postJson } from '../http'

export const acceptEnrollment = (id: string, token: string) =>
    postJson<{ message: string }>('/enrollments/accept', { id }, token)

export const denyEnrollment = (id: string, token: string) =>
    postJson<{ message: string }>('/enrollments/deny', { id }, token)
