import { DateTime } from "luxon";
import { trainingWeeks } from "src/app/types/interfaces";


export class ChartUtilsForTrainingWeek {
    private _trainingWeeksStartDatesInMs: number[];
    private _trainingKms: number[];
    private _aggregatedValues: [number, number][] = [];


    constructor(private trainingsWeeks: trainingWeeks[]) {
        this._trainingWeeksStartDatesInMs = this._computeTrainingWeeksInMs();
        this._trainingKms = this._aggregateTrainingKms();
        this._aggregatedValues = this._aggregateDateAndKms();
    }


    get trainingWeeksStartDatesInMs() { return this._trainingWeeksStartDatesInMs };
    get trainingKms() { return this._trainingKms };
    get aggregatedValues() { return this._aggregatedValues };

    private _computeTrainingWeeksInMs() {
        return this.trainingsWeeks.flatMap(t => {
            const allStartDatesInMs: number[] = [];

            const currentKm = t.km;
            const currentTimeInMs = t.startDate.toMillis();

            allStartDatesInMs.push(currentTimeInMs);
            this.aggregatedValues.push([currentTimeInMs, currentKm]);

            return allStartDatesInMs;
        })
    }

    private _aggregateTrainingKms() {
        const allTrainingKms: number[] = [];

        this.trainingsWeeks.flatMap(t => {
            allTrainingKms.push(t.km);
        })
        return allTrainingKms;
    }

    private _aggregateDateAndKms() {
        const aggregatedValues: [number, number][] = [];

        return this.trainingsWeeks.flatMap(t => {
            const currentKm = t.km;
            const currentTimeInMs = t.startDate.toMillis();

            aggregatedValues.push([currentTimeInMs, currentKm]);

            return aggregatedValues;
        })
    }


}