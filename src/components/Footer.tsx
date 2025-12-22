import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-16 flex items-center justify-center"
    >
      <footer className="mb-4 mt-4 flex h-full w-[1048px] flex-col-reverse items-center justify-between text-sm md:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-[50px] ml-8 text-sm text-white/60 md:my-0"
        >
          © 2023 Chitram by{" "}
          <Link
            target="_blank"
            className="underline transition-colors hover:text-white"
            href="https://marcushof.vercel.app/"
          >
            Marcus Hof
          </Link>
        </motion.div>
        <div className="mr-8 flex w-full flex-col sm:px-[50px] md:w-auto md:flex-row md:gap-8 md:px-0">
          {[
            { name: "Privacy Policy", link: "/legal/privacy-policy" },
            { name: "Terms and Conditions", link: "/legal/terms" },
          ].map(({ name, link }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                className="flex h-[42px] cursor-pointer items-center border-b border-white/10 text-sm text-white/60 transition-colors hover:text-white md:border-none"
                href={link}
              >
                {name}
              </Link>
            </motion.div>
          ))}
        </div>
      </footer>
    </motion.div>
  );
}
