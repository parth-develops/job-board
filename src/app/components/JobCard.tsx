"use client"

import Image from "next/image";
import { FaEdit, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { type Job } from "../models/Job";
import CreatedAt from "./CreatedAt";
import Link from "next/link";
import axios from "axios";

export default function JobCard({ jobInfo }: { jobInfo: Job }) {
    async function handleDelete() {

        await axios.delete('/api/jobs?id=' + jobInfo._id)
        window.location.reload();
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="absolute right-4 top-3"><FaRegHeart className="text-gray-400 cursor-pointer" /></div>
            {jobInfo.isAdmin && (
                <div className="flex gap-4 absolute right-12 top-3">
                    <Link href={'/jobs/edit/' + jobInfo._id}><FaEdit className="text-gray-400" /></Link>
                    <button type="button" onClick={() => handleDelete()}>
                        <FaRegTrashAlt className="text-gray-400" />
                    </button>
                </div>
            )}
            <div className="flex gap-4 grow">
                <div className="content-center">
                    <Image src={jobInfo.jobIcon} alt="Logo" width={40} height={40} />
                </div>
                <div className="sm:flex sm:grow">
                    <div className="sm:grow">
                        <p className="text-gray-500 text-sm">{jobInfo.orgName}</p>
                        <p className="font-bold text-lg mb-1">{jobInfo.jobTitle}</p>
                        <p className="text-gray-400 text-sm capitalize">
                            <span title="Location type">{jobInfo.locationType}</span> &bull; <span title="Location">{`${jobInfo.country.name}, ${jobInfo.state.name}, ${jobInfo.city.name}`}</span> &bull; <span title="Employment Type">{jobInfo.employmentType}</span>
                        </p>
                    </div>
                    {jobInfo.createdAt && (
                        <div className="content-end text-gray-500 text-sm font-medium mt-2 sm:mt-0">
                            <CreatedAt timestamp={jobInfo.createdAt} />
                        </div>
                    )}
                </div>
            </div >
        </div >
    )
}
