"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardBody } from "@/components/shared/Card";
import { Input, Textarea, Checkbox } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";
import { services } from "@/lib/mock-data";

type Role = "consumer" | "worker";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useSession();
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function chooseRole(r: Role) {
    setRole(r);
    setStep(1);
  }

  function submitConsumer(e: React.FormEvent) {
    e.preventDefault();
    login("u_con_1");
    router.push("/app");
  }

  function submitWorkerAccount(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function submitWorkerProfile(e: React.FormEvent) {
    e.preventDefault();
    login("u_wk_1");
    router.push("/app/worker");
  }

  return (
    <Card className="w-full max-w-lg animate-fade-in-up">
      <CardBody className="p-8">
        {step === 0 && (
          <div key="step-0" className="animate-fade-in-up">
            <h1 className="font-display text-2xl font-semibold text-navy-950">Join LinguiSync</h1>
            <p className="mt-1.5 text-sm text-navy-400">First, tell us what brings you here.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => chooseRole("consumer")}
                className="flex flex-col items-start gap-3 rounded-2xl border border-navy-100 p-5 text-left shadow-sm shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-navy-300 hover:bg-navy-50/60 hover:shadow-md hover:shadow-navy-900/10 active:scale-[0.98]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-semibold text-navy-950">I need a service</span>
                <span className="text-sm text-navy-400">Post jobs, hire specialists, pay securely.</span>
              </button>
              <button
                onClick={() => chooseRole("worker")}
                className="flex flex-col items-start gap-3 rounded-2xl border border-navy-100 p-5 text-left shadow-sm shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-navy-300 hover:bg-navy-50/60 hover:shadow-md hover:shadow-navy-900/10 active:scale-[0.98]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-semibold text-navy-950">I provide services</span>
                <span className="text-sm text-navy-400">Find jobs, deliver work, get paid.</span>
              </button>
            </div>
          </div>
        )}

        {step === 1 && role === "consumer" && (
          <form key="step-1-consumer" onSubmit={submitConsumer} className="animate-fade-in-up flex flex-col gap-4">
            <BackButton onClick={() => setStep(0)} />
            <h1 className="font-display text-2xl font-semibold text-navy-950">Create your consumer account</h1>
            <div className="grid grid-cols-2 gap-4">
              <Input id="first-name" label="First name" required />
              <Input id="last-name" label="Last name" hint="Never shown to workers" required />
            </div>
            <Input id="email" label="Email" type="email" required />
            <Input id="password" label="Password" type="password" required />
            <Checkbox
              id="terms"
              required
              label={
                <>
                  I agree to the <Link href="/terms" className="underline">Terms</Link> and{" "}
                  <Link href="/privacy" className="underline">Privacy Policy</Link>
                </>
              }
            />
            <Button type="submit" className="mt-1">
              Create account <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        {step === 1 && role === "worker" && (
          <form key="step-1-worker" onSubmit={submitWorkerAccount} className="animate-fade-in-up flex flex-col gap-4">
            <BackButton onClick={() => setStep(0)} />
            <h1 className="font-display text-2xl font-semibold text-navy-950">Create your worker account</h1>
            <div className="grid grid-cols-2 gap-4">
              <Input id="first-name" label="First name" required />
              <Input id="last-name" label="Last name" hint="Never shown to consumers" required />
            </div>
            <Input id="email" label="Email" type="email" required />
            <Input id="password" label="Password" type="password" required />
            <Button type="submit" className="mt-1">
              Continue to profile <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        {step === 2 && role === "worker" && (
          <form key="step-2-worker" onSubmit={submitWorkerProfile} className="animate-fade-in-up flex flex-col gap-4">
            <BackButton onClick={() => setStep(1)} />
            <h1 className="font-display text-2xl font-semibold text-navy-950">Set up your profile</h1>
            <p className="text-sm text-navy-400">Since sign-up is open with no approval queue, this is what clients see first.</p>

            <div>
              <p className="text-sm font-medium text-navy-700">Services you offer</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {services.map((s) => (
                  <label
                    key={s.slug}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                      selectedServices.includes(s.slug) ? "border-navy-900 bg-navy-50 text-navy-900" : "border-navy-100 text-navy-500"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="accent-navy-900"
                      checked={selectedServices.includes(s.slug)}
                      onChange={(e) =>
                        setSelectedServices((prev) =>
                          e.target.checked ? [...prev, s.slug] : prev.filter((x) => x !== s.slug)
                        )
                      }
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>

            <Input id="languages" label="Language pairs" placeholder="e.g. EN → FR, FR → EN" required />
            <Textarea id="bio" label="Short bio" placeholder="A sentence or two about your experience..." required />

            <Button type="submit" className="mt-1">
              Finish & go to dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        {step === 0 && (
          <p className="mt-6 text-center text-sm text-navy-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-navy-900 hover:text-navy-700">
              Log in
            </Link>
          </p>
        )}
      </CardBody>
    </Card>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-fit items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-navy-900"
    >
      <ArrowLeft className="h-3.5 w-3.5" /> Back
    </button>
  );
}
