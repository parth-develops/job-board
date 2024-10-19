import { Job, JobModel } from "@/app/models/Job";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
    params: {
        jobId: string
    }
}

export default async function JobDetailPage(props: PageProps) {
    const jobId = props.params.jobId;
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobDoc: Job | null = await JobModel.findById(jobId);

    return (
        <div className="container mt-8 mb-6">
            <div className="flex gap-4 items-center">
                <div>
                    <Image src={jobDoc?.jobIcon || ""} alt={jobDoc?.orgName || "Job Icon"} width={100} height={100} className="w-auto h-auto" />
                </div>
                <div className="grow">
                    <h1 className="text-4xl mb-2">{jobDoc?.jobTitle}</h1>
                    <div className="capitalize text-sm text-blue-800 mb-4">
                        <span title="Location type">{jobDoc?.locationType}</span> &bull; <span title="Location">{`${jobDoc?.country.name}, ${jobDoc?.state.name}, ${jobDoc?.city.name}`}</span> &bull; <span title="Employment Type">{jobDoc?.employmentType}</span>
                    </div>
                </div>
            </div>
            <p className="whitespace-pre-line text-sm text-gray-600">{jobDoc?.description}</p>
            <div className="mt-4 bg-gray-200 p-8 rounded-lg">
                <h3 className="font-bold mb-2">Apply by contacting us</h3>
                <div className="flex gap-4">
                    <Image
                        src={jobDoc?.personImg || ""}
                        alt={'contact person'}
                        width={500} height={500}
                        className="w-auto h-auto max-w-24 max-h-24"
                    />
                    <div className="self-center">
                        <p>{jobDoc?.name}</p>
                        <p>Email: <Link href={`mailto:${jobDoc?.email}`} className="inline">{jobDoc?.email}</Link></p>
                        <p>Phone: {jobDoc?.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
