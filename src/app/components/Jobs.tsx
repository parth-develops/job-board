"use client"

import { useSearchParams } from "next/navigation";
import type { Job } from "../models/Job";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";

export default function Jobs({ header, jobs }: { header?: string, jobs?: Job[] }) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search");

    const [searchTerm, setSearchTerm] = useState(searchQuery || '');

    useEffect(() => {
        if (searchQuery) {
            console.log("THE seearch Params", searchParams);

            setSearchTerm(searchQuery);
        }
    }, [searchQuery, searchParams])

    const jobsToRender = (searchParams.size && searchTerm)
        ? jobs?.filter(job => {
            return (
                job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.locationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.employmentType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        : jobs;


    return (
        <section className="bg-slate-200 py-4 rounded-3xl">
            <div className="container">
                <h2 className="font-bold mb-4">{header || "Recent Jobs"}</h2>
                <div className="flex flex-col gap-4">
                    {!jobs?.length && (
                        <div>No Jobs found</div>
                    )}
                    {jobsToRender?.map((job) => (
                        <JobCard key={job._id} jobInfo={job} />
                    ))}
                </div>
            </div>
        </section>
    )
}
