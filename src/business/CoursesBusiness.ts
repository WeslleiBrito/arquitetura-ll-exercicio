import { CourseDatabase } from "../database/CoursesDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/BadRequestError copy"
import { ConflictError } from "../errors/ConflictError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { Course } from "../models/Course"
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

    public deleteCourseById = async (id: string) => {

        const courseDatabase = new CourseDatabase()

        const [idExist] = await courseDatabase.findCourses(id)

        if (!idExist) {
            throw new NotFoundError('O id informado não existe.')
        }

        await courseDatabase.deleteCourseById(id)

    }

    public editCourseById = async (id: string, input: any) => {
        const courseDatabase = new CourseDatabase()

        const { newId, name, lessons } = input

        const valuesDb = await courseDatabase.findCourses(undefined)
        const searchCourse = valuesDb.find((course) => {return course.id === id})        
        
        if (!searchCourse) {
            throw new NotFoundError('O id informado não existe.')
        }

        Object.entries({ newId, name }).forEach((property) => {
            const [key, value] = property

            if (typeof (value) !== "undefined") {

                if (typeof (value) !== "string") {
                    throw new BadRequestError(`A propriedade '${key}' deve ser uma string, porém o valor recebido foi do tipo '${typeof value}'`)
                } else if (value.length === 0) {
                    throw new UnprocessableEntityError(`A propriedade '${key}' não pode ser vazia.'`)
                }
            }
        })


        if(typeof(newId) !== "undefined" && newId !== id){
            const newIdExist =  valuesDb.findIndex((course) => {course.id === newId})
            
            if(newIdExist !== -1 ){
                throw new ConflictError('O novo id já existe!')
            }
        }
        
        if(typeof(lessons) !== "undefined" && typeof(lessons) !== "number"){
            throw new BadRequestError(`A propriedade 'lessons' deve ser um number, porém o valor recebido foi do tipo '${typeof lessons}'`)
        }

        const editedCourse = new Course(
           searchCourse.id,
           searchCourse.name,
           searchCourse.lessons
        )
        
        
        editedCourse.setId(newId ? newId : searchCourse.id)
        editedCourse.setName(name ? name : searchCourse.name)
        editedCourse.setLessons(lessons ? lessons : searchCourse.lessons)

       await courseDatabase.editCourseById(id, {newId: editedCourse.getId(), name: editedCourse.getName(), lessons: editedCourse.getLessons()})  
        
    }
}