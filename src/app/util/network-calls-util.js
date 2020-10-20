//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {TIME_OUT} from "../app-config";
import {isEmptyArray, isEmptyString, isNullUndefined, isObject, stringifyObject} from "./util";

/**
 * sd _ Kaybarax
 * @param params
 * @returns {XMLHttpRequest}
 */
export function appXHR(params) {
    let xhr = new XMLHttpRequest();
    xhr.open(params.method, params.url, true);
    if (params.method.toLocaleLowerCase() === 'get') {
        // @ts-ignore
        xhr.setRequestHeader("Accept", params.accept);
    }
    if (params.method.toLocaleLowerCase() === 'post' ||
        params.method.toLocaleLowerCase() === 'put') {
        // @ts-ignore
        xhr.setRequestHeader("Content-Type", params.contentType);
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Cache-Control", "max-age=1000");
    if (params.hasOwnProperty("secure") && params["secure"] === true) {
        // @ts-ignore
        xhr.setRequestHeader("APPSESSIONID", params.APPSESSIONID);
    }
    //any further request headers
    if (!isEmptyArray(params["requestHeaders"])) {
        // @ts-ignore
        for (let requestHeader of params["requestHeaders"]) {
            xhr.setRequestHeader(requestHeader["key"], requestHeader["value"]);
        }
    }
    xhr.timeout = TIME_OUT;
    return xhr;
}

/**
 * sd
 * @param params
 * @returns {Promise<void>}
 * hint: any function that call this function, should best be an async function
 */
export function xhrPromise(params) {

    return new Promise((resolve, reject) => {

        //firstValidate
        if (!isObject(params)) {
            reject({
                status: "unknown_params",
                statusText: "Unknown params provided"
            });
            return;
        }

        if (isEmptyString(params.url) ||
            isEmptyString(params.method)
        ) {
            reject({
                status: "invalid_params",
                statusText: "Invalid params provided"
            });
            return;
        }

        let request = appXHR({
            url: params.url,
            method: params.method,
        });

        request.ontimeout = () => {
            reject({
                status: "timeout",
                statusText: "Request timed out"
            });
        };

        request.onerror = () => {
            reject({
                status: "onerror",
                statusText: "Request error! " + stringifyObject(request)
            });
        };

        request.onload = () => {

            let data;

            try {
                data = request.responseText;
                data = eval("(" + data + ")");
            } catch (error) {
                reject({
                    status: "failure",
                    statusText: "Request data error",
                    data: request.responseText
                });
                return;
            }

            resolve({
                status: "success",
                statusText: "Promise resolved successfully",
                data: data
            });

        };

        //if payload, must be object to adhere to
        //communication of data back and to a server via json only
        if (!isNullUndefined(params.payload)) {
            request.send(JSON.stringify(params.payload));
        } else {
            request.send();
        }

    });

}
