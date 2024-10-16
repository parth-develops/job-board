import Jobs from "@/app/components/Jobs";
import { JobModel } from "@/app/models/Job";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        orgId: string;
    }
}

export default async function CompanyJobsPage(props: PageProps) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobsDoc = await JobModel.find({ orgId: org.id });

    for (const job of jobsDoc) {
        workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
    }

    return (
        <div className="container">
            <h1 className="text-xl my-6">{org.name} Jobs</h1>
            <Jobs jobs={JSON.parse(JSON.stringify(jobsDoc))} header={"Jobs posted by " + org.name} />
        </div>
    )
}
