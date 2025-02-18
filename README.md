🚀 프로젝트 시작하기

📦 필수 설치

먼저, 프로젝트의 필수 패키지를 설치합니다:

npm install

💻 개발 서버 실행

개발 서버를 시작하려면 다음 명령어를 입력하세요:

npm run dev

브라우저에서 http://localhost:3000을 열어 결과를 확인할 수 있습니다.

💡 팁: app/page.tsx 파일을 수정하면 페이지가 자동으로 업데이트됩니다.

🛠️ 주요 설정 파일

파일명

설명

.eslintrc.json

코드 품질과 일관성을 유지하기 위한 ESLint 설정 파일.

jest.config.ts

Jest 테스트 프레임워크의 설정 파일.

next.config.mjs

Next.js의 커스텀 설정 파일.

postcss.config.mjs

PostCSS 설정 파일. CSS 변환 플러그인 포함.

tailwind.config.ts

Tailwind CSS 디자인 시스템 설정 파일.

tsconfig.json

TypeScript 컴파일러 옵션 및 경로 별칭 정의.

🪝 Husky를 통한 Git Hooks 관리

프로젝트에는 Husky가 포함되어 있어, Git Hooks를 쉽게 관리할 수 있습니다.

.husky 디렉터리 내 스크립트를 통해 커밋 및 푸시 시 자동으로 검사 및 테스트가 실행됩니다.

🧪 테스트 안내

tests/mock-api/ 디렉터리에는 **모의 API(Mock API)**가 포함되어 있습니다.

Jest를 사용해 테스트를 실행할 수 있습니다.

모든 테스트 설정은 jest.config.ts 파일에서 확인할 수 있습니다.

npm run test

📚 추가 정보

Next.js에 대한 자세한 내용은 Next.js 공식 문서를 참고하세요.

이 프로젝트는 최신 웹 개발 기술과 도구를 활용하여 효율적이고 쾌적한 개발 환경을 제공합니다. 🚀✨
