import {useState, createContext} from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const[chosenTag, setChosenTag] = useState(null)
  const[dataArr, setDataArr] = useState([])
  const[postsArray, setPostsArray] = useState([])
  const[error, setError] = useState("")
  const[textFilter, setTextFilter] = useState("")
  const[likeFilter, setlikeFilter] = useState("")

  return (
    <AppContext.Provider value={{ 
      chosenTag, 
      setChosenTag, 
      dataArr, 
      setDataArr,
      postsArray,
      setPostsArray,
      error,
      setError,
      textFilter,
      setTextFilter, 
      likeFilter,
      setlikeFilter }}>  
        {children}   
    </AppContext.Provider>
  );
}