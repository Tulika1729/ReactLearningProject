//actions and action creators
export const setSelectedTag = (ele) => {
    return{
        type: "SET_SELECTED_TAG",
        payload: ele,
    }
}
export const unsetState = () => {
    return{
        type: "UNSET_STATE",
    }
}
export const setDataArray = (dataArray) => {
    return{
        type: "SET_DATA_ARRAY",
        payload: dataArray,
    }
}
export const setTextFilter = (val) => {
    return{
        type: "SET_TEXT_FILTER",
        payload: val,
    }
}
export const setLikeFilter = (val) => {
    return{
        type: "SET_LIKE_FILTER",
        payload: val,
    }
}
export const unsetTagFilter = () => {
    return{
        type: "UNSET_TAG_FILTER",
    }
}