
import http from "../http-common";

class EstanteDataService {


    async get(id){

        console.log('EstanteDataService.get: ', id);
        return await http.get('/estante/'+id);
    }

    async list(){

        console.log('EstanteDataService.list: ');
        return await http.get(`/estante/list`);
    }

    async delete(nome){

        console.log('EstanteDataService.delete: ', nome);
        return await http.delete(`/estante/delete/`+nome);
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
