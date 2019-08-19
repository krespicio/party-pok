const reducer = (state = { modalIsOpen: false}, action) => {
   switch(action.type){
       case 'OPEN_PARTY_MODAL':
           return {
               modalIsOpen: true
           }
        case 'CLOSE_PARTY_MODAL':
            return {
                modalIsOpen: false
            }   
       default:
           return state;
   }
};

export default reducer;
