// config.js
const siteConfig = {
    username: "paullabkorea", // GitHub 사용자 이름
    repositoryName: "github_blog", // GitHub 저장소 이름
    mainColor: "#3498db", // 사이트의 주 색상
    textColor: "#333333", // 기본 텍스트 색상
    blogTitle: "" // 블로그 제목
};

// 아직 사용하고 있지는 않지만 여러명의 저자가 글을 쓸 경우 프로필 설정
// grade는 다른 이름으로 수정
const users = [{
    'id': 0, // default author
    'username': 'licat',
    'company': 'weniv',
    'grade': 'CEO',
    'img': 'img/user/licat.png'
}]

const localDataUsing = false; // 로컬 데이터 사용 여부
    /*
    아직 사용하는 데이터가 아닙니다.
    1. false일 경우에도 로컬에서 live server(127.0.0.1)를 사용하면 local 데이터를 사용합니다.
    2. true일 경우 local 데이터를 사용합니다 접속자가 많을 경우 true 변경하고 local 데이터를 작성하고 사용하시길 권합니다.
    */