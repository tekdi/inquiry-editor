import * as _ from 'lodash-es';

export class AsqOptions {
    constructor(public body: string) {
    }
}
export interface AsqData {
    question: string;
    options: Array<AsqOptions>;
    answer?: string;
    learningOutcome?: string;
    complexityLevel?: string;
    maxScore?: number;
}
export interface AsqConfig {
    templateId?: string;
    numberOfOptions?: number;
    maximumOptions?: number;
}

export class AsqForm {
    public question: string;
    public options: Array<AsqOptions>;
    public templateId: string;
    public answer: string;
    public learningOutcome;
    public complexityLevel;
    public maxScore;
    public numberOfOptions;
    public maximumOptions;
    constructor({ question, options, answer, learningOutcome, complexityLevel, maxScore }: AsqData, { templateId, numberOfOptions, maximumOptions }: AsqConfig) {
        this.question = question;
        this.options = options || [];
        this.templateId = templateId;
        this.answer = answer;
        this.learningOutcome = learningOutcome;
        this.complexityLevel = complexityLevel;
        this.maxScore = maxScore;
        this.numberOfOptions = numberOfOptions || 2;
        this.maximumOptions = maximumOptions || 4
        if (!this.options || !this.options?.length) {
            _.times(this.numberOfOptions, index => this.options.push(new AsqOptions('')));
        }
    }
    addOptions() {
        this.options.push(new AsqOptions(''));
    }
    deleteOptions(position) {
        this.options.splice(position, 1);
    }
}