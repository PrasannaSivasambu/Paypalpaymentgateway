import React ,{useState}from 'react'
import PayPalPayment from './PayPalPayment'
import { BraintreePayPalButtons } from '@paypal/react-paypal-js'
import BraintreePayment from './BraintreePayment'
import { useAppcontext } from '../Context/Appcontext'

export default function Order() {
  
  const {amount,setAmount}=useAppcontext()
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const cardtype=['VISA','AMEX','MasterCard','UnionPay']
  const [typeofCard,setTypeOfCard]=useState(cardtype[0])
  const [paypalshow,setpaypalShow]=useState(false)
  const [braintreeshow,setBrainTreeShow]=useState(false)
  // Sample exchange rates (replace with real data)
  const exchangeRates = {
    USD: { EUR: 0.85, THB: 31.28, HKD: 7.76, SGD: 1.35, AUD: 1.29 },
    EUR: { USD: 1.18, THB: 36.88, HKD: 9.14, SGD: 1.59, AUD: 1.52 },
    THB: { USD: 0.032, EUR: 0.027, HKD: 0.25, SGD: 0.044, AUD: 0.042 },
    HKD: { USD: 0.13, EUR: 0.11, THB: 4.03, SGD: 0.17, AUD: 0.16 },
    SGD: { USD: 0.74, EUR: 0.63, THB: 22.92, HKD: 5.82, AUD: 0.96 },
    AUD: { USD: 0.77, EUR: 0.66, THB: 23.81, HKD: 6.24, SGD: 1.04 },
  }
  const [selectedcurrency,setSelectedCurrency]=useState('USD')

  const handleCardChange = (e) => {
    if(e.target.value==='AMEX'){
      setpaypalShow(true)
      setBrainTreeShow(false)
    }
    else{
      setpaypalShow(false)
      setBrainTreeShow(true)
    }
    setTypeOfCard(e.target.value)
  };

  const handleFromCurrencyChange = (e) => {
    const previouscurrency=exchangeRates[selectedcurrency]
    setSelectedCurrency(e.target.value)
    setFromCurrency(e.target.value)
    console.log('dskjb',previouscurrency[e.target.value])
    const result = amount *previouscurrency[e.target.value] ;
    setAmount(result.toFixed(2));
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const convertCurrency = () => {
    
  };    
  
  return (
    <div className='order'>
      <div className='order-info'>
        Order Section
      <div style={{display:'flex',}} >
        <label>
        <span style={{fontSize:3+'vmin',fontFamily:'monospace'}}>
          Amount : 
        </span>
        <span style={{padding:2+'vmin'}}>
          {amount}   
        </span>
        </label>

        <span>
          <select  value={fromCurrency} onChange={handleFromCurrencyChange}>
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
        </span>
      </div>

      <div style={{fontSize:3+'vmin',fontFamily:'monospace'}}> 
        FullName : 
        <span style={{padding:3+'vmin'}}>
          <input style={{width:30+'vmin',height:4+'vmin'}}/>
        </span>
      </div>
      <div style={{fontSize:3+'vmin',fontFamily:'monospace'}}> 
        <span>Select Card Type   </span> 
        <select  value={typeofCard} onChange={handleCardChange}>
              {cardtype.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
      </div>
      <div>
        {paypalshow ?
      <div style={{padding:3+'vmin'}}>Payment Section</div>:null
  }
        {paypalshow?<PayPalPayment/>:null}
        
        {braintreeshow?<BraintreePayment/>:null}
      </div>
      
    </div>
    </div>

  )
}
