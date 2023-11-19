const xhr = new XMLHttpRequest();
/**
 * Promise浅浅封装一下
 * @param method 
 * @param url 
 * @returns 
 */
function request<T = any>(method = 'GET', url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText as T)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.open(method, url, true)
        xhr.send()
    })
}