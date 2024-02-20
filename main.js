/////const API_KEY = '1078bb37e6b440308bd6c8e562d0d5c6';
let news = []; // 뉴스는 자주 쓰이는 애이므로 전역변수.

const getLatesNews = async ()=>{ // 에이싱크 - 비동기
    /////const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    // 도메인 제출용 누나 API.
    const url = new URL(`https://gogumi-news.netlify.app/top-headlines?`);
    const response = await fetch(url);
    const data = await response.json(); // body에 있는 것은 json형태로 받아와줘야 한다.
    news = data.articles // 재할당만.

    console.log(response);
    console.log("ddddd", news);
};

getLatesNews();
