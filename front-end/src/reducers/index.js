const reducer = (state = { modalIsOpen: false}, action) => {
   switch(action.type){
       case 'CREATE_PARTY_MODAL':
           return {
               modalIsOpen: true
           }
       default:
           return state;
   }
};

export default reducer;
