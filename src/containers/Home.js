import React from 'react'
import Header from '../../component/header'
import { connect } from 'react-redux'
import axios from 'axios'

class Home extends React.Component {
    //在componentDidMount中发送异步请求
    componentDidMount(){
        this.props.getList()
    }

    render(){
        console.log(this.props.list)
        return (
           <div>
               <Header/>
               {  this.props.list?
                    <div>
                    {this.props.list.map(item=>(
                        <div>{item.title}</div>
                    ))}
                    </div>:''}
                <button onClick={()=>{alert('click')}}>click</button>
           </div>)
    }
}

Home.loadData = (store) => {
    store.dispatch(getData())
} 

//使用redux-thunk,在action中写axios并dispatch
const getData = () => {
    return (dispatch) => {
        //接收来自mapDispatchToProps的dispatch方法
        axios.get('接口地址')
           .then((res)=>{
               const list = res.data.data
               dispatch({type:'CHANGE_LIST',list:list})
           })
    }
} 

const mapStateToProps = state => ({
    name:state.name,
    list:state.list
}) 

const mapDispatchToProps = dispatch => ({
    getList(){
        //调用dispatch时会自动执行getData里return的方法
        dispatch(getData())
    }
})
 
export default connect(mapStateToProps , mapDispatchToProps)(Home)