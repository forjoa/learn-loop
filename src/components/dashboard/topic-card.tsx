import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { TopicWithUsers } from '@/lib/types'

export default function TopicCard({ topic, isMine }: { topic: TopicWithUsers; isMine: boolean }) {
    return (
        <Link to={`/dashboard/topics/${topic.id}`}>
            <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="flex h-full flex-col justify-between pt-6">
                    <div>
                        <span className="mb-3 inline-block rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            {isMine ? 'Mi tema' : topic.owner.name}
                        </span>
                        <h3 className="mb-1 text-lg font-semibold text-foreground">{topic.title}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        {topic.users.length} {topic.users.length === 1 ? 'miembro' : 'miembros'}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
