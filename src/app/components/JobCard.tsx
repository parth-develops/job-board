"use client"

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import type { Job } from "../models/Job";
import TimeAgo from 'react-timeago'

export default function JobCard({ jobInfo }: { jobInfo: Job }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="absolute right-4 top-3"><FaHeart className="text-gray-400 cursor-pointer" /></div>
            <div className="flex gap-4 grow">
                <div className="content-center">
                    <Image src={"https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"} alt="Logo" width={40} height={40} />
                </div>
                <div className="sm:flex sm:grow">
                    <div className="sm:grow">
                        <p className="text-gray-500 text-sm">{jobInfo.orgName}</p>
                        <p className="font-bold text-lg mb-1">{jobInfo.jobTitle}</p>
                        <p className="text-gray-400 text-sm">Remote &bull; New York, US &bull; Fulltime</p>
                    </div>
                    {jobInfo.createdAt && (
                        <div className="content-end text-gray-500 text-sm font-medium mt-2 sm:mt-0"><TimeAgo date={jobInfo.createdAt} /></div>
                    )}
                </div>
            </div>
        </div>
    )
}
