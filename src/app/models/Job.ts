import { model, models, Schema } from "mongoose";

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
})

export const JobModel = models?.Job || model("Job", JobSchema);