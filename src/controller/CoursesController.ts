import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { CourseBusiness } from "../business/CoursesBusiness";

export class CourseController {

    public createCourses = async (req: Request, res: Response) => {
        try {
            const input: any = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }

            const courseBusiness = new CourseBusiness()
            await courseBusiness.createCourse(input)

            res.status(201).send("Curso criado com sucesso!")

        } catch (error) {

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getCourse = async (req: Request, res: Response) => {

        try {

            const id = req.query.id as string | undefined

            const courseBusiness = new CourseBusiness()
            const result = await courseBusiness.getCourse(id)

            res.status(200).send(result)

        } catch (error) {

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteCourseById = async (req: Request, res: Response) => {

        try {
            const id = req.params.id

            const courseBusiness = new CourseBusiness()
            await courseBusiness.deleteCourseById(id)

            res.status(200).send("Curso deletado com sucesso!")

        } catch (error) {

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editCourseById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            
            const input: any = {
                newId: req.body.newId,
                name: req.body.name,
                lessons: req.body.lessons
            }
            const courseBusiness = new CourseBusiness()
            await courseBusiness.editCourseById(id, input)

            res.status(201).send("Curso editado com sucesso!")
            
        } catch (error) {

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }

        }
        

    }
}