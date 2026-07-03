const{test, request, expect} = require('@playwright/test')
const datacred = {userEmail:"HarryP@gmail.com",userPassword:"Apple@123"}
let token;

test.beforeAll("",async()=>{

    const context = await request.newContext();
    const postapirequest = await context.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:datacred
        })
     expect((await postapirequest).ok()).toBeTruthy();
    
     const postjson = await postapirequest.json();

     token = postjson.token;
     console.log(token)

     const postjosnmsg = postjson.message;
     console.log(postjosnmsg);

})

test(" test ",async({ page })=>{

     await page.addInitScript((injectToken) => {
        window.localStorage.setItem('token', injectToken)
    }, token)

   await page.goto('https://rahulshettyacademy.com/client')
    
       const productsLocator = page.locator('//h5/b')
    await productsLocator.first().waitFor({ state: 'visible' })

    // Count of products should be greater than 0
    const productCount = await productsLocator.count()
    expect(productCount).toBeGreaterThan(0)

    await page.waitForTimeout(3000);
})