import { DatabaseConnect } from "./DatabaseConnect";


export class CourseDatabase extends DatabaseConnect {

    public NAME_TABLE_COURSES: string = "courses"

    public createCourse = async (input: any): Promise<number>  => {
        const {
            id,
            name, 
            lessons
        } = input

        const [create] = await DatabaseConnect.connection(this.NAME_TABLE_COURSES).insert({id, name, lessons})

        return create
    }
}