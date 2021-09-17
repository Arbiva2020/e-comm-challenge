//at the begining, our basket is an empty array:

export const initialState = {
  basket: [],
  user: null,
};

//A reducer is a function that determines changes to an application's state.
//It uses the action it receives to determine this change

//building a selector (for summing up the prices):
//the reducer sums up the prices:
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);


  //listening to the events:
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, //returning whatever the state originally was, plus
        basket: [...state.basket, action.item], //what the basket was, and the action we preformed on it
      };

      //what happens when we get the 'empty bsket" event:
case 'EMPYT_BASKET':
  return{
    ...state,
basket:[]
  }


case "REMOVE_FROM_BASKET":
  const index = state.basket.findIndex(
    (basketItem) => basketItem.id === action.id);
  let newBasket = [...state.basket];
 
  if(index >= 0){
newBasket.splice(index,1);
  } else {
    console.warn('Cant remove product (id: ${action.id}) as its not in the basket!')  
  }

  return{
    ...state,
    basket: newBasket
  }

  case "SET_USER":
    return {
      ...state,
      user: action.user
    }
  
    default:
      return state;
  }
};
export default reducer;
