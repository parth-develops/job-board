"use server";

import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node"
import Link from "next/link";

export default async function NewListing() {
    const { user } = await withAuth();

    if (!user) {
        return <div className="container">
            <div>You need to be logged in to post a job.</div>
        </div>
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY)
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({ userId: user.id });

    const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === "active");
    const orgNames: { [key: string]: string } = {}

    for (const activeMembership of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        orgNames[organization.id] = organization.name;
    }

    return (
        <div className="container">
            {JSON.stringify(orgNames)}
            <div>
                <h2 className="text-lg mt-6">Your companies</h2>
                <p className="text-gray-500 text-sm">Select a company to create a job</p>
                <div className="">
                    {Object.keys(orgNames).map(orgId => <div key={orgId}>
                        <Link href={'/new-listing/' + orgId} className="py-2 px-4 block mt-3 border w-fit rounded-md">
                            {orgNames[orgId]}
                        </Link>
                    </div>)}
                </div>
                {organizationMemberships.data.length === 0 && (
                    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">No companies assigned to your user</div>
                )}
                <h2 className="text-lg mt-6">Create a new company</h2>
                <p className="text-gray-500 text-sm">To create a job listing you first need to create your company</p>
            </div>
            <Link href={"/new-company"}
                className="bg-gray-200 px-4 py-2 rounded-md inline-block mt-6"
            >
                Create Company</Link>
        </div>
    )
}