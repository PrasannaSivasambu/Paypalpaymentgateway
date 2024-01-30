import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useAppcontext } from '../Context/Appcontext';


export default function Home() {
    const navigate = useNavigate();
    
    const {setAmount,selectedproducts,setSelectedProducts,products}=useAppcontext()
    useEffect(()=>{
      window.addEventListener('hashchange', () => {
        if(selectedproducts.length!==0){
          window.history.forward();
          }
        
      });
      console.log('HUIOP')
    },[])
    
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
        <img  style={{height: 8+'vmin',width:8+'vmin'}} src='https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=' />
        
      </div>
      {/* <div className='Second-div'>
       <button }> Shop Now</button>
      </div> */}
      <div className='products'>
        {
          products.map((data,index)=>(
            <span className='product-element' key={index} onClick={()=>{
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
