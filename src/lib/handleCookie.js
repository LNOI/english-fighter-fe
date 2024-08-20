export function setCookie(name, value, expirationDays) {
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    if (expirationDays) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);
      cookieString += `; expires=${expirationDate.toUTCString()}; SameSite=Lax`;
    }  
    document.cookie = cookieString;
}

export function getCookie(name) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArr = decodedCookie.split(';');
    // //console.log(cookieArr)
    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
}
  
