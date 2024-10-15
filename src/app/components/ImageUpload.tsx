"use client"

import { Button } from "@radix-ui/themes";
import axios from "axios";
import { ChangeEvent, useRef } from "react";
import { IconType } from "react-icons";

type PropsType = {
    icon: IconType
};

export default function ImageUpload(props: PropsType) {
    const fileRef = useRef<HTMLInputElement>(null);

    async function upload(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;

        if (input && input.files?.length && input.files?.length > 0) {
            const file = input.files[0];
            const data = new FormData;
            data.set('file', file);
            const response = await axios.post('/api/upload', data)
        }
    }

    return (
        <>
            <div className="bg-gray-200 size-24 rounded-md inline-flex items-center content-center justify-center">
                {<props.icon />}
            </div>
            <div className="mt-2">
                <input type="file" name="" id="" ref={fileRef} className="hidden" onChange={e => upload(e)} />
                <Button variant="soft" className="block" type="button"
                    onClick={() => fileRef.current?.click()}
                >
                    Select File
                </Button>
            </div>
        </>
    )
}
