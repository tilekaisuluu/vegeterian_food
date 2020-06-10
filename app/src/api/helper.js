import {
    Platform,
} from 'react-native';

const makeBlob = (uri) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        resolve(xhr.response);
    };
    xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
});

export const uploadImage = (firebase, uri, refPath) => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

        const ref = firebase.storage().ref(refPath)

        let uploadBlob = null;

        makeBlob(uploadUri)
            .then((blob) => {
                uploadBlob = blob
                return ref.put(blob)
            })
            .then(() => {
                uploadBlob.close()
                return ref.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
}