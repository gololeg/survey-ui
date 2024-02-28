import {ChangeEvent} from "react";

export type UploadFileButtonPropsType = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean
    base64String: string | null
}