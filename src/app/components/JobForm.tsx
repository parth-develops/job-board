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

export default function JobForm({ orgId }: { orgId: string }) {
    const [countryId, setCountryId] = useState(0);
    const [stateId, setstateId] = useState(0);
    const [, setCityId] = useState(0);
    const [countryName, setCountryName] = useState("");
    const [stateName, setstateName] = useState("");
    const [cityName, setCityName] = useState("");

    async function saveJob(data: FormData) {
        data.set("country", countryName)
        data.set("state", stateName)
        data.set("city", cityName)
        data.set("orgId", orgId)

        const jobDoc = await saveJobAction(data)
        redirect(`/jobs/${orgId}`)
    }

    return (
        <Theme>
            <form action={saveJob} className="mt-6">
                <div className="flex flex-col gap-4">
                    <TextField.Root name="jobTitle" placeholder="Job Title" />

                    <div className="grid grid-cols-3 gap-4">
                        <RadioGroup.Root defaultValue="hybrid" name="locationType">
                            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Remote</RadioGroup.Item>
                        </RadioGroup.Root>
                        <RadioGroup.Root defaultValue="project" name="employmentType">
                            <RadioGroup.Item value="project">Project</RadioGroup.Item>
                            <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                        <div>
                            <label htmlFor=""></label>
                            <TextField.Root name="salary" type="number">
                                <TextField.Slot>$</TextField.Slot>
                                <TextField.Slot>/year</TextField.Slot>
                            </TextField.Root>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <CountrySelect
                            onChange={(e: any) => {
                                console.log(e);

                                setCountryId(e.id);
                                setCountryName(e.name);
                            }}
                            placeHolder="Select Country"
                        />
                        <StateSelect
                            countryid={countryId}
                            onChange={(e: any) => {
                                setstateId(e.id);
                                setstateName(e.name);
                            }}
                            placeHolder="Select State"
                        />
                        <CitySelect
                            countryid={countryId}
                            stateid={stateId}
                            onChange={(e: any) => {
                                setCityId(e.id);
                                setCityName(e.name);
                            }}
                            placeHolder="Select City"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3>Job icon</h3>
                            <ImageUpload name="jobIcon" icon={FaStar} />
                        </div>
                        <div className="">
                            <h3>Contact Person</h3>
                            <div className="flex gap-2">
                                <div>
                                    <ImageUpload name="personImg" icon={FaUser} />
                                </div>
                                <div className="w-full flex flex-col">
                                    <TextField.Root placeholder="John Doe" name="name">
                                        <TextField.Slot>
                                            <FaUser />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Phone" type="tel" name="phone">
                                        <TextField.Slot>
                                            <FaPhoneAlt />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Email" type="email" name="email">
                                        <TextField.Slot>
                                            <FaEnvelope size={16} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TextArea placeholder="Job Description" resize={"vertical"} name="description" />
                    <Button size="3" type="submit" className="mx-auto max-w-40 w-full">Save</Button>
                </div>
            </form>
        </Theme>
    )
}
