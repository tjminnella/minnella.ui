export default function Tailwind3Demo() {
    return (
        <main className="bg-gray-100 min-h-screen pb-16">
            <h1 className="mt-8 mb-12 text-center text-3xl md:text-5xl font-semibold text-gray-900">
                Choose your listening plan
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-8 mt-16 px-4">

                {/* Listener */}
                <div className="bg-gray-100 ring-1 ring-gray-300 grid grid-rows-[1fr_auto] rounded-xl p-8 gap-6">
                    <div className="grid grid-rows-[auto_auto_auto_1fr] gap-y-2">
                        <h2 className="text-lg font-semibold text-indigo-600">Listener</h2>
                        <p className="text-4xl font-bold text-gray-900">
                            $0<span className="text-base font-medium text-gray-500">/month</span>
                        </p>
                        <p>Start exploring millions of songs with basic features and ads.</p>
                        <ul className="mt-6 space-y-2 text-sm text-gray-700">
                            <li>
                                <span aria-hidden="true" className="text-green-700 mr-2">&#10003;</span>
                                Ad-supported streaming
                            </li>
                            <li>
                                <span aria-hidden="true" className="text-green-700 mr-2">&#10003;</span>
                                Curated playlists
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="block rounded-md bg-indigo-100 px-4 py-2 text-center font-semibold text-indigo-700 hover:bg-indigo-200"
                    >
                        Start listening
                    </a>
                </div>

                {/* Premium */}
                <div className="relative bg-gray-950 text-white ring-2 ring-fuchsia-500 p-8 grid grid-rows-[1fr_auto] gap-6 rounded-xl scale-105">
                    <div className="absolute -top-3 right-3 bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full px-3 py-1 text-xs font-bold text-white">
                        Most Popular
                    </div>
                    <div className="grid grid-rows-[auto_auto_auto_1fr] gap-y-2">
                        <h2 className="text-lg font-semibold text-fuchsia-200">Premium</h2>
                        <p className="text-4xl font-bold text-white">
                            $9.99<span className="text-base font-medium text-fuchsia-300">/month</span>
                        </p>
                        <p className="text-gray-300">
                            Enjoy the full music experience with unlimited access and downloads.
                        </p>
                        <ul className="mt-6 space-y-2 text-sm text-fuchsia-100">
                            <li>
                                <span aria-hidden="true" className="text-green-500 mr-2">&#10003;</span>
                                Ad-free listening
                            </li>
                            <li>
                                <span aria-hidden="true" className="text-green-500 mr-2">&#10003;</span>
                                Offline playback
                            </li>
                            <li>
                                <span aria-hidden="true" className="text-green-500 mr-2">&#10003;</span>
                                Unlimited skips
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="block rounded-md bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white hover:from-fuchsia-600 hover:to-indigo-700 px-4 py-2 text-center font-semibold"
                    >
                        Go Premium
                    </a>
                </div>

                {/* Family */}
                <div className="bg-gray-100 ring-1 ring-gray-300 p-8 rounded-xl grid grid-rows-[1fr_auto] gap-6">
                    <div className="grid grid-rows-[auto_auto_auto_1fr] gap-y-2">
                        <h2 className="text-lg font-semibold text-indigo-600">Family</h2>
                        <p className="text-4xl font-bold text-gray-900">
                            $14.99<span className="text-base font-medium text-gray-500">/month</span>
                        </p>
                        <p className="text-gray-600">
                            Enjoy all of the features with a plan for up to 6 family members.
                        </p>
                        <ul className="mt-6 space-y-2 text-sm text-gray-700">
                            <li>
                                <span aria-hidden="true" className="text-green-700 mr-2">&#10003;</span>
                                All Premium features
                            </li>
                            <li>
                                <span aria-hidden="true" className="text-green-700 mr-2">&#10003;</span>
                                Up to 6 accounts
                            </li>
                            <li>
                                <span aria-hidden="true" className="text-green-700 mr-2">&#10003;</span>
                                Individual playlists &amp; libraries
                            </li>
                            <li>
                                <span aria-hidden="true" className="text-green-700 mr-2">&#10003;</span>
                                Family Mix playlists
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="block rounded-md bg-indigo-600 px-4 py-2 text-center font-semibold text-white hover:bg-indigo-700"
                    >
                        Start Family Plan
                    </a>
                </div>

            </div>
        </main>
    );
}
