
import {KEY_USER_TOKEN} from '../constants/WebDefine';

export const fetchGET = async url => {
    console.log('URL ===>' + url);
    // any async code you want!
    let bearer = localStorage.getItem(KEY_USER_TOKEN);

    let token = 'Bearer ' + bearer;
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
        },
    });

    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
            throw new Error('Unauthorized Access');
        }
    }

    const resData = await response.json();

    console.log('RESPONSE DATA ===> ', resData);
    // if (resData.data.error_code != undefined) {
    //   throw new Error(resData.data.error_message);
    // }

    return resData;
};

export const fetchPOST = async (url, postData) => {
    // console.log('URL ===>' + url);
    // console.log('POST DATA ===> ' + JSON.stringify(postData));

    // any async code you want!
    let bearer =  localStorage.getItem(KEY_USER_TOKEN);
    let token = 'Bearer ' + bearer;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
            throw new Error('Unauthorized Access');
        }
    }

    const resData = await response.json();

    // console.log('RESPONSE DATA ===> ' + JSON.stringify(resData));

    // if (resData.data.error_code !== undefined) {
    //     throw new Error(resData.data.error_message);
    // }

    return resData;
};

export const fetchPOSTwithResponse = async (url, postData) => {

    let bearer =  localStorage.getItem(KEY_USER_TOKEN);
    let token = 'Bearer ' + bearer;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
            throw new Error('Unauthorized Access');
        }
    }

    const resData = await response.json();

    return {resData,response};
};

export const unAuthFetchGET = async url => {
    // console.log('URL ===>' + url);
    // any async code you want!
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
            throw new Error('Unauthorized Access');
        }
    }

    const resData = await response.json();

    // console.log('RESPONSE DATA ===> ', resData);
    // if (resData.data.error_code != undefined) {
    //   throw new Error(resData.data.error_message);
    // }

    return resData;
};

export const unAuthFetchPOST = async (url, postData) => {
    // console.log('URL ===>' + url);
    // console.log('POST DATA ===> ' + JSON.stringify(postData));

    // any async code you want!
    // let bearer =  localStorage.getItem(KEY_USER_TOKEN);
    // let token = 'Bearer ' + bearer;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
            throw new Error('Unauthorized Access');
        }
    }

    const resData = await response.json();

    // console.log('RESPONSE DATA ===> ' + JSON.stringify(resData));

    // if (resData.data.error_code !== undefined) {
    //     throw new Error(resData.data.error_message);
    // }

    return resData;
};
