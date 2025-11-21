export const decodeHtml = (str) =>
    new DOMParser().parseFromString(str, 'text/html').documentElement.textContent;
