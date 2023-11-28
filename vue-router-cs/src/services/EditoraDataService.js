
import http from "../http-common";

class EditoraDataService {

    async authenticate(data){

        console.log('EditoraDataService.authenticate: ', data);
        const response = await http.post(`/logineditora`, data);
        return response;
    }

    async get(data){

        console.log('EditoraDataService.get: ', data);
        return await http.get('/editora'+data);
    }

    async list(){

        console.log('EditoraDataService.list: ');
        return await http.get(`/editora/list`);
    }

    async delete(data){

        console.log('EditoraDataService.delete: ', data);
        return await http.delete(`/editora/delete/`+ data);
    }

    async update(data){

        console.log('EditoraDataService.update: ', data);
        return await http.post(`/editora/update`, data);
    }
    
    async create(data){

        console.log('EditoraDataService.create: ', data);
        return await http.post(`/editora/store`, data);

    }  

}
export default new EditoraDataService();
