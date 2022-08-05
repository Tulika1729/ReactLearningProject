import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setLikeFilter, setTextFilter, unsetTagFilter } from '../_actionCreators/actionCreator';


class Filter extends Component {
    constructor(props) {
        super(props)
    }
    
    handleTextChange = (e) => {
        const value = e.target.value;
        //console.log("text value : ", value, value.length);
        const obj = setTextFilter(value.toLowerCase());
        this.props.dispatch(obj);
    }

    handleLikeChange = (e) => {
        const value = e.target.value;
        //console.log("like value : ", value, value.length);
        let _value;

        if(value.length === 0) {
            _value = ""
        } else {
            _value = Number(value);
        }

        const obj = setLikeFilter(_value);
        this.props.dispatch(obj);
    }

    resetFilteredTagState = () =>{
        this.props.dispatch(unsetTagFilter());
    } 
      
  render() {
    const {store} = this.props;
    const {filterState} = store;
    const {textFilter, likeFilter} = filterState;

    return (
      <div className='filter_parent'>
        <div className='filter'>
            <label for="text_filter">Text:</label>
            <input type="text" id="text_filter" name="text_filter" 
                value={textFilter} onChange={this.handleTextChange} >
            </input>
        </div>

        <div className='filter'>
            <label for="likes">Like count:</label>
            <input type="number" id="likes" name="likes"
                value={likeFilter} onChange={this.handleLikeChange}>
            </input>
        </div>

        <div className='filter'>
            <button onClick={() => { this.resetFilteredTagState() }}> 
                Reset Filter
            </button>
        </div>
      </div>
    )
  }
}

const mapStoreToProps = (_store) => {
    console.log("mapStoreToProps : ", _store);
  
    return {
      store: _store
    }
};
  
const mapDispatchToProps = (_dispatch) => {
    console.log("mapDispatchToProps : ", _dispatch);
  
    return {
      dispatch: _dispatch
    }
};
  
const ConnectedFilterComponent = connect(
    mapStoreToProps,
    mapDispatchToProps
)(Filter);
  
export default ConnectedFilterComponent;
