import { DateTime } from "luxon"

type trainingWeekTypes = 'B' | 'I' | 'S' | 'R' | 'T' | 'G';

export interface _trainingWeeksFromAPI {
    id: number,
    start_date: string
    training_week: number,
    km: number,
    type: trainingWeekTypes;
}

export interface trainingWeeks {
    startDate: DateTime,
    training_week: number,
    km: number,
    type: trainingWeekTypes;
}