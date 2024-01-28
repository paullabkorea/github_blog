// 메뉴 생성 및 메뉴클릭 이벤트 정의
async function renderMenu() {
    blogMenu.forEach(menu => {
        // 메뉴 링크 생성
        const link = document.createElement('a');

        // <div id="contents" class="mt-6 grid-cols-3"></div> 안에 들어가는 link들의 스타일링
        // menuListStyle는 gobalStyle.js에 정의되어 있음
        link.classList.add(...menuListStyle.split(" "));
        link.classList.add(`${menu.name}`);

        link.href = menu.download_url;
        // 확장자를 제외하고 이름만 innerText로 사용
        const menuName = menu.name.split('.')[0];
        link.innerText = menuName;

        link.onclick = (event) => {
            // 메뉴 링크 클릭 시 이벤트 중지 후 menu 내용을 읽어와 contents 영역에 렌더링
            event.preventDefault();

            if (menu.name === 'blog.md') {
                if (blogList.length === 0) {
                    // 블로그 리스트 로딩 
                    initDataBlogList()
                        .then(() => {
                            renderBlogList()
                        });
                } else {
                    renderBlogList()
                }
                const url = new URL(origin);
                url.searchParams.set('menu', menu.name);
                window.history.pushState({}, '', url);
            } else {
                renderOtherContents(menu)
            }

        };
        document.getElementById('menu').appendChild(link);
    });
}

