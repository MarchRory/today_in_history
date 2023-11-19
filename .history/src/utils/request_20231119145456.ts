const xhr = new XMLHttpRequest();
const Api = 'https://m.maoyan.com/ajax/comingList?ci=10&token=&limit=50'
/**
 * Promise浅浅封装一下
 * @param method 
 * @param url 
 * @returns 
 */
function request<T = any>(): Promise<T> {
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText) as T)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.open('GET', Api, true)
        xhr.send()
    })
}

export default request

