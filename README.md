# MAL — Korean, a little every day.

React · TypeScript · Vite 기반 모바일 웹 UI 미리보기입니다. 디자인 브랜치는 `mal-ui`입니다.

## 현재 화면

- Today: 샘플 학습량, 일일 계획, 영역 바로가기, 캐릭터 인사 반응
- Daily skills: 단어·듣기·문법·표현 복수 선택, 선택·비활성 상태
- Lesson: 단어 선택과 듣기 카드 배열 시안, 힌트·직접 입력·샘플 해설

버튼 눌림, 화면 전환, 캐릭터 포즈, 재생 버튼 애니메이션을 확인할 수 있습니다. 모든 수치는 샘플이며 새로고침하면 선택 상태가 초기화됩니다. 실제 음성, 채점, 학습 기록 저장, DB·백엔드는 연결하지 않았습니다. Review와 Progress는 간단한 샘플 패널입니다.

## 실행

Node.js 24 LTS와 Git을 설치한 후 실행합니다.

```sh
git clone --branch mal-ui https://github.com/tcodms/korean-learning-app.git
cd korean-learning-app/app
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

브라우저에서 http://localhost:4173/ 를 엽니다. 화면 바깥 메뉴에서 세 화면을 바로 전환하고 우측 메뉴에서 iPhone·Pixel을 선택할 수 있습니다. 브라우저 속 기기 프레임이며 네이티브 에뮬레이터는 아닙니다.

## 디자인과 검증

기준 이미지: `design/mal-home-reference.png`. 생성 캐릭터: `app/public/assets/mal/`. 검증: `design-qa.md`, 화면 캡처: `docs/qa/mal-ui/`.

```sh
cd app
npm run check:runtime
npm run build
```

이전 호랑이 버전은 Git 이력에 보관되어 있습니다. 기존 기획 문서는 참고 자료이며 이 브랜치에서 기능 구현 완료를 의미하지 않습니다.
