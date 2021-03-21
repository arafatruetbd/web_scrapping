const puppeteer = require('puppeteer');


const webScrap = async (URL) => {
    let movieURL = `${URL}`;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let posts = [];

    await page.goto(movieURL, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
        let posts = document.querySelectorAll("h2");
        const postsTitle = Array.from(posts).map(post => post.innerText);

        return {
            postsTitle
        }
    });
    posts.push(data);
    console.log(posts);
    await browser.close();
}

(async () => {
    webScrap('https://medium.com/');
    webScrap('https://www.businessinsider.com/');
})();
