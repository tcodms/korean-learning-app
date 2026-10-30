# MAL UI 협업 안내

이 문서는 `mal-ui`의 현재 코드 구조를 기준으로 합니다. 현재 목표는 UI 시안과 클릭 흐름이며 DB·실제 음성·학습 기록 저장은 범위에 포함하지 않습니다.

## 담당 폴더

| 담당 | 수정 구역 | 내용 |
| --- | --- | --- |
| 전체 흐름 담당 | `app/src/Prototype.tsx`, `app/src/screens/` | 초기 설정, 홈, 코스 안내, 레슨 목록, 결과, 복습 목록, 기록, 설정과 화면 연결 |
| 수업 담당 | `app/src/lessons/` | 어휘·듣기·문법·표현 수업, 입력, 힌트, 해설, 수업 전용 CSS·샘플 |
| 전체 흐름 담당이 관리 | `app/src/shared/`, `app/src/prototype.css` | 공통 버튼·진행률·캐릭터·탭, 색상·폰트·기본 스타일, 공통 타입 |
| 기존 런타임 유지 | `app/src/mobile/` 등 `app/AGENTS.md`의 보호 파일 | 기기 프레임·키보드·상태 표시줄 |

공통 UI 변경이 필요하면 담당자에게 변경을 전달하거나 별도 PR로 검토합니다. 수업에서 `screens/`나 `Prototype.tsx`를 직접 가져오지 않습니다.

## 실제 구조

```text
app/src/
├─ Prototype.tsx                    전체 화면 연결과 샘플 안내 패널
├─ prototype.css                    폰트·공통 스타일 진입점
├─ screens/
│  ├─ onboarding/
│  │  ├─ DailySkillsScreen.tsx       기존 영역 선택 시안
│  │  └─ DailySkillsScreen.css
│  ├─ today/
│  │  ├─ TodayScreen.tsx             기존 홈 시안
│  │  └─ TodayScreen.css
│  ├─ learn/                        레슨 목록·소개 작업 공간
│  ├─ result/                       결과 작업 공간
│  ├─ review/                       복습 목록 작업 공간
│  ├─ progress/                     통계·캘린더 작업 공간
│  └─ settings/                     설정 작업 공간
├─ lessons/
│  ├─ LessonPreview.tsx              수업 진입점·수업 내부 샘플 상태
│  ├─ LessonPreview.css
│  ├─ vocabulary/                    기존 어휘 선택 시안·CSS·샘플
│  ├─ listening/                     기존 카드 배열 시안·CSS·샘플
│  ├─ grammar/                       문법 교체용 시작 파일·CSS
│  ├─ expressions/                   표현 교체용 시작 파일·CSS
│  └─ components/
│     ├─ LessonHeader.tsx
│     ├─ ChoiceAnswers.tsx
│     ├─ WordCards.tsx
│     ├─ AnswerInput.tsx
│     ├─ AudioControls.tsx
│     └─ FeedbackPanel.tsx
└─ shared/
   ├─ components/                   Action·Meter·Mascot·BottomNavigation
   ├─ data/skills.ts                4영역 표시 정보·샘플 진도
   ├─ styles/                      tokens.css·base.css
   └─ types/learning.ts             Skill·화면·수업 연결 타입
```

예약한 화면 폴더에는 README만 있습니다. 화면이 구현된 것으로 세지 않습니다. 문법·표현의 시작 파일은 기존 어휘 샘플을 임시 재사용합니다. 팀원이 각 파일의 내용과 샘플을 해당 영역 UI로 교체하면 됩니다. 기존 수업의 입력·해설은 화면 상태 예시이며 교육용 채점 기능이 아닙니다.

각 화면의 TSX·CSS·샘플 파일은 같은 폴더에 둡니다. 색상은 `shared/styles/tokens.css`의 변수를 사용합니다. 새 공통 요소는 `shared/components/`, 수업에서만 쓰는 요소는 `lessons/components/`에 둡니다. 입력은 기존 런타임의 `KeyboardInput` 또는 `KeyboardTextarea`를 사용합니다.

## 수업과 전체 흐름 연결

`shared/types/learning.ts`에 연결 형식을 정의했습니다.

```tsx
<LessonPreview
  area="vocabulary"
  onExit={() => go('today')}
  onComplete={() => go('today')}
/>
```

- `area`: `vocabulary`, `listening`, `grammar`, `expressions`
- `onExit`: 수업을 닫을 때 호출합니다.
- `onComplete`: 수업 시안을 마쳤을 때 호출합니다. 현재 홈으로 복귀하며 추후 전체 흐름 담당자가 결과 화면에 연결합니다.

수업 담당자는 문제·카드·힌트·해설을 `lessons/` 안에서 바꿉니다. 전체 흐름 담당자는 수업의 내부 상태를 직접 관리하지 않습니다. 콜백에 결과 데이터를 추가하려면 공통 타입 변경을 먼저 합의합니다. 현재 선택·입력은 임시 React 상태로만 유지됩니다.

## 브랜치별 시작

전체 흐름 담당:

```sh
git fetch origin
git switch ui/home-flow
git pull --ff-only
```

수업 담당:

```sh
git fetch origin
git switch ui/lessons
git pull --ff-only
```

각자의 로컬 저장소에서 실행합니다. 아직 복제하지 않았다면 README의 clone·실행 안내를 먼저 따릅니다. 변경은 담당 브랜치로 push하고 GitHub에서 `mal-ui`를 대상으로 PR을 만듭니다. 한 묶음이 합쳐지면 다른 담당자는 최신 `origin/mal-ui`를 자신의 브랜치에 merge한 뒤 다음 작업을 진행합니다. 공유 브랜치는 force push하지 않습니다.

## 첫 합치기 범위

1. 전체 흐름: 영역 선택 → 홈 → 코스 안내
2. 수업: 어휘 선택 문제 → 힌트 → 샘플 정답·오답 해설 → 완료 콜백
3. 연결: 수업 완료 콜백 → 결과 화면

브라우저에서 이 흐름을 확인하고 나머지 영역으로 확장합니다. CSS 분리 후에도 화면 모양을 유지해야 하며 두 담당자 모두 PR 전 `npm run check:runtime`, `npm run build`와 담당 화면 클릭 확인을 진행합니다.
