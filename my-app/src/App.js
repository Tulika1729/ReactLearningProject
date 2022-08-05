import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import UserDetails from './Components/UserDetails';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dataArr: [],
       selectedTag: null
    }
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
        return (el != null && el != '') ;
      });

      let arr2 = arr1.map(function (el) {
        return (el.trim()) ;
      });

      console.log("final array" ,arr2);

      this.setState({
        dataArr: arr2,
      })
    }
  }

  setTag = (ele) => {
    this.setState({
      selectedTag: ele
    })
  }

  resetTagState = () => {
    this.setState({
      selectedTag: null,
      dataArr: []
    })
  }
  
  render() {
    var arr = this.state.dataArr;
    const tag = this.state.selectedTag;
    console.log(tag)
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
                  className={"tag " + (this.state.selectedTag === element ? "active_tag" : "")}
                >
                  {element}                  
                </div>
              );
            })}
          </div>

          <div >
            {
                (true) ?   <button onClick={() => {  this.resetTagState() }}> 
                Reset </button> : ""
            
            }
          </div>

          {/* <button onClick={() => {  this.resetTagState() }}> 
              Reset </button> */}
          
        </div>
        <div className = 'ColumnRight'>
          {
            (arr.length > 0) ? <UserDetails selectedTag={this.state.selectedTag} /> : null
          }
        </div>
      </div>
    );
  }
}


export default App;
