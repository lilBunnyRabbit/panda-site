export const print1 = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('1')
    return next(action)
  }
  
  export const print2 = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('2')
    return next(action)
  }
  
  export const print3 = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('3')
    return next(action)
  }
  