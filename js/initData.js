// GitHub API를 사용하여 폴더 내의 파일 목록 가져오기 (스키마 및 url 참고)
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// https://api.github.com/repos/paullabkorea/github_blog/contents/blog
let blogList = []
let blogMenu = []

async function initDataBlogList() {
    /*
    blogList를 초기화 하기 위한 함수
    if 로컬이라면 blogList = /data/local_blogList.json 데이터 할당
    else if 배포상태이면 blogList = GitHub에 API 데이터 할당
    */
    if (blogList.length > 0) {
        // blogList 데이터가 이미 있을 경우 다시 로딩하지 않기 위함(API 호출 최소화)
        return blogList;
    }

    if (isLocal) {
        // 로컬 환경
        const response = await fetch(origin.split('/')[0] + '/data/local_blogList.json');
        blogList = await response.json();
    }
    else {
        // GitHub 배포 상태
        const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/blog`);
        blogList = await response.json();
    }

    // console.log(blogList)

    // 정규표현식에 맞지 않는 파일은 제외하여 blogList에 재할당
    blogList = blogList.filter(post => {
        const postInfo = extractFileInfo(post.name);
        if (postInfo) {
            return post;
        }
    });

    blogList.sort(function (a, b) {
        return b.name.localeCompare(a.name);
    });
    
    return blogList;
}

async function initDataBlogMenu() {

    if (blogMenu.length > 0) {
        // blogMenu 데이터가 이미 있을 경우(API 호출 최소화)
        return blogMenu;
    }

    if (isLocal) {
        // 로컬환경
        const response = await fetch(origin.split('/')[0] + '/data/local_blogMenu.json');
        blogMenu = await response.json();
    }
    else {
        // GitHub 배포 상태
        const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/menu`);
        blogMenu = await response.json();
    }
    return blogMenu;
}