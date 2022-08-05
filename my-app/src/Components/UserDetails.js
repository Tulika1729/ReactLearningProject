import React, { Component } from 'react'
import axios from 'axios';


export class UserDetails extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        postsArray: [],
        error: "",
        availablePosts: false
      };

      this.controller = new AbortController();
    } 
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    // this.cancelToken = axios.CancelToken;
    // this.source = this.cancelToken.source();  
     

    //called after receiving new props, also called by state update
    //then / catch
    componentDidUpdate(prevProps)
    {
        if (
            this.props.selectedTag !== null &&
            this.props.selectedTag !== undefined &&
            typeof this.props.selectedTag === "string" &&

            this.props.selectedTag !== prevProps.selectedTag
        ) {
            console.log("this.props.selectedTag : ", this.props.selectedTag, this.props.selectedTag.length);

            const url = "https://dummyapi.io/data/v1/tag/" + this.props.selectedTag + "/post?limit=10";

            // const response = await axios.get(url, { 
            //     headers: {'app-id': '62d3c0b515f0055e65f63809'},
            // });
            // if(response.status === 200) {
            //     let dummy = response.data;
            //     let arr = dummy.data;

            //     this.setState({
            //         postsArray: arr,
            //     })
            // }

            //a promise has two states
            //resolved -- .then()
            //rejected -- .catch()
            //(pending -- in process)

            this.setState({ error: "", postsArray: [] })

            axios.get(url, { 
                headers: {'app-id': '62d3c0b515f0055e65f63809'},
                // cancelToken: source.token
                signal: this.controller.signal
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
                this.setState({
                    postsArray: xArray,
                    error: (xArray.length === 0) ? "No posts found" : ""
                });              
            }).catch((failureResp) => {
                console.warn("failureResp : ", failureResp);
                this.setState({
                    error: "Some Unexpected error occureed. Could not fetch posts.",
                    postsArray: []
                })
            });
        }
    }
    componentWillUnmount(){
        console.warn("unmounting user details");
        // source.cancel('Operation canceled by the user.');
        this.controller.abort();
    }

    render() {
        let result = null;
        const {postsArray, error} = this.state;
        const {selectedTag} = this.props; //selected tag -> passed from parent component

        if(selectedTag) {
            result = (
                <>
                    <div className='selected_tag'>Showing posts for - {selectedTag}</div>
                    <div className='err'>{error}</div>

                    <div className='posts_parent'>
                    {
                        postsArray.map((element, index) => {
                            return (
                                <div className='post' key={index}>
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
                </>
            )
        }
        else{
            result = "No tag selected";
        }

        return (
            result
        )
    }
}

export default UserDetails