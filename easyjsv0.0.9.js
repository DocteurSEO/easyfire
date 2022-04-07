export function getHTML(selector) {
    return document.querySelector(selector)
}

export function insertHTML(selector, html) {
    getHTML(selector).innerHTML = html
}

export function createHTML(selector, html, className){
    const domElement = document.createElement(selector)
    domElement.innerHTML = html
    domElement.className = className

    return {
        dom:domElement,
        html : (html) => domElement.innerHTML = html,
        id : (id) => domElement.id = id,
        append  : (child)=> domElement.appendChild(child),
        addTo :(selector) => getHTML(selector).appendChild(domElement),
        before : (selector) => { getHTML('body').insertBefore(domElement, getHTML(selector))}
    }


}

export function addClick(selector, fn) {

    getHTML(selector).addEventListener('click', function(e){

        fn(e)
})}

export function getParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    const result = urlParams.get(param)
    return result 
}


export function redictUser(url){
    window.location.href = url
}