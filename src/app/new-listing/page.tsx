"use server";

import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node"
import { createCompany } from "../actions/workOsActions";

export default async function NewListing() {
    const { user } = await withAuth();

    if (!user) {
        return <div className="container">
            <div>You need to be logged in to post a job.</div>
        </div>
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY)
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({ userId: user.id });

    async function handleSubmit(formData: FormData) {
        "use server"

        if (user) {   
            await createCompany(formData.get("company") as string, user.id);
        }
    }

    return (
        <div className="container">
            {
                <div>
                    <h2 className="text-lg mt-6">Your companies</h2>
                    <p className="text-gray-500 text-sm">Select a company</p>
                    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">No companies assigned to your user</div>
                    <h2 className="text-lg mt-6">Create a new company</h2>
                    <p className="text-gray-500 text-sm">To create a job listing you first need to create your company</p>
                    <form action={handleSubmit} className="flex gap-3">
                        <div>
                            <input type="text"
                                name="company"
                                className="p-2 border border-gray-400 rounded-md"
                                placeholder="Company name"
                            />
                        </div>
                        <button type="submit" className="bg-gray-200 py-2 px-4 rounded-md">Create a company</button>
                    </form>
                </div>
            }
        </div>
    )
}