import { motion } from 'framer-motion';
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { CHALLENGE_STATUS_CLASS_MAP, CHALLENGE_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function ChallengesTable({
                                            challenges,
                                            success,
                                            queryParams = null,
                                            hideCategoryColumn = false,
                                        }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("challenge.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (e) => {
        const selectedValue = e.target.value.split('|');
        const name = selectedValue[0];
        const direction = selectedValue[1];

        queryParams.sort_field = name;
        queryParams.sort_direction = direction;

        router.get(route("challenge.index"), queryParams);
    };

    const deleteChallenge = (challenge) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("challenge.destroy", challenge.id)).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your challenge has been deleted.',
                        'success'
                    );
                });
            }
        });
    };

    const editChallenge = (challenge) => {
        router.get(route("challenge.edit", challenge.id));
    };

    return (
        <>
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                </div>
            )}

            {/* Filters Section */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                    className="flex space-x-4 mb-6"
                >
                    <div className="w-1/4">
                        <TextInput
                            className="w-full"
                            defaultValue={queryParams.name}
                            placeholder="Challenge Name"
                            onBlur={(e) => searchFieldChanged("name", e.target.value)}
                            onKeyPress={(e) => onKeyPress("name", e)}
                        />
                    </div>
                    <div className="w-1/4">
                        <SelectInput
                            className="w-full"
                            defaultValue={queryParams.status}
                            onChange={(e) => searchFieldChanged("status", e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </SelectInput>
                    </div>
                    <div className="w-1/4">
                        <SelectInput className="w-full" onChange={sortChanged}>
                            <option value="">Sort By</option>
                            <option value="id|asc">ID Ascending</option>
                            <option value="id|desc">ID Descending</option>
                            <option value="name|asc">Name Ascending</option>
                            <option value="name|desc">Name Descending</option>
                            <option value="status|asc">Status Ascending</option>
                            <option value="status|desc">Status Descending</option>
                            <option value="created_at|asc">Created At Ascending</option>
                            <option value="created_at|desc">Created At Descending</option>
                            <option value="due_date|asc">Due Date Ascending</option>
                            <option value="due_date|desc">Due Date Descending</option>
                        </SelectInput>
                    </div>
            </motion.div>

            {/* Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.data.map((challenge, index) => (
                    <motion.div
                        key={challenge.id}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white shadow-lg shadow-cyan-950 rounded-lg p-4 dark:bg-gray-700 dark:border-gray-700"
                    >
                        <div className="flex items-center mb-4">
                            <div className="ml-4 flex-1">
                                <Link
                                    href={route("challenge.show", challenge.id)}
                                    className="text-xl text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-500"
                                >
                                    {challenge.name}
                                </Link>
                                {!hideCategoryColumn && (
                                    <p className="text-gray-500 dark:text-gray-400">{challenge.category.name}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-2">
                            <span
                                className={
                                    "px-3 py-1 rounded-full text-white text-sm " +
                                    CHALLENGE_STATUS_CLASS_MAP[challenge.status]
                                }
                            >
                                {CHALLENGE_STATUS_TEXT_MAP[challenge.status]}
                            </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Created by: {challenge.createdBy.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Created at: {challenge.created_at}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Due date: {challenge.due_date}
                            </p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={() => editChallenge(challenge)}
                                className="text-white text-xl bg-yellow-500 rounded px-1 hover:bg-yellow-700"
                            >
                                Edit
                            </motion.button>
                            <motion.button
                                whileHover={{scale: 1.2}}
                                whileTap={{scale: 0.8}}
                                transition={{type: "spring", stiffness: 400, damping: 10}}
                                onClick={() => deleteChallenge(challenge)}
                                className="text-white bg-red-500 text-2xl rounded px-1 hover:bg-red-700"
                            >
                                <i className="bi bi-trash3"></i>

                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Pagination links={challenges.meta.links} />
        </>
    );
}
