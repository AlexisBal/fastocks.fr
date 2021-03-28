import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProfilesService{

   login(user) {
       const url = `${API_URL}/api/login`;
       return axios.post(url, user);
   } 

    register(user) {
        const url = `${API_URL}/api/register`;
        return axios.post(url, user);
    } 

    updateSettings(user, user_id, token) {
        const url = `${API_URL}/api/user-account/settings`;
        return axios.put(
            url, 
            user, 
            {
                headers: {
                    "User-ID": user_id,
                    "Token": token,
                }
            }
        );
    }

    changePassword(user, user_id, token) {
        const url = `${API_URL}/api/user-account/password`;
        return axios.post(
            url, 
            user, 
            {
                headers: {
                    "User-ID": user_id,
                    "Token": token,
                }
            }
        );
    }

    validateUrl(url_website) {
        const url = `${API_URL}/api/user-new-product-step-1`;
        return axios.post(
            url, 
            url_website, 
        );
    }

    validateProduct(product) {
        const url = `${API_URL}/api/user-new-product-step-2`;
        return axios.post(
            url, 
            product, 
        );
    }

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