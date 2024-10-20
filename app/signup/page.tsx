'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { FormEvent, useState } from "react"
import { Loader2 } from "lucide-react"
import { withDebounce, withLoader } from "@/utils"
import { Auth, DB, serverTimestamp } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


import Link from "next/link"

export default function () {

    const { register, handleSubmit, watch, reset, setError, clearErrors, formState } = useForm();
    const { errors } = formState as { errors: any };
    const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false)
    const [isCheckingUsername, setCheckingUsername] = useState<boolean>(false)
    const [isUsernameAvailable, setUsernameAvailability] = useState<boolean>(false)

    const [alert, setAlert] = useState<Record<string, any>>({
        show: false,
        variant: 'default',
        title: '',
        description: '',
    });


    const checkUsernameAvailability = (event: FormEvent<HTMLInputElement>) => {

        const { currentTarget } = event
        const username = currentTarget.value.trim()

        if (username != '') {

            // just return if any validation fails and let react hook form handle error message on submit
            if (username.length < 3) return
            if (username.length > 12) return
            if (!new RegExp(/^[A-Za-z0-9_]+$/).test(username)) return

            withDebounce(() => {
                withLoader(async () => {
                    const records = await DB.query('users', 'username', '==', username)

                    if (records.length > 0) {
                        setUsernameAvailability(false)
                        setError('username', {
                            type: 'manual',
                            message: 'username already exists',
                        });
                    } else {
                        setUsernameAvailability(true)
                        clearErrors('username')
                    }

                }, setCheckingUsername)
            })
        }

    }

    const onSubmit = (data: Record<string, string>) => {

        const { username, email, password } = data

        withLoader(async () => {
            const { error, user } = await Auth.createUser(email, password)

            if (error) {

                setAlert({
                    show: true,
                    variant: 'destructive',
                    title: 'Oops!',
                    description: error,
                })

            } else {


                // storing user data into firestore
                await DB.setData('users', user?.uid, {
                    username,
                    email,
                    uid: user?.uid,
                    role: 'user',
                    fname: null,
                    lname: null,
                    avatar: null,
                    contact: null,
                    address: null,
                    created: serverTimestamp()
                })

                setAlert({
                    show: true,
                    variant: 'default',
                    title: 'Congrats!',
                    description: 'Your account has been created',
                })

                reset() // resetting form upon signup

            }

        }, setFormSubmitting)
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Enter your info to create to your account
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
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <Input
                                        type="username"
                                        placeholder="Enter your username"
                                        {
                                        ...register("username", {
                                            required: 'username is required',
                                            pattern: {
                                                value: /^[A-Za-z0-9_]+$/,
                                                message: 'username can only contain letters, numbers, and underscores'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "username must be at least 3 characters",
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: "username cannot exceed 30 characters",
                                            },
                                            validate: () => isUsernameAvailable || 'username already exists'
                                        })
                                        }
                                        onInput={checkUsernameAvailability}
                                    />
                                    <Spinner isLoading={isCheckingUsername} />
                                </div>
                                <small className="text-red-800">{errors.username?.message}</small>
                            </div>
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
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    {
                                    ...register("password", {
                                        required: 'password is required',
                                        minLength: {
                                            value: 8,
                                            message: "password must be at least 8 characters",
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "password cannot exceed 15 characters",
                                        },
                                    })
                                    }
                                />
                                <small className="text-red-800">{errors.password?.message}</small>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm password</Label>
                                <Input
                                    placeholder="Re-enter password"
                                    type="confirm-password"
                                    {
                                    ...register("confirmpassword", {
                                        required: 'please confirm your password',
                                        minLength: {
                                            value: 8,
                                            message: "password must be at least 8 characters",
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "password cannot exceed 15 characters",
                                        },
                                        validate: (value) =>
                                            value === watch("password") || "Passwords do not match",
                                    })
                                    }
                                />
                                <small className="text-red-800">{errors.confirmpassword?.message}</small>
                            </div>
                            <Button type="submit" className="w-full" disabled={isCheckingUsername || isFormSubmitting}>
                                {isFormSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isFormSubmitting ? 'Creating account' : 'Signup'}
                            </Button>
                            <Button variant="outline" className="w-full">
                                Signup with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/signin" className="underline">
                                Signin
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

function Spinner({ isLoading }: { isLoading: boolean }) {
    return isLoading && <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <span className="block w-4 h-4 rounded-full border-primary border-2 border-t-transparent animate-spin"></span>
    </div>
}