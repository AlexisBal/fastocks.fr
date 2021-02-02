import  React, { Component } from  'react';
import ClientsService from  './ClientsService'

const clientsService = new ClientsService();

class ClientsList extends Component {

   constructor(props) {
       super(props);
       this.state  = {
           clients: [],
           nextPageURL:  ''
       };
       this.nextPage = this.nextPage.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
   }

   componentDidMount() {
        var self = this;
        clientsService.getClients().then(function(result) {
            self.setState({ clients: result.data, nextPageURL: result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self = this;
        clientsService.deleteClient({pk :  pk}).then(()=>{
            var  newArr = self.state.clients.filter(function(obj) {
                return obj.pk  !==  pk;
            });
            self.setState({clients:  newArr})
        });
    }

    nextPage(){
        var  self = this;
        clientsService.getClientsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ clients:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
            <div  className="clients--list">
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
                        {this.state.clients.map( c  =>
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
                            <a  href={"/client/" + c.pk}> Update</a>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <button  className="btn btn-primary"  onClick={  this.nextPage  }>Next</button>
            </div>
        );
    }
}

export default ClientsList;