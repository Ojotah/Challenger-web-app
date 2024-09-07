import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CHALLENGE_STATUS_CLASS_MAP, CHALLENGE_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  totalPendingChallenges,
  myPendingChallenges,
  totalProgressChallenges,
  myProgressChallenges,
  totalCompletedChallenges,
  myCompletedChallenges,
  activeChallenges,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Pending Challenges
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myPendingChallenges}</span>/
                <span className="ml-2">{totalPendingChallenges}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 text-2xl font-semibold">
                In Progress Challenges
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myProgressChallenges}</span>/
                <span className="ml-2">{totalProgressChallenges}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-green-500 text-2xl font-semibold">
                Completed Challenges
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myCompletedChallenges}</span>/
                <span className="ml-2">{totalCompletedChallenges}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-gray-200 text-xl font-semibold">
                My Active Challenges
              </h3>

              <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Category Name</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeChallenges.data.map((challenge) => (
                    <tr key={challenge.id}>
                      <td className="px-3 py-2">{challenge.id}</td>
                      <td className="px-3 py-2 text-white hover:underline">
                        <Link href={route("category.show", challenge.category.id)}>
                          {challenge.category.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-white hover:underline">
                        <Link href={route("challenge.show", challenge.id)}>
                          {challenge.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-nowrap text-white " +
                            CHALLENGE_STATUS_CLASS_MAP[challenge.status]
                          }
                        >
                          {CHALLENGE_STATUS_TEXT_MAP[challenge.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">{challenge.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
