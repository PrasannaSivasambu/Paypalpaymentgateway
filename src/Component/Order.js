import React, { useState } from 'react'
import PayPalPayment from './PayPalPayment'
import BraintreePayment from './BraintreePayment'
import { useAppcontext } from '../Context/Appcontext'
import '../App.css'

export default function Order() {
  const {  selectedcurrency, setSelectedCurrency} = useAppcontext()
  const { amount, setAmount } = useAppcontext()
  const cardtype = ['', 'VISA', 'AMEX', 'MasterCard', 'UnionPay']
  const [typeofCard, setTypeOfCard] = useState(cardtype[0])
  const [paypalshow, setpaypalShow] = useState(false)
  const [namecolor,setNameColor]=useState(null)
  const [fullname,setFullName]=useState('')
  const [submitcheck,setSubmitCheck]=useState(false)
  const [braintreeshow, setBrainTreeShow] = useState(false)
  
  const exchangeRates = {
    USD: { EUR: 0.85, THB: 31.28, HKD: 7.76, SGD: 1.35, AUD: 1.29 },
    EUR: { USD: 1.18, THB: 36.88, HKD: 9.14, SGD: 1.59, AUD: 1.52 },
    THB: { USD: 0.032, EUR: 0.027, HKD: 0.25, SGD: 0.044, AUD: 0.042 },
    HKD: { USD: 0.13, EUR: 0.11, THB: 4.03, SGD: 0.17, AUD: 0.16 },
    SGD: { USD: 0.74, EUR: 0.63, THB: 22.92, HKD: 5.82, AUD: 0.96 },
    AUD: { USD: 0.77, EUR: 0.66, THB: 23.81, HKD: 6.24, SGD: 1.04 },
  }
  

  const handleCardChange = (e) => {
    if (selectedcurrency === 'EUR' || selectedcurrency === 'AUD' || selectedcurrency === 'USD') {
      if (e.target.value === 'AMEX') {
        if (selectedcurrency === 'USD') {
          setpaypalShow(true)
          setBrainTreeShow(false)
        }
        else setpaypalShow(false)
      }
      else {
        if (e.target.value !== '') {
          console.log('JBB', e.target.value)
          setpaypalShow(true)
          setBrainTreeShow(false)
        }
        else setpaypalShow(false)
      }
    }
    else {
      if (e.target.value === '') {
        setpaypalShow(false)
        setBrainTreeShow(false)
      }
      else {
        if (e.target.value === 'AMEX') {
          setpaypalShow(false)
          setBrainTreeShow(false)
        }
        else {
          setpaypalShow(false)
          setBrainTreeShow(true)
        }
      }
    }

    setTypeOfCard(e.target.value)
  };

  const handleFromCurrencyChange = (e) => {
    if (e.target.value === 'EUR' || e.target.value === 'AUD' || e.target.value === 'USD') {
      if (typeofCard === 'AMEX') {
        if (e.target.value === 'USD') {
          setpaypalShow(true)
          setBrainTreeShow(false)
        }
        else setpaypalShow(false)
      }
      else {

        if (typeofCard !== '') {
          console.log('ferri')
          if (typeofCard === 'AMEX') {

            setpaypalShow(false)
            setBrainTreeShow(false)
          }
          else {
            console.log('JBB', e.target.value)
            setpaypalShow(true)
            setBrainTreeShow(false)
          }

        }
        else {
          console.log('yerri')
          setpaypalShow(false)
          setBrainTreeShow(false)
        }

      }
    }
    else {
      if (typeofCard === 'AMEX' || typeofCard === '') {
        setpaypalShow(false)
        setBrainTreeShow(false)
      }
      else {

        setpaypalShow(false)
        setBrainTreeShow(true)
      }
    }
    const previouscurrency = exchangeRates[selectedcurrency]
    setSelectedCurrency(e.target.value)
    console.log('dskjb', previouscurrency[e.target.value])
    const result = amount * previouscurrency[e.target.value];
    setAmount(result.toFixed(2));
  };

  const onNameEnter=(e)=>{
    if(e.target.value.trim()!==''){
      console.log(e.target.value)
      setFullName(e.target.value)
      setNameColor(null)
    }
    else{
      setFullName('')
    }


  }
  const onSubmit=()=>{
    console.log('jio')
    if(fullname!=='' && typeofCard.length!==0){
      setSubmitCheck(true)
      setNameColor(null)

    }
    else if(fullname===''){
      console.log('jio')
      setNameColor('red')
    }
  }


  return (
    <div className='order'>
      <div className='order-info'>
        <div >Order Section</div>
        <div className='amount-container'  >
          <label>
            <span className='amount-word' >
              Amount :
            </span>
            <span className='amount-value' >
              {amount}
            </span>
          </label>
          <label>
          <span className='currency-word' >
              Currency
            </span>
          <span>
            <select value={selectedcurrency} onChange={handleFromCurrencyChange}>
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </span>
          </label>
        </div>

        <div className='fullname-container'>
          <span>FullName :</span>
          <span className='fullnameinput-inline'>
            <input className='fullname-input' placeholder='john' style={{marginLeft:1+'vmin',border:namecolor?`0.3vmin solid ${namecolor}`:'0.2vmin solid black', width: 30 + 'vmin', height: 4 + 'vmin',borderColor:namecolor }} onChangeCapture={(e)=>onNameEnter(e)} />
            <div > {namecolor?'Type your full name':null}</div>
          </span>
        </div>
        <div className='currencyselection -container' >
          <span>Select Card Type   </span>
          <select  value={typeofCard} onChange={handleCardChange} style={{border:typeofCard==='' && namecolor?`0.3vmin solid ${namecolor}`:'0.1vmin solid black'}}>
            {cardtype.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className='submit-button' onClick={()=>onSubmit()}>
          Submit
          </div>      

      </div>
      {submitcheck?
      <div className='order-info' style={{height:110+'vmin'}}   >
        {paypalshow || braintreeshow ?
          <div className='payment-header' >Payment Section</div> : null
        }
        {paypalshow ? <div className='paypal' ><PayPalPayment /></div> : null}
        {(selectedcurrency !== 'USD' && typeofCard === 'AMEX') ? <div className='amex' > AMEX is possible to use only for USD</div> : null}

        {braintreeshow ? <div className='braintree' ><BraintreePayment /></div> : null}
      </div>:null}
    </div>

  )
}
