import JobForm from "@/app/components/JobForm";
import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node";

type PageProps = {
    params: { orgId: string }
}

export default async function OrganizationPage(props: PageProps) {
    const { user } = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if (!user) {
        return <div className="container">Please log in to continue</div>
    }

    const orgId = props.params.orgId;

    const orgMemberships = await workos.userManagement.listOrganizationMemberships({ userId: user.id, organizationId: orgId })
    const hasAccess = orgMemberships.data.length > 0;

    if (!hasAccess) {
        return "no access";
    }

    const orgMembership = orgMemberships.data.find(om => orgId === om.organizationId)

    return (
        <div className='container'>
            <JobForm orgId={orgId} />
        </div>
    )
}
