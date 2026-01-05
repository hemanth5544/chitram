import { useAtom } from "jotai/index";
import recordVideoModalOpen from "~/atoms/recordVideoModalOpen";
import { usePostHog } from "posthog-js/react";
import { motion } from "framer-motion";

export default function CTA() {
  const [, setRecordOpen] = useAtom(recordVideoModalOpen);
  const posthog = usePostHog();

  const openRecordModal = () => {
    if (
      !navigator?.mediaDevices?.getDisplayMedia &&
      !navigator?.mediaDevices?.getDisplayMedia
    ) {
      return alert("Your browser is currently NOT supported.");
    }
    setRecordOpen(true);

    posthog?.capture("open record video modal", {
      cta: "cta section",
    });
  };

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-7xl py-90 sm:px-6 sm:py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden bg-black border border-white/10 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white"
          >
            Ready to transform your team's communication?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={openRecordModal}
              className="inline-flex max-h-[40px] items-center rounded-lg border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black shadow-lg transition-all hover:bg-white/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
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
              href="https://cal.com/hemanth/chitram-demo"
              className="text-sm font-semibold leading-6 text-white transition-colors hover:text-white/70"
            >
              Schedule Demo <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
