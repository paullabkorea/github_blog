// Utils 함수
// URL에서 username과 repositoryName 추출
function extractFromUrl() {
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);

    // 보통 URL 형식: https://username.github.io/repositoryName/
    if (pathParts.length >= 2) {
        return {
            username: pathParts[0],
            repositoryName: pathParts[1]
        };
    }

    return { username: '', repositoryName: '' };
}

// 현재 url 가져와서 parsing
// hash: ""
// host: "127.0.0.1:5500"
// hostname: "127.0.0.1"
// href: "http://127.0.0.1:5500/index.html"
// origin: "http://127.0.0.1:5500"
// password:""
// pathname: "/index.html"
// port: "5500"
// protocol: "http:"
// search: ""
const url = new URL(window.location.href);
const pathParts = url.pathname.split('/').filter(part => part.length > 0);

// 로켈 테스트 환경(127.0.0.1)인지 github 배포 상태인지 확인
const isLocal = url.hostname === '127.0.0.1' || url.hostname === 'localhost';

if (isLocal) {
    // 로컬 테스트 환경
    // config에서 값이 없을 경우 URL에서 추출
    const urlConfig = extractFromUrl();

    // 블로그 제목 설정
    const $blogTitle = document.getElementById('blog-title')
    $blogTitle.innerText = siteConfig.blogTitle || 'GitHub Blog';

    // 클릭했을 때 메인페이지로 이동
    $blogTitle.onclick = () => {
        window.location.href = `http://127.0.0.1${url.port ? url.port : ''}`;
    };


}
else {
    // github 배포 상태
}