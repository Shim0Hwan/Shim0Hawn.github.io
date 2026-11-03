# Shim YoungHwan — Portfolio

[공개 사이트](https://shim0hwan.github.io/Shim0Hawn.github.io/) · [저장소](https://github.com/Shim0Hwan/Shim0Hawn.github.io)

Vite, React, TypeScript, Tailwind CSS와 shadcn/ui로 만든 포트폴리오입니다. 배경 모델링은 Bicycle을 시작으로 7개 작업을 소개합니다. Technical Art는 4개 프로젝트 아래에 연출·기능별 상세 내용을 배치합니다. 기존 상세 페이지 주소와 미디어 파일명은 유지합니다.

## 실행

Node.js 22.12 이상을 사용합니다. 이 로컬 작업 폴더에서는 바로 실행할 수 있습니다.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

GitHub 저장소에는 공개용 빌드가 루트에, 편집할 소스가 `source/`에 있습니다. 저장소를 새로 받았다면 미디어를 먼저 복사한 뒤 위 명령을 실행합니다. 미디어는 소스 폴더에서 Git 추적 대상이 아닙니다.

```powershell
Set-Location source
Get-ChildItem -LiteralPath .. -File -Filter 'portfolio-*' | Copy-Item -Destination .
```

## 수정 위치

- `src/content.json`: 프로젝트 순서, 소개, 담당 범위, 이미지·영상, 기능별 앵커.
- `src/App.tsx`: 홈, 분야별 목록, 공통 프로젝트 상세 화면.
- `src/index.css`: Pretendard, 색상, 타이포그래피, 간격, 모서리, 반응형 레이아웃.
- `src/components/ui/`: shadcn Button·Dialog·Separator와 Magic UI BlurFade.
- 루트 HTML 18개: 페이지별 제목·설명과 Vite 진입점.
- `scripts/package-site.mjs`: 기존 미디어와 `.nojekyll`을 빌드에 포함.

이미지에는 원본 비율과 확대 보기를 제공합니다. 영상은 사용자가 직접 재생하며, 모션 줄이기 설정에서는 등장 애니메이션을 끕니다. 프로젝트의 담당 범위, 팀원 기여, AI 활용 표기와 음악 크레딧을 보존합니다.

## 디자인 값

`src/index.css`의 공통 토큰을 수정합니다. 화면별로 임의의 값을 추가하기보다 기존 단계를 사용합니다.

| 종류 | 단계 |
| --- | --- |
| 서체 | Pretendard Variable, 버전 1.3.9 고정 |
| 본문 | 14px, 보조 14px, 메타 12px |
| 제목 | 부제 24px, 섹션 32–48px, 프로젝트 40–88px, 큰 제목 56–144px |
| 간격 | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px |
| 모서리 | 8 / 16 / 24 / 32px, 기본 헤더 16px·내부 버튼 8px, 스크롤 후 32px·24px |
| 아이콘 | Lucide 16px, 선 두께 1.5px, 아이콘 버튼 48px |

모바일에서는 큰 제목과 패널 여백을 낮춥니다. 색상은 밝은 회색 배경, 흰색 콘텐츠 영역, 검정 강조 영역으로 구분합니다.

큰 이름과 제목의 굵기는 기존 디자인을 유지합니다. 큰 제목 자간은 -0.03em, 섹션 제목은 -0.02em이며, 14px 본문과 12px 보조 라벨에는 음수 자간을 사용하지 않습니다. 소개와 이동 버튼은 24px 간격으로 묶어 대표 작품의 중앙에 맞춥니다. 작품 이미지는 호버 시 확대하지 않으며, 각 페이지 제목에만 300ms·8px의 짧은 등장 효과를 적용합니다.

헤더는 로고 없이 Home·배경 모델러·Technical Art·About과 Contact를 제공합니다. 스크롤 전에는 바깥 모서리 16px·내부 버튼 8px·여백 8px로 맞춘 반투명 패널을 표시합니다. 70% 흰색 배경·24px 블러·얇은 테두리를 사용하며, 검은 배경 그라데이션 없이 점 패턴이 양옆과 아래로 사라집니다. 32px 넘게 스크롤하면 패턴이 사라지고 300ms 동안 바깥 32px·내부 버튼 24px의 흰색 캡슐로 모이며 상단 12px에 고정됩니다. 전환 값은 `src/App.tsx`의 `headerMotion`, 높이·상단 여백·유리 효과는 CSS 토큰으로 관리합니다. 모션 줄이기 설정에서는 전환을 즉시 적용하며, 배경 블러를 지원하지 않는 브라우저에서는 불투명 배경을 사용합니다.

## 레이아웃 참고

- [Matthew Personal Portfolio](https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation): 큰 타이포그래피, 중립색, 둥근 패널, 검정·흰색 대비.
- [shadcn.io Animated Underline Navbar](https://www.shadcn.io/blocks/navbar-animated-underline): 넓은 기본 헤더와 hover·키보드 포커스 밑줄. 현재 페이지는 밑줄을 유지.
- [shadcn.io Glassmorphism Navbar](https://www.shadcn.io/blocks/navbar-glassmorphism): 스크롤 전 반투명 사각 패널·블러·얇은 테두리·옅은 점 패턴의 시각 구성을 참고. 배경 패턴은 정적으로 표현.
- [shadcn.io Floating Pill Navbar](https://www.shadcn.io/blocks/navbar-floating-pill): 스크롤 후 메뉴 폭에 맞춘 중앙 캡슐과 내부 연락 버튼. 기존 Motion의 레이아웃 애니메이션으로 글자 크기를 유지하며 전환. 모바일 메뉴는 shadcn Dialog 하단 패널로 구성.
- [shadcn.io Hero Minimal](https://www.shadcn.io/blocks/hero-minimal): 단순한 소개와 대표 작업.
- [shadcn.io Gallery with Caption](https://www.shadcn.io/blocks/gallery-with-caption): 이미지와 짧은 설명을 교차 배치하는 작품 목록.
- [shadcn.io Gallery Categorized Tabs](https://www.shadcn.io/blocks/gallery-categorized-tabs): 왼쪽 탐색 영역과 오른쪽 콘텐츠의 구성. 프로젝트를 모두 볼 수 있는 앵커 탐색으로 적용.
- [Magic UI Blur Fade](https://magicui.design/docs/components/blur-fade): 페이지 제목의 짧은 등장 모션.
- [Unslop by Damir Sokolovsky (@heydamir)](https://heydamir.design/unslop), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): 간격·아이콘·보조 문구·자간·모션 점검에 사용. 큰 제목의 굵기는 사용자 선택에 따라 유지.

공개된 레이아웃을 참고해 직접 구현했으며 유료 블록 코드와 참고 작가의 이미지·작업물은 사용하지 않았습니다.

## 검증과 배포

`npm run check`는 작품 순서, 제외한 작품, 기존 상세 주소, 미디어 참조와 TA 기능별 앵커를 검사합니다. `npm run build`는 TypeScript 검사와 모든 HTML 진입점의 빌드를 수행합니다.

배포 시 `dist/`의 내용을 사이트 저장소 루트에, 편집 소스를 `source/`에 반영합니다. GitHub Pages는 기존 `main` 루트 배포를 유지합니다. 로컬 관리용 `CONTENT-SOURCES.md`, 원본 자료, 게임 프로젝트와 백업은 업로드하지 않습니다.

Chrome에서 18개 페이지를 320px·768px로 검사하고, PC·390px 모바일 화면 및 이미지 확대·Escape 닫기·기능별 이동·컨테이너 영상 재생을 확인했습니다. 실제 모바일 기기와 다른 브라우저는 검사하지 않았습니다.

스크롤 헤더는 320·390·768·769·1440px에서 확인했습니다. 모핑 중간 프레임의 글자 폭과 본문 위치가 유지되며, 밑줄 포커스·sticky 위치·모바일 메뉴·Escape 복귀·About 이동·상세 앵커와 목차의 가림 여부를 확인했습니다. 본문 기본 크기는 14px입니다.

`npm audit --omit=dev`는 경고 0건입니다. 전체 검사에는 shadcn CLI의 간접 의존성 경고 6건(낮음 2, 중간 4)이 남아 있습니다. 해당 CLI는 개발 의존성이며 공개 사이트에 포함하지 않습니다. 호환성을 깨는 강제 다운그레이드는 적용하지 않았습니다.
