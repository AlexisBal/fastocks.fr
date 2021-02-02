import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ClientsService{

   getClients() {
        console.log("get clients");
        const url = `${API_URL}/api/clients/`;
        return axios.get(url).then(response => response.data);
   }

   getClientsByURL(link){
       const url = `${API_URL}${link}`;
       return axios.get(url).then(response => response.data);
   }
   getClient(pk) {
       const url = `${API_URL}/api/clients/${pk}`;
       return axios.get(url).then(response => response.data);
   }
   deleteClient(client){
       const url = `${API_URL}/api/clients/${client.pk}`;
       return axios.delete(url);
   }
   createClient(client){
       const url = `${API_URL}/api/clients/`;
       return axios.post(url, client);
   }
   updateClient(client){
       const url = `${API_URL}/api/clients/${client.pk}`;
       return axios.put(url,client);
   }
}