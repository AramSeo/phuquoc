# 푸꾸옥 여행 플랜 PWA

## 📱 폰에 앱처럼 설치하는 법

### 방법 1: GitHub Pages (추천 — 5분)
1. github.com 에서 새 repository 만들기 (이름: `phuquoc`)
2. 이 폴더의 파일 4개 전부 업로드 (index.html, manifest.json, sw.js, icon-192.png, icon-512.png)
3. Settings → Pages → Source: main branch → Save
4. 1분 후 `https://내아이디.github.io/phuquoc/` 에서 접속 가능
5. 폰 브라우저에서 해당 URL 접속 → "홈 화면에 추가"

### 방법 2: Netlify (드래그 앤 드롭 — 2분)
1. app.netlify.com 접속 → 로그인
2. 이 폴더를 통째로 드래그 앤 드롭
3. 자동으로 URL 생성됨
4. 폰에서 접속 → "홈 화면에 추가"

### 방법 3: 그냥 HTML 파일로 보기
- index.html을 폰으로 전송 (카톡, 에어드롭 등)
- 브라우저에서 열기
- ※ 오프라인 캐시는 안 되지만 내용은 다 볼 수 있음

## 📂 파일 구성
- `index.html` — 메인 페이지
- `manifest.json` — PWA 설정 (앱 이름, 아이콘, 테마색)
- `sw.js` — Service Worker (오프라인 캐싱)
- `icon-192.png` — 홈 화면 아이콘
- `icon-512.png` — 스플래시 스크린 아이콘

## ✨ PWA 기능
- 홈 화면에 아이콘으로 추가 → 앱처럼 열기
- 오프라인에서도 작동 (비행기 안, 데이터 없을 때)
- 주소창 없이 풀스크린
- 오프라인 상태 표시 바
