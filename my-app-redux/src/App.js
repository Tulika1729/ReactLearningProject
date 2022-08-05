import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import UserDetails from './Components/UserDetails';
import { connect } from 'react-redux';
import { setDataArray, setSelectedTag, unsetState } from './_actionCreators/actionCreator';

class App extends Component {
  constructor(props) {
    super(props)
  
    console.log("props :",props);
    //props is an object
    // {
          // store: {},
          // dispatch: funtion
    // }
    // this.state = {
      //  dataArr: [],
      //  selectedTag: null
    // }
  }

  //trim the array for 10 elements
  //remove empty elements
  //remove extra spaces
  async componentDidMount() {
    const response = await axios
    .get("https://dummyapi.io/data/v1/tag?limit=10",{ 
      headers: {'app-id': '62d3c0b515f0055e65f63809'},
    })

    if(response.status === 200) {
      let dummy = response.data;
      let arr = dummy.data;

      let arrClone = arr.slice(0,10);

      let arr1 = arrClone.filter(function (el) {
        return (el !== null && el !== '') ;
      });

      let arr2 = arr1.map(function (el) {
        return (el.trim()) ;
      });

      console.log("final array" ,arr2);
      
      //dispatch requires an action object
      //type, payload?
      const obj = setDataArray(arr2);
      this.props.dispatch(obj);
      
      // this.setState({
      //   dataArr: arr2,
      // })
    }
  }

  setTag = (ele) => {
    // this.setState({
    //   selectedTag: ele
    // })
    const obj = setSelectedTag(ele);
    this.props.dispatch(obj);
  }

  resetTagState = () => {
    // this.setState({
    //   selectedTag: null,
    //   dataArr: []
    // })
    const obj = unsetState();
    this.props.dispatch(obj);
  }
  
  render() {
    const arr = this.props.store.dataArr; 
    const tag = this.props.store.selectedTag;
   
    return (
      <div className='Row'>
        <div className = 'ColumnLeft'> 
          <div>
            {/* populate the data from state here */}
            {arr.map((element, index) => {
              return(
                <div key={index} onClick = {
                    () => {
                      this.setTag(element)
                    }
                  }
                  className={"tag " + (tag === element ? "active_tag" : "")}
                >
                  {element}                  
                </div>
              );
            })}
          </div>

          <div >
            {
                (tag) ?   <button onClick={() => { this.resetTagState() }}> 
                Reset </button> : ""
            
            }
          </div>

          {/* <button onClick={() => {  this.resetTagState() }}> 
              Reset </button> */}
          
        </div>
        <div className = 'ColumnRight'>
          {
            (arr.length > 0) ? <UserDetails /> : null
          }
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (_store) => {
  //console.log("mapStoreToProps : ", _store);

  return {
    store: _store
  }
};

const mapDispatchToProps = (_dispatch) => {
  //console.log("mapDispatchToProps : ", _dispatch);

  return {
    dispatch: _dispatch
  }
};

const ConnectedApp = connect(
  mapStoreToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;