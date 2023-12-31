"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {mailVerification} from "@/actions/mail-verification"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const MailVerificationForm = () => {
    
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(!token) {
            setError("Missing token!");
            return;
        }
        mailVerification(token)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() => {
            setError("An error occured while verifying your email!");
        })
    },[token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return(
        <CardWrapper
        headerLabel="confirming your verification"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center flex-col gap-y-4">
                {error && !success && (<FormError message={error}/>)}
                {success && !error && (<FormSuccess message={success}/>)}
                {!success && !error && (<BarLoader/>)}
            </div>
        </CardWrapper>
    )
}