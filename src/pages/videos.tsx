import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getTime } from "~/utils/getTime";
import ProfileMenu from "~/components/ProfileMenu";
import NewVideoMenu from "~/components/NewVideoMenu";
import VideoRecordModal from "~/components/VideoRecordModal";
import VideoUploadModal from "~/components/VideoUploadModal";
import { useAtom } from "jotai";
import uploadVideoModalOpen from "~/atoms/uploadVideoModalOpen";
import recordVideoModalOpen from "~/atoms/recordVideoModalOpen";
import Paywall from "~/components/Paywall";
import paywallAtom from "~/atoms/paywallAtom";
import { usePostHog } from "posthog-js/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { motion } from "framer-motion";

const VideoList: NextPage = () => {
  const [, setRecordOpen] = useAtom(recordVideoModalOpen);
  const [, setUploadOpen] = useAtom(uploadVideoModalOpen);
  const [, setPaywallOpen] = useAtom(paywallAtom);
  const router = useRouter();
  const { status, data: session } = useSession();
  const { data: videos, isLoading } = api.video.getAll.useQuery();
  const posthog = usePostHog();
  const searchParams = useSearchParams();
  const [closeWindow, setCloseWindow] = useState<boolean>(false);

  if (status === "unauthenticated") {
    void router.replace("/sign-in");
  }

  const checkoutCanceledQueryParam = searchParams.get("checkoutCanceled");
  const closeQueryParam = searchParams.get("close");

  const openRecordModal = () => {
    if (
      !navigator?.mediaDevices?.getDisplayMedia &&
      !navigator?.mediaDevices?.getDisplayMedia
    ) {
      return alert("Your browser is currently NOT supported.");
    }
    setRecordOpen(true);

    posthog?.capture("open record video modal", {
      stripeSubscriptionStatus: session?.user.stripeSubscriptionStatus,
      cta: "empty video list page",
    });
  };

  const openUploadModal = () => {
    if (
      session?.user.stripeSubscriptionStatus === "active" ||
      !env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ) {
      setUploadOpen(true);

      posthog?.capture("open upload video modal", {
        stripeSubscriptionStatus: session?.user.stripeSubscriptionStatus,
        cta: "empty video list page",
      });
    } else {
      setPaywallOpen(true);

      posthog?.capture("hit video upload paywall", {
        stripeSubscriptionStatus: session?.user.stripeSubscriptionStatus,
        cta: "empty video list page",
      });
    }
  };

  useEffect(() => {
    const closeWindow =
      (window.innerWidth === 500 &&
        (window.innerHeight === 499 || window.innerHeight === 500)) ||
      closeQueryParam === "true";
    setCloseWindow(closeWindow);
  }, [closeQueryParam]);

  useEffect(() => {
    if (checkoutCanceledQueryParam && closeQueryParam === "false") {
      setTimeout(() => {
        void router.push("/videos").then(() => router.reload());
      }, 5000);
    }
  }, [checkoutCanceledQueryParam, closeQueryParam]);

  return (
    <>
      <Head>
        <title>Library | Chitram</title>
        <meta
          name="description"
          content="Share high-quality videos asynchronously and collaborate on your own schedule"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-black">
        <div className="flex min-h-[62px] w-full items-center justify-between border-b border-solid border-white/10 bg-black px-6">
          <Link href="/">
            <span>Chitram</span>
          </Link>
          <div className="flex flex-row items-center justify-center">
            <VideoRecordModal />
            <VideoUploadModal />
            <Paywall />

            {videos?.length &&
            session?.user?.stripeSubscriptionStatus !== "active" &&
            1 + 1 === 3 ? (
              <div className="mr-4 flex max-h-[35px] flex-col items-center justify-center rounded px-2 py-2 text-sm text-[#6c6685]">
                <span>{videos.length}/10 videos</span>
                <div className="mt-1 h-[3px] w-full rounded-full bg-gray-200">
                  <div
                    className={`h-[3px] w-[45%] rounded-full ${
                      "bg-white"
                    }`}
                    style={{
                      width: videos.length.toString() + "0%",
                    }}
                  ></div>
                </div>
              </div>
            ) : null}
            <NewVideoMenu />
            {status === "authenticated" && (
              <div className="ml-4 flex items-center justify-center">
                <ProfileMenu />
              </div>
            )}
          </div>
        </div>
        <div
          className="flex w-full grow items-start justify-center overflow-auto bg-black pt-14"
          suppressHydrationWarning={true}
        >
          {closeWindow || checkoutCanceledQueryParam ? (
            <>
              {checkoutCanceledQueryParam === "false" ? (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-zinc-700">
                    Successfully upgraded
                  </span>
                  {closeQueryParam === "true" ? (
                    <span className="mt-1 text-base text-white/60">
                      You can now close this window and try to upload the video
                      again!
                    </span>
                  ) : (
                    <span className="mt-1 text-base text-white/60">
                      You will be redirected shortly
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col">
                  {checkoutCanceledQueryParam === "true" ? (
                    <>
                      <span className="text-lg font-semibold text-white">
                        Purchase cancelled
                      </span>
                      {closeQueryParam === "true" ? (
                        <span className="mt-1 text-base text-white/60">
                          You can now close this window
                        </span>
                      ) : (
                        <span className="mt-1 text-base text-white/60">
                          You will be redirected shortly
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-semibold text-white">
                        Successfully logged in
                      </span>
                      <span className="mt-1 text-base text-white/60">
                        You can now close this window and try to upload the
                        video again!
                      </span>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {videos && videos?.length <= 0 ? (
                <div className="flex items-center justify-center px-8">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-white">
                      No videos found
                    </span>
                    <span className="mt-1 text-base text-white/60">
                      Videos you record will show up here. Already got videos?
                      Upload them!
                    </span>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <button
                        onClick={openRecordModal}
                        className="inline-flex items-center rounded-md border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                      >
                        Record a video
                      </button>
                      <button
                        onClick={openUploadModal}
                        className="inline-flex items-center rounded-md border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                      >
                        Upload a video
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-start grid w-full max-w-[1300px] grid-cols-[repeat(auto-fill,250px)] flex-row flex-wrap items-center justify-center gap-14 px-4 pb-16">
                  {videos &&
                    videos.map(({ title, id, createdAt, thumbnailUrl }) => (
                      <VideoCard
                        title={title}
                        id={id}
                        createdAt={createdAt}
                        thumbnailUrl={thumbnailUrl}
                        key={id}
                      />
                    ))}

                  {isLoading ? (
                    <>
                      <VideoCardSkeleton />
                      <VideoCardSkeleton />
                      <VideoCardSkeleton />
                      <VideoCardSkeleton />
                    </>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

interface VideoCardProps {
  title: string;
  id: string;
  thumbnailUrl: string;
  createdAt: Date;
}

const VideoCardSkeleton = () => {
  return (
    <div className="h-[240px] w-[250px] animate-pulse overflow-hidden rounded-lg border border-[#6c668533] text-sm font-normal">
      <figure className="relative aspect-video w-full bg-slate-200"></figure>
      <div className="m-4 flex flex-col">
        <span className="h-4 rounded bg-slate-200"></span>
        <span className="mt-4 h-4 rounded bg-slate-200"></span>
      </div>
    </div>
  );
};

const VideoCard = ({ title, id, createdAt, thumbnailUrl }: VideoCardProps) => {
  return (
    <Link href={`/share/${id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="h-[240px] w-[250px] cursor-pointer overflow-hidden rounded-xl border border-[#6c668533] text-sm font-normal shadow-sm transition-shadow hover:shadow-lg"
      >
        <figure className="overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={thumbnailUrl}
              className="max-h-[139.5px] max-w-[248px]"
              alt="video thumbnail"
              width={248}
              height={139.5}
              unoptimized
            />
          </motion.div>
        </figure>
        <div className="m-4 flex flex-col">
          <span className="line-clamp-2 font-bold text-[0f0f0f]">{title}</span>
          <span className="mt-2 text-[#606060]">{getTime(createdAt)}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default VideoList;
