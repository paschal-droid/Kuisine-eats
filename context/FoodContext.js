import createContext from "./createContext";

const reducer = (state, action) => {
    switch (action.type) {
      case 'add-food':
        return { ...state, menu: [...state.menu, action.payload] };
        case 'update-quantity':
          return {
            ...state,
            menu: state.menu.map(food => {
              if (food.cartItemKey === action.payload.id) {
                return { ...food, quantity: action.payload.quantity };
              }
              return food;
            }),
          };
        case 'remove-food':
            return {...state,  menu: state.menu.filter((_, i) => i !== action.payload)};
        case 'reset-cart': {
          return {...state, menu: [], order: {}}
        };
        case 'order':
          return {...state, orderValue: {...state.orderValue, id: action.payload}}
        case 'orderVal':
          return {...state, orderValue: {...state.orderValue, val: action.payload}}
      default:
        return state;
    }
  };
  



const addFood = (dispatch) => {
    return (data) => {
        dispatch({type: 'add-food', payload: data})
    }
}

const updateQuantity = (dispatch) => {
    return (id, quantity) => {
        dispatch({type: 'update-quantity', payload: {id, quantity}})
    }
}

const removeFood =(dispatch) => {
    return (index) => {
        dispatch({type: 'remove-food', payload: index})
    }
}

const resetCart = (dispatch) => {
  return () => {
    dispatch({type: "reset-cart"})
  }
}
const order = (dispatch) => {
  return (id) => {
    dispatch({type: "order", payload: id})
  }
}
const orderVal = (dispatch) => {
  return (id) => {
    dispatch({type: "orderVal", payload: id})
  }
}

export const { Context, Provider} = createContext(reducer, {addFood, updateQuantity, removeFood, resetCart, order, orderVal}, {menu: [], orderValue: {id: '', val: 1}})