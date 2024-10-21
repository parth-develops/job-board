import { withAuth } from "@workos-inc/authkit-nextjs";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { addOrgAndUserData, JobModel } from "./models/Job";
import mongoose from "mongoose";

export default async function Home() {
  const { user } = await withAuth();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latestJobs = await addOrgAndUserData(await JobModel.find({}, {}, { limit: 5, sort: "-createdAt" }), user)

  return (
    <main>
      <Hero />
      <Jobs jobs={latestJobs} />
    </main>
  );
}
