const API_KEY = '1078bb37e6b440308bd6c8e562d0d5c6';
let newsList = []; // 뉴스리스트는 자주 쓰이는 요소이므로 전역변수.
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)));
let searchInput = document.getElementById("search-input");


const getLatesNews = async ()=>{ // 에이싱크 - 비동기
    /////const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

    // 도메인 제출용 누나 API.
    const url = new URL(`https://gogumi-news.netlify.app/top-headlines?`);

    fetchAPI(url);
};
const getNewsByCategory = async (event)=>{ // 탭 누르면 카테고리별 렌더링.
    // 타깃의 텍스트콘텐츠가 카테고리명이므로.
    const category = event.target.textContent.toLowerCase();
    /////const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    // 도메인 제출용 누나 API.
    const url = new URL(`https://gogumi-news.netlify.app/top-headlines?&category=${category}`);

    fetchAPI(url);
}
const searchNews = async ()=>{ // 돋보기 누르고 검색 시 렌더링.
    const search = document.getElementById("search-input").value;
    /////const url = new URL(`https://newsapi.org/v2/top-headlines?q=${search}&country=kr&apiKey=${API_KEY}`);
    // 도메인 제출용 누나 API.
    const url = new URL(`https://gogumi-news.netlify.app/top-headlines?q=${search}`);

    fetchAPI(url);
}

const fetchAPI = async (url)=>{ // 코드 리팩토링 -> API호출하는 함수.
    try{
        const response = await fetch(url);
        const data = await response.json();
         
        if(response.status === 200){
            // articles.length는 기사의 갯수이므로 키워드에 일치하는 기사가 없다면 에러발생.
            if(data.articles.length === 0){
                throw new Error("이 검색어에 맞는 결과가 없습니다!");
            }

            newsList = data.articles;
            render();
        }else{
            throw new Error(data.message);
        }

    }catch(error){
        errorRender(error.message);
    }
}

const render = ()=>{ // Todo App 처럼 화면요소들 보여주는 함수.
    const newsHTML = newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage || "data:image/png;base64,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"} />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${
                news.description==null || news.description== "" ? "표시할 내용 없음"
                : news.description.length>200 ? news.description.substring(0, 200) + "..."
                : news.description
        }</p>
        <div>
            ${news.source.name || "no source"} / ${moment(
                news.publishedAt
              ).fromNow()}
        </div>
    </div>
  </div>`).join(''); // 뉴스들 사이에 ,들 없애는 방법.
    // ES6 문법.. 리스트에 있는 아이템을 하나씩 알아서 들고와줌.

    document.getElementById("news-board").innerHTML = newsHTML;
}
const errorRender = (errorMessage)=>{ // 에러 발생 시 빨간 화면으로 보여주는 함수.
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;

    // 원래 있던 뉴스들을 다 치우고 그 자리에 보여주는 것 이므로.
    document.getElementById("news-board").innerHTML = errorHTML;
}

searchInput.addEventListener("keydown", function(event) { // 키보드 입력받는건 'keydown'이벤트!
    if(event.keyCode == 13) { // 엔터 = keyCode:13
        searchNews(event);
    }
})


// 햄버거 메뉴 관련 함수들.
const openNav = ()=>{
    document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = ()=>{
    document.getElementById("mySidenav").style.width = "0";
};
// 햄버거 메뉴 옆 서치박스 함수.
const openSearchBox = ()=>{
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

getLatesNews();
