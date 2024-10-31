// // script.js
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
//         const resultText = await sendImageToApi(imageData);

//         // 显示结果
//         result.innerText = 'Result: ' + resultText;
//     } catch (error) {
//         console.error('Error capturing or processing image:', error);
//         result.innerText = 'An error occurred.';
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
//         throw new Error('Failed to load configuration.');
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
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (data.words_result && Array.isArray(data.words_result)) {
//             return data.words_result.map(item => item.words).join('\n');
//         } else {
//             return 'No words detected';
//         }
//     } catch (error) {
//         console.error('Error sending image to API:', error);
//         throw new Error('An error occurred.');
//     }
// }


const video = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');

// 检测设备类型
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (isMobile) {
    // 移动端逻辑
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('imagePreview');

        if (file) {
            const reader = new FileReader();

            reader.onload = async function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                
                // 发送图片数据到百度 OCR API
                const imageData = e.target.result.split(',')[1];
                const resultText = await sendImageToApi(imageData);
                result.innerText = 'Result: ' + resultText;
            };

            reader.readAsDataURL(file);
        }
    });
} else {
    // 电脑端逻辑
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });

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
}

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