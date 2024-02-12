// 유지보수를 위해 만든 전역변수 파일입니다. 함수는 없습니다.
const registry = {
    // utils.js
    // convertIpynbToHtml.js

    // globalStyle.js
    // blogContentsStyle.js

    // mobileMenuToggle.js
    ////// menuButton
    ////// menu
    ////// mobileMenu

    // config.js
    'config_siteConfig': siteConfig,
    'config_users': users,
    'config_localDataUsing': localDataUsing,
    // URLparsing.js
    'URLparsing_defaultTitle': defaultTitle,
    'URLparsing_url': url, // new URL(window.location.href);
    'URLparsing_origin': origin, // url.origin + url.pathname;
    'URLparsing_pathParts': pathParts, // url.pathname.split("/").filter((part) => part.length > 0);
    'URLparsing_isLocal': isLocal, // url.hostname === "127.0.0.1" || url.hostname === "localhost";
    // initData.js
    'initData_blogList': blogList,
    'initData_blogMenu': blogMenu,
    'initData_isInitData': isInitData,
    // render.js
    ////// searchInput
    ////// searchInputButton
};