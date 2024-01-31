import React, { useContext, useState } from 'react'


const AppcontextContext = React.createContext()

export function useAppcontext() {

  return useContext(AppcontextContext)
  
}

export function AppcontextProvider({children }) {   
    let fixedprice=1
    const [amount, setAmount] = useState(fixedprice.toFixed(2));
    const [selectedcurrency, setSelectedCurrency] = useState('USD')
    const [selectedproducts,setSelectedProducts]=useState([])
    const serverurl='http://localhost:8888'
    const products = [
      {
        name: "Product1",
        img: "https://purepng.com/public/uploads/large/purepng.com-laptopelectronicslaptopcomputer-941524676166s0nuj.png",
        amount: 200,
      },
      {
        name: "Product2",
        img: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-a12-3.jpg",
        amount: 150,
      },
      {
        name: "Product3",
        img: "https://www.apple.com/newsroom/images/product/os/ipados/apple_ipados14_widgets_062220.jpg.news_app_ed.jpg",
        amount: 100,
      },
      {
        name: "Product4",
        img: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-a12-1.jpg",
        amount: 120,
      },
      {
        name: "Product5",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaVC-VrBFhfsOOqLp7qE2mifMQeF3pVDEttYRGWuvx7HAU0tkygqUtf-ZjqJUNhFuAHc&usqp=CAU",
        amount: 110,
      },
      {
        name: "Product6",
        img: "https://media.istockphoto.com/id/511991248/vector/smartphone-with-app-icons.jpg?s=612x612&w=0&k=20&c=UmEdw7hbpARzqW5bJEZc4sBao0WA56wB-vZlBGkI23k=",
        amount: 130,
      },
      {
        name: "Product7",
        img: "https://img.freepik.com/premium-vector/smart-phone-with-blank-screen-isolated-white-background_150973-389.jpg?w=360",
        amount: 145,
      },
      {
        name: "Product8",
        img: "https://static.vecteezy.com/system/resources/thumbnails/006/839/635/small_2x/laptop-computer-notebook-with-blank-screen-on-white-background-free-photo.jpg",
        amount: 90,
      },
      {
        name: "Product8",
        img: "https://media.istockphoto.com/id/1023428598/photo/3d-illustration-laptop-isolated-on-white-background-laptop-with-empty-space-screen-laptop-at.jpg?s=612x612&w=0&k=20&c=ssK6er5v1fGpSghGiqySwoD8tn5blC7xgefQJI2xU38=",
        amount: 180,
      },
    ];
    // const value={runAppcontext,frontPageAppcontexts,setFrontPageAppcontexts,BlackRotateInterpolateY,WhiteRotateInterpolateY,Profiletranslateinterpolate,MainViewScaleYInterpolate,MainviewtranslateYInterpolate,MainViewtranslateXInterpolate,MainViewscaleXInterpolate,scalezoomoutInterpolate,scaleplayInterpolate,BlackKnightAnimeInterpolate,WhiteKnightAnimeInterpolate,BlackKnightRotateXInterpolate,WhiteKnightRotateXInterpolate}
  return (
    <AppcontextContext.Provider onChange={{}} value={{products,selectedproducts,setSelectedProducts,selectedcurrency, setSelectedCurrency,serverurl,amount,setAmount}}>
      {children}
    </AppcontextContext.Provider>
  )
}
