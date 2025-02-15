"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function AuthForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    collegeApplied: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth?login=true" : "/api/auth?signup=true";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage(data.message);

      if (isLogin) {
        localStorage.setItem("token", data.token);  
        window.dispatchEvent(new Event("authChange")); 
        router.push("/dashboard");  
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="p-8 shadow-lg rounded-2xl w-full max-w-md text-white border border-dashed cardform">
        <h1 className="text-2xl font-semibold text-center">{isLogin ? "Login" : "Sign Up"}</h1>

        {message && <p className="text-center mt-2 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
          )}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />

          {!isLogin && (
            <input type="text" name="collegeApplied" placeholder="College Applied" value={formData.collegeApplied} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
          )}

          <button type="submit" className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button className="text-blue-500 ml-2" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
