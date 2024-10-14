"use server";

import { WorkOS } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY)

export async function createCompany(formData: FormData, userId: string) {
    const org = await workos.organizations.createOrganization({ name: formData.get("company") as string });

    await workos.userManagement.createOrganizationMembership({
        userId,
        organizationId: org.id,
        roleSlug: "admin"
    })
}