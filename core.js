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
// 2개의 형식을 보고 코드 작성
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// https://api.github.com/repos/paullabkorea/github_blog/contents/blog
async function loadFolderContents(folderPath) {
    const response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/${folderPath}`);
    const data = await response.json();
    if (folderPath == 'blog') {
        // blog 폴더의 경우 날짜 역순으로 정렬
        data.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });
    } else {
        data.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }
    return data;
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
                document.getElementById('blog-posts').style.display = 'grid';
                readPostList();
            } else {
                // 그렇지 않으면 blog-posts를 비우고 contents 영역에 파일 내용을 렌더링
                document.getElementById('blog-posts').style.display = 'none';
                document.getElementById('contents').style.display = 'block';
                fetch(file.download_url)
                    .then(response => response.text())
                    .then(text => {
                        const html = marked.parse(text);
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;

                        tempDiv.querySelectorAll('h1').forEach(h1 => h1.classList.add('text-2xl', 'font-bold'));
                        tempDiv.querySelectorAll('h2').forEach(h2 => h2.classList.add('text-xl', 'font-semibold'));
                        tempDiv.querySelectorAll('h3').forEach(h3 => h3.classList.add('text-lg', 'font-semibold'));
                        tempDiv.querySelectorAll('h4').forEach(h4 => h4.classList.add('text-base', 'font-semibold'));
                        tempDiv.querySelectorAll('h5').forEach(h5 => h5.classList.add('text-sm', 'font-semibold'));
                        tempDiv.querySelectorAll('h6').forEach(h6 => h6.classList.add('text-xs', 'font-semibold'));
                        tempDiv.querySelectorAll('p').forEach(p => p.classList.add('mb-4'));
                        tempDiv.querySelectorAll('img').forEach(img => img.classList.add('my-4'));
                        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-blue-700', 'underline'));
                        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('list-disc', 'list-inside', 'mb-4'));
                        tempDiv.querySelectorAll('ol').forEach(ol => ol.classList.add('list-decimal', 'list-inside', 'mb-4'));
                        tempDiv.querySelectorAll('li').forEach(li => li.classList.add('mb-2'));
                        tempDiv.querySelectorAll('blockquote').forEach(blockquote => blockquote.classList.add('border-l-4', 'border-gray-400', 'pl-4', 'mb-4'));
                        tempDiv.querySelectorAll('pre').forEach(pre => pre.classList.add('bg-gray-100', 'p-4', 'rounded', 'mb-4'));
                        tempDiv.querySelectorAll('code').forEach(code => code.classList.add('font-mono'));
                        tempDiv.querySelectorAll('table').forEach(table => table.classList.add('table-auto', 'border-collapse', 'border'));
                        tempDiv.querySelectorAll('thead').forEach(thead => thead.classList.add('bg-gray-100'));
                        tempDiv.querySelectorAll('th').forEach(th => th.classList.add('border', 'px-4', 'py-2'));
                        tempDiv.querySelectorAll('tbody').forEach(tbody => tbody.classList.add('text-center'));
                        tempDiv.querySelectorAll('td').forEach(td => td.classList.add('border', 'px-4', 'py-2'));

                        document.getElementById('contents').innerHTML = tempDiv.innerHTML;
                    });
            }
            
        };
        document.getElementById('menu').appendChild(link);
    });
});

// 파일 이름에서 정보 추출하는 함수
function extractFileInfo(filename) {
    // 정규 표현식을 사용하여 날짜, 제목, 카테고리, 썸네일 정보 추출
    const regex = /^\[(\d{8})\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\].md$/;
    const matches = filename.match(regex);
    // console.log(`extractFileInfo: ${matches}`);

    if (matches) {
        return {
            date: matches[1],
            title: matches[2],
            category: matches[3],
            thumbnail: matches[4] ? 'img/' + matches[4] : 'img/default.png',
            description: matches[5]
        };
    }
    return null;
}

function formatDate(dateString) {
    // YYYYMMDD 형식의 문자열을 받아 YYYY/MM/DD 형식으로 변환
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${year}/${month}/${day}`;
}

