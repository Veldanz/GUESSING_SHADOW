export function postMessage(message : any) {
    const msg = JSON.stringify(message);
    window.parent.postMessage(msg, '*');
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(message);
    } else if (window.parent !== window) {
        window.parent.postMessage(message);
    }
}