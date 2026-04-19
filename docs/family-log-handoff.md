# Family Log 프로젝트 착수 패키지

> phuquoc의 후속 프로젝트 `family-log`를 새 repo에 시작하기 위한 핸드오프 문서.
> 새 Claude Code 세션에서 이 문서를 참고하거나 필요 부분을 복사해서 사용.

---

## 프로젝트 요약

**Family Log**는 가족·친구·부부·여행 등 소규모 그룹이 **이야기방(Room)** 을 만들고
**사진·캘린더·지도·채팅 등 모듈 기반 콘텐츠**를 공유하는 PWA.

### 영감
- Instagram Close Friends (소수 공유)
- Notion (모듈식 페이지)
- 카카오 패밀리톡 (가족 중심)
- 이전 MVP: `phuquoc` — 여행 다이어리 단일 HTML 버전

### 핵심 개념
| 용어 | 설명 |
|---|---|
| **User** | 로그인한 개인 |
| **Room** | 멤버가 모이는 공간 (부부/가족/친구/여행 등) |
| **Template** | Room의 모듈 프리셋 |
| **Module** | Room 안의 기능 단위 (사진그리드/캘린더/지도/채팅/투표 등) |
| **Post** | 콘텐츠 1건 (사진·메모·장소 등) |
| **Cross-post** | 같은 Post를 여러 Room에 공유 (M:N). 댓글은 Room별 독립 |

---

## PART 1 — 외부 서비스 셋업 (브라우저)

### 1-1. GitHub 새 repo 생성

**사이트**: https://github.com/new

| 필드 | 값 |
|---|---|
| Owner | `aramseo` |
| Repository name | `family-log` |
| Description | `모듈식 가족·친구 이야기방 PWA` |
| Visibility | 🔒 **Private** |
| Initialize | ❌ 모두 비움 |

**Create repository** 클릭.

---

### 1-2. Firebase 새 프로젝트

**사이트**: https://console.firebase.google.com

1. **프로젝트 추가** → 이름 `family-log`
2. Google Analytics: **사용 안함**

**Authentication 설정**:
- Build → Authentication → Get started
- Sign-in method → **Google** → 사용 설정 → 지원 이메일 선택 → 저장

**Firestore**:
- Build → Firestore Database → 데이터베이스 만들기
- **프로덕션 모드**
- 위치: **asia-northeast3 (서울)**

**Storage**:
- Build → Storage → 시작하기
- 프로덕션 모드, 서울

**웹 앱 등록**:
- ⚙️ 프로젝트 설정 → 내 앱 → `</>` (웹) 클릭
- 닉네임: `family-log-web`
- Firebase Hosting: ❌
- 앱 등록 → **firebaseConfig 오브젝트 전체 복사** (중요!)

