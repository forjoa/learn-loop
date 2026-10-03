export interface Owner {
    id: string
    name: string
}

export interface UserInTopic {
    status: string
    userId: string
}

export interface Topic {
    id: string
    title: string
    description: string
    ownerId: string
}

export interface TopicWithUsers extends Topic {
    users: UserInTopic[]
    owner: Owner
}

export interface Post {
    id: string
    title: string
    content: string
    userId: string
    topicId: string
    createdAt: string
}

export interface TopicMember {
    id: string
    name: string
    photo: string | null
}

export interface DetailedTopic extends Topic {
    users: TopicMember[]
    owner: Owner
    posts: Post[]
    chatId: string | null
}

export interface Notification {
    id: string
    userId: string
    title: string
    content: string
    enrollmentId?: string | null
    createdAt?: string
    updatedAt?: string
}

export interface PendingEnrollment {
    id: string
    user: {
        id: string
        name: string
        email: string
        photo: string | null
    }
}

export interface TopicPreview {
    id: string
    title: string
    description: string
    ownerId: string
    ownerName: string
    memberCount: number
}

export type EnrollmentStatusValue = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface EnrollmentStatusRecord {
    id: string
    status: EnrollmentStatusValue
}
