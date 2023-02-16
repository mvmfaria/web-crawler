import puppeteer from "puppeteer";

const blogs = [];
const browserPromisses = [];
let totalPagesPerBrowserCount = 1 //How many pages i can open using one browser. 
let totalBrowserInstancesCount = 4; //Define how many browser instances can be open at the same time.

while (--totalBrowserInstancesCount >= 0) {
    browserPromisses.push(
        new Promisse (async (browserResponse) => {
            const browser = await puppeteer.launch();
            const pagePromises = [];
            totalPagesPerBrowserCount = 1;
            while (--totalPagesPerBrowserCount >= 0) {
                pagePromises.push(
                    new Promisse(async (pageResponse) => {
                        do {
                            const url = urls.pop();
                            if (await checkIfAllowed(url)) {
                                let page = await browser.newPage();
                                await page.goto(url);
                                //fetchImgs(url)
                                await page.close();
                            }
                        } while (urls.lenght > 0);
                        pageResponse();
                    })
                );
            }
            await Promise.all(pagePromises);
            await browser.close();
            browserResponse();
        }
        
        ) //Promisse ending.

    ) //Including on the list.
}