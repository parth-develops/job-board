"use server";

import mongoose from "mongoose";
import { JobModel } from "../models/Job";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);

    const obj = Object.fromEntries(formData);

    obj["country"] = JSON.parse(obj["country"] as string);
    obj["state"] = JSON.parse(obj["state"] as string);
    obj["city"] = JSON.parse(obj["city"] as string);

    const jobDocument = (obj["id"])
        ? await JobModel.findByIdAndUpdate(obj["id"], obj)
        : await JobModel.create(obj);

    if ('orgId' in formData) {
        revalidatePath('/jobs/' + formData.orgId)
    }

    return JSON.parse(JSON.stringify(jobDocument));
}