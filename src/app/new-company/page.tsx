import { createCompany } from "../actions/workOsActions";
import { withAuth } from "@workos-inc/authkit-nextjs"

export default async function NewCompany() {
    const { user } = await withAuth();

    if (!user) {
        <div className="container">
            <div>You need to be logged in first!</div>
        </div>
    }

    async function handleSubmit(formData: FormData) {
        "use server"

        if (user) {
            await createCompany(formData.get("company") as string, user.id);
        }
    }

    return (
        <div className="container">
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
    )
}
