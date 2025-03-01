# LOCO Frontend

지도 기반 장소 공유 서비스 **LOCO** 의 프런트엔드 레포지터리 입니다.

</br>

## 설치

1. 레포지터리 클론, 패키지 설치

   ```bash
   git clone https://github.com/loco-local-collection/frontend.git
   cd frontend
   npm install
   ```

2. `.env.local` 파일 생성

   ```bash
   cp .env.example .env.local
   ```

</br>

## 구조

```
src
├── components/          # UI 컴포넌트
├── libs/                # 유틸리티 및 API
├── hooks/               # 커스텀 훅
├── store/               # Zustand 상태 관리
├── effect/              # API 호출 및 부수 효과
├── styles/              # 스타일 관리
└── tests/               # 테스트 코드
```
