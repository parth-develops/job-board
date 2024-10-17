import type { Job } from "../models/Job";
import JobCard from "./JobCard";

export default function Jobs({ header, jobs }: { header: string, jobs: Job[] }) {
    return (
        <section className="bg-slate-200 py-4 rounded-3xl">
            <div className="container">
                <h2 className="font-bold mb-4">{header || "Recent Jobs"}</h2>
                <div className="flex flex-col gap-4">
                    {!jobs?.length && (
                        <div>No Jobs found</div>
                    )}
                    {jobs.map((job) => (
                        <JobCard key={job._id} jobInfo={job} />
                    ))}
                </div>
            </div>
        </section>
    )
}
