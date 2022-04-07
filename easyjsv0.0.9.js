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





export function whatYouWant (element,className, html, selector) {
  const wyw = document.createElement(element)
   

  return {

      element: wyw,
      /* Ajout de l'élément au DOM. */
      addTo: function (selector){
          document.querySelector(selector).appendChild(wyw)
          return this
      },

      addBefore: function (selector){
          document.querySelector('body')
          
          .insertBefore(wyw, document.querySelector(selector));
          return this
      },
      
      
      /* C'est une fonction qui ajoute une classe à l'élément. */
      addClass: function (className) {
         

          
          wyw.className = className
          return this
      },
      /* C'est une fonction qui ajoute des éléments à l'élément. */
      
      addMore: function (...args) {



          for(let i in arguments) {
             if(i%2 == 0){
              const test = document.createElement(arguments[i])
              
              test.textContent = arguments[Number(i)+1]
              wyw.appendChild(test) 
             }
             
            
            
              }

              return this
       }, 

       click : function (fn)  
       { wyw.addEventListener("click", (e) => fn(e))
         return this
        }, 

        rediction : function (url)  
        { 
          wyw.addEventListener("click", (e) => window.location.href = url)
        
         return this
        }, 


        addHTML : function (html)  
        { 
          wyw.innerHTML = html
         return this
        }, 

        addStyle : function (style)  
        { 
          wyw.style = style
         return this
        }, 


        addAttribute : function (key, value){
          wyw.setAttribute(key, value)
            return this
        }, 
        change:  function (fn)  
        { wyw.addEventListener("input", (e) => fn(e))
          return this
         },           

    
}}