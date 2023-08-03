import { CourseDB } from "../types/types";
import { DatabaseConnect } from "./DatabaseConnect";


export class CourseDatabase extends DatabaseConnect {

    public NAME_TABLE_COURSES: string = "courses"

    public createCourse = async (input: any): Promise<number> => {
        const {
            id,
            name,
            lessons
        } = input

        const [create] = await DatabaseConnect.connection(this.NAME_TABLE_COURSES).insert({ id, name, lessons })

        return create
    }

    public findCourses = async (id: string | undefined): Promise<CourseDB[]> => {

        if (id) {
            return await DatabaseConnect.connection(this.NAME_TABLE_COURSES).whereRaw('LOWER(??) LIKE ?', ['id', `%${id}%`])
        } else {
            return await DatabaseConnect.connection(this.NAME_TABLE_COURSES)
        }
    }

    public deleteCourseById = async (id: string): Promise<number> => {

        const deleted = await DatabaseConnect.connection(this.NAME_TABLE_COURSES).del().where({ id })

        return deleted
    }

    public editCourseById = async (id: string, input: any): Promise<number> => {
        const {
            newId,
            name,
            lessons
        } = input

        const update = await DatabaseConnect.connection(this.NAME_TABLE_COURSES).update({ newId, name, lessons }).where({ id })

        return update
    }
}