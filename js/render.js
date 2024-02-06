function search(keyword) {
    /*
    1. 메뉴에서 검색 버튼을 클릭해서 검색하였을 경우 검색 결과를 renderBlogList 함수를 통해 렌더링
    2. 포스트에서 카테고리를 클릭하였을 때 해당 카테고리로 검색하여 renderBlogList함수를 통해 렌더링
    */
    if (!keyword) {
        const searchInput = document.getElementById("search-input");
        const searchKeyword = searchInput.value.toLowerCase(); // 검색어를 소문자로 변환
        const searchResult = blogList.filter((post) => {
            // 대소문자 가리지 않고 검색
            if (post.name.toLowerCase().includes(searchKeyword)) {
                return post;
            }
        });
        renderBlogList(searchResult);
    } else {
        const searchKeyword = keyword.toLowerCase();
        const searchResult = blogList.filter((post) => {
            // 대소문자 가리지 않고 검색
            if (post.name.toLowerCase().includes(searchKeyword)) {
                return post;
            }
        });
        // 검색 결과를 렌더링
        renderBlogList(searchResult);
    }
}

async function renderMenu() {
    /* 
    1. 메인페이지 메뉴 생성 및 메뉴클릭 이벤트 정의
    2. 검색창과 검색 이벤트 정의(검색이 메뉴에 있으므로) - 함수가 커지면 별도 파일로 분리 필요
    */
    blogMenu.forEach((menu) => {
        // 메뉴 링크 생성
        const link = document.createElement("a");

        // (static) index.html: <div id="contents" class="mt-6 grid-cols-3"></div>
        link.classList.add(...menuListStyle.split(" "));
        link.classList.add(`${menu.name}`);

        link.href = menu.download_url;
        // 확장자를 제외하고 이름만 innerText로 사용
        const menuName = menu.name.split(".")[0];
        link.innerText = menuName;

        link.onclick = (event) => {
            // 메뉴 링크 클릭 시 이벤트 중지 후 menu 내용을 읽어와 contents 영역에 렌더링
            event.preventDefault();

            if (menu.name === "blog.md") {
                if (blogList.length === 0) {
                    // 블로그 리스트 로딩
                    initDataBlogList().then(() => {
                        renderBlogList();
                    });
                } else {
                    renderBlogList();
                }
                const url = new URL(origin);
                url.searchParams.set("menu", menu.name);
                window.history.pushState({}, "", url);
            } else {
                renderOtherContents(menu);
            }
        };
        document.getElementById("menu").appendChild(link);
    });

    // 검색 버튼 생성
    // const searchButton = document.createElement('button');
    const searchButton = document.getElementById("search-menu");
    // searchButton.classList.add(...menuListStyle.split(" "));
    searchButton.classList.add("ml-10");
    searchButton.classList.add("search", "relative");
    searchButton.innerText = "🔍";

    // 검색 창 상태를 추적하는 변수
    let searchInputCreated = false;

    searchButton.onclick = (event) => {
        event.preventDefault();

        if (!searchInputCreated) {
            // 검색 창 생성
            const searchInput = document.createElement("input");
            searchInput.classList.add(...menuListStyle.split(" "));
            searchInput.classList.add("search-input");
            searchInput.id = "search-input";
            searchInput.type = "text";
            searchInput.placeholder = "검색어를 입력하세요";
            searchInput.onkeyup = (event) => {
                if (event.key === "Enter") {
                    // 엔터키 입력 시 검색 실행
                    search();
                }
            };

            // 검색 창 클릭 시 이벤트 버블링 방지
            searchInput.onclick = (event) => {
                event.stopPropagation();
            };

            searchInput.classList.add(...searchInputStyle.split(" "));

            // 검색을 클릭하면 그 아래 생성하기 위해 검색 버튼의 아래에 생성
            document.querySelector(".search").appendChild(searchInput);
            searchInputCreated = true;
        } else {
            // 검색 창 제거
            const searchInput = document.getElementById("search-input");
            if (searchInput) {
                document.querySelector(".search").removeChild(searchInput);
            }
            searchInputCreated = false;
        }
    };

    document.getElementById("menu").appendChild(searchButton);
}

