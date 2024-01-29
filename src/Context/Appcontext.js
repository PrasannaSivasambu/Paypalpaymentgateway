import React, { useContext, useEffect, useState ,useRef} from 'react'


const AppcontextContext = React.createContext()

export function useAppcontext() {

  return useContext(AppcontextContext)
  
}

export function AppcontextProvider({children }) {   
    let fixedprice=1
    const [amount, setAmount] = useState(fixedprice.toFixed(2));
   
    // const value={runAppcontext,frontPageAppcontexts,setFrontPageAppcontexts,BlackRotateInterpolateY,WhiteRotateInterpolateY,Profiletranslateinterpolate,MainViewScaleYInterpolate,MainviewtranslateYInterpolate,MainViewtranslateXInterpolate,MainViewscaleXInterpolate,scalezoomoutInterpolate,scaleplayInterpolate,BlackKnightAnimeInterpolate,WhiteKnightAnimeInterpolate,BlackKnightRotateXInterpolate,WhiteKnightRotateXInterpolate}
  return (
    <AppcontextContext.Provider value={{amount,setAmount}}>
      {children}
    </AppcontextContext.Provider>
  )
}
