
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
