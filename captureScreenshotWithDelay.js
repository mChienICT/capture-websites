const axios = require('axios');
const fs = require('fs');
const md5 = require('md5');

// delay function
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFilename(url) {
    const regex = /^https:\/\//;
    return url.replace(regex, '');
}

// capture website with api
async function captureScreenshot(apiUrl, params, delayMs = 0) {
    try {
        if (delayMs > 0) {
            // Thực hiện delay vài giây trước mỗi request
            console.log(`Waiting for: ${delayMs}ms before new request.`);
            await delay(delayMs);    
        }
        console.log('Sending request ...');
        const response = await axios.get(apiUrl, { params, responseType: 'arraybuffer' });
        console.log('Screenshot captured successfully!');

        // Lưu ảnh vào tệp
        let fileName = await getFilename(params.url);
        fs.writeFileSync('./captured_folder/' + fileName + ".jpg", response.data);        
        console.log(`Screenshot saved as '${fileName}'.`);
    }
    catch (error) {
        console.log('Error: ', error.message);
    }
}

// main function
async function main() {
    const configs = {
        // apiUrl: "http://api.screenshotlayer.com/api/capture",
        apiUrl: "https://screenshot.abstractapi.com/v1/",
        accessKey: "c4618a7067874f33903c1a48cc26cc3b",
        format: 'jpg',
        fullpage: 1,
    };
    const secret_key = 'banhnattosualethanhduy';
    const listUrl = ["https://autojet.mauthemewp.com"];
    const delayMs = 500;    

    for(let index = 0; index < listUrl.length; index++) {
        const params = {
            api_key: configs.accessKey,
            //fullpage: configs.fullpage,
            url: listUrl[index],
            //secret_key: md5(listUrl[index] + secret_key)
        };        
        await captureScreenshot(configs.apiUrl, params, delayMs);
    }
}

main();