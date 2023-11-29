
import http from "../http-common";

class EstanteDataService {

    async authenticate(data){

        console.log('EstanteDataService.authenticate: ', data);
        const response = await http.post(`/loginestante`, data);
        return response;
    }

    async get(data){
        console.log('EstanteDataService.get: ', data);
        return await http.get('/estante/'+ data);
    }

    async list(){

        console.log('EstanteDataService.list: ');
        return await http.get(`/estante/list`);
    }

    async delete(data){

        console.log('EstanteDataService.delete: ', data);
        return await http.delete(`/estante/delete/`+data);
    }

    async update(data){

        console.log('EstanteDataService.update: ', data);
        return await http.put(`/estante/update/:id`, data);
    }
    
    async create(data){

        console.log('EstanteDataService.create: ', data);
        return await http.post(`/estante/store`, data);

    }  

}
export default new EstanteDataService();