```js
// 이런 형태 — 값들 메모장에 보관
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "family-log.firebaseapp.com",
  projectId: "family-log",
  storageBucket: "family-log.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

---

### 1-3. Cloudflare 계정

**사이트**: https://dash.cloudflare.com

- 무료 가입 (결제 정보 X)
- Pages 연결은 첫 커밋 이후 PART 4에서 진행

---

## PART 2 — 로컬 셋업 + 새 Claude 세션

### 2-1. repo 클론

```bash
cd ~
git clone https://github.com/aramseo/family-log.git
cd family-log
```

### 2-2. 새 Claude 세션 시작

```bash
claude
```

phuquoc 세션과 별개로 `family-log` 디렉토리에서 새 세션.

---

## PART 3 — 새 세션 초기 프롬프트

아래 블록을 **통째로 복사**해서 새 세션 첫 메시지로 붙여넣기:

````
이 repo에 "Family Log" 앱을 새로 시작합니다.

## 프로젝트 요약
모듈식 가족·친구·부부·여행 이야기방을 운영하는 PWA.
Instagram Close Friends + Notion + 가족앨범의 하이브리드.
이전 MVP: https://github.com/aramseo/phuquoc
상세 핸드오프 문서: https://github.com/aramseo/phuquoc/blob/main/docs/family-log-handoff.md

## 기술 스택
- SvelteKit + TypeScript
- Tailwind CSS
- Firebase (Auth, Firestore, Storage, Cloud Messaging)
- Cloudflare Pages 배포 (GitHub Actions)
- Capacitor (나중에 iOS/Android 패키징)

## 첫 작업 목록
1. CLAUDE.md 작성 (이 문서 참고 — Phase 구조, 데이터 모델, 컨벤션 포함)
2. SvelteKit 프로젝트 초기화
   - Skeleton 템플릿, TypeScript, ESLint, Prettier, Vitest, Playwright
   - Tailwind 추가
   - @sveltejs/adapter-cloudflare 설치
3. Firebase 클라이언트 SDK 설치
4. src/lib/firebase.ts — config는 환경변수에서, 싱글톤 초기화
5. src/lib/auth.ts — Google 로그인/로그아웃 헬퍼
6. src/lib/types.ts — Room, Post, User, Comment 등 타입 정의
7. src/routes/+page.svelte — 로그인 상태 분기 스켈레톤
8. .env.example — VITE_FIREBASE_* 키 목록
9. .gitignore
10. firestore.rules — 기본 잠금 (멤버만)
11. firebase.json — 에뮬레이터 설정
12. .github/workflows/deploy.yml — Cloudflare Pages 자동 배포
13. README.md
14. 초기 커밋 + 푸시

## Firebase config
.env.local 파일에 다음 형식으로 저장:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

(실제 값은 내가 별도로 전달)

## 코딩 원칙
- 모놀리식 파일 금지 (phuquoc 반면교사)
- 기능별 파일 분리, 타입 우선
- 커밋: Conventional Commits (feat/fix/refactor/docs)
- 주석은 "왜"만
- 각 단계마다 커밋
- 푸시 전 npm run check + npm run lint 통과 확인

단계마다 진행사항 요약 + 다음 단계 제안해줘.
````

---

## PART 4 — 초기 커밋 후 Cloudflare Pages 연결

새 세션에서 초기 코드 푸시 후:

**사이트**: https://dash.cloudflare.com → Workers & Pages → Create → Pages → **Connect to Git**

| 필드 | 값 |
|---|---|
| Repository | `aramseo/family-log` |
| Production branch | `main` |
| Framework preset | **SvelteKit** |
| Build command | `npm run build` |
| Build output directory | `.svelte-kit/cloudflare` |
| Root directory | `/` |

**Environment variables (Production)** — Firebase 값들 입력:
```
VITE_FIREBASE_API_KEY              = [값]
VITE_FIREBASE_AUTH_DOMAIN          = [값]
VITE_FIREBASE_PROJECT_ID           = [값]
VITE_FIREBASE_STORAGE_BUCKET       = [값]
VITE_FIREBASE_MESSAGING_SENDER_ID  = [값]
VITE_FIREBASE_APP_ID               = [값]
```

**Save and Deploy** → 2~3분 후 `https://family-log.pages.dev` 접속 가능.

이후 main에 푸시할 때마다 자동 재배포, PR마다 preview URL 생성.

---

## PART 5 — CLAUDE.md 전문 (새 repo 루트에 저장)

