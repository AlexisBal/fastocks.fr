import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProfilesService{

   getProfiles() {
        console.log("get profiles");
        const url = `${API_URL}/api/profiles/`;
        return axios.get(url).then(response => response.data);
   }

   getProfilesByURL(link){
       const url = `${API_URL}${link}`;
       return axios.get(url).then(response => response.data);
   }
   getProfile(pk) {
       const url = `${API_URL}/api/profiles/${pk}`;
       return axios.get(url).then(response => response.data);
   }
   deleteProfile(profile){
       const url = `${API_URL}/api/profiles/${profile.pk}`;
       return axios.delete(url);
   }
   createProfile(profile){
       const url = `${API_URL}/api/profiles/`;
       return axios.post(url, profile);
   }
   updateProfile(profile){
       const url = `${API_URL}/api/profiles/${profile.pk}`;
       return axios.put(url,profile);
   }
}