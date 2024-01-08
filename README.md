# github_blog
깃헙 정적 페이지 블로그 오픈소스

* blog github repo: https://github.com/paullabkorea/github_blog
* 실행 URL: https://paullabkorea.github.io/github_blog/
* github에서 fork로 blog를 만들 수 있는 정적 페이지 제공 프로젝트
* https://github.blog/category/engineering/ 스타일을 표본으로 제작

1. github pages를 활성화 해서 `https://사용자이름.github.io/저장소이름/`라는 URL 생성
2. 바닐라 JS의 fetch로 해당 URL의 `https://사용자이름.github.io/저장소이름/blog/블로그글.md`에서 데이터를 가져와 JSON 형식으로 변환
3. 가져온 markdown을 markup으로 변환해 블로그를 작성
4. 추가 메뉴를 만들고 싶으면 `https://사용자이름.github.io/저장소이름/menu` 폴더에 `사용하고싶은 메뉴 이름.html` 형식으로 저장하면 메뉴로 생성


* 기존 GitHub 블로그와 비교
    * 기존 지킬 블로그에 비해 사용법이 단순
        * fork 후 pages 설정만 하면 blog 제작 가능
        * blog 폴더에 md 파일을 생성하여 글을 쓰면 자동으로 포스팅 리스트 업데이트가 됨
        * menu 폴더에 md 파일을 생성하여 생성하면 메뉴가 됨
    * 커스터마이징에 난이도 단순
    * 블로그 글을 ruby 컴파일 없이(지킬은 컴파일 해야함) 확인 가능