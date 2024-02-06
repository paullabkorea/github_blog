const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
    /*
    모바일 환경에서 menu, 이 menu는 이벤트 위임으로 최적화하면 불필요한 코드가 많은 함수입니다. 시간상 최적화하지 않고 넘깁니다.
    */
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu.innerHTML === "") {
        // menu의 내용을 mobileMenu에 복사
        mobileMenu.innerHTML = menu.innerHTML;
        // 각 메뉴 항목에 애니메이션 스타일 적용
        const menuItems = mobileMenu.querySelectorAll("a");
        menuItems.forEach((item, index) => {
            item.classList.add(...mobileMenuStyle.split(" "));
            if (index == 0) {
                item.classList.add("mt-1.5");
            }
            item.style.animation = `slideDown forwards ${index * 0.2}s`;
            item.onclick = (event) => {
                // 메뉴 링크 클릭 시 이벤트 중지 후 menu 내용을 읽어와 contents 영역에 렌더링
                event.preventDefault();

                if (item.innerText + ".md" === "blog.md") {
                    if (blogList.length === 0) {
                        // 블로그 리스트 로딩
                        initDataBlogList().then(() => {
                            renderBlogList();
                        });
                    } else {
                        renderBlogList();
                    }
                    // console.log(origin)
                    const url = new URL(origin);
                    url.searchParams.set("menu", item.innerText + ".md");
                    window.history.pushState({}, "", url);
                    mobileMenu.innerHTML = "";
                } else {
                    renderOtherContents(item.innerText + ".md");
                    mobileMenu.innerHTML = "";
                }
            };
        });
    } else {
        mobileMenu.innerHTML = "";
    }
});
