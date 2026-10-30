# 한국어 학습 앱

일반 한국어의 어휘·리스닝·문법·표현을 짧은 퀴즈와 복습으로 익히는 모바일 앱 프로젝트입니다.

## 문서와 디자인

- docs/product-plan-v2.md: 현재 제품 기획안
- docs/legacy-topik-design-brief.md: 이전 TOPIK 기획 참고용. 현재 구현 기준이 아닙니다.
- design/references/: 사용자가 제공한 학습 화면 참고 자료. 제품 배포용 자산이 아닙니다.
- design/: 생성 UI 시안과 구현 연결 명세를 보관합니다.

## 첫 구현 목표

학습 영역 선택 → 샘플 문제 풀이 → 정답·해설 → 결과 확인.
어휘·리스닝·문법·표현을 지원하고 실전 회화와 발음 평가는 제외합니다.
캐릭터는 V1 호랑이, 체험판의 해설 언어는 영어입니다. 현재 구현은 React·TypeScript·Vite 기반 모바일 웹 프로토타입입니다.

## 최신 디자인 결정

V1 호랑이와 크림·살구색 카드, 주황색 아이콘을 사용합니다. 주요 버튼은 사용자 선택에 따라 더스티 블루 #526F91로 변경했습니다. 카드 형태와 눌림 효과는 유지합니다. 상세 구현 원칙은 AGENTS.md에 기록했습니다.

## 실행

Git과 Node.js 24 LTS를 설치합니다. 현재 앱 코드는 `codex/app-prototype` 브랜치에 있습니다. 아래 명령을 터미널에서 순서대로 실행합니다.

```sh
git clone --branch codex/app-prototype https://github.com/tcodms/korean-learning-app.git
cd korean-learning-app/app
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

브라우저에서 http://localhost:4173/ 를 엽니다. 우측 위 선택 메뉴에서 iPhone / Pixel 10 미리보기를 바꿀 수 있습니다. Android Studio나 Xcode 없이 브라우저에서 실행하는 모바일 웹 미리보기이며, 앱스토어 설치용 네이티브 앱은 아직 아닙니다. 개발 서버를 실행한 터미널을 유지해야 하며 종료는 Ctrl+C입니다. 4173 포트가 사용 중이면 명령의 포트를 4174로 바꾸고 http://localhost:4174/ 를 엽니다.

이미 내려받았다면 저장소 폴더에서 `git switch codex/app-prototype`, `git pull --ff-only`를 실행한 뒤 `app` 폴더에서 `npm ci`, 위 개발 서버 명령을 실행합니다. 학습 기록은 각자의 브라우저에 따로 저장되며 별도 DB나 API 키는 필요 없습니다.

## 구현된 체험 흐름

- 홈 → 영역/상황 선택 → 입력·선택·문장 배열 → 채점·힌트·해설 → 결과
- 어휘·리스닝·문법·표현 각각 5문항, 총 20문항
- 오답/힌트 사용 문제 복습, 북마크, 영역별 풀이 수와 주간 기록
- 브라우저 내 기록 저장, 하루 목표 설정, 기기 한국어 TTS와 대본

샘플은 이 프로젝트에서 직접 작성했습니다. 공식 TOPIK 문제나 사전 데이터를 가져오지 않았으며 교육 검수는 아직 필요합니다. 녹음·회화·발음 평가, 로그인·서버 동기화, 간격 반복 알고리즘은 구현하지 않았습니다. TTS 품질과 한국어 음성 제공 여부는 기기에 따라 다릅니다.

## 검증

```sh
cd app
npm run check:runtime
node --test tests/content.test.mjs
npm run build
```

실제 브라우저 검증과 승인 시안 비교는 `design-qa.md`, 캡처는 `docs/qa/`에 기록했습니다. 호랑이 일러스트는 프로젝트용으로 생성한 개별 자산이며 UI는 실제 컴포넌트로 구현했습니다.
