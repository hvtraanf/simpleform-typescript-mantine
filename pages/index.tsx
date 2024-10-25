import type { NextPage } from "next";
import Head from "next/head";
import RegistrationForm from "@/components/RegistrationForm";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Registration Form</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Home;
