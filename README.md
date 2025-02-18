시작하기

npm install

먼저, 개발 서버를 실행하려면 다음 명령어를 사용하세요

npm run dev

명령어를 실행한 후, 브라우저에서 http://localhost:3000을 열어 결과를 확인할 수 있습니다.

app/page.tsx 파일을 수정하여 페이지를 편집할 수 있으며, 수정하면 페이지가 자동으로 업데이트됩니다.

주요 설정 파일
.eslintrc.json: ESLint 설정 파일로, 코드 품질과 일관성을 유지하기 위한 규칙이 정의되어 있습니다.
jest.config.ts: Jest 테스트 프레임워크의 설정 파일입니다.
next.config.mjs: Next.js의 설정 파일로, 커스텀 설정을 추가하거나 수정할 수 있습니다.
postcss.config.mjs: PostCSS 설정 파일로, CSS 변환을 위한 플러그인 설정이 포함되어 있습니다.
tailwind.config.ts: Tailwind CSS의 설정 파일로, 커스텀 디자인 시스템을 정의할 수 있습니다.
tsconfig.json: TypeScript 설정 파일로, 컴파일러 옵션과 경로 별칭 등이 정의되어 있습니다.
Husky를 통한 Git Hooks 설정
프로젝트에는 Husky가 포함되어 있어 Git hooks를 관리합니다. .husky 디렉토리 내에 정의된 스크립트는 커밋이나 푸시 등의 Git 이벤트 시 자동으로 실행됩니다.

테스트
**tests**/mock-api 디렉토리에는 테스트를 위한 모의 API가 포함되어 있습니다. Jest를 사용하여 테스트를 실행할 수 있으며, 설정은 jest.config.ts 파일에서 확인할 수 있습니다.

추가 정보
Next.js에 대한 자세한 내용은 Next.js 공식 문서를 참고하세요.

이 프로젝트는 최신 웹 개발 기술과 도구를 활용하여 효율적인 개발 환경을 제공합니다.
