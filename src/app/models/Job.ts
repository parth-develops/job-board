import { model, models, Schema } from "mongoose";

export type Job = {
    _id: string,
    jobTitle: string,
    orgName?: string,
    locationType: string,
    employmentType: string,
    salary: number,
    country: string,
    state: string,
    city: string,
    jobIcon: string,
    personImg: string,
    phone: string,
    email: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}

const JobSchema = new Schema({
    jobTitle: { type: String, required: true },
    locationType: { type: String, required: true },
    employmentType: { type: String, required: true },
    salary: { type: Number, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    jobIcon: { type: String, },
    orgId: { type: String, required: true },
    personImg: { type: String, },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

export const JobModel = models?.Job || model("Job", JobSchema);