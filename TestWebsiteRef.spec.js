const {test, expect} = require('@playwright/test')

//CHANGES IN SB


let url = "https://automationexercise.com/login"
let username_email ="Apple@123";


test(" Test Website", async({page})=>{

    await page.goto(url);

    //LOGIN PAGE
    expect(await page.title("Automation Exercise"));
    await page.locator('#form').getByRole('heading', { name: 'Login to your account' }).isVisible();

    await page.getByPlaceholder('Email Address').first().fill(username_email);

    await page.getByPlaceholder('Password').fill(username_email);

    await page.getByRole('button',{name:"Login"}).click();


//Product page
    await page.getByRole('link', { name: 'Products' }).click();

    await page.getByRole('heading', { name: 'All Products', level: 2 }).isVisible();

    await page.locator(`a[href="/product_details/2"]`).click();

    const prodname = await page.locator('.product-information h2').textContent();
    console.log("Product name: ", prodname);

    await page.getByRole('button',{name:"Add to cart"}).click()

    await page.locator('.modal-body .text-center').first().isVisible();

    const pop_upmsg = await page.locator('.modal-body .text-center').first().textContent();
    expect(pop_upmsg).toContain("added"); 

    await page.locator('.modal-body .text-center').nth(1).click();

    await page.locator(`a:has-text("Proceed To Checkout")`).click();

    await page.locator('[name="message"]').isVisible();
    await page.locator('[name="message"]').fill("Test comment added");

    await page.locator('a[href="/payment"]').click();

    //payment page
    await page.locator('input[name="name_on_card"]').fill("Harry G");

    await page.locator('input[name="card_number"]').fill("12345678");

    await page.getByPlaceholder('ex. 311').fill("007")

    await page.getByPlaceholder('MM').fill("10")

    await page.getByPlaceholder('YYYY').fill("2027")

    await page.locator('button[data-qa="pay-button"]').click();

    //Cofirmation page

    const confpage = await page.locator(`div.row > div > h2 > b`).textContent();
    console.log("Message: ", confpage);

    expect(confpage).toContain("Order Placed");


})