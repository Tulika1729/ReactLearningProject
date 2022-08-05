import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import Filter from './Filter';



export class UserDetails extends Component {
    constructor(props) {
      super(props)
        console.log("user Details: ",this.props);
      this.state = {
        postsArray: [],
        error: "",
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
        const {selectedTag} = this.props.store;
        if (
            selectedTag !== null &&
            selectedTag !== undefined &&
            typeof selectedTag === "string" &&

            selectedTag !== prevProps.store.selectedTag
        ) {
            console.log("this.props.selectedTag : ", selectedTag, selectedTag.length);

            const url = "https://dummyapi.io/data/v1/tag/" + selectedTag + "/post?limit=10";

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
        const {selectedTag} = this.props.store; //selected tag -> passed from the store
        const {store} = this.props;
        const {filterState} = store;
        const {textFilter, likeFilter} = filterState;

        let filteredArray = postsArray.filter((ele) => {
            let flag = (ele.text.toLowerCase()).includes(textFilter);

            if(typeof likeFilter === "number") {
                flag = flag && (ele.likes >= likeFilter)
            }
            
            return (flag)
        });
        // console.log("typed tag is is: ",textFilter);
        // console.log("filtered Array is:",filteredArray);

        if(selectedTag) {
            result = (
                <>
                    <div className='selected_tag'>Showing posts for - {selectedTag}</div>
                    <div className='err'>{error}</div>

                    {
                        postsArray.length > 0 ? (
                            <Filter/>
                        ) : null
                    }

                    <div className='posts_parent'>
                    {
                        filteredArray.map((element, index) => {
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
  
  const ConnectedUserDetails = connect(
    mapStoreToProps,
    mapDispatchToProps
  )(UserDetails);
  
export default ConnectedUserDetails;

