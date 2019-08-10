export const translate = async (word = 'ن‍‍س‍‍ا‍ك') => {
    if (!word) {
        return;
    }
    const url = new URL('http://localhost:3012/translation');
    const params = { word }
    type paramKeys = keyof typeof params;
    const paramKeys = Object.keys(params) as paramKeys[];
    paramKeys.forEach(_key => url.searchParams.append(_key, params[_key]))

    return fetch(url.toString(), {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        referrer: 'no-referrer'
    })
        .then(res => res.json())
    // .then(res => res.data.translations[0].translatedText);

}


// export const translate = async (word = 'ن‍‍س‍‍ا‍ك') => {
//     if (!word) {
//         return;
//     }
//     const url = new URL('https://translation.googleapis.com/language/translate/v2');
//     const params = {
//         key: 'AIzaSyC2BsJQJnYOvdpE37M8DvbLKnlf7iMmAQ8',
//         target: 'en',
//         source: 'ar',
//         q: word
//     }
//     type paramKeys = keyof typeof params;
//     const paramKeys = Object.keys(params) as paramKeys[];
//     paramKeys.forEach(_key => url.searchParams.append(_key, params[_key]))

//     return fetch(url.toString(), {
//         method: 'GET',
//         mode: 'cors',
//         cache: 'no-cache',
//         referrer: 'no-referrer'
//     })
//         .then(res => res.json())
//         .then(res => res.data.translations[0].translatedText);

// }