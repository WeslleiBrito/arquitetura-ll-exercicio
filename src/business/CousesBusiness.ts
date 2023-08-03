import { BadRequestError } from "../errors/BadRequestError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"


export class CourseBusiness {

    public createCourse = async (input: any) => {
        
        const {
            id,
            name, 
            lessons
        } = input

        Object.entries({id, name}).forEach((property) => {
            const [key, value] = property

            if(typeof(value) !== "string"){
                throw new BadRequestError(`A propriedade '${key}' deve ser uma string, porém o valor recebido foi do tipo '${typeof value}'`)
            }else if(value.length === 0){
                throw new UnprocessableEntityError(`A propriedade '${key}' não pode ser vazia.'`)
            }
        })

        

    }
}