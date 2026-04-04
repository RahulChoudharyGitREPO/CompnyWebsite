"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Login successful");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10">
        <h1 className="text-3xl font-bold mb-8 text-center tracking-tighter">Admin Panel</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
