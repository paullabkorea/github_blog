function search(keyword) {
    // 검색어를 읽어와 blogList에서 검색
    console.log(keyword)
    if (!keyword) {
        const searchInput = document.getElementById('search-input');
        const searchKeyword = searchInput.value.toLowerCase(); // 검색어를 소문자로 변환
        // console.log(searchKeyword);
        // console.log(blogList);
        const searchResult = blogList.filter(post => {
            // console.log(post.name);
            // console.log(post.name.includes(searchKeyword));
            // 대소문자 가리지 않고 검색
            if (post.name.toLowerCase().includes(searchKeyword)) {
                return post;
            }
        });
        // console.log(searchResult);
        // 검색 결과를 렌더링
        renderBlogList(searchResult);
    } else {
        const searchKeyword = keyword.toLowerCase();
        const searchResult = blogList.filter(post => {
            // console.log(post.name);
            // console.log(post.name.includes(searchKeyword));
            // 대소문자 가리지 않고 검색
            if (post.name.toLowerCase().includes(searchKeyword)) {
                return post;
            }
        });
        // console.log(searchResult);
        // 검색 결과를 렌더링
        renderBlogList(searchResult);
    }
}


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

    // 검색 버튼 생성
    const searchButton = document.createElement('button');
    searchButton.classList.add(...menuListStyle.split(" "));
    searchButton.classList.add('search', 'relative');
    searchButton.innerText = '🔍';

    // 검색 창 상태를 추적하는 변수
    let searchInputCreated = false;

    searchButton.onclick = (event) => {
        event.preventDefault();

        if (!searchInputCreated) {
            // 검색 창 생성
            const searchInput = document.createElement('input');
            searchInput.classList.add(...menuListStyle.split(" "));
            searchInput.classList.add('search-input');
            searchInput.id = 'search-input';
            searchInput.type = 'text';
            searchInput.placeholder = '검색어를 입력하세요';
            searchInput.onkeyup = (event) => {
                if (event.key === 'Enter') {
                    // 엔터키 입력 시 검색 실행
                    search();
                }
            };

            // 검색 창 클릭 시 이벤트 버블링 방지
            searchInput.onclick = (event) => {
                event.stopPropagation();
            };

            // Tailwind CSS를 사용하여 스타일 지정
            searchInput.classList.add(...searchInputStyle.split(" "));

            // 검색을 클릭하면 그 아래 생성하기 위해 검색 버튼의 아래에 생성
            document.querySelector('.search').appendChild(searchInput);
            searchInputCreated = true;
        } else {
            // 검색 창 제거
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                document.querySelector('.search').removeChild(searchInput);
            }
            searchInputCreated = false;
        }
    };

    document.getElementById('menu').appendChild(searchButton);
}


function createCardElement(fileInfo, index) {
    // 파일 정보를 기반으로 카드 HTML 생성

    // console.log(fileInfo, index)

    const card = document.createElement('div');
    // console.log(index)
    if (index === 0) {
        // if (window.innerWidth <= 390) {
        //     card.style.height = 'calc(100vh / 1.3)';
        // }
        // else if (window.innerWidth <= 430) {
        //     card.style.height = 'calc(100vh / 2.0)';
        // }
        // else if (window.innerWidth <= 640) {
        //     card.style.height = 'calc(100vh / 2.4)';
        // }
        // else if (window.innerWidth <= 768) {
        //     card.style.height = 'calc(100vh / 2.8)';
        // } else {
        //     card.style.height = 'calc(100vh / 3)';
        // }
        card.classList.add(...bloglistFirstCardStyle.split(" "));
    }
    else {
        card.classList.add(...bloglistCardStyle.split(" "));
    }

    if (fileInfo.thumbnail) {
        const img = document.createElement('img');
        img.src = fileInfo.thumbnail;
        img.alt = fileInfo.title;
        if (index === 1) {
            img.classList.add(...bloglistFirstCardImgStyle.split(" "));
        }
        else {
            img.classList.add(...bloglistCardImgStyle.split(" "));
        }
        card.appendChild(img);
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add(...bloglistCardBodyStyle.split(" "));

    const title = document.createElement('h2');
    title.classList.add(...bloglistCardTitleStyle.split(" "));
    title.textContent = fileInfo.title;
    cardBody.appendChild(title);

    const category = document.createElement('span');
    category.classList.add(...bloglistCardCategoryStyle.split(" "));
    category.textContent = fileInfo.category;
    title.appendChild(category);

    const description = document.createElement('p');
    description.classList.add(...bloglistCardDescriptionStyle.split(" "));
    description.textContent = fileInfo.description;
    cardBody.appendChild(description);

    const date = document.createElement('p');
    date.classList.add(...bloglistCardDateStyle.split(" "));
    date.textContent = formatDate(fileInfo.date);
    cardBody.appendChild(date);

    card.appendChild(cardBody);

    // 추후 내용 및 기타 필요한 요소 추가 가능

    return card;
}

function renderBlogList(searchResult) {
    // main 영역에 블로그 포스트 목록을 렌더링
    if (searchResult) {
        // 검색 keyword가 있을 경우
        console.log(searchResult)
        document.getElementById('blog-posts').style.display = 'grid';
        document.getElementById('blog-posts').innerHTML = '';
        searchResult.forEach((post, index) => {
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
                        .then(text => postInfo.fileType === 'md' ? styleMarkdown('post', text, postInfo) : styleJupyter('post', text, postInfo))
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
    } else {
        // 검색 keyword가 없을 경우
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
                        .then(text => postInfo.fileType === 'md' ? styleMarkdown('post', text, postInfo) : styleJupyter('post', text, postInfo))
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
    console.log(menu.download_url)
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
                .then(text => postInfo.fileType === 'md' ? styleMarkdown('post', text, postInfo) : styleJupyter('post', text, postInfo))
                .then(() => {
                    // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                    const url = new URL(window.location.href);
                    window.history.pushState({}, '', url);
                });
        }
    }
}

initialize();