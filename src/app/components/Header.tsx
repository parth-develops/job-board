import Link from "next/link";
import {
    getSignInUrl,
    withAuth
} from '@workos-inc/authkit-nextjs';

export default async function Header() {
    const { user } = await withAuth();
    const signInUrl = await getSignInUrl()

    return (
        <header className="">
            <div className="container flex items-center justify-between mx-auto my-4">
                <Link href={'/'} className="font-bold text-xl">Job Board </Link>
                <nav className="flex gap-4 *:py-2 *:px-4 *:rounded-md" >
                    {!user && <Link className="bg-gray-200" href={signInUrl}>Login</Link>}
                    <Link className="bg-blue-600 text-white" href={"/new-listing"}>Post a Job</Link>
                </nav>
            </div>
        </header>
    )
}
