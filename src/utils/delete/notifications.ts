import { deleteJson } from '../http'

export const deleteNotification = (id: string, token: string) =>
    deleteJson<{ message: string }>(`/notifications/${id}`, token)
