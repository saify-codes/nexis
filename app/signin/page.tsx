'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { withLoader } from "@/utils"
import { Auth } from "@/lib/firebase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { useDispatch } from "react-redux";
import { createSession } from "@/store/auth";
import Link from "next/link"




export default function () {

    const dispatch = useDispatch()
    const { register, handleSubmit, watch, reset, setError, clearErrors, formState } = useForm();
    const { errors } = formState as { errors: any };
    const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false)
    const [alert, setAlert] = useState<Record<string, any>>({
        show: false,
        variant: 'default',
        title: '',
        description: '',
    });

    const onSubmit = (data: Record<string, string>) => {

        dispatch(createSession('test user', 'token'))

        return;

        const { email, password } = data

        withLoader(async () => {

            const { error, user } = await Auth.login(email, password, false)

            if (error) {

                setAlert({
                    show: true,
                    variant: 'destructive',
                    title: 'Oops!',
                    description: error,
                })

            }

        }, setFormSubmitting)
    }




    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        alert.show &&
                        <Alert className="mb-5" variant={alert.variant}>
                            <AlertTitle>{alert.title}</AlertTitle>
                            <AlertDescription>{alert.description}</AlertDescription>
                        </Alert>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {
                                    ...register("email", {
                                        required: 'password is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    })
                                    }
                                />
                                <small className="text-red-800">{errors.email?.message}</small>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    {
                                    ...register("password", {
                                        required: 'password is required',
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Password cannot exceed 15 characters",
                                        },
                                    })
                                    }
                                />
                                <small className="text-red-800">{errors.password?.message}</small>
                            </div>
                            <Button type="submit" className="w-full" disabled={isFormSubmitting}>
                                {isFormSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isFormSubmitting ? 'Signing you in' : 'Signin'}
                            </Button>
                            <Button variant="outline" className="w-full" >
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline">
                                Signup
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
