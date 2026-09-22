"use client";

import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Input, Textarea, Select } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium text-navy-500">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-950">Tell us how we can help you</h1>
          <p className="mt-4 text-navy-500">
            Send us a note and we&apos;ll get back to you — no account needed. Already have an account and a job in
            progress? Use Support inside your dashboard instead for faster routing.
          </p>
          <div className="mt-6 flex items-center gap-2.5 text-sm font-medium text-navy-700">
            <Mail className="h-4 w-4 text-navy-500" /> support@linguisync.com
          </div>
        </Reveal>

        <Reveal delayMs={100} className="rounded-2xl border border-navy-100 p-6 shadow-sm shadow-navy-900/5">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-8 w-8 text-status-success" />
              <p className="font-display font-semibold text-navy-950">Message sent</p>
              <p className="text-sm text-navy-500">We typically reply within one business day.</p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Input id="name" label="Name" placeholder="Jane Doe" required />
              <Input id="email" label="Email" type="email" placeholder="jane@example.com" required />
              <Select id="interest" label="I want to...">
                <option>Ask a question</option>
                <option>Report a problem</option>
                <option>Get a quotation</option>
                <option>Other</option>
              </Select>
              <Textarea id="message" label="Message" placeholder="How can we help?" required />
              <Button type="submit" className="mt-2">Send message</Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
