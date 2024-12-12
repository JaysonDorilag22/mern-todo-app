import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@assets/logo.png";
import { signIn, signUp } from "../redux/actions/authActions";
import { useToast } from "@/hooks/use-toast";
import { showToast } from "@/utils/toastUtils";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const { toast } = useToast();

  console.log(user)
  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const file = files[0];
      setCredentials({ ...credentials, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleSignIn = async (credentials) => {
    const response = await dispatch(
      signIn({ email: credentials.email, password: credentials.password })
    );
    if (response?.error) {
      throw new Error(response.error.message);
    }
    showToast(toast, "Sign In Successful", "You have successfully signed in", "success");
    navigate("/home");
  };
  
  const handleSignUp = async (credentials) => {
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    if (credentials.avatar) {
      formData.append("avatar", credentials.avatar);
    }
    const response = await dispatch(signUp(formData));
    if (response?.error) {
      throw new Error(response.error.message);
    }
    showToast(toast, "Sign Up Successful", "You have successfully signed up.", "success");
    setIsSignIn(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      if (isSignIn) {
        await handleSignIn(credentials);
      } else {
        await handleSignUp(credentials);
      }
    } catch (error) {
      showToast(toast, isSignIn ? "Sign In Failed" : "Sign Up Failed", error.message || "An error occurred. Please try again.", "error");
    }
    setLoading(false); // Set loading to false
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            {isSignIn ? (
              <img src={logo} alt="Logo" className="w-16 h-16" />
            ) : (
              <div className="relative w-24 h-24">
                <input
                  type="file"
                  name="avatar"
                  id="avatar-upload"
                  className="hidden"
                  onChange={handleChange}
                />
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <img
                    src={avatarPreview || "https://via.placeholder.com/96"}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </label>
              </div>
            )}
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
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button className="w-full mt-4" type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    placeholder="John Doe"
                    value={credentials.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button className="w-full mt-4" type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing Up...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
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
  );
}