```markdown
# Family Log — Project Guide for AI Agents

## 프로젝트 개요

**Family Log**는 가족·친구·부부·여행 등 소규모 그룹이 "이야기방(Room)"을
만들고 **사진·캘린더·지도·채팅 등 모듈 기반 콘텐츠**를 공유하는 PWA.

### 핵심 개념
| 용어 | 설명 |
|---|---|
| User | 로그인한 개인 |
| Room | 멤버가 모이는 공간 |
| Template | Room의 모듈 프리셋 |
| Module | Room 내부 기능 단위 |
| Post | 콘텐츠 1건 (사진·메모·장소) |
| Cross-post | 같은 Post를 여러 Room에 공유, 댓글은 Room별 독립 |

---

## 기술 스택

### 프론트엔드
- SvelteKit (SSR/CSR 혼합, 파일 기반 라우팅)
- TypeScript (strict mode)
- Tailwind CSS + CSS 변수
- Svelte stores
- @sveltejs/adapter-cloudflare
- PWA (vite-pwa)
- Capacitor 7 (Phase 6)

### 백엔드 (Firebase)
- Auth: Firebase Authentication
- DB: Firestore (Realtime DB 미사용)
- Storage: Firebase Storage (추후 Cloudflare R2 마이그레이션 고려)
- Functions: Cloud Functions (TTL 정리, 푸시)
- Push: FCM
- Hosting: Cloudflare Pages

### 개발 도구
- ESLint + Prettier
- Vitest + Playwright
- GitHub Actions → Cloudflare Pages
- Firebase Emulator Suite (로컬 개발)

---

## 데이터 모델 (Firestore)

\`\`\`
users/{uid}
  profile: { displayName, photoURL, email }
  rooms: [{ roomId, role, joinedAt, pinnedAt? }]
  settings: { theme, notifications }
  createdAt, updatedAt

rooms/{roomId}
  meta: {
    name, ownerUid, template,
    visibility: 'private' | 'public' | 'invite-only',
    coverPhoto?, description?,
    createdAt, archivedAt?
  }
  modules: [{ type, order, config, visible }]

  /members/{uid}
    role: 'owner' | 'editor' | 'member' | 'guest'
    joinedAt, invitedBy

posts/{postId}
  authorUid
  photos: [{ url, w, h, thumbUrl }]
  memo, place, date, time
  originalRoomId
  createdAt, updatedAt

room_feed/{roomId}/{postId}
  addedAt, addedBy, pinned?

comments/{roomId}/{postId}/{commentId}
  authorUid, text, createdAt, replyTo?

events/{roomId}/{eventId}
  title, date, allDay, location?, attendees[]

trash/{uid}/{itemId}
  originalPath, snapshot, deletedAt
  # Cloud Function이 deletedAt + 7일 초과 시 자동 삭제
\`\`\`

---

## 보안 규칙 원칙

1. 본인 데이터만 수정/삭제 (ownerUid == auth.uid)
2. Room 읽기: 멤버 or public
3. Room 쓰기: editor 이상
4. 방장 전용: members 관리, modules 구성, visibility
5. Cross-post 대상 Room에 추가 시 그 Room의 editor+ 권한 필요
6. 댓글: 작성자 본인 or 방장만 삭제

---

## 코딩 컨벤션

- 파일명: kebab-case (room-settings.svelte)
- 컴포넌트: PascalCase (<RoomCard />)
- 타입: I 프리픽스 X (Room, Post, User)
- 에러 핸들링: 경계에서 try/catch, 내부는 throw
- 주석: "왜"만. "무엇"은 네이밍으로
- 커밋: Conventional Commits
- 금지: 모놀리식 파일, 미사용 import, 데드코드 주석

---

## 모듈 카탈로그

| ID | 이름 | 컬렉션 | Phase |
|---|---|---|---|
| diary | 사진 그리드 | posts | 1 |
| calendar | 캘린더 | events | 2 |
| map | 지도 | places | 3 |
| chat | 채팅 | messages | 3 |
| budget | 예산 | expenses | 4 |
| checklist | 체크리스트 | todos | 4 |
| poll | 투표 | polls | 5 |
| wishlist | 위시리스트 | wishes | 5 |
| notice | 공지 | notices | 5 |

## 템플릿 프리셋

| 템플릿 | 모듈 |
|---|---|
| 여행 | diary + calendar + map + budget + checklist |
| 가족 | diary + calendar + chat + notice |
| 친구 | diary + chat + poll + map |
| 부부 | diary + calendar + wishlist + budget |
| 커스텀 | 방장이 직접 구성 |

---

## 로드맵

### Phase 0 — 셋업 (1주)
- GitHub repo + Cloudflare Pages
- SvelteKit + Firebase + Tailwind 초기화
- CI/CD, 린트/테스트 환경

### Phase 1 — Auth + 1방 (2주)
- Google 로그인
- 사용자당 기본 Room 자동 생성
- Diary 모듈 (phuquoc 핵심 기능 이식)
- Firestore Security Rules 기본

### Phase 2 — 멀티룸 + 초대 (3주)
- Room CRUD
- 초대 링크 (48h TTL)
- 멤버 권한 (owner/editor/member/guest)
- 휴지통 + TTL Cloud Function

### Phase 3 — 모듈 시스템 (3주)
- 모듈 추상화 계층
- Calendar, Map 모듈
- 방장의 모듈 관리

### Phase 4 — Cross-post (2주)
- Post 다중 Room 공유
- Room-scoped 댓글
- 원본 작성자 통합 댓글 뷰

### Phase 5 — Kakao/Apple + 푸시 (2주)
- Kakao Custom Token (Cloud Function)
- Apple Sign-In
- FCM 푸시 알림

### Phase 6 — 네이티브 앱 (2주)
- Capacitor 설정
- Android Play Store 먼저
- iOS App Store (Apple Developer 이후)

---

## 로컬 개발

\`\`\`bash
npm install
npm run dev                 # SvelteKit dev (localhost:5173)
firebase emulators:start    # Firestore/Auth 에뮬레이터
\`\`\`

.env.local에 VITE_USE_EMULATOR=true 설정 시 에뮬레이터 사용.

---

## 참고 링크

- 이전 MVP: https://github.com/aramseo/phuquoc
- SvelteKit: https://kit.svelte.dev
- Firebase Web SDK: https://firebase.google.com/docs/web/setup
- Cloudflare Pages + SvelteKit: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/
- Capacitor: https://capacitorjs.com/docs

---

## AI Agent 작업 지침

1. SvelteKit 관례 준수 (+page.svelte, +layout.svelte, +page.server.ts)
2. Firestore 비용 의식: 불필요한 onSnapshot 지양, 페이지네이션
3. Security Rules는 코드: 기능 추가 시 firestore.rules 동시 업데이트
4. 타입 먼저: 새 기능 전 types.ts에 모델 정의
5. 각 Phase 완료 시 PR: main 직접 푸시 X, feature 브랜치 → PR → 머지
6. phuquoc 참고: UI/UX는 phuquoc에서, 구조는 새로 설계
```

---

## PART 6 — 빠른 참조

### .env.example 내용
```bash
# Firebase (Firebase 콘솔 → 프로젝트 설정에서 복사)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# 로컬 에뮬레이터
VITE_USE_EMULATOR=false
```

### 권장 디렉토리 구조
```
family-log/
├── .github/workflows/deploy.yml
├── src/
│   ├── app.html
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   ├── stores/
│   │   ├── types.ts
│   │   ├── modules/         # 모듈별 코드
│   │   └── components/      # 공통 UI
│   └── routes/
│       ├── +layout.svelte
│       ├── +page.svelte
│       ├── rooms/
│       │   ├── +page.svelte
│       │   └── [roomId]/+page.svelte
│       └── login/+page.svelte
├── static/
│   ├── manifest.json
│   └── icons/
├── firestore.rules
├── firebase.json
├── CLAUDE.md
├── README.md
├── .env.example
├── .gitignore
├── package.json
├── svelte.config.js
├── tsconfig.json
└── tailwind.config.cjs
```

### npm 명령어
```bash
npm run dev         # 개발 서버
npm run build       # 프로덕션 빌드
npm run preview     # 빌드 결과 미리보기
npm run check       # svelte-check (타입)
npm run lint        # ESLint
npm run format      # Prettier
npm run test        # Vitest
npm run test:e2e    # Playwright
```

---

## PART 7 — 전체 체크리스트 (순서대로)

### 웹 (브라우저)
- [ ] GitHub repo `family-log` 생성 (Private, 초기화 X)
- [ ] Firebase 프로젝트 `family-log` 생성
- [ ] Firebase → Authentication → Google 활성화
- [ ] Firebase → Firestore (서울, 프로덕션)
- [ ] Firebase → Storage
- [ ] Firebase → 웹 앱 등록 → firebaseConfig 복사 보관
- [ ] Cloudflare 계정 생성

### 로컬 터미널
- [ ] `git clone https://github.com/aramseo/family-log.git`
- [ ] `cd family-log`
- [ ] `claude` (새 세션)

### 새 Claude 세션 (PART 3 프롬프트 붙여넣기)
- [ ] SvelteKit + Firebase + Tailwind 초기화 완료
- [ ] `.env.local`에 Firebase config 값 입력
- [ ] `npm run dev` → localhost:5173 동작 확인
- [ ] 초기 커밋 + push

### 웹 다시 (배포)
- [ ] Cloudflare Pages → Connect to Git → family-log
- [ ] Framework: SvelteKit, Build: `npm run build`, Output: `.svelte-kit/cloudflare`
- [ ] Environment variables에 VITE_FIREBASE_* 입력
- [ ] Save and Deploy
- [ ] `family-log.pages.dev` 접속 → Google 로그인 확인

### 완료 후
- [ ] phuquoc 세션에 "Phase 0 완료" 알림 → 이후 설계 논의
- [ ] 새 세션에 Phase 1 작업 요청 (Google 로그인 + 기본 Room + Diary 모듈)

---

## 비용 예상 (가족 단위, 1년)

| 항목 | 비용 | 비고 |
|---|---|---|
| Apple Developer | $99/년 | iOS 스토어 배포 시 |
| Google Play | $25 1회 | Android 스토어 배포 시 |
| Firebase Blaze | ~$0-10/월 | Cloud Functions 쓰려면 필수. 사용량 적으면 거의 무료 |
| Cloudflare Pages | $0 | Private repo 지원 |
| Cloudflare R2 | $0-2/월 | Phase 5+에서 이전 시 |
| **합계** | **약 $200/년** | iOS 제외 시 $60 |

---

## 자주 묻는 질문

### Q1. phuquoc을 바로 Family Log로 리팩토링하면 안 되나?
A. 스택 차이가 너무 큼. phuquoc은 안정 MVP로 유지, family-log는 처음부터 TypeScript + SvelteKit 구조로 새로 시작이 더 빠르고 안전함.

### Q2. Firebase 무료 플랜(Spark)로 시작하면 안 되나?
A. 가족 5명 수준이면 Spark로도 가능하지만, **Cloud Functions(휴지통 TTL, 푸시)는 Blaze 필수**. 예산 알림 $5 걸어두면 안전.

### Q3. Kakao 로그인 설정이 왜 까다로운가?
A. Firebase가 Kakao를 직접 지원하지 않아 **Cloud Function + Custom Token**으로 우회해야 함. Phase 5에서 도입 권장.

### Q4. Cross-post 설계 시 주의점?
A. posts와 room_feed를 분리해야 데이터 안 꼬임. posts는 원본 1개, room_feed는 노출용 인덱스 (M:N).

### Q5. Firebase → R2 마이그레이션 시점?
A. Storage 트래픽이 월 $5 넘을 때. 소규모(가족 수십 명)에선 Firebase Storage로 충분.
