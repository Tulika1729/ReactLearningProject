//initialState
//action
const initialState = { 
    dataArr: [], selectedTag: null,

    filterState: {
        textFilter: "",
        likeFilter: "" //number 0-50 | string ""
    }
};

const reducerFunc = (state = initialState, action) => {
    //action -----------------------
    // {
    //     type: "YSAJSACS_AJNSCN_AHS",
    //     payload: value for updation
    // }
    const { type, payload } = action;

    switch (type) {
        case "SET_SELECTED_TAG": {
            return {
                ...state,
                selectedTag: payload,
            }
        }

        case "UNSET_STATE":{
            return {
                selectedTag: null,
                dataArr: [],
                filterState: {
                    textFilter: "",
                    likeFilter: ""
                }
            }
        }

        case "SET_DATA_ARRAY": {
            return {
                ...state,
                dataArr: payload,
            }
        }
        
        case "SET_TEXT_FILTER": {
            return{
                ...state,
                filterState: {
                    ...state.filterState,
                    textFilter: payload
                }
            }
        }

        case "SET_LIKE_FILTER": {
            return{
                ...state,
                filterState: {
                    ...state.filterState,
                    likeFilter: payload
                }
            }
        }
        case "UNSET_TAG_FILTER": {
            return{
                ...state,
                filterState: {
                    textFilter: "",
                    likeFilter: ""
                }
            }
        }

        default:
            return state   
    }
}

export default reducerFunc;