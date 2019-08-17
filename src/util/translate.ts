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
        .then(res => res.json());

}
