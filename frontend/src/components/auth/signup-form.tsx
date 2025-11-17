import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema = z.object({
  lastname: z.string().min(1, "Last name is required"),
  firstname: z.string().min(1, "First name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),

})

type SignUpFormValue = z.infer<typeof signUpSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormValue>({
    resolver: zodResolver(signUpSchema),

  });

  const onSubmit = async (data: SignUpFormValue) => {
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
                  Create new Moji account
                </h1>
                <p className="text-muted-foreground text-balance">Welcome you, let go sign up</p>
              </div>

              {/* họ và tên */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">Last Name</Label>
                  <Input type="text" id="lastname" {...register("lastname")}></Input>
                  {/* err mess */}
                  {errors.lastname && <p className="text-destructive text-sm">{errors.lastname.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">First Name</Label>
                  <Input type="text" id="firstname" {...register("firstname")}></Input>
                  {/* err mess */}
                  {errors.firstname && <p className="text-destructive text-sm">{errors.firstname.message}</p>}
                </div>
              </div>

              {/* username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">Username</Label>
                <Input type="text" id="username" placeholder="DeviTheDev" {...register("username")}></Input>
                {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}

              </div>

              {/* email */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">Email</Label>
                <Input type="email" id="email" placeholder="devi@gmail.com" {...register("email")}></Input>
                {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}

              </div>

              {/* password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">Password</Label>
                <Input type="password" id="password" placeholder="DeviTheDev" {...register("password")}></Input>
                {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}

              </div>

              {/* nút đăng ký */}

              <Button type="submit" className="w-full" disabled={isSubmitting}>Sign up</Button>

              <div className="text-center text-sm">
                Have you already created an account?{" "}
                <a className="underline underline-offset-4" href="/signin">SignIn</a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
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
