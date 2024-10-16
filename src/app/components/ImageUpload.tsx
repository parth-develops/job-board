"use client"

import { Button, Spinner } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IconType } from "react-icons";

type PropsType = {
    name: string,
    icon: IconType
};

export default function ImageUpload(props: PropsType) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [imgPath, setImgPath] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(false);

    async function upload(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;

        if (input && input.files?.length && input.files?.length > 0) {
            setIsUploading(true);
            const file = input.files[0];
            const data = new FormData;
            data.set('file', file);
            const response = await axios.post('/api/upload', data)

            if (response.data.path) {
                setImgPath(response.data.path);
                setIsUploading(false);
                setIsImgLoading(true);
            }
        }
    }

    return (
        <>
            <div className="bg-gray-200 size-24 rounded-md inline-flex items-center content-center justify-center">
                {(isUploading || isImgLoading) && <Spinner />}
                {(imgPath && !isUploading) ? <Image onLoad={() => setIsImgLoading(false)} src={imgPath} alt="image" width={100} height={100} className="w-auto h-auto" /> : (!imgPath && !isUploading && <props.icon />)}
            </div>
            <div className="mt-2">
                <input type="hidden" name={props.name} value={imgPath} />
                <input type="file" ref={fileRef} className="hidden" onChange={e => upload(e)} />
                <Button variant="soft" className="block" type="button"
                    onClick={() => fileRef.current?.click()}
                >
                    Select File
                </Button>
            </div>
        </>
    )
}
