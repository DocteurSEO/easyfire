export function getHTML(selector) {
    return document.querySelector(selector)
}

export function insertHTML(selector, html) {
    getHTML(selector).innerHTML = html
}

export function createHTML(selector,options={}){
 

    const element = document.createElement(selector)
    Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
        element.className = value
        return
      }
  
      if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue
        })
        return
      }
  
      if (key === "text") {
        element.textContent = value
        return
      }
  
      element.setAttribute(key, value)
    })
     

    return {
        element,
        html : (html) => element.innerHTML = html,
        id : (id) => element.id = id,
        append  : (child)=> element.appendChild(child),
        addTo :(selector) => getHTML(selector).appendChild(element),
        before : (selector) => { getHTML('body').insertBefore(element, getHTML(selector))}
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