import express from "express"
import { CourseController } from "../controller/CoursesController"


export const courseRouter = express.Router()
const courseController = new CourseController()

courseRouter.post('/', courseController.createCourses)
courseRouter.get('/', courseController.getCourse)
courseRouter.delete('/:id', courseController.deleteCourseById)