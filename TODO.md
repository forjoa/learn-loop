# TODO — Learn Loop (web frontend)

- [ ] **Wire up real-time chat sending** — `group-chat.tsx`'s `handleSendMessage` only logs to console (`// TODO: insert message and send in socket`); the backend has a `socket.ts` and a `messages` module already.
- [ ] **Public "join via link" flow** (2026-10-02) — the mobile app has `join/[topicId]` (unauthenticated topic preview + request-to-join, via `GET /public/topics/preview`) for invite links shared outside the app. The web dashboard's `/dashboard/send` only covers *creating* a topic as a teacher; a student joining via a shared link still has no web entry point. Would need a new top-level route (outside `/dashboard`, since it must work logged-out), not a dashboard child route.
- [ ] **Post creation UI** (2026-10-02) — `topic-detail.tsx` renders `topic.posts` read-only. The mobile app has a "quick post" flow (FAB + bottom sheet) for topic owners; the backend's `posts` module is ready, the web side isn't built yet.
