// GitHub API를 사용하여 폴더 내의 파일 목록 가져오기 (스키마 및 url 참고)
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// https://api.github.com/repos/paullabkorea/github_blog/contents/blog
let blogList = []
let blogMenu = []

async function initDataBlogList() {
    if (blogList.length > 0) {
        // blogList 데이터가 이미 있을 경우
        return blogList;
    }
    // console.log(isLocal)
    // console.log(origin + '/data/local_blogList.json');
    if (isLocal) {
        const response = await fetch(origin.split('/')[0] + '/data/local_blogList.json');
        blogList = await response.json();

        // 정규표현식에 맞지 않는 파일은 제외하여 blogList에 재할당
        blogList = blogList.filter(post => {
            const postInfo = extractFileInfo(post.name);
            if (postInfo) {
                return post;
            }
        });

    }
    else {
        // github 배포 상태
        const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/blog`);
        blogList = await response.json();
    }
    blogList.sort(function (a, b) {
        return b.name.localeCompare(a.name);
    });

    // 정규표현식에 맞지 않는 파일은 제외하여 blogList에 재할당
    blogList = blogList.filter(post => {
        const postInfo = extractFileInfo(post.name);
        if (postInfo) {
            return post;
        }
    });

    return blogList;
}

async function initDataBlogMenu() {
    if (blogMenu.length > 0) {
        // blogMenu 데이터가 이미 있을 경우
        return blogMenu;
    }

    if (isLocal) {
        // isLocal이 true일 경우 로컬 테스트 환경
        const response = await fetch(origin.split('/')[0] + '/data/local_blogMenu.json');
        blogMenu = await response.json();
    }
    else {
        // github 배포 상태
        const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/menu`);
        blogMenu = await response.json();
    }
    return blogMenu;
}