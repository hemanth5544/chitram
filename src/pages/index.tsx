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
      <div className="bg-black min-h-screen overflow-x-hidden w-full">
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 lg:px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Ready to transform your team's communication?
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openRecordModal}
                  className="inline-flex items-center rounded-lg border border-white/20 bg-white px-6 py-3 text-base font-medium text-black shadow-lg transition-all hover:bg-white/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  Record a video
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    posthog?.capture("clicked schedule demo", { cta: true })
                  }
                  target="_blank"
                  href="https://cal.com/marcon/chitram-demo"
                  className="text-base font-semibold leading-6 text-white transition-colors hover:text-white/70"
                >
                  Schedule Demo <span aria-hidden="true">→</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - CardSwap */}
            <div className="relative h-[600px] flex items-center justify-center">
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
                <Card className="p-6 flex flex-col items-center justify-center">
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                    <Image 
                      src={engineeringUsecase} 
                      alt="Engineering use case" 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Chitram</h3>
                  <p className="text-white/70 text-center">Share your screen, voice, and face instantly with a click.</p>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center">
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                    <Image 
                      src={supportUsecase} 
                      alt="Support use case" 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Chitram</h3>
                  <p className="text-white/70 text-center">Share your screen, voice, and face instantly with a click.</p>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center">
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                    <Image 
                      src={logo} 
                      alt="Chitram logo" 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Chitram</h3>
                  <p className="text-white/70 text-center">Share your screen, voice, and face instantly with a click.</p>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>


 



        {/* <Footer /> */}
      </div>

      <VideoRecordModal />
      <Paywall />
    </>
  );
};

export default Home;
