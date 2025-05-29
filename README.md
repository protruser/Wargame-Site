# wargame-site

# 🛠️ Git Workflow Guide

## 📂 Branch Naming Convention

```
[type]/[issue-number]-[short-description]
```

예시:
- `feature/1-intro-layout`
- `bugfix/21-card-image-align`

> `type`에는 다음과 같은 값을 사용하세요:
> - `feature`: 새로운 기능
> - `bugfix`: 버그 수정
> - `hotfix`: 긴급 수정
> - `chore`: 기타 잡일
> - `refactor`: 코드 리팩터링
> - `docs`: 문서 관련

---

## ✅ Commit Message Convention

```
[#issue-number] [Type]: Summary
```

예시:
- `[ #2 ] UI: Build layout for Intro section`
- `[ #16 ] SEO: Add Open Graph meta tags`

> `Type`에는 다음과 같은 범주가 사용될 수 있습니다:
> - `UI`, `Logic`, `SEO`, `Docs`, `Refactor`, `Fix`, `Test` 등

---

## 🚀 Pull Request Naming

```
[#issue-number] 작업 요약
```

예시:
- `[ #1 ] Build Home Page`
- `[ #2 ] Build Intro Section Layout`

> PR 설명에는 다음 내용을 포함해주세요:
> - 작업한 내용 요약
> - 관련된 이슈 번호 (`Closes #issue-number`)
> - 스크린샷 (UI 작업일 경우)

---

## 🖥️ 개발 서버 시작하기

```bash
pnpm install     # 의존성 설치
pnpm dev         # 개발 서버 실행
```

> 💡 `pnpm`이 설치되지 않았다면:
> ```bash
> npm install -g pnpm
> ```

---

## 📌 Tip

- 커밋 메시지와 브랜치 이름은 **일관성 있게 유지**하세요.
- PR에서는 반드시 **리뷰어 지정**과 **라벨 추가**를 해주세요.
- main 또는 dev 브랜치에 직접 push 하지 않습니다. PR을 통해 머지하세요.

---

🧡 협업을 원활하게 하기 위해 모두 동일한 규칙을 따라주세요!
