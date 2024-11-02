    async function sendImageToApi(imageData) {
    const configUrl = 'config.json';
    let config = null;

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

    const params = { image: imageData };
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    try {
        const response = await fetch(requestUrlWithToken, {
            method: 'POST',
            headers: headers,
            body: new URLSearchParams(params)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.words_result && Array.isArray(data.words_result)) {
            return data.words_result.map(item => item.words).join('\n');
        } else {
            return '未检测到文字';
        }
    } catch (error) {
        console.error('Error sending image to API:', error);
        throw new Error('出现错误。');
    }
}