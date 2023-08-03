

export class Course {
    constructor(
        private id: string,
        private name: string,
        private lessons: number
    ) { }

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }

    public getLessons = (): number => {
        return this.lessons
    }

    public setId = (newId: string): void => {
        this.id = newId
    }
    public setName = (newName: string): void => {
        this.name = newName
    }
    public setLessons = (newLessons: number): void => {
        this.lessons = newLessons
    }
}