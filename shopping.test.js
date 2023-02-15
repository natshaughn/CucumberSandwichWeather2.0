const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('http://localhost:8080');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);


// Test to see if the heading is a h1
test('Initially has a header', async () => {
    const element = await browser.getElementByCss("h1");
    const tagName = await element.getTagName();
    expect(tagName).toBe('h1');
});

// Test to check the headings text matches
test("Check heading text is correct", async () => {
    const element = await browser.getElementByCss('h1');
    const text = await element.getText();
    expect(text).toBe('Credersi Shopping List');
})

// Test to see if the input section has an input tag
test("Initially has a input section", async () => {
    const element = await browser.getElementByCss("#new-item");
    const tagName = await element.getTagName();
    expect(tagName).toBe('input');
});

// Check the create button is a button 
test("Initially has a create button", async () => {
    const element = await browser.getElementByCss('#create-item');
    const tagName = await element.getTagName();
    expect(tagName).toBe('button');
});

// Test to see if an item has been created, checking tag and text
test("Item correct after being created", async () => {
    const itemCrisps = 'Crisps';

    const createInput = await browser.getElementByCss('#new-item');
    const createSubmit = await browser.getElementByCss('#create-item');

    await createInput.sendKeys(itemCrisps);
    await createSubmit.click();
    await browser.waitForElementByCss('#item-1', timeout/2);

    const element = await browser.getElementByCss('#item-1');
    const tagName = await element.getTagName();
    expect(tagName).toBe('item');

    const text = await element.getText();

    expect(text.startsWith(itemCrisps)).toBe(true);
}, timeout);

test("Check the color of the h1", async () => {
    const element = await browser.getElementByCss('#item-1');
    const colour = await element.getCssValue('color');
    expect(colour).toBe('rgba(51, 51, 51, 1)')
})

