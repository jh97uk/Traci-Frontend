import React, {Component} from 'react';
import '../sb-admin-2.css';

class Login extends Component{
    constructor(props){
        super();
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
                                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Enter Email Address..."/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                                                </div>
                                            </form>
                                            <button className="btn btn-primary btn-user btn-block">Login</button>
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