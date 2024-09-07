import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, challenge, categories, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: challenge.name || "",
    status: challenge.status || "",
    description: challenge.description || "",
    due_date: challenge.due_date || "",
    category_id: challenge.category_id || "",
    difficulty: challenge.difficulty || "",
    assigned_user_id: challenge.assigned_user_id || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("challenge.update", challenge.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Challenge "{challenge.name}"
          </h2>
        </div>
      }
    >
      <Head title="Challenges" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              {challenge.image_path && (
                <div className="mb-4">
                  <img src={challenge.image_path} className="w-64" />
                </div>
              )}
              <div>
                <InputLabel htmlFor="challenge_category_id" value="Category" />

                <SelectInput
                  name="category_id"
                  id="challenge_category_id"
                  value={data.category_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("category_id", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.data.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.category_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="challenge_image_path" value="Challenge Image" />
                <TextInput
                  id="challenge_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="challenge_name" value="Challenge Name" />

                <TextInput
                  id="challenge_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="challenge_description"
                  value="Challenge Description"
                />

                <TextAreaInput
                  id="challenge_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="challenge_due_date" value="Challenge Deadline" />

                <TextInput
                  id="challenge_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="challenge_status" value="Challenge Status" />

                <SelectInput
                  name="status"
                  id="challenge_status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>

                <InputError message={errors.challenge_status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="challenge_priority" value="Challenge Priority" />

                <SelectInput
                  name="priority"
                  id="challenge_priority"
                  value={data.difficulty}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("difficulty", e.target.value)}
                >
                  <option value="">Select Difficulty</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>

                <InputError message={errors.difficulty} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="challenge_assigned_user"
                  value="Assigned User"
                />

                <SelectInput
                  name="assigned_user_id"
                  id="challenge_assigned_user"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("challenge.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
