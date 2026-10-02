# TODO — Learn Loop (web frontend)

- [ ] **Build out the dashboard routes** — `/dashboard`, `/dashboard/notifications`, `/dashboard/send` are still placeholder `<p>` elements in `App.tsx`. The backend already has `topics`, `enrollments`, `notifications` and `posts` endpoints, and the mobile app (`app/app/(tabs)/(home)`, `(notifications)`, `join/[topicId]`) already implements the equivalent screens — port those: a topics/classes feed for home, a real notifications list, and a join/create flow for the `send` route.
- [ ] **Wire up real-time chat sending** — `group-chat.tsx`'s `handleSendMessage` only logs to console (`// TODO: insert message and send in socket`); the backend has a `socket.ts` and a `messages` module already.
