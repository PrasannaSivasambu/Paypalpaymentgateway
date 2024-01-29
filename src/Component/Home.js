import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useAppcontext } from '../Context/Appcontext';


export default function Home() {
    const navigate = useNavigate();
    const [selectedproducts,setSelectedProducts]=useState([])
    const {setAmount}=useAppcontext()
    useEffect(()=>{
      window.addEventListener('hashchange', () => {
        if(selectedproducts.length!==0){
          window.history.forward();
          }
        
      });
      console.log('HUIOP')
    },[])
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
    const handleCartClick=()=>{
      setAmount(()=>{
        let price=0
        selectedproducts.map((product)=>{
          price+=product.amount
        })
        return price
      })
        navigate('/Order')
    }
    const handleProductClick=(data)=>{
      setSelectedProducts((prevSelectedProduct)=>{
        console.log('dfde',prevSelectedProduct)
        return [...prevSelectedProduct,data]
      })
      if(selectedproducts.find((ele)=>ele.name===data.name)){
        if(selectedproducts.length===1) setSelectedProducts([])
        setSelectedProducts((prevSelectedProduct)=>{
          let selectedproduct=prevSelectedProduct.filter((ele)=>ele.name!==data.name) 
          return selectedproduct
        })
      }
    }
  return (
    <>
    <div className="App">
      
      <div className='Info'>
        All products  will be shipped  within 2 buisness days
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',right:1 +'vmin',width:10+'vmin',position:'fixed',top:4+"vmin",height:8+'vmin'}} onClick={()=>{
        if(selectedproducts.length!==0){
        handleCartClick()
        }}}>
        {selectedproducts.length!==0?<div style={{position:'relative',left:1+'vmin',top:2+'vmin',backgroundColor:'red',width:3+'vmin',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
        {/* {!selectedproducts.length===0?selectedproducts.length:""} */}
        {selectedproducts.length}

        </div>:''}
        <img style={{height: 8+'vmin',width:8+'vmin'}} src='https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=' />
        
      </div>
      {/* <div className='Second-div'>
       <button }> Shop Now</button>
      </div> */}
      <div className='products'>
        {
          products.map((data)=>(
            <span className='product-element' onClick={()=>{
              handleProductClick(data)
              
            }}>
            <img src={data.img} />
            <span className='product-element-data'>
            {data.amount}$
            </span>
            </span>
          ))
        }
        

      </div>
    </div>
    </>
  )
}
