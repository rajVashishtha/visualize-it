"use client";

import FancyButton from "@/components/fancyButton";
import { useRouter } from "next/navigation"; // Assuming you have a reusable Button component, else replace with <button>

export default function QuestionsPage() {
  const router = useRouter();

  const questions = [
    {
      name: "Two Sum",
      leetcodeLink: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
      route: "/questions/two-sum",
    },
    {
      name: "Level Order Traversal in Tree",
      leetcodeLink:
        "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      difficulty: "Medium",
      route: "/questions/level-traversal",
    },
    {
      name: "Minimum size subarray sum",
      leetcodeLink: "https://leetcode.com/problems/minimum-size-subarray-sum/",
      difficulty: "Medium",
      route: "/questions/minimum-size-subarray-sum",
    },
    {
      name: "Reverse Linked List",
      leetcodeLink:
        "https://leetcode.com/problems/reverse-linked-list/description/",
      difficulty: "Easy",
      route: "/questions/reverse-linked-list",
    },
  ];

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-200 text-green-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Hard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleQuestionNavigation = (link: string) => {
    router.push(link);
  };

  return (
    <main className="min-h-screen bg-orange-100 px-4 py-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">
          Choose an Algorithm
        </h1>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-orange-200 text-gray-700">
                <th className="text-left py-3 px-4">Question</th>
                <th className="text-left py-3 px-4">Difficulty</th>
                <th className="text-left py-3 px-4">LeetCode Link</th>
                <th className="text-left py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr
                  key={question.name}
                  className="border-t border-orange-300 hover:bg-orange-50 transition"
                >
                  <td className="py-3 px-4 text-gray-800">{question.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyClass(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={question.leetcodeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on LeetCode
                    </a>
                  </td>

                  <td className="py-3 px-4">
                    <FancyButton
                      onClick={() => handleQuestionNavigation(question.route)}
                      text="Open Question"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
