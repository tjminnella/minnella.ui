"use client";

import { useActionState } from "react";
import { submitForm } from "../../actions/submitForm";

const Greeter = () => {
    const [state, submit, isPending] = useActionState(submitForm, {
        message: "",
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <form
                action={submit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl text-center font-semibold text-gray-700 mb-4">
                    Greet Someone
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-4 p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-all"
                >
                    {isPending ? "Greeting..." : "Greet"}
                </button>

                {state.message && (
                    <p className="mt-4 text-green-600 text-center font-medium">
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Greeter;