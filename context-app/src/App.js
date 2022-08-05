import React,{useEffect,useContext} from 'react'
import axios from 'axios';
import './App.css';
import { AppContext } from './AppContext';
import UserDetails from './Components/UserDetails';

function App() {
  const{chosenTag, setChosenTag, dataArr, setDataArr} = useContext(AppContext);
    
  useEffect(() => {
    axios
      .get("https://dummyapi.io/data/v1/tag?limit=10",{ 
            headers: {'app-id': '62d3c0b515f0055e65f63809'},
      }).then(response => {
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

        console.log("final array", arr2);
        setDataArr(arr2);
      }).catch(err => {
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

        <div>{
          (chosenTag) ? <button onClick={() => {setChosenTag(null); setDataArr([])}}> 
          Reset </button> : ""
        }
        </div>
      </div>
      <div className = 'ColumnRight'>{
        (dataArr.length > 0) ? <UserDetails/> : null
      }
      </div> 
    </div>
  );
}
export default App;