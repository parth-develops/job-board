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

export default function JobForm() {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

    return (
        <Theme>
            <form action="" className="mt-6">
                <div className="flex flex-col gap-4">
                    <TextField.Root placeholder="Job Title" />

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
                            <TextField.Root>
                                <TextField.Slot>$</TextField.Slot>
                                <TextField.Slot>/year</TextField.Slot>
                            </TextField.Root>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <CountrySelect
                            onChange={(e) => {
                                setCountryid(e.id);
                            }}
                            placeHolder="Select Country"
                        />
                        <StateSelect
                            countryid={countryid}
                            onChange={(e) => {
                                setstateid(e.id);
                            }}
                            placeHolder="Select State"
                        />
                        <CitySelect
                            countryid={countryid}
                            stateid={stateid}
                            onChange={(e: Event) => {
                                console.log(e);
                            }}
                            placeHolder="Select City"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3>Job icon</h3>
                            <ImageUpload name="xyz" icon={FaStar} />
                        </div>
                        <div className="">
                            <h3>Contact Person</h3>
                            <div className="flex gap-2">
                                <div>
                                    <ImageUpload name="abc" icon={FaUser} />
                                </div>
                                <div className="w-full flex flex-col">
                                    <TextField.Root placeholder="John Doe">
                                        <TextField.Slot>
                                            <FaUser />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Phone" type="tel">
                                        <TextField.Slot>
                                            <FaPhoneAlt />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Email" type="email">
                                        <TextField.Slot>
                                            <FaEnvelope size={16} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TextArea placeholder="Job Description" resize={"vertical"} />
                    <Button size="3" type="submit" className="mx-auto max-w-40 w-full">Save</Button>
                </div>
            </form>
        </Theme>
    )
}
