// const video = document.getElementById('video');
// const captureButton = document.getElementById('captureButton');
// const canvas = document.getElementById('canvas');
// const result = document.getElementById('result');

// // 获取摄像头视频流
// navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => {
//         video.srcObject = stream;
//     })
//     .catch(error => {
//         console.error('Error accessing camera:', error);
//         result.innerText = 'Unable to access the camera. Please check your permissions.';
//     });

// // 拍照并上传到 API
// captureButton.addEventListener('click', async () => {
//     try {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

//         // 将 canvas 转换为 Base64 编码的图片数据
//         const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

//         // 发送 Base64 编码的图片数据到百度 OCR API
//         const ocrResultText = await sendImageToApi(imageData);

//         // 使用 DeepSeek API 进行内容总结
//         const summarizedText = await summarizeContent(ocrResultText);

//         // 显示结果
//         result.innerText = 'Result: ' + summarizedText;
//     } catch (error) {
//         console.error('Error capturing or processing image:', error);
//         result.innerText = 'An error occurred while processing the image. Please try again.';
//     }
// });

// // 发送图片数据到百度 OCR API
// async function sendImageToApi(imageData) {
//     const configUrl = 'config.json';
//     let config = null;

//     // 加载配置文件
//     try {
//         const response = await fetch(configUrl);
//         config = await response.json();
//     } catch (error) {
//         console.error('Error loading config:', error);
//         throw new Error('Failed to load configuration. Please check your config file.');
//     }

//     const requestUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/webimage";
//     const accessToken = config.access_token;
//     const requestUrlWithToken = `${requestUrl}?access_token=${accessToken}`;

//     const params = {
//         image: imageData
//     };

//     const headers = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     };

//     try {
//         const response = await fetch(requestUrlWithToken, {
//             method: 'POST',
//             headers: headers,
//             body: new URLSearchParams(params)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();
//         if (data.words_result && Array.isArray(data.words_result)) {
//             return data.words_result.map(item => item.words).join('\n');
//         } else {
//             return 'No words detected';
//         }
//     } catch (error) {
//         console.error('Error sending image to API:', error);
//         throw new Error('Failed to send image to OCR API. Please check your network connection and API credentials.');
//     }
// }

// // 使用 DeepSeek API 进行内容总结
// async function summarizeContent(ocrText) {
//     const configUrl = 'config.json';
//     let config = null;

//     // 加载配置文件
//     try {
//         const response = await fetch(configUrl);
//         config = await response.json();
//     } catch (error) {
//         console.error('Error loading config:', error);
//         throw new Error('Failed to load configuration. Please check your config file.');
//     }

//     const deepSeekApiKey = config.api_key;

//     const openai = new OpenAI({
//         baseURL: 'https://api.deepseek.com',
//         apiKey: deepSeekApiKey
//     });

//     try {
//         const completion = await openai.chat.completions.create({
//             model: "deepseek-chat",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 { role: "user", content: `Please summarize the following text: ${ocrText}` }
//             ],
//         });

//         return completion.choices[0].message.content;
//     } catch (error) {
//         console.error('Error summarizing content:', error);
//         throw new Error('Failed to summarize content. Please check the input text and try again.');
//     }
// }


// script.js
const video = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');

// 获取摄像头视频流
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing camera:', error);
    });

// 拍照并上传到 API
captureButton.addEventListener('click', async () => {
    try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        // 将 canvas 转换为 Base64 编码的图片数据
        const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

        // 发送 Base64 编码的图片数据到百度 OCR API
        const resultText = await sendImageToApi(imageData);

        // 显示结果
        result.innerText = 'Result: ' + resultText;
    } catch (error) {
        console.error('Error capturing or processing image:', error);
        result.innerText = 'An error occurred.';
    }
});

// 发送图片数据到百度 OCR API
async function sendImageToApi(imageData) {
    const configUrl = 'config.json';
    let config = null;

    // 加载配置文件
    try {
        const response = await fetch(configUrl);
        config = await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        throw new Error('Failed to load configuration.');
    }

    const requestUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/webimage";
    const accessToken = config.access_token;
    const requestUrlWithToken = `${requestUrl}?access_token=${accessToken}`;

    const params = {
        image: imageData
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await fetch(requestUrlWithToken, {
            method: 'POST',
            headers: headers,
            body: new URLSearchParams(params)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.words_result && Array.isArray(data.words_result)) {
            return data.words_result.map(item => item.words).join('\n');
        } else {
            return 'No words detected';
        }
    } catch (error) {
        console.error('Error sending image to API:', error);
        throw new Error('An error occurred.');
    }
}
