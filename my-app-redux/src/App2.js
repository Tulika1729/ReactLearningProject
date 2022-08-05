import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './App.css';
import UserDetails2 from './Components/UserDetails2';

function App2() {
    const[chosenTag,setChosenTag] = useState(null)
    const[dataArr,setDataArr] = useState([])
    console.log('chosenTag: ',chosenTag);
    console.log('setChosenTag:',setChosenTag);
    console.log('dataArr:',dataArr);
    console.log('setDataArr:',setDataArr);

    useEffect(() => {
        axios
        .get("https://dummyapi.io/data/v1/tag?limit=10",{ 
            headers: {'app-id': '62d3c0b515f0055e65f63809'},
        })
        .then(response => {
            let dummy = response.data;
            let arr = dummy.data;
            //trim the array for 10 elements
            //remove empty elements
            //remove extra spaces
            let arrClone = arr.slice(0,10);

            let arr1 = arrClone.filter(function (el) {
                return (el !== null && el !== '') ;
            });
        
            let arr2 = arr1.map(function (el) {
                return (el.trim()) ;
            });

            console.log("final array" ,arr2);

            setDataArr(arr2);
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    
    return (
      <div className='Row'>
        <div className = 'ColumnLeft'> 
          <div>
            {/* populate the data from state here */}
            {dataArr.map((element) => {
              return(
                <div onClick = {
                    () => {
                      setChosenTag(element)
                    }
                  }
                  className={"tag " + (chosenTag === element ? "active_tag" : "")}
                >
                  {element}                  
                </div>
              );
            })}
          </div>

          <div >
            {
                (true) ? <button onClick={() => {setChosenTag(null); setDataArr([])}}> 
                Reset </button> : ""
            }
          </div>

        </div>
        <div className = 'ColumnRight'>
          {
            (dataArr.length > 0) ? <UserDetails2 selectedTag = {chosenTag}  /> : null
          }
        </div> 
      </div>
    );
  }



export default App2;