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
}