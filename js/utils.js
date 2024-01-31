function extractFromUrl() {
    // URLparsing.js에서 사용
    // URL에서 username과 repositoryName 추출
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

function convertSourceToImage(source) {
    // convertIpynbToHtml.js에서 사용
    // Base64 이미지 데이터 식별을 위한 정규 표현식
    const base64ImageRegex = /!\[.*?\]\(data:image\/(png|jpeg);base64,(.*?)\)/g;

    // 이미지 데이터를 찾고, 각 매치에 대해 이미지 태그 생성
    return source.replace(base64ImageRegex, (match, fileType, imageData) => {
        return `<img src="data:image/${fileType};base64,${imageData}" alt="Embedded Image" />`;
    });
}

function escapeHtml(text) {
    // convertIpynbToHtml.js에서 사용
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function extractFileInfo(filename) {
    // render.js에서 사용
    // 파일 이름에서 정보 추출하는 함수

    // 정규 표현식을 사용하여 날짜, 제목, 카테고리, 썸네일 정보 추출
    const regex = /^\[(\d{8})\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\]_\[(.*?)\].(md|ipynb)$/;
    const matches = filename.match(regex);
    // console.log(`extractFileInfo: ${matches}`);

    if (matches) {
        return {
            date: matches[1],
            title: matches[2],
            category: matches[3],
            thumbnail: matches[4] ? 'img/' + matches[4] : 'img/default.png',
            description: matches[5].length > 25 ? matches[5].substring(0, 25) + '...' : matches[5],
            fileType: matches[6]
        };
    }
    return null;
}

function formatDate(dateString) {
    // render.js에서 사용
    // YYYYMMDD 형식의 문자열을 받아 YYYY/MM/DD 형식으로 변환
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${year}/${month}/${day}`;
}