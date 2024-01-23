// 메뉴 생성 및 메뉴클릭 이벤트 정의
function renderMenu() {
    blogMenu.forEach(menu => {
        // 메뉴 링크 생성
        const link = document.createElement('a');

        // <div id="contents" class="mt-6 grid-cols-3"></div> 안에 들어가는 link들의 스타일링
        // menuListStyle는 gobalStyle.js에 정의되어 있음
        link.classList.add(menuListStyle);
        link.classList.add(`${menu.name}`);

        link.href = menu.download_url;
        // 확장자를 제외하고 이름만 innerText로 사용
        const menuName = menu.name.split('.')[0];
        link.innerText = menuName;

        link.onclick = (event) => {
            // 메뉴 링크 클릭 시 이벤트 중지 후 menu 내용을 읽어와 contents 영역에 렌더링
            event.preventDefault();

            if (menu.name === 'blog.md') {
                // 메뉴에서 blog.md를 클릭했을 경우
                // 만약 블로그라면 contents 영역을 없애고 블로그 포스트 목록을 보여줌
                document.getElementById('contents').style.display = 'none';
                document.getElementById('blog-posts').style.display = 'grid';
                // readPostList();
                renderBlogList()
            } else {
                // 메뉴에서 blog.md를 제외한 다른 파일을 클릭했을 경우
                // 그렇지 않으면 blog-posts를 비우고 contents 영역에 파일 내용을 렌더링
                document.getElementById('blog-posts').style.display = 'none';
                document.getElementById('contents').style.display = 'block';
                // fetch(menu.download_url)
                //     .then(response => response.text())
                //     .then(text => styleMarkdown(text));
                renderOtherContents()
            }

        };
        document.getElementById('menu').appendChild(link);
    });
}
renderMenu();

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
            description: matches[5]
        };
    }
    return null;
}

function createCardElement(fileInfo) {
    // 파일 정보를 기반으로 카드 HTML 생성

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

function renderBlogList() {
    // main 영역에 블로그 포스트 목록을 렌더링
    document.getElementById('blog-posts').innerHTML = '';
    blogList.forEach(post => {
        const postInfo = extractFileInfo(post.name);
        if (postInfo) {
            // console.log(postInfo)
            const cardElement = createCardElement(postInfo);

            cardElement.onclick = (event) => {
                // 블로그 게시글 링크 클릭 시 이벤트 중지 후 post 내용을 읽어와 contents 영역에 렌더링
                event.preventDefault();
                // contents 영역을 보이게 처리
                document.getElementById('contents').style.display = 'block';
                // blog-posts 영역을 보이지 않게 처리
                document.getElementById('blog-posts').style.display = 'none';
                fetch(post.download_url)
                    .then(response => response.text())
                    .then(text => styleMarkdown(text));
            };
            document.getElementById('blog-posts').appendChild(cardElement);
        }
    });
    // contents 영역을 보이지 않게 처리
    document.getElementById('contents').style.display = 'none';
}

function renderOtherContents() {
    // main 영역에 blog.md를 제외한 다른 파일을 렌더링
    fetch(menu.download_url)
        .then(response => response.text())
        .then(text => styleMarkdown(text));
}