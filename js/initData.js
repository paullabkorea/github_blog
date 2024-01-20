// GitHub API를 사용하여 폴더 내의 파일 목록 가져오기
// 2개의 형식을 보고 코드 작성
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// https://api.github.com/repos/paullabkorea/github_blog/contents/blog
let blogList = []
let blogMenu = []
async function initData(folderPath) {
    // blogList의 데이터가 이미 있을 경우
    if (blogList.length > 0) {
        return blogList;
    }
    const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/${folderPath}`);
    blogList = await response.json();

    if (folderPath == 'blog') {
        // blog 폴더의 경우 날짜 역순으로 정렬
        data.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        });
    } else {
        data.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }
    return blogList;
}