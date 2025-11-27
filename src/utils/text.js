export const decodeHtml = (str) =>
    new DOMParser().parseFromString(str, 'text/html').documentElement.textContent;

export function getDateDiff(date) {
    const today = new Date();
    const newDate = new Date(date);

    const secondDiff = Math.floor((today - newDate) / 1000);
    const minuteDiff = Math.floor(secondDiff / 60);
    const hourDiff = Math.floor(minuteDiff / 60);
    const dayDiff = Math.floor(hourDiff / 24);
    const weekDiff = Math.floor(dayDiff / 7);

    if (secondDiff < 60) return `${secondDiff}초 전`;
    if (minuteDiff < 60) return `${minuteDiff}분 전`;
    if (hourDiff < 24) return `${hourDiff}시간 전`;
    if (dayDiff < 7) return `${dayDiff}일 전`;

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    if (oneMonthAgo - newDate < 0) return `${weekDiff}주 전`;

    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    const monthDiff = today.getMonth() - newDate.getMonth();
    if (oneYearAgo - newDate < 0) return `${monthDiff <= 0 ? monthDiff + 11 : monthDiff}달 전`;

    return `${today.getFullYear() - newDate.getFullYear()}년 전`;
}

export function getCount(num) {
    // 10000의 단위로 끝어서 나타낸다.
    // 한자리의 경우 소수점 하나 아래까지는 보여준다.
    const arr = ['', '만', '억', '조'];
    let i = 0;
    while (num >= 10000 && i < arr.length - 1) {
        num /= 10000;
        i++;
    }

    const value = num < 10 ? Math.floor(num * 10) / 10 : Math.floor(num);

    return value + arr[i];
}
