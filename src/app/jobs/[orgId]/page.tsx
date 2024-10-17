import Jobs from "@/app/components/Jobs";
import { JobModel } from "@/app/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { AutoPaginatable, OrganizationMembership, WorkOS } from "@workos-inc/node";
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
    const jobsDoc = JSON.parse(JSON.stringify(await JobModel.find({ orgId: org.id })));

    let oms: AutoPaginatable<OrganizationMembership> | null = null
    const { user } = await withAuth();

    if (user) {
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user.id
        })
    }

    for (const job of jobsDoc) {
        workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;

        if (oms && oms.data.length > 0) {
            job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId)
        }
    }

    return (
        <div className="container">
            <h1 className="text-xl my-6">{org.name} Jobs</h1>
            <Jobs jobs={jobsDoc} header={"Jobs posted by " + org.name} />
        </div>
    )
}
