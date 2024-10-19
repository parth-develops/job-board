import { AutoPaginatable, OrganizationMembership, type User, WorkOS } from "@workos-inc/node";
import mongoose, { model, models, Schema } from "mongoose";

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
    orgId: string,
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

export async function addOrgAndUserData(jobsDocs: Job[], user: User | null) {
    jobsDocs = JSON.parse(JSON.stringify(jobsDocs));
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    await mongoose.connect(process.env.MONGO_URI as string);

    let oms: AutoPaginatable<OrganizationMembership> | null = null

    if (user) {
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user.id
        })
    }

    for (const job of jobsDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;

        if (oms && oms.data.length > 0) {
            job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId)
        }
    }

    return jobsDocs;
}

export const JobModel = models?.Job || model("Job", JobSchema);