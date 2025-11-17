import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signInSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),

})

type SignInFormValue = z.infer<typeof signInSchema>

export function SigninForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormValue>({
        resolver: zodResolver(signInSchema),

    });
    const onSubmit = async (data: SignInFormValue) => {
        //call api from backend

    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 border-border">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col  gap-6">
                            {/* header và logo */}
                            <div className="flex flex-col items-center text-center gap-2">
                                <a href="/" className="mx-auto block w-fit text-center">
                                    <img src="/logo.svg" alt="logo" />
                                </a>
                                <h1 className="text-2xl font-bold">
                                    Welcome back to Moji
                                </h1>
                                <p className="text-muted-foreground text-balance">Sign in your moji's account</p>
                            </div>

                            {/* username */}
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="username" className="block text-sm">Username</Label>
                                <Input type="text" id="username" placeholder="DeviTheDev" {...register("username")}></Input>
                                {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}

                            </div>

                            {/* password */}
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="password" className="block text-sm">Password</Label>
                                <Input type="password" id="password" placeholder="DeviTheDev" {...register("password")}></Input>
                                {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}

                            </div>

                            {/* nút đăng nhap */}

                            <Button type="submit" className="w-full" disabled={isSubmitting}>Sign in</Button>

                            <div className="text-center text-sm">
                                Don't have an account? {" "}
                                <a className="underline underline-offset-4" href="/signup">SignUp</a>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholder.png"
                            alt="Image"
                            className="absolute top-1/2 -translate-y-1/2 object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}