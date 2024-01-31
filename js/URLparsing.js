// 현재 url 가져와서 parsing (url 스키마는 readme.md 참고)
const url = new URL(window.location.href);
const origin = url.origin + url.pathname;
const pathParts = url.pathname.split('/').filter(part => part.length > 0);
// console.log(url)

// 로켈 테스트 환경(127.0.0.1)인지 github 배포 상태인지 확인
const isLocal = url.hostname === '127.0.0.1' || url.hostname === 'localhost';


if (isLocal) {
    // 로컬 테스트 환경

    // 블로그 제목 설정
    const $blogTitle = document.getElementById('blog-title')
    $blogTitle.innerText = siteConfig.blogTitle || 'GitHub Blog';

    // 클릭했을 때 메인페이지로 이동
    $blogTitle.onclick = () => {
        window.location.href = `http://127.0.0.1${url.port ? ':' + url.port : ''}`;
    };
}
else {
    // github 배포 상태

    // config에서 값이 없을 경우 URL에서 추출
    if (!siteConfig.username || !siteConfig.repositoryName) {
        const urlConfig = extractFromUrl();
        siteConfig.username = siteConfig.username || urlConfig.username;
        siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
    }

    // 블로그 제목 설정
    const $blogTitle = document.getElementById('blog-title')
    $blogTitle.innerText = siteConfig.blogTitle || 'GitHub Blog';

    // 클릭했을 때 메인페이지로 이동
    $blogTitle.onclick = () => {
        window.location.href = `https://${siteConfig.username}.github.io/${siteConfig.repositoryName}/`;
    };
}


// 브라우저의 뒤로가기/앞으로가기 버튼 처리
window.addEventListener('popstate', (event) => {
    // 만약에 뒤로 간 곳이 메인 페이지라면
    if (window.location.pathname === '/') {
        // 메뉴를 다시 렌더링
        renderBlogList();
    }
    else {
        // TODO: 뒤로가기/앞으로가기 버튼을 눌렀을 때 처리
        // 그렇지 않고 포스트 목록이라면 포스트 렌더링
        // renderPost();
        // 그렇지 않고 메뉴라면 메뉴 렌더링
        // renderMenu();
    }
});