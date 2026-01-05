import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";

import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Link from "next/link";

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Sign in to Chitram</title>
        <meta
          name="description"
          content="Share high-quality videos asynchronously and collaborate on your own schedule"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="bg-white px-8 py-10 shadow-soft rounded-2xl sm:px-12 border border-gray-100">
          <div className="animate-fade-in flex flex-col justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Chitram</span>
            </h2>
            <span className="text-sm font-medium text-gray-600 mb-6">
              Sign in to continue
            </span>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  className="relative inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-lg text-sm font-semibold text-gray-700 shadow-md hover:bg-gray-50 hover:border-orange-300 transition-all"
                  type="button"
                  onClick={() =>
                    void signIn(provider.id, {
                      callbackUrl: provider.callbackUrl,
                    })
                  }
                >
                  <span className="flex flex-row">
                    <span>{provider.name}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="prose prose-sm mx-auto mt-6 max-w-[18rem] text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/legal/terms" className="text-orange-500 hover:text-orange-600 font-medium">Terms of Service</Link> and{" "}
              <Link href="/legal/privacy-policy" className="text-orange-500 hover:text-orange-600 font-medium">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/videos" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
