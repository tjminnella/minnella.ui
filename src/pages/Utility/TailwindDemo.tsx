export default function TailwindDemo() {
    return (
        <div className="bg-red-100 border-2 border-red-300 rounded-md md:w-1/2 p-4 mt-4 md:mx-auto flex gap-4 justify-center items-center">
            <p className="text-red-700 text-xl">
                <strong>Error!</strong> Something went wrong. Please try again.
            </p>
            <button aria-label="Dismiss" className="text-red-700 text-2xl">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}
