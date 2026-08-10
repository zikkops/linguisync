"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Card, CardBody } from "@/components/shared/Card";
import { Input } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";

export default function AdminLoginPage() {
  const router = useRouter();

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

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/admin");
            }}
          >
            <Input id="admin-email" label="Admin email" type="email" required />
            <Input id="admin-password" label="Password" type="password" required />
            <Button type="submit" className="mt-1">
              Sign in
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
