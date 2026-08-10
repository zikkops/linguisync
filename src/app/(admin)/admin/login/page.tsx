"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { Card, CardBody } from "@/components/shared/Card";
import { Input } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6">
      <Card className="w-full max-w-sm bg-white">
        <CardBody className="p-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900">
              <ShieldCheck className="h-5 w-5 text-accent-400" />
            </div>
            <h1 className="font-display text-xl font-semibold text-navy-950">Admin sign-in</h1>
          </div>
          <p className="mt-1.5 text-sm text-navy-400">Separate from consumer/worker accounts. MFA required at launch.</p>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-status-danger-bg px-3.5 py-2.5 text-sm text-status-danger">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              id="admin-email"
              label="Admin email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="admin-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="mt-1" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
