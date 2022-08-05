import React, {useContext} from 'react'
import {AppContext} from '../AppContext';

function Filter() {
    const{
        textFilter,
        setTextFilter, 
        likeFilter,
        setlikeFilter} = useContext(AppContext);

        const handleTextChange = (e) => {
            const value = e.target.value;
            const obj = setTextFilter(value.toLowerCase());
        }
        const handleLikeChange = (e) => {
            const value = e.target.value;
            let _value;

            if(value.length === 0) {
                _value = ""
            } else {
                _value = Number(value);
            }
            const obj = setlikeFilter(_value);
        }

        const resetFilteredTagState = () =>{
            setTextFilter('')
            setlikeFilter('')
        }

    return ( 
        <div className='filter_parent'>
            <div className='filter'>
                <label for="text_filter">Text:</label>
                <input type="text" id="text_filter" name="text_filter" 
                    value={textFilter} onChange={handleTextChange} >
                </input>
            </div>
    
            <div className='filter'>
                <label for="likes">Like count:</label>
                <input type="number" id="likes" name="likes"
                    value={likeFilter} onChange={handleLikeChange}>
                </input>
            </div>
    
            <div className='filter'>
                <button onClick={() => {resetFilteredTagState()}}> 
                    Reset Filter
                </button>
            </div>
        </div>
    )
}
export default Filter