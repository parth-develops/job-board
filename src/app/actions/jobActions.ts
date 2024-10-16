"use server";

import mongoose from "mongoose";
import { JobModel } from "../models/Job";

export async function saveJobAction(formData: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobDocument = await JobModel.create(Object.fromEntries(formData));

    return JSON.parse(JSON.stringify(jobDocument));
}