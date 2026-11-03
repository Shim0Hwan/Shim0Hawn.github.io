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
| 본문 | 16px, 보조 14px, 메타 12px |
| 제목 | 부제 24px, 섹션 32–48px, 프로젝트 40–88px, 큰 제목 56–144px |
| 간격 | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px |
| 모서리 | 8 / 16 / 24 / 32px |

모바일에서는 큰 제목과 패널 여백을 낮춥니다. 색상은 밝은 회색 배경, 흰색 콘텐츠 영역, 검정 강조 영역으로 구분합니다.

## 레이아웃 참고

- [Matthew Personal Portfolio](https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation): 큰 타이포그래피, 중립색, 둥근 패널, 검정·흰색 대비.
- [shadcn.io Hero Minimal](https://www.shadcn.io/blocks/hero-minimal): 단순한 소개와 대표 작업.
- [shadcn.io Gallery with Caption](https://www.shadcn.io/blocks/gallery-with-caption): 이미지와 짧은 설명을 교차 배치하는 작품 목록.
- [shadcn.io Gallery Categorized Tabs](https://www.shadcn.io/blocks/gallery-categorized-tabs): 왼쪽 탐색 영역과 오른쪽 콘텐츠의 구성. 프로젝트를 모두 볼 수 있는 앵커 탐색으로 적용.
- [Magic UI Blur Fade](https://magicui.design/docs/components/blur-fade): 제목과 작품의 절제된 등장 모션.

공개된 레이아웃을 참고해 직접 구현했으며 유료 블록 코드와 참고 작가의 이미지·작업물은 사용하지 않았습니다.

## 검증과 배포

`npm run check`는 작품 순서, 제외한 작품, 기존 상세 주소, 미디어 참조와 TA 기능별 앵커를 검사합니다. `npm run build`는 TypeScript 검사와 모든 HTML 진입점의 빌드를 수행합니다.

배포 시 `dist/`의 내용을 사이트 저장소 루트에, 편집 소스를 `source/`에 반영합니다. GitHub Pages는 기존 `main` 루트 배포를 유지합니다. 로컬 관리용 `CONTENT-SOURCES.md`, 원본 자료, 게임 프로젝트와 백업은 업로드하지 않습니다.

Chrome에서 18개 페이지를 320px·768px로 검사하고, PC·390px 모바일 화면 및 이미지 확대·Escape 닫기·기능별 이동·컨테이너 영상 재생을 확인했습니다. 실제 모바일 기기와 다른 브라우저는 검사하지 않았습니다.

`npm audit --omit=dev`는 경고 0건입니다. 전체 검사에는 shadcn CLI의 간접 의존성 경고 6건(낮음 2, 중간 4)이 남아 있습니다. 해당 CLI는 개발 의존성이며 공개 사이트에 포함하지 않습니다. 호환성을 깨는 강제 다운그레이드는 적용하지 않았습니다.
