"use server";

import mongoose from "mongoose";
import { JobModel } from "../models/Job";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobDocument = await JobModel.create(Object.fromEntries(formData));
    if ('orgId' in formData) {   
        revalidatePath('/jobs/'+formData.orgId)
    }

    return JSON.parse(JSON.stringify(jobDocument));
}