import { patchJson } from '../http'

export type EnrollmentStatus = 'APPROVED' | 'REJECTED'

export const updateEnrollmentStatus = (id: string, status: EnrollmentStatus, token: string) =>
    patchJson<{ message: string }>(`/enrollments/${id}`, { status }, token)
