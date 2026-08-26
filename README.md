# Bigdo11.github.io

개인개(gaeingae) 사업자 홈페이지. 순수 정적 HTML/CSS — 빌드 도구 없음.

배포 주소: **https://bigdo11.github.io**

## 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 회사 소개, 업태, 등록 정보, 문의 |
| `about.html` | 회사 개요, 등록된 사업 분야, 소재지 |
| `contact.html` | 문의처, 주소 |
| `privacy.html` | 개인정보처리방침 |
| `terms.html` | 이용약관 |
| `assets/style.css` | 전체 스타일 (다크모드 포함) |
| `assets/main.js` | 스크롤 진입 애니메이션 |
| `.nojekyll` | GitHub Pages의 Jekyll 처리 비활성화 |

## 배포

GitHub에 `Bigdo11.github.io` 이름으로 **public** 저장소를 만든 뒤:

```bash
git init
git add -A
git commit -m "사업자 홈페이지 초기 배포"
git branch -M main
git remote add origin https://github.com/Bigdo11/Bigdo11.github.io.git
git push -u origin main
```

저장소 **Settings → Pages** 에서 Source를 `Deploy from a branch`, 브랜치를 `main` / `/ (root)` 로 설정.
1~2분 뒤 `https://bigdo11.github.io` 에서 확인.

> 저장소 이름이 `<사용자명>.github.io` 형식이면 GitHub Pages는 호스트명을 **소문자로 정규화**한다.
> 실제 주소는 `bigdo11` (소문자)이다. 아래 인증 절차에서 이 점이 중요하다.

## Google Play 조직 웹사이트 인증 절차

1. **배포 확인** — `https://bigdo11.github.io` 가 정상적으로 열리는지 확인.

2. **Search Console 속성 추가**
   - https://search.google.com/search-console 접속
   - 속성 추가 → **URL 접두어** 선택 (도메인 속성은 `github.io` 에서 불가능)
   - `https://bigdo11.github.io/` 입력 — 반드시 소문자, `https://`, 끝 슬래시 포함

3. **소유권 확인 — HTML 파일 업로드 방식**
   - Search Console이 주는 `google<영숫자>.html` 파일을 내려받아 이 저장소 **루트**에 넣고 커밋/푸시
   ```bash
   git add google*.html
   git commit -m "Search Console 소유권 확인 파일 추가"
   git push
   ```
   - 배포 반영 후(1~2분) Search Console에서 **확인** 클릭

4. **Play Console에서 인증 요청**
   - Play Console → 계정 세부정보 → 조직 웹사이트 URL에 `https://bigdo11.github.io` 입력
   - 인증 요청 전송

5. **요청 승인** — Search Console에 소유자로 등록된 Google 계정으로 요청을 승인

### 주의할 점

- **계정 일치**: Search Console 소유자 계정과 Play 개발자 계정이 다르면 인증 요청이 엉뚱한 계정으로 간다.
  다르다면 Search Console → 설정 → 사용자 및 권한에서 해당 계정을 **소유자**로 추가할 것.
- **URL 일치**: Play Console 입력값과 Search Console 속성 주소가 문자 단위로 같아야 한다.
- **인증 파일을 지우지 말 것**: 소유권 확인 후에도 `google*.html` 파일은 저장소에 남겨둬야 한다.
  삭제하면 소유권이 해제된다.

## 나중에 자체 도메인을 붙일 때

1. 도메인 구입 후 DNS에 다음 A 레코드 추가:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. 저장소 루트에 `CNAME` 파일 생성, 내용은 도메인 한 줄 (예: `gaeingae.com`)
3. Settings → Pages → Custom domain 설정, `Enforce HTTPS` 체크
4. 아래 값들을 새 도메인으로 일괄 치환:
   ```bash
   grep -rl "bigdo11.github.io" . | xargs sed -i 's|bigdo11\.github\.io|새도메인|g'
   ```
5. Search Console에서 새 도메인을 **도메인 속성(DNS 인증)** 으로 다시 등록 — 자체 도메인은 이 방식이 가능하며,
   조직 소유 증명으로서 `github.io` 보다 강하다.

## 정보 수정

문의 이메일을 바꾸려면 전체 치환:

```bash
grep -rl "gaeingae@gmail.com" . | xargs sed -i 's|gaeingae@gmail.com|새이메일|g'
```

사업자 정보는 각 HTML의 `.reg` / `.foot-grid` 블록과 `index.html` 상단 JSON-LD에 들어 있다.

## 로컬 확인

```bash
python -m http.server 8765
```
