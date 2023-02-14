const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('https://www.nike.com/gb/');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

//WORKING
test("Complex CSS selector", async () => {
    const element = await browser.getElementByCss('.pre-l-desktop-menu.d-sm-h.d-lg-b.ta-sm-l.ta-lg-c > ul > li:nth-child(2) > a');
    const text = await element.getText();
    expect(text).toBe('Men');
});

test("Initially has a search bar", async () => {
    const element = await browser.getElement("VisualSearchInput");
    const tagName = await element.getTagName();
    expect(tagName).toBe('input');
});

test("Initially has a search submit button", async () => {
    const element = await browser.getElementByCss('button.pre-search-btn.ripple');
    const tagName = await element.getTagName();
    expect(tagName).toBe('button');
});

// Not working
// test("Click on Women anchor", async () => {
//     await browser.waitForElementByCss('.pre-l-desktop-menu.d-sm-h.d-lg-b.ta-sm-l.ta-lg-c > ul > li:nth-child(3) > a');
//     const element = await browser.getElementByCss('.pre-l-desktop-menu.d-sm-h.d-lg-b.ta-sm-l.ta-lg-c > ul > li:nth-child(3) > a');
//     await element.click();
//     await browser.waitForElementByCss('.vVtA7wL6.headline-5.text-color-primary-dark');
//     const pageText = await browser.getElementByCss('.vVtA7wL6.headline-5.text-color-primary-dark');
//     const text = await pageText.getText();
//     expect(1).toBe(1)
// })

// test("Check the color", async () => {
//     const element = await browser.getElement(".si35-ISy.-dzJvCiA.responsive-display-2-1._2svRm8bR.text-color-primary-dark");
//     const getCssValue = await element.getCssValue('color')
//     expect(getCssValue).toBe('rgb(17, 17, 17)')
// })