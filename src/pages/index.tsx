import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useFeatureFlagEnabled, usePostHog } from "posthog-js/react";
import { useAtom } from "jotai";
import recordVideoModalOpen from "~/atoms/recordVideoModalOpen";
import VideoRecordModal from "~/components/VideoRecordModal";
import { ShareIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Image from "next/image";
import CTA from "~/components/CTA";
import engineeringUsecase from "~/assets/engineering usecase.png";
import supportUsecase from "~/assets/support usecase.png";
import logo from "~/assets/logo.png";
import { useRouter } from "next/router";
import { useEffect } from "react";
import StarIcon from "~/assets/StarIcon";
import Paywall from "~/components/Paywall";
import { motion } from "framer-motion";
import CardSwap, { Card } from '~/components/CardSwap'


const Home: NextPage = () => {
  const [recordModalOpen, setRecordOpen] = useAtom(recordVideoModalOpen);
  const posthog = usePostHog();
  const session = useSession();
  const router = useRouter();
  const showDemoButton = useFeatureFlagEnabled("show-demo-button");

  useEffect(() => {
    if (session.status === "authenticated" && !recordModalOpen) {
      void router.push("/videos");
    }
  }, [session, router]);

  const openRecordModal = () => {
    if (
      !navigator?.mediaDevices?.getDisplayMedia &&
      !navigator?.mediaDevices?.getDisplayMedia
    ) {
      return alert("Your browser is currently NOT supported.");
    }
    setRecordOpen(true);

    posthog?.capture("open record video modal", {
      cta: "landing page",
    });
  };

  const features = [
    {
      icon: "🎥",
      title: "Instant Recording",
      description: "Record your screen, voice, and face with a single click"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Share videos instantly with secure, optimized delivery"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Enterprise-grade security keeps your content safe"
    },
    {
      icon: "🎯",
      title: "Team Collaboration",
      description: "Work together seamlessly with your entire team"
    },
  ];

  return (
    <>
      <Head>
        <title>Chitram | Video Communication Made Simple</title>
        <meta
          name="description"
          content="Create, share, and collaborate with video messages. Fast, secure, and beautifully simple."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      {/* Hero Section */}
      <div className="bg-white min-h-screen overflow-x-hidden w-full">
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 lg:px-8 py-12">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
              >
                Transform Your Team's{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Communication
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Create, share, and collaborate with video messages. Fast, secure, and beautifully simple.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openRecordModal}
                  className="inline-flex items-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Record a Video
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    posthog?.capture("clicked schedule demo", { cta: true })
                  }
                  target="_blank"
                  href="https://cal.com/hemanth/chitram-demo"
                  className="text-base font-semibold leading-6 text-orange-500 transition-colors hover:text-orange-600 flex items-center gap-2"
                >
                  Schedule Demo <span aria-hidden="true">→</span>
                </motion.a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 text-sm text-gray-500"
              >
                No credit card required • Free forever plan
              </motion.p>
            </motion.div>

            {/* Right Side - CardSwap */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-[600px] flex items-center justify-center"
            >
              <CardSwap
                cardDistance={30}
                verticalDistance={70}
                delay={5000}
                skewAmount={1}
                pauseOnHover={false}
                easing="linear"
                width={500}
                height={400}
              >
                <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100">
                  <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
                    <Image 
                      src={engineeringUsecase} 
                      alt="Engineering use case" 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-2">For Engineers</h3>
                  <p className="text-gray-600 text-center text-sm">Share your screen, voice, and face instantly with a click.</p>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100">
                  <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
                    <Image 
                      src={supportUsecase} 
                      alt="Support use case" 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-2">For Support Teams</h3>
                  <p className="text-gray-600 text-center text-sm">Provide better customer support with visual explanations.</p>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100">
                  <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <Image 
                      src={logo} 
                      alt="Chitram logo" 
                      width={200}
                      height={200}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-2">Snapify</h3>
                  <p className="text-gray-600 text-center text-sm">Powerful video communication for modern teams.</p>
                </Card>
              </CardSwap>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Shine
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features that make video communication accessible to everyone
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of teams who are already making stunning video communications with Chitram
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={openRecordModal}
                className="inline-flex items-center rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Start Creating Now
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <VideoRecordModal />
      <Paywall />
    </>
  );
};

export default Home;
