import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Head from "next/head";
import { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Tooltip from "~/components/Tooltip";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import CTA from "~/components/CTA";
import VideoRecordModal from "~/components/VideoRecordModal";
import { usePostHog } from "posthog-js/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Pricing() {
  const [billedAnnually, setBilledAnnually] = useState<boolean>(true);
  const posthog = usePostHog();

  const toggleBillingCycle = () => {
    setBilledAnnually(!billedAnnually);

    posthog?.capture("change billing cycle");
  };

  return (
    <>
      <Head>
        <title>Chitram | Pricing</title>
        <meta
          name="description"
          content="Share high-quality videos asynchronously and collaborate on your own schedule"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="my-20 flex h-40 flex-col items-center justify-center sm:mx-10 lg:mx-20 bg-black"
      >
        <span className="text-center text-4xl font-bold lg:text-7xl text-white">
          Choose the plan that fits your needs.
        </span>
      </motion.div>

      <div className="-mt-10 mb-10 flex flex-col items-center justify-center sm:mx-10 lg:mx-20">
        <div className="z-10 mt-4 flex items-center gap-2 lg:mt-8">
          <div
            className="relative flex w-full rounded-full border border-white/20 bg-white/5"
            onClick={toggleBillingCycle}
          >
            <button
              className={`rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white shadow-sm transition focus:z-10 focus:outline-none focus:ring-0 sm:w-auto ${
                billedAnnually ? "" : "bg-white text-black"
              }`}
            >
              <span>Monthly</span>
            </button>
            <button
              className={`ml-0.5 rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white transition duration-150 focus:z-10 focus:ring-0 sm:w-auto ${
                billedAnnually ? "bg-white text-black" : ""
              }`}
            >
              <span>Annually</span>
              <span className="ml-2 rounded-lg bg-white/20 p-1 text-xs font-normal">
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative mx-4 mb-20 flex flex-col items-start justify-center gap-12 md:flex-row md:gap-4 lg:mx-16 lg:gap-16">
        <div className="absolute left-[calc(50%_-_calc(min(75vw,500px)_/_2))] h-[min(75vw,500px)] w-[min(75vw,500px)] bg-[radial-gradient(circle_at_center,#666_0,#fff_100%)] opacity-80 blur-[calc(0.5_*_min(75vw,500px))]"></div>
        {[
          {
            name: "Pro",
            price: { monthly: "$10", annual: "$8" },
            features: [
              {
                feature: "Unlimited recordings",
                description:
                  "Make and store unlimited recordings of your tab, desktop, and any application.",
                included: true,
              },
              {
                feature: "Video download",
                description:
                  "Download your recorded videos for offline viewing or sharing with others.",
                included: true,
              },
              {
                feature: "External video upload",
                description:
                  "Upload videos recorded using other tools or platforms to your Chitram library.",
                included: true,
              },
            ],
          },
        ].map(({ name, price, features }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative w-full max-w-[400px] flex-1 rounded-3xl border border-white/10 bg-black shadow-sm transition-shadow hover:shadow-xl hover:border-white/20"
          >
            {name === "Pro" ? (
              <div className="absolute -top-6 left-2/4 z-[1] mt-0 -translate-x-2/4 cursor-default select-none rounded-3xl border-0 border-solid border-white/20 bg-white px-[22px] py-3.5 text-black shadow-[0_8px_30px_rgba(255,255,255,0.2)] backdrop-blur-[2px]">
                <span className="text-xs font-bold">Most Popular</span>
              </div>
            ) : null}
            <div className="hero relative flex flex-col items-start rounded-3xl px-6 py-6 shadow-sm">
              <div className="rounded-lg bg-white/10 px-2 font-medium text-white">
                {name}
              </div>
              <div className="mb-2 mt-4 flex items-end text-5xl font-extrabold tracking-tight text-white">
                {billedAnnually ? price.annual : price.monthly}
                <span className="mb-1 text-sm opacity-80">/ mo.</span>
              </div>
              <div className="mt-2 text-sm text-white/60">
                {billedAnnually ? "billed annually" : "billed monthly"}
              </div>
              <div className="mt-2 flex-grow" />
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => void signIn()}
                type="submit"
                className="btn mt-4 block w-full appearance-none rounded-lg bg-white px-4 py-2.5 text-center text-sm font-medium text-black shadow-lg duration-100 hover:bg-white/90 focus:outline-transparent disabled:opacity-80 transition-all"
              >
                Get started
              </motion.button>
            </div>
            <div className="mt-4 flex flex-col gap-2 pb-8">
              {features.map(({ feature, description, included }) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-white/70"
                >
                  <div className="ml-6 h-5 w-5 flex-none text-white">
                    {included ? <CheckIcon /> : <XMarkIcon />}
                  </div>

                  <Tooltip title={description}>
                    <div className="text-base text-white/70 underline decoration-white/30 decoration-dashed underline-offset-4">
                      {feature}
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        <motion.div
          key={"enterprise"}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative w-full max-w-[400px] flex-1 rounded-3xl border bg-white shadow-sm transition-shadow hover:shadow-xl"
        >
          <div className="hero relative flex flex-col items-start rounded-3xl px-6 py-6 shadow-sm">
            <div className="rounded-lg bg-white/20 px-2 font-medium">
              Enterprise
            </div>
            <div className="mb-2 mt-4 flex items-end text-5xl font-extrabold tracking-tight">
              Custom
            </div>
            <div className="mt-2 text-sm">
              Contact us for a custom quote and a custom onboarding process.
            </div>
            <div className="mt-2 flex-grow" />
            <Link
              href="mailto:sales@chitram.com"
              onClick={() =>
                posthog?.capture("clicked contact enterprise plan")
              }
              className="btn mt-4 block w-full appearance-none rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-sky-500/50 duration-100 hover:from-sky-600 hover:to-sky-700 focus:outline-transparent disabled:opacity-80 transition-all"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center border-y border-white/10 bg-black pb-8">
        <div className="mb-12 mt-8">
          <span className="text-5xl font-bold text-white">FAQs</span>
        </div>
        <div className="flex flex-1 border-collapse flex-col justify-center px-6">
          {[
            {
              question: "What are my payment options?",
              answer:
                "You can be billed monthly, but save 20% if you pay annually. We currently accept credit card payment. Contact us for alternative payment methods.",
            },
            {
              question: "Can I import videos I already recorded?",
              answer: "Yes! Chitram allows you to import your existing videos.",
            },
            {
              question: "How do I contact Support?",
              answer:
                "If you need to contact our Support, click the menu on the bottom right to start a chat.",
            },
          ].map(({ answer, question }) => (
            <Disclosure
              key={question}
              as="div"
              className="max-w-[80vw] sm:w-[600px]"
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex h-12 w-full items-center justify-between border-t border-white/10 px-4 py-8 text-left text-sm font-medium text-white">
                    <span>{question}</span>
                    <ChevronUpIcon
                      className={`transition-transform ${
                        open ? "rotate-180" : ""
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pb-2 pt-0 text-sm text-white/70">
                      {answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      <CTA />

      <Footer />

      <VideoRecordModal />
    </>
  );
}
