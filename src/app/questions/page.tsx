'use client';

import FancyButton from "@/components/fancyButton";
import {useRouter } from "next/navigation";

export default function QuestionsPage() {
  const router = useRouter();
  const handleQuestionNavigation = (link: string) => {
    router.push(link);
  }

  return (
    <main className="min-h-screen bg-orange-100 px-4">
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Choose a algorithm</h1>
        <div className="flex flex-col gap-6">
          <FancyButton text="Two sum" onClick={() => { handleQuestionNavigation("/questions/two-sum") }} />
          <FancyButton text="Level order traversal in tree" onClick={() => { handleQuestionNavigation("/questions/level-traversal") }} />
        </div>
      </div>
    </main>
  );
}
