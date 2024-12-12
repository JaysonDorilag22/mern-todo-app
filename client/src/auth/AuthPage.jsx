import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from "@assets/logo.png"

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        <div className="flex justify-center">
          {/* Replace with your logo */}
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>
        <CardTitle className="text-2xl text-center">
          {isSignIn ? "Sign In" : "Sign Up"}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignIn
            ? "Enter your email and password to sign in"
            : "Create an account to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs 
          value={isSignIn ? "signin" : "signup"} 
          className="space-y-4"
          onValueChange={(value) => setIsSignIn(value === "signin")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" type="password" required />
              </div>
              <Button className="w-full mt-4" type="submit">Sign In</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input id="signup-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required />
              </div>
              <Button className="w-full mt-4" type="submit">Sign Up</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full">
          {isSignIn ? (
            <>
              Don't have an account?{" "}
              <Button variant="link" className="p-0" onClick={toggleAuthMode}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={toggleAuthMode}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  </div>
  )
}