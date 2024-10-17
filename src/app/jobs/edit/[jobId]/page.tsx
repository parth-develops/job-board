import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/app/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        jobId: string;
    }
}

export default async function EditJobPage(props: PageProps) {
    const { user } = await withAuth();

    if (!user) {
        return <div className="container">You need to login to conitnue</div>
    }

    const jobId = props.params.jobId;
    await mongoose.connect(process.env.MONGO_URI as string);

    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));

    if (!jobDoc) {
        return <div>Job not found.</div>
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user?.id,
        organizationId: jobDoc.orgId
    });

    if (oms.data.length === 0) {
        return <div className="container">Access denied</div>
    }

    return (
        <div className="container">
            <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
        </div>
    )
}
