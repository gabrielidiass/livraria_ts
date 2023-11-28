import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Editora from '../models/Editora';

class EditoraController{

    async list(req: Request, res: Response){
        const repository = getRepository(Editora);
        const lista = await repository.createQueryBuilder('tb_editora').leftJoinAndSelect("tb_editora.livros", "livros").getMany();
        return res.json(lista);
    }

    
    //metodos para adicao, alteração, remoção
    async store(req: Request, res: Response){

        const repository = getRepository(Editora);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    async delete(req: Request, res: Response){
        try {
            const repository = getRepository(Editora);
            const id = parseInt(req.params.id, 10); // Parse ID from URL parameters
            const end = await repository.findOne({ where: { id } });
    
            if (end) {
                await repository.remove(end);
                return res.sendStatus(204);
            } else {
                return res.sendStatus(404);
            }
        } catch (e: unknown) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
    
    async find(req: Request, res: Response){
        const repository = getRepository(Editora);

        const id = req.params.id;

        const j = await repository.createQueryBuilder('tb_editora').where({"id" : id}).leftJoinAndSelect("tb_editora.livros", "livros").getOne();

        if(j){     
            console.log(j);      
            return res.json(j);
        }else{
            return res.sendStatus(204);
        }
    }
    async update(req: Request, res: Response){
    
            const repository = getRepository(Editora);//recupera o repositorio do Editora.
        
            const {id} = req.body;//extrai os atributos id do corpo da mensagem
        
            const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
            
            if(!id){
                return res.sendStatus(404);
            }
            
            const p = repository.create(req.body); //cria a entidade Jogador
            
            await repository.save(p); //persiste (update) a entidade na tabela.
            
            return res.json(p);
    }

}

export default new EditoraController();