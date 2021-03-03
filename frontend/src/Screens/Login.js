import React, { Component } from 'react';
import {
  useHistory,
  useLocation
} from "react-router-dom";

import ProfilesService from  '../ProfilesService'
import { useAuth } from "../Auth";

const profilesService = new ProfilesService();


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
          rememberMe: false,
          email: '',
          password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRememberMe = this.handleRememberMe.bind(this)
     }
    
    handleRememberInfo = e => {
      const name = e.target.type;
      const value = e.target.value;
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    };

    handleRememberMe(){
      if (this.state.rememberMe) {
        this.setState({rememberMe: false})
      }
      else {
        this.setState({rememberMe: true})
      } 
    }

    handleCreate(){
        profilesService.login(
          {
            "email": this.refs.email.value,
            "password": this.refs.password.value
        }          
        ).then((result)=>{
          alert("Connexion au compte !");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        this.handleCreate();
        event.preventDefault();
    }
    
      render() {
        return (
          <body class="text-center">
            <main class="form-signin">
              <form onSubmit={this.handleSubmit}>
                  <h1 class="h3 mb-3 fw-normal">Merci de vous connecter</h1>
                  <input type="email" ref="email" id="email" class="form-control" placeholder="Adresse email" required autofocus onChange={this.handleRememberInfo} value={this.state.email}></input>
                  <input type="password" ref="password" id="password" class="form-control" placeholder="Mot de passe" required onChange={this.handleRememberInfo}></input>
                  <div class="checkbox mb-3">
                      <label>
                        <input type="checkbox" onChange={this.handleRememberMe}></input>
                        {'\n'} Rester connecté 
                      </label>
                  </div>
                  <button class="w-100 btn btn-lg btn-primary" type="submit" value="Submit">Connexion</button>
                  <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
              </form>
          </main>
        </body>
       );
      }  
}

export default Login;