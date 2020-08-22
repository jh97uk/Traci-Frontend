import React, {Component} from 'react';
import '../sb-admin-2.css';

class Login extends Component{
    constructor(props){
        super();
        this.state = {emailAddress:'', password:''};
        this.loginPressed = this.loginPressed.bind(this);
    }

    componentDidMount(){
    }

    loginPressed(){
        const self = this;
        fetch('http://localhost:4000/users/authenticate', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({username:self.state.emailAddress, password:self.state.password})
        }).then(function(response){
            console.log(response);
            if(response.status == 500){
                return {status:500};
            }
            return response.json();
        }).then(function(data){
            if(data.status == 500){
                
            } else{
                console.log("logged in!");
                localStorage.setItem('token', data.token);
            }
        });
    }
    
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-7">
                        <div className="card border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Enter Email Address..." onChange={event=>this.setState({emailAddress:event.target.value})}/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" onChange={event=>this.setState({password:event.target.value})}/>
                                                </div>
                                            </form>
                                            <button className="btn btn-primary btn-user btn-block" onClick={this.loginPressed}>Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;