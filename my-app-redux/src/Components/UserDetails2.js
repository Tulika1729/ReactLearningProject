import React,{useState,useEffect} from 'react'
import axios from 'axios';

function UserDetails2(props) {
    const {selectedTag} = props
    const[postsArray,setPostsArray] = useState([])
    const[error,setError] = useState("")

    const controller = new AbortController();

    useEffect(() => {
        if(
            selectedTag !== null &&
            selectedTag !== undefined &&
            typeof selectedTag === "string" 
        )
        {
            const url = "https://dummyapi.io/data/v1/tag/" + encodeURIComponent(selectedTag) + "/post?limit=10";
            console.log(url);
            setPostsArray([]);
            setError("")
            axios.get(url, { 
                headers: {'app-id': '62d3c0b515f0055e65f63809'},
                signal: controller.signal
            }).then((successResp) => {
                console.warn("successResp : ", successResp)
                let array = successResp.data.data;
                let xArray = array.filter((a) => {
                    if(a && typeof a === "object") {
                        return true
                    } else {
                        return false;
                    }
                });  
                console.warn("xArray : ", xArray);

                setPostsArray(xArray)
                if(xArray.length === 0)
                    setError("No posts found")             
            }).catch((failureResp) => {
                console.warn("failureResp : ", failureResp)
                setError("Some Unexpected error occureed. Could not fetch posts.")
                setPostsArray([])    
            })      
        }

        //the following function will be called on unmount of this comp
        return function() {
            console.warn("unmounting the user details 2 component");
            controller.abort();
        }    
    },[selectedTag])

    let result = null;
    if(selectedTag) {
        result = (
                <div>
                <div className='selected_tag'>Showing posts for - {selectedTag}</div>
                <div className='err'>{error}</div>
                 <div className='posts_parent'>
                {
                postsArray.map((element) => {
                    return (
                        <div className='post'>
                            {/** left **************/}
                            <div className='left'>
                                <img src={element.image}/>
                            </div>

                            {/** right **************/}
                            <div className='right'>
                                <div className='text'>{element.text}</div>
                                <div>{element.likes}</div>
                            </div>
                        </div>
                    )
                })
        }
       </div>
        
        </div>
        )
    }
    else{
        result = "No tag selected";
}

return (
    result
)
}
export default UserDetails2




