import React, { useEffect, useState } from 'react';
import './Orders.css'
import {db} from './firebase';
import { useStateValue } from "./StateProvider"
import Order from "./Order"
import CurrencyFormat from 'react-currency-format'

function Orders() {
const [{basket, user}, dispatch] = useStateValue();   
// create a state to store all the orders:
const [orders, setOrders] = useState([]);

//when the user component loads:
//we first access all users>>than we access the specific user>>
//then we access the users orders>>we sort all orders>>
//of the user>> and last we map through the list of orders>>
//so we could show them (use snapshot is real time)
useEffect(() => {
    if(user){

    db
      .collection('users')
      .doc(user?.uid)
      .collection('order')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })))
    ))
}else{
    setOrders([])
}
}, [user])

    return (
        <div className = "orders">
           <h1>Your Orders</h1>
<div className="orders__order">
    {orders?.map(order => (
        <Order order={order}/>
    ))}
</div>
        </div>
    )
}

export default Orders
