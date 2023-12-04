const initialState = {
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    transmissionType: '',
    killometers: '',
    category: '',
    engineType: '',
    color: "",
    loc: "",
    ownerId:""
  };
  
  const searchCriteriaReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_SEARCH_CRITERIA':
        return {
          ...state,
          ...action.payload,
        };
        case 'RESET_SEARCH_CRITERIA':
          return {
            ...initialState,
           
          };
      default:
        return state;
    }
  };
  
  export default searchCriteriaReducer;