// 파일 정보를 기반으로 카드 HTML 생성
function createCardElement(fileInfo) {
    const card = document.createElement('div');
    card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-white');
    card.classList.add('transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105');

    if (fileInfo.thumbnail) {
        const img = document.createElement('img');
        img.src = fileInfo.thumbnail;
        img.alt = fileInfo.title;
        img.classList.add('w-full', 'h-48', 'object-cover', 'object-center');
        card.appendChild(img);
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('px-6', 'py-4');

    const title = document.createElement('h2');
    title.classList.add('font-bold', 'text-xl', 'mb-2');
    title.textContent = fileInfo.title;
    cardBody.appendChild(title);

    const category = document.createElement('span');
    category.classList.add('inline-block', 'bg-blue-200', 'text-blue-800', 'text-xs', 'font-semibold', 'ml-2', 'px-2.5', 'py-0.5', 'rounded');
    category.textContent = fileInfo.category;
    title.appendChild(category);

    const description = document.createElement('p');
    description.classList.add('text-gray-700', 'text-base');
    description.textContent = fileInfo.description;
    cardBody.appendChild(description);

    const date = document.createElement('p');
    date.classList.add('text-gray-600', 'text-xs');
    date.textContent = formatDate(fileInfo.date);
    cardBody.appendChild(date);

    card.appendChild(cardBody);

    // 추후 내용 및 기타 필요한 요소 추가 가능

    return card;
}

function readPostList(){
    // 포스트 목록 읽어오는 함수
    loadFolderContents('blog').then(files => {
        // blog-posts 영역을 초기화, 초기화 하지 않으면 중복으로 렌더링됨
        document.getElementById('blog-posts').innerHTML = '';
        files.forEach(file => {
            const fileInfo = extractFileInfo(file.name);
            if (fileInfo) {
                // console.log(fileInfo)
                const cardElement = createCardElement(fileInfo);
                
                cardElement.onclick = (event) => {
                    // 블로그 게시글 링크 클릭 시 이벤트 중지 후 file 내용을 읽어와 contents 영역에 렌더링
                    event.preventDefault();
                    // contents 영역을 보이게 처리
                    document.getElementById('contents').style.display = 'block';
                    // blog-posts 영역을 보이지 않게 처리
                    document.getElementById('blog-posts').style.display = 'none';
                    fetch(file.download_url)
                        .then(response => response.text())
                        .then(text => {
                            const html = marked.parse(text);
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = html;

                            tempDiv.querySelectorAll('h1').forEach(h1 => h1.classList.add('text-2xl', 'font-bold'));
                            tempDiv.querySelectorAll('h2').forEach(h2 => h2.classList.add('text-xl', 'font-semibold'));
                            tempDiv.querySelectorAll('h3').forEach(h3 => h3.classList.add('text-lg', 'font-semibold'));
                            tempDiv.querySelectorAll('h4').forEach(h4 => h4.classList.add('text-base', 'font-semibold'));
                            tempDiv.querySelectorAll('h5').forEach(h5 => h5.classList.add('text-sm', 'font-semibold'));
                            tempDiv.querySelectorAll('h6').forEach(h6 => h6.classList.add('text-xs', 'font-semibold'));
                            tempDiv.querySelectorAll('p').forEach(p => p.classList.add('mb-4'));
                            tempDiv.querySelectorAll('img').forEach(img => img.classList.add('my-4'));
                            tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-blue-700', 'underline'));
                            tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('list-disc', 'list-inside', 'mb-4'));
                            tempDiv.querySelectorAll('ol').forEach(ol => ol.classList.add('list-decimal', 'list-inside', 'mb-4'));
                            tempDiv.querySelectorAll('li').forEach(li => li.classList.add('mb-2'));
                            tempDiv.querySelectorAll('blockquote').forEach(blockquote => blockquote.classList.add('border-l-4', 'border-gray-400', 'pl-4', 'mb-4'));
                            tempDiv.querySelectorAll('pre').forEach(pre => pre.classList.add('bg-gray-100', 'p-4', 'rounded', 'mb-4'));
                            tempDiv.querySelectorAll('code').forEach(code => code.classList.add('font-mono'));
                            tempDiv.querySelectorAll('table').forEach(table => table.classList.add('table-auto', 'border-collapse', 'border'));
                            tempDiv.querySelectorAll('thead').forEach(thead => thead.classList.add('bg-gray-100'));
                            tempDiv.querySelectorAll('th').forEach(th => th.classList.add('border', 'px-4', 'py-2'));
                            tempDiv.querySelectorAll('tbody').forEach(tbody => tbody.classList.add('text-center'));
                            tempDiv.querySelectorAll('td').forEach(td => td.classList.add('border', 'px-4', 'py-2'));

                            document.getElementById('contents').innerHTML = tempDiv.innerHTML;
                        });
                };

                document.getElementById('blog-posts').appendChild(cardElement);
            }
            
        });
    });
    // contents 영역을 보이지 않게 처리
    document.getElementById('contents').style.display = 'none';
}

readPostList()