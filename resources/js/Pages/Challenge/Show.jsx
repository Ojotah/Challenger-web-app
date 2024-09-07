import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  CHALLENGE_DIFFICULTY_CLASS_MAP,
  CHALLENGE_DIFFICULTY_TEXT_MAP,
  CHALLENGE_STATUS_CLASS_MAP,
  CHALLENGE_STATUS_TEXT_MAP,
} from "@/constants.jsx";
export default function Show({ auth, challenge }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Challenge "${challenge.name}"`}
          </h2>
          <Link
            href={route("challenge.edit", challenge.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Challenge "${challenge.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={challenge.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Challenge ID</label>
                    <p className="mt-1">{challenge.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Challenge Name</label>
                    <p className="mt-1">{challenge.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Challenge Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          CHALLENGE_STATUS_CLASS_MAP[challenge.status]
                        }
                      >
                        {CHALLENGE_STATUS_TEXT_MAP[challenge.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Challenge Difficulty</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          CHALLENGE_DIFFICULTY_CLASS_MAP[challenge.difficulty]
                        }
                      >
                        {CHALLENGE_DIFFICULTY_TEXT_MAP[challenge.difficulty]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{challenge.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{challenge.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1">{challenge.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{challenge.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Category</label>
                    <p className="mt-1">
                      <Link
                        href={route("category.show", challenge.category.id)}
                        className="hover:underline"
                      >
                        {challenge.category.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Assigned User</label>
                    <p className="mt-1">{challenge.assignedUser.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Challenge Description</label>
                <p className="mt-1">{challenge.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
