# github_blog
깃헙 정적 페이지 블로그 오픈소스

* github에서 fork로 blog를 만들 수 있는 정적 페이지 제공 프로젝트

1. github pages를 활성화 해서 `https://사용자이름.github.io/저장소이름/`라는 URL 생성
2. 바닐라 JS의 fetch로 해당 URL의 `https://사용자이름.github.io/저장소이름/blog/블로그글.md`에서 데이터를 가져와 JSON 형식으로 변환
3. 가져온 markdown을 markup으로 변환해 블로그를 작성
4. 추가 메뉴를 만들고 싶으면 `https://사용자이름.github.io/저장소이름/menu` 폴더에 `사용하고싶은 메뉴 이름.html` 형식으로 저장하면 메뉴로 생성