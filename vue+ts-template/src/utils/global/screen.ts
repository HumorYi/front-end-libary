const execute = (element: HTMLElement | HTMLDocument, method: Function) => {
  if (method) {
    method.call(element)
    return
  }

  if (typeof window.ActiveXObject !== 'undefined') {
    //for Internet Explorer
    const wScript = new ActiveXObject('WScript.Shell')
    wScript && wScript.SendKeys('{F11}')
  }
}

export const fullScreen = (element: HTMLElement) => {
  const method =
    element['requestFullScreen'] || //W3C
    element['webkitRequestFullScreen'] || //FireFox
    element['mozRequestFullScreen'] || //Chrome等
    element['msRequestFullScreen'] //IE11

  execute(element, method)
}

export const exitScreen = () => {
  const method =
    document['exitFullscreen'] || //W3C
    document['mozCancelFullScreen'] || //FireFox
    document['webkitExitFullscreen'] || //Chrome等
    document['webkitExitFullscreen'] //IE11

  execute(document, method)
}

export const isFullScreen = () => {
  return Boolean(
    document['fullscreenEnabled'] ||
      window['fullScreen'] ||
      document['webkitIsFullScreen'] ||
      document['msFullscreenEnabled']
  )
}
