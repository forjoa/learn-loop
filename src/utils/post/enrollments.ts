import { postJson, patchJson } from '../http'

export type EnrollmentStatus = 'APPROVED' | 'REJECTED'

export const updateEnrollmentStatus = (id: string, status: EnrollmentStatus, token: string) =>
    patchJson<{ message: string }>(`/enrollments/${id}`, { status }, token)

export const createEnrollment = (userId: string, topicId: string, token: string) =>
    postJson<{ message: string; data: { id: string; status: string } }>('/enrollments', { userId, topicId }, token)
