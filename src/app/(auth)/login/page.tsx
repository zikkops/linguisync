"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Card, CardBody } from "@/components/shared/Card";
import { Input } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { useSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();

  function handleDemoLogin(userId: string, role: "consumer" | "worker") {
    login(userId);
    router.push(role === "consumer" ? "/app" : "/app/worker");
  }

  return (
    <Card className="w-full max-w-md animate-fade-in-up">
      <CardBody className="p-8">
        <div className="flex items-center gap-2">
          <LogIn className="h-5 w-5 text-accent-600" />
          <h1 className="font-display text-2xl font-semibold text-navy-950">Log in</h1>
        </div>
        <p className="mt-1.5 text-sm text-navy-400">v1 preview — sign in as a seeded demo account below.</p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleDemoLogin("u_con_1", "consumer");
          }}
        >
          <Input id="email" label="Email" type="email" placeholder="you@example.com" required />
          <Input id="password" label="Password" type="password" placeholder="••••••••" required />
          <div className="flex justify-end">
            <button type="button" className="text-sm font-medium text-navy-400 hover:text-navy-900">
              Forgot password?
            </button>
          </div>
          <Button type="submit" className="mt-1">Log in</Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-0.5 flex-1 bg-navy-100" />
          <span className="text-xs font-medium text-navy-300">Or preview as</span>
          <div className="h-0.5 flex-1 bg-navy-100" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={() => handleDemoLogin("u_con_1", "consumer")}>
            Consumer demo
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDemoLogin("u_wk_1", "worker")}>
            Worker demo
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-navy-500">
          New here?{" "}
          <Link href="/register" className="font-semibold text-navy-900 hover:text-navy-700">
            Create an account
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
