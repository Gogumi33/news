const API_KEY = '1078bb37e6b440308bd6c8e562d0d5c6';
let newsList = []; // 뉴스는 자주 쓰이는 애이므로 전역변수.

const getLatesNews = async ()=>{ // 에이싱크 - 비동기
    /////const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    // 도메인 제출용 누나 API.
    const url = new URL(`https://gogumi-news.netlify.app/top-headlines?`);
    const response = await fetch(url);
    const data = await response.json(); // body에 있는 것은 json형태로 받아와줘야 한다.
    newsList = data.articles // 재할당만.
    render(); // 뉴스 리스트가 확정되는 순간 렌더를 해주겠다.

    console.log(response);
    console.log("ddddd", newsList);
};

const render=()=>{
    const newsHTML = newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage} />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
  </div>`).join('');
    // ES6 문법.. 리스트에 있는 아이템을 하나씩 알아서 들고와줌.

    document.getElementById("news-board").innerHTML = newsHTML;
}


// 햄버거 메뉴 관련 함수들.
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};
// 햄버거 메뉴 옆 서치박스 함수.
const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};



getLatesNews();
