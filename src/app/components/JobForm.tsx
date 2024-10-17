"use client";

import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { FaUser, FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "react-country-state-city/dist/react-country-state-city.css";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { saveJobAction } from "../actions/jobActions";
import { redirect } from "next/navigation";
import type { Job } from "../models/Job";

export default function JobForm({ orgId, jobDoc }: { orgId: string, jobDoc?: Job }) {
    const [countryId, setCountryId] = useState(jobDoc?.country.id || 0);
    const [stateId, setstateId] = useState(jobDoc?.state.id || 0);
    const [cityId, setCityId] = useState(jobDoc?.city.id || 0);
    const [countryName, setCountryName] = useState(jobDoc?.country.name || "");
    const [stateName, setstateName] = useState(jobDoc?.state.name || "");
    const [cityName, setCityName] = useState(jobDoc?.city.name || "");

    async function saveJob(data: FormData) {
        if (jobDoc) {
            data.set("id", jobDoc._id)
        }
        data.set("country", JSON.stringify({ name: countryName, id: countryId }))
        data.set("state", JSON.stringify({ name: stateName, id: stateId }))
        data.set("city", JSON.stringify({ name: cityName, id: cityId }))
        data.set("orgId", orgId)

        await saveJobAction(data)
        redirect(`/jobs/${orgId}`)
    }

    return (
        <Theme>
            <form action={saveJob} className="mt-6">
                <div className="flex flex-col gap-4">
                    <TextField.Root name="jobTitle" placeholder="Job Title" defaultValue={jobDoc?.jobTitle || ''} />

                    <div className="grid md:grid-cols-3 gap-4">
                        <RadioGroup.Root defaultValue={jobDoc?.locationType || 'hybrid'} name="locationType">
                            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Remote</RadioGroup.Item>
                        </RadioGroup.Root>
                        <RadioGroup.Root defaultValue={jobDoc?.employmentType || 'full time'} name="employmentType">
                            <RadioGroup.Item value="project">Project</RadioGroup.Item>
                            <RadioGroup.Item value="part time">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="full time">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                        <div>
                            <label htmlFor="salary">Salary</label>
                            <TextField.Root name="salary" id="salary" type="number" defaultValue={jobDoc?.salary || ''}>
                                <TextField.Slot>$</TextField.Slot>
                                <TextField.Slot>/year</TextField.Slot>
                            </TextField.Root>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                        <CountrySelect
                            onChange={(e: any) => {
                                console.log(e);

                                setCountryId(e.id);
                                setCountryName(e.name);
                            }}
                            placeHolder="Select Country"
                            defaultValue={{ id: countryId, name: countryName }}
                        />
                        <StateSelect
                            countryid={countryId}
                            onChange={(e: any) => {
                                setstateId(e.id);
                                setstateName(e.name);
                            }}
                            placeHolder="Select State"
                            defaultValue={{ id: stateId, name: stateName }}
                        />
                        <CitySelect
                            countryid={countryId}
                            stateid={stateId}
                            onChange={(e: any) => {
                                setCityId(e.id);
                                setCityName(e.name);
                            }}
                            placeHolder="Select City"
                            defaultValue={{ id: cityId, name: cityName }}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3>Job icon</h3>
                            <ImageUpload name="jobIcon" icon={FaStar} defaultValue={jobDoc?.jobIcon} />
                        </div>
                        <div className="">
                            <h3>Contact Person</h3>
                            <div className="flex gap-2">
                                <div>
                                    <ImageUpload name="personImg" icon={FaUser} defaultValue={jobDoc?.personImg} />
                                </div>
                                <div className="w-full flex flex-col">
                                    <TextField.Root placeholder="John Doe" name="name" defaultValue={jobDoc?.name}>
                                        <TextField.Slot>
                                            <FaUser />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Phone" type="tel" name="phone" defaultValue={jobDoc?.phone}>
                                        <TextField.Slot>
                                            <FaPhoneAlt />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Email" type="email" name="email" defaultValue={jobDoc?.email}>
                                        <TextField.Slot>
                                            <FaEnvelope size={16} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TextArea placeholder="Job Description" resize={"vertical"} name="description" defaultValue={jobDoc?.description} />
                    <Button size="3" type="submit" className="mx-auto max-w-40 w-full">Save</Button>
                </div>
            </form>
        </Theme>
    )
}
