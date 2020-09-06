// Work around Deezer CORS limitations via jsonp - see below in #jsonp
let callbackIndex = 0
const assignToWindow = (key: any, value: any) => {
  /*
    Sadly, typescript requires explicitly declaring globals.
    https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
    declare global { interface Window { variableName: any }}
    So for dynamically named globals as in the jsonp implementation (see below in #jsonp),
    we have to erase type information.
    Another way would be to do (<any>window)[key] = value
  */
  const clone: any = window
  clone[key] = value
}
const deleteFromWindow = (key: any) => {
  const clone: any = window
  delete clone[key]
}

class Deezer {
  async getTrack(id: string) {
    return await this.restGetCall('track', id)
  }

  async restGetCall(endpoint: string, resource: string) {
    const url: string = `https://api.deezer.com/${endpoint}/${resource}`
    return await this.jsonp(url)
  }

  jsonp(url: string) {
    // bypass CORS via jsonp w/o jquery
    // https://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
    // https://learn.jquery.com/ajax/working-with-jsonp/
    // Jsonp is definitely not the greatest way to go about CORS
    // https://blog.fullstacktraining.com/why-jsonp-shouldnt-be-used/
    // However, it seems like that's the only style deezer supports
    // https://github.com/deezer/code-snippets/blob/master/deezer-sdk-js/simple-deezer-api-request.js
    // Usually they imply a web use case, and have examples with the DZ module (which isn't
    // great for reference, since it only exists in minified form) - in our case,
    // dynamically linking it as a script would be the same as doing jsonp regardless.
    return new Promise((resolve, reject) => {
      const callbackId = (++callbackIndex) % 1000
      const callbackName = `jsonp_callback_${callbackId}`
      const callback = function(data: any) {
        deleteFromWindow(callbackName)
        document.body.removeChild(script)
        resolve(data)
      }
      assignToWindow(callbackName, callback)
      const script = document.createElement('script')
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName + "&output=jsonp"
      document.body.appendChild(script)
    })
  }
}

export default Deezer
