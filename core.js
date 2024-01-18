// config.js에서 가져온 설정을 사용
// document.documentElement.style.setProperty('--main-color', siteConfig.mainColor);
// document.documentElement.style.setProperty('--text-color', siteConfig.textColor);

// config에서 값이 없을 경우 URL에서 추출
const urlConfig = extractFromUrl();
siteConfig.username = siteConfig.username || urlConfig.username;
siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;

// 블로그 제목 설정
const $blogTitle = document.getElementById('blog-title')
$blogTitle.innerText = siteConfig.blogTitle || 'GitHub Blog';
// 클릭했을 때 메인페이지로 이동
$blogTitle.onclick = () => {
    window.location.href = `https://${siteConfig.username}.github.io/${siteConfig.repositoryName}/`;
};


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

// GitHub API를 사용하여 폴더 내의 파일 목록 가져오기
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// [
//     {
//       "name": "[20240118]_[title_test]_[python]_[].md",
//       "path": "menu/[20240118]_[title_test]_[python]_[].md",
//       "sha": "fbd3ef0795ebeb2ece0cafbfe0fd8c6e2f48fe49",
//       "size": 23,
//       "url": "https://api.github.com/repos/paullabkorea/github_blog/contents/menu/a.md?ref=main",
//       "html_url": "https://github.com/paullabkorea/github_blog/blob/main/menu/a.md",
//       "git_url": "https://api.github.com/repos/paullabkorea/github_blog/git/blobs/fbd3ef0795ebeb2ece0cafbfe0fd8c6e2f48fe49",
//       "download_url": "https://raw.githubusercontent.com/paullabkorea/github_blog/main/menu/a.md",
//       "type": "file",
//       "_links": {
//         "self": "https://api.github.com/repos/paullabkorea/github_blog/contents/menu/a.md?ref=main",
//         "git": "https://api.github.com/repos/paullabkorea/github_blog/git/blobs/fbd3ef0795ebeb2ece0cafbfe0fd8c6e2f48fe49",
//         "html": "https://github.com/paullabkorea/github_blog/blob/main/menu/a.md"
//       }
//     }
// ]
async function loadFolderContents(folderPath) {
    const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/${folderPath}`);
    const data = await response.json();
    return data;
}

// 파일 이름에서 정보 추출하는 함수
function extractFileInfo(filename) {
    // 정규 표현식을 사용하여 날짜, 제목, 카테고리, 썸네일 정보 추출
    const regex = /^\[(\d{8})\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\].md$/;
    const matches = filename.match(regex);
    console.log(`extractFileInfo: ${matches}`);

    if (matches) {
        return {
            date: matches[1],
            title: matches[2],
            category: matches[3],
            thumbnail: matches[4] // 추출된 썸네일 정보는 사용자가 실제 경로를 설정해야 함
        };
    }
    return null;
}

// 파일 정보를 기반으로 카드 HTML 생성
function createCardElement(fileInfo) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (fileInfo.thumbnail) {
        const img = document.createElement('img');
        img.src = fileInfo.thumbnail; // 이미지 경로 설정 필요
        img.alt = fileInfo.title;
        img.classList.add('card-image');
        card.appendChild(img);
    }

    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.textContent = fileInfo.title;
    card.appendChild(title);

    const category = document.createElement('p');
    category.classList.add('card-category');
    category.textContent = fileInfo.category;
    card.appendChild(category);

    const date = document.createElement('p');
    date.classList.add('card-date');
    date.textContent = fileInfo.date; // 날짜 형식 변환 필요
    card.appendChild(date);

    // 추후 내용 및 기타 필요한 요소 추가 가능

    return card;
}

// 메뉴 생성
loadFolderContents('menu').then(files => {
    files.forEach(file => {
        // 메뉴 링크 생성
        const link = document.createElement('a');
        
        // tailwind를 사용한 스타일링
        // <div id="contents" class="mt-6 grid-cols-3"></div> 안에 들어가는 link들의 스타일링
        // card 형태로 이미지 + 제목 + 내용 + 저자 + 날짜가 들어가게 됨
        link.classList.add('ml-4', 'text-gray-700', 'hover:text-gray-900', 'font-bold', 'text-xl', 'py-2', 'px-4', 'rounded');
        
        link.classList.add(`${file.name}`);
        link.href = file.download_url;
        // 확장자를 제외하고 이름만 innerText로 사용
        const fileName = file.name.split('.')[0];
        link.innerText = fileName;
        link.onclick = (event) => {
            // 메뉴 링크 클릭 시 이벤트 중지 후 file 내용을 읽어와 contents 영역에 렌더링
            event.preventDefault();

            if (file.name === 'blog.md') {
                // 만약 블로그라면 contents 영역을 없애고 블로그 포스트 목록을 보여줌
                document.getElementById('contents').style.display = 'none';
                document.getElementById('blog-posts').style.display = 'block';
                readPostList();
            } else {
                // 그렇지 않으면 blog-posts를 비우고 contents 영역에 파일 내용을 렌더링
                document.getElementById('blog-posts').style.display = 'none';
                document.getElementById('contents').style.display = 'block';
                fetch(file.download_url)
                    .then(response => response.text())
                    .then(text => {
                        document.getElementById('contents').innerHTML = marked.parse(text);
                    });
            }
            
        };
        document.getElementById('menu').appendChild(link);
    });
});

function readPostList(){
    // 포스트 목록 읽어오는 함수
    loadFolderContents('blog').then(files => {
        // blog-posts 영역을 초기화, 초기화 하지 않으면 중복으로 렌더링됨
        document.getElementById('blog-posts').innerHTML = '';
        files.forEach(file => {
            const fileInfo = extractFileInfo(file.name);
            if (fileInfo) {
                console.log(fileInfo)
                const cardElement = createCardElement(fileInfo);
                document.getElementById('blog-posts').appendChild(cardElement);
            }

            // // 블로그 게시글 링크 생성
            // const postLink = document.createElement('a');

            // // tailwind를 사용한 스타일링
            // postLink.classList.add('ml-4', 'text-gray-700', 'hover:text-gray-900', 'font-bold', 'text-xl', 'py-2', 'px-4', 'rounded');

            // postLink.href = `#`;
            // postLink.innerText = file.name;
            // postLink.onclick = (event) => {
            //     // 블로그 게시글 링크 클릭 시 이벤트 중지 후 file 내용을 읽어와 contents 영역에 렌더링
            //     event.preventDefault();
            //     // contents 영역을 보이게 처리
            //     document.getElementById('contents').style.display = 'block';
            //     // blog-posts 영역을 보이지 않게 처리
            //     document.getElementById('blog-posts').style.display = 'none';
            //     fetch(file.download_url)
            //         .then(response => response.text())
            //         .then(text => {
            //             document.getElementById('contents').innerHTML = marked.parse(text);
            //         });
            // };
            // document.getElementById('blog-posts').appendChild(postLink);
        });
    });
    // contents 영역을 보이지 않게 처리
    document.getElementById('contents').style.display = 'none';
}

readPostList()