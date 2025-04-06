export interface Exercise {
    name: string,
    sets: number,
    reps: number;
}

export class Workout {
    constructor (
        public _id: string,
        public name: string,
        public duration: number,
        public intensity: 'Low' | 'Medium' | 'High',
        public exercises: Exercise[]
    ) { }
 }