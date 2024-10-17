import { model, models, Schema } from "mongoose";

export type Job = {
    _id: string,
    jobTitle: string,
    orgName?: string,
    locationType: string,
    employmentType: string,
    salary: number,
    country: { name: string, id: string }
    state: { name: string, id: string }
    city: { name: string, id: string }
    jobIcon: string,
    personImg: string,
    name: string,
    phone: string,
    email: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    isAdmin?: boolean,
}

const JobSchema = new Schema({
    jobTitle: { type: String, required: true },
    locationType: { type: String, required: true },
    employmentType: { type: String, required: true },
    salary: { type: String, required: true },
    country: {
        name: { type: String, required: true },
        id: { type: String, required: true }
    },
    state: {
        name: { type: String, required: true },
        id: { type: String, required: true }
    },
    city: {
        name: { type: String, required: true },
        id: { type: String, required: true }
    },
    jobIcon: { type: String, },
    orgId: { type: String, required: true },
    personImg: { type: String, },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

export const JobModel = models?.Job || model("Job", JobSchema);