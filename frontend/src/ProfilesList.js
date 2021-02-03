import  React, { Component } from  'react';
import ProfilesService from  './ProfilesService'

const profilesService = new ProfilesService();

class ProfilesList extends Component {

   constructor(props) {
       super(props);
       this.state  = {
           profiles: [],
           nextPageURL:  ''
       };
       this.nextPage = this.nextPage.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
   }

   componentDidMount() {
        var self = this;
        profilesService.getProfiles().then(function(result) {
            self.setState({ profiles: result.data, nextPageURL: result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self = this;
        profilesService.deleteProfile({pk :  pk}).then(()=>{
            var  newArr = self.state.profiles.filter(function(obj) {
                return obj.pk  !==  pk;
            });
            self.setState({profiles:  newArr})
        });
    }

    nextPage(){
        var  self = this;
        profilesService.getProfilesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ profiles:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div  className="profiles--list">
                <table  className="table">
                    <thead  key="thead">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.profiles.map( c  =>
                        <tr  key={c.pk}>
                            <td>{c.pk}  </td>
                            <td>{c.first_name}</td>
                            <td>{c.last_name}</td>
                            <td>{c.phone}</td>
                            <td>{c.email}</td>
                            <td>{c.address}</td>
                            <td>{c.description}</td>
                            <td>
                            <button  onClick={(e)=>  this.handleDelete(e,c.pk) }>Delete</button>
                            <a  href={"/profile/" + c.pk}> Update</a>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <button  className="btn btn-primary"  onClick={  this.nextPage  }>Next</button>
            </div>
        );
    }
}

export default ProfilesList;