import { CourseDatabase } from "../database/CoursesDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { CourseDB } from "../types/types"



export class CourseBusiness {

    public getCourse = async (id: string | undefined): Promise<CourseDB[]> => {
        const courseDatabase = new CourseDatabase()

        const result = courseDatabase.findCourses(id)

        return result
    }

    public createCourse = async (input: any): Promise<number> => {

        const {
            id,
            name,
            lessons
        } = input

        Object.entries({ id, name }).forEach((property) => {
            const [key, value] = property

            if (typeof (value) !== "string") {
                throw new BadRequestError(`A propriedade '${key}' deve ser uma string, porém o valor recebido foi do tipo '${typeof value}'`)
            } else if (value.length === 0) {
                throw new UnprocessableEntityError(`A propriedade '${key}' não pode ser vazia.'`)
            }
        })

        if (typeof (lessons) !== "number") {
            throw new BadRequestError(`A propriedade 'lessons' deve ser um number, porém o valor recebido foi do tipo '${typeof lessons}'`)
        } else if (lessons <= 0) {
            throw new UnprocessableEntityError(`A propriedade 'lessons' espera receber um valor positivo maior que zero.'`)
        }

        const courseDatabase = new CourseDatabase()

        const [idExist] = await courseDatabase.findCourses(id)

        if (idExist) {
            throw new ConflictError('O id informado já existe!')
        }

        const create = await courseDatabase.createCourse({ id, name, lessons })

        return create
    }

}