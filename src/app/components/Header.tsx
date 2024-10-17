import Link from "next/link";
import {
    getSignInUrl,
    withAuth,
    signOut
} from '@workos-inc/authkit-nextjs';

export default async function Header() {
    const { user } = await withAuth();
    const signInUrl = await getSignInUrl();

    const handleSignOut = async () => {
        'use server';
        await signOut();
    }

    return (
        <header className="">
            <div className="container flex items-center justify-between mx-auto my-4">
                <Link href={'/'} className="font-bold text-xl">Job Board </Link>
                <nav className="flex gap-4" >
                    {!user && <Link className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md text-sm sm:text-base" href={signInUrl}>Login</Link>}
                    {
                        user && <form action={handleSignOut}>
                            <button type="submit" className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md text-sm sm:text-base">Logout</button>
                        </form>
                    }
                    <Link className="bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-md text-sm sm:text-base" href={"/new-listing"}>Post a Job</Link>
                </nav>
            </div>
        </header>
    )
}