function createCardElement(fileInfo, index) {
    /*
    정규표현식으로 파싱된 파일정보 fileInfo를 기반으로 blog의 card 생성, index를 받는 이유는 첫번째 카드는 넓이를 크게 차지해야 하기 때문
    */
    const card = document.createElement("div");
    if (index === 0) {
        card.classList.add(...bloglistFirstCardStyle.split(" "));
    } else {
        card.classList.add(...bloglistCardStyle.split(" "));
    }

    if (fileInfo.thumbnail) {
        const img = document.createElement("img");
        img.src = fileInfo.thumbnail;
        img.alt = fileInfo.title;
        if (index === 0) {
            console.log("index 0", img);
            img.classList.add(...bloglistFirstCardImgStyle.split(" "));
        } else {
            img.classList.add(...bloglistCardImgStyle.split(" "));
        }
        card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.classList.add(...bloglistCardBodyStyle.split(" "));

    const category = document.createElement("span");
    category.classList.add(...bloglistCardCategoryStyle.split(" "));
    category.textContent = fileInfo.category;
    cardBody.appendChild(category);

    const title = document.createElement("h2");
    title.classList.add(...bloglistCardTitleStyle.split(" "));
    title.textContent = fileInfo.title;
    cardBody.appendChild(title);

    const description = document.createElement("p");
    if (index == 0) {
        description.classList.add(
            ...bloglistFirstCardDescriptionStyle.split(" ")
        );
    } else {
        description.classList.add(...bloglistCardDescriptionStyle.split(" "));
    }
    description.textContent = fileInfo.description;
    cardBody.appendChild(description);

    const authorDiv = document.createElement("div");
    authorDiv.classList.add(...bloglistCardAuthorDivStyle.split(" "));
    cardBody.appendChild(authorDiv);

    const authorImg = document.createElement("img");
    authorImg.src = users[fileInfo.author]["img"];
    authorImg.alt = users[fileInfo.author]["username"];
    authorImg.classList.add(...bloglistCardAuthorImgStyle.split(" "));
    authorDiv.appendChild(authorImg);

    const author = document.createElement("p");
    author.classList.add(...bloglistCardAuthorStyle.split(" "));
    author.textContent = users[fileInfo.author]["username"];
    authorDiv.appendChild(author);

    const date = document.createElement("p");
    date.classList.add(...bloglistCardDateStyle.split(" "));
    date.textContent = formatDate(fileInfo.date);
    cardBody.appendChild(date);

    card.appendChild(cardBody);

    return card;
}

function renderBlogList(searchResult) {
    /*
    blog의 main 영역에 블로그 포스트 목록을 렌더링
    1. 검색 키워드 없이 대부분 renderBlogList()로 사용.
    2. 검색을 했을 때에만 searchResult에 목록이 담겨 들어옴
    */
    if (searchResult) {
        // 검색 keyword가 있을 경우
        document.getElementById("blog-posts").style.display = "grid";
        document.getElementById("blog-posts").innerHTML = "";
        searchResult.forEach((post, index) => {
            const postInfo = extractFileInfo(post.name);
            if (postInfo) {
                const cardElement = createCardElement(postInfo, index);

                cardElement.onclick = (event) => {
                    // 블로그 게시글 링크 클릭 시 이벤트 중지 후 post 내용을 읽어와 contents 영역에 렌더링
                    event.preventDefault();
                    // contents 영역을 보이게 처리
                    document.getElementById("contents").style.display = "block";
                    // blog-posts 영역을 보이지 않게 처리
                    document.getElementById("blog-posts").style.display =
                        "none";
                    fetch(post.download_url)
                        .then((response) => response.text())
                        .then((text) =>
                            postInfo.fileType === "md"
                                ? styleMarkdown("post", text, postInfo)
                                : styleJupyter("post", text, postInfo)
                        )
                        .then(() => {
                            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                            const url = new URL(origin);
                            url.searchParams.set("post", post.name);
                            window.history.pushState({}, "", url);
                        });
                };
                document.getElementById("blog-posts").appendChild(cardElement);
            }
        });
        // contents 영역을 보이지 않게 처리
        document.getElementById("contents").style.display = "none";
    } else {
        // 검색 keyword가 없을 경우
        document.getElementById("blog-posts").style.display = "grid";
        document.getElementById("blog-posts").innerHTML = "";

        blogList.forEach((post, index) => {
            const postInfo = extractFileInfo(post.name);
            if (postInfo) {
                // console.log(postInfo)
                const cardElement = createCardElement(postInfo, index);

                cardElement.onclick = (event) => {
                    // 블로그 게시글 링크 클릭 시 이벤트 중지 후 post 내용을 읽어와 contents 영역에 렌더링
                    event.preventDefault();
                    // contents 영역을 보이게 처리
                    document.getElementById("contents").style.display = "block";
                    // blog-posts 영역을 보이지 않게 처리
                    document.getElementById("blog-posts").style.display =
                        "none";
                    fetch(post.download_url)
                        .then((response) => response.text())
                        .then((text) =>
                            postInfo.fileType === "md"
                                ? styleMarkdown("post", text, postInfo)
                                : styleJupyter("post", text, postInfo)
                        )
                        .then(() => {
                            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                            const url = new URL(origin);
                            url.searchParams.set("post", post.name);
                            window.history.pushState({}, "", url);
                        });
                };
                document.getElementById("blog-posts").appendChild(cardElement);
            }
        });
        // contents 영역을 보이지 않게 처리
        document.getElementById("contents").style.display = "none";
    }
}

function renderOtherContents(menu) {
    /*
    menu에 다른 콘텐츠, 예를 들어 about이나 contect를 클릭했을 때 렌더링 하는 함수
    */
    // main 영역에 blog.md를 제외한 다른 파일을 렌더링
    document.getElementById("blog-posts").style.display = "none";
    document.getElementById("contents").style.display = "block";

    // 만약 menu가 string type 이라면 download_url, name을 menu로 설정
    if (typeof menu === "string") {
        menu = {
            download_url: origin + "menu/" + menu,
            name: menu.split("/")[menu.split("/").length - 1],
        };
    }
    fetch(menu.download_url)
        .then((response) => response.text())
        .then((text) => styleMarkdown("menu", text, undefined))
        .then(() => {
            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
            const url = new URL(origin);
            url.searchParams.set("menu", menu.name);
            window.history.pushState({}, "", url);
        });
}

async function initialize() {
    /*
    최초 실행 함수, URLparsing은 이 영역에서 담당하지 않고 index.html에서 로드 될 때 실행, blogList와 blogMenu는 initData.js에서 정의되고 로드될 때 실행. 다만 함수의 흐름을 파악하고자 이곳으로 옮겨올 필요성이 있음
    
    TODO: URL 파싱 결과 상세 블로그나 메뉴상태이면 검색 버튼을 누르기 전까지는 initDataBlogList()를 실행시킬 필요 없음. 이를 통해 API 호출 한 번을 아낄 수 있음.
    */
    if (!url.search.split("=")[1]) {
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
        if (url.search.split("=")[0] === "?menu") {
            document.getElementById("blog-posts").style.display = "none";
            document.getElementById("contents").style.display = "block";
            fetch(origin + "menu/" + url.search.split("=")[1])
                .then((response) => response.text())
                .then((text) => styleMarkdown("menu", text))
                .then(() => {
                    // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                    const url = new URL(window.location.href);
                    window.history.pushState({}, "", url);
                });
        } else if (url.search.split("=")[0] === "?post") {
            document.getElementById("contents").style.display = "block";
            document.getElementById("blog-posts").style.display = "none";
            postNameDecode = decodeURI(url.search.split("=")[1]).replaceAll(
                "+",
                " "
            );
            // console.log(postNameDecode)
            postInfo = extractFileInfo(postNameDecode);
            fetch(origin + "blog/" + postNameDecode)
                .then((response) => response.text())
                .then((text) =>
                    postInfo.fileType === "md"
                        ? styleMarkdown("post", text, postInfo)
                        : styleJupyter("post", text, postInfo)
                )
                .then(() => {
                    // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
                    const url = new URL(window.location.href);
                    window.history.pushState({}, "", url);
                });
        }
    }
}

initialize();