function extractFileInfo(filename) {
    // 파일 이름에서 정보 추출하는 함수

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
            description: matches[5].length > 25 ? matches[5].substring(0, 25) + '...' : matches[5]
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

function createCardElement(fileInfo, index) {
    // 파일 정보를 기반으로 카드 HTML 생성

    const card = document.createElement('div');
    // console.log(index)
    if (index === 1) {
        card.classList.add('col-span-3', 'h-auto');
        // 모바일일 경우 card의 높이를 1/3로 설정
        if (window.innerWidth <= 390) {
            card.style.height = 'calc(100vh / 1.3)';
        }
        else if (window.innerWidth <= 430) {
            card.style.height = 'calc(100vh / 2.0)';
        }
        else if (window.innerWidth <= 640) {
            card.style.height = 'calc(100vh / 2.4)';
        }
        else if (window.innerWidth <= 768) {
            card.style.height = 'calc(100vh / 2.8)';
        } else {
            card.style.height = 'calc(100vh / 3)';
        }
        card.classList.add('rounded', 'overflow-hidden', 'shadow-lg', 'bg-white');
        card.classList.add('transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105');
    }
    else {
        card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-white');
        card.classList.add('transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105');
    }

    if (fileInfo.thumbnail) {
        const img = document.createElement('img');
        img.src = fileInfo.thumbnail;
        img.alt = fileInfo.title;
        if (index === 1) {
            img.classList.add('w-full', 'object-cover', 'object-center');
            // 이미지의 높이를 100%로 설정
            img.style.height = '70%';

        }
        else {
            img.classList.add('w-full', 'h-48', 'object-cover', 'object-center');
        }
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

function renderBlogList() {
    // main 영역에 블로그 포스트 목록을 렌더링
    document.getElementById('blog-posts').style.display = 'grid';
    document.getElementById('blog-posts').innerHTML = '';
    blogList.forEach((post, index) => {
        const postInfo = extractFileInfo(post.name);
        if (postInfo) {
            // console.log(postInfo)
            const cardElement = createCardElement(postInfo, index);

            cardElement.onclick = (event) => {
                // 블로그 게시글 링크 클릭 시 이벤트 중지 후 post 내용을 읽어와 contents 영역에 렌더링
                event.preventDefault();
                // contents 영역을 보이게 처리
                document.getElementById('contents').style.display = 'block';
                // blog-posts 영역을 보이지 않게 처리
                document.getElementById('blog-posts').style.display = 'none';
                fetch(post.download_url)
                    .then(response => response.text())
                    .then(text => styleMarkdown('post', text, postInfo))
                    .then(() => {
                        // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                        const url = new URL(origin);
                        url.searchParams.set('post', post.name);
                        window.history.pushState({}, '', url);
                    });
            };
            document.getElementById('blog-posts').appendChild(cardElement);
        }
    });
    // contents 영역을 보이지 않게 처리
    document.getElementById('contents').style.display = 'none';
}

function renderBlogDetail(id) {
    // 아직 활용하고 있지 않은 함수
    // contents 영역을 보이게 처리
    document.getElementById('contents').style.display = 'block';
    // blog-posts 영역을 보이지 않게 처리
    document.getElementById('blog-posts').style.display = 'none';

    // const postInfo = extractFileInfo(post.name);
    // if (postInfo) {
    //     // console.log(postInfo)
    //     const cardElement = createCardElement(postInfo, index);

    //     cardElement.onclick = (event) => {
    //         // 블로그 게시글 링크 클릭 시 이벤트 중지 후 post 내용을 읽어와 contents 영역에 렌더링
    //         event.preventDefault();
    //         // contents 영역을 보이게 처리
    //         document.getElementById('contents').style.display = 'block';
    //         // blog-posts 영역을 보이지 않게 처리
    //         document.getElementById('blog-posts').style.display = 'none';
    //         fetch(post.download_url)
    //             .then(response => response.text())
    //             .then(text => styleMarkdown('post', text, postInfo))
    //             .then(() => {
    //                 // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
    //                 const url = new URL(window.location.href);
    //                 url.searchParams.set('post', post.name);
    //                 window.history.pushState({}, '', url);
    //             });
    //     };
    //     document.getElementById('blog-posts').appendChild(cardElement);
    // }
}

function renderOtherContents(menu) {
    // main 영역에 blog.md를 제외한 다른 파일을 렌더링
    document.getElementById('blog-posts').style.display = 'none';
    document.getElementById('contents').style.display = 'block';

    // 만약 menu가 string type 이라면 download_url, name을 menu로 설정
    if (typeof (menu) === 'string') {
        menu = {
            download_url: origin + 'menu/' + menu,
            name: menu.split('/')[menu.split('/').length - 1]
        }
    }
    fetch(menu.download_url)
        .then(response => response.text())
        .then(text => styleMarkdown('menu', text, undefined))
        .then(() => {
            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
            const url = new URL(origin);
            url.searchParams.set('menu', menu.name);
            window.history.pushState({}, '', url);
        });
}

// 실행영역
// URLparsing은 index.html에서 실행
// blogList와 blogMenu는 initData.js에서 정의
async function initialize() {
    // TODO: URL 파싱 결과 상세 블로그나 메뉴상태이면 검색 버튼을 누르기 전까지는 initDataBlogList()를 실행시킬 필요 없음
    // api 호출 1개를 아낄 수 있음

    // console.log(url);
    // console.log(origin)
    // console.log(url.search.split('=')[0]);
    // console.log(url.search.split('=')[1]);
    // console.log(decodeURI(url.search.split('=')[1]))
    if (!url.search.split('=')[1]) {
        // 메뉴 로딩
        await initDataBlogMenu();
        renderMenu();

        // 블로그 리스트 로딩 
        await initDataBlogList();
        renderBlogList();

    } else {
        // 메뉴 로딩
        await initDataBlogMenu();
        renderMenu();

        // 블로그 상세 정보 로딩
        if (url.search.split('=')[0] === '?menu') {
            document.getElementById('blog-posts').style.display = 'none';
            document.getElementById('contents').style.display = 'block';
            fetch(origin + 'menu/' + url.search.split('=')[1])
                .then(response => response.text())
                .then(text => styleMarkdown('menu', text))
                .then(() => {
                    // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                    const url = new URL(window.location.href);
                    window.history.pushState({}, '', url);
                });
        } else if (url.search.split('=')[0] === '?post') {
            document.getElementById('contents').style.display = 'block';
            document.getElementById('blog-posts').style.display = 'none';
            postNameDecode = decodeURI(url.search.split('=')[1]).replaceAll('+', ' ')
            // console.log(postNameDecode)
            postInfo = extractFileInfo(postNameDecode)
            fetch(origin + 'blog/' + postNameDecode)
                .then(response => response.text())
                .then(text => styleMarkdown('post', text, postInfo))
                .then(() => {
                    // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                    const url = new URL(window.location.href);
                    window.history.pushState({}, '', url);
                });
        }
    }
}

initialize();