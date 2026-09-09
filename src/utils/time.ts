export const getCurrentTime = (): string => {
    const now = new Date().getHours();
    let message = '';
    if (now < 10) {
        message = '早上好'
    } else if (now < 12) {
        message = '上午好'
    }
    else if (now < 14) {
        message = '中午好'
    } else if (now < 18) {
        message = '下午好'
    }
    else {
        message = '晚上好'
    }
    return message;
}