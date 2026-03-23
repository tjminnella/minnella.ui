"use server";

type SubmitFormState = {
    message?: string;
    error?: string;
};

export async function submitForm(_state: SubmitFormState, formData: FormData) {
    const name = formData.get("name");

    if (!name || typeof name !== "string") {
        return { error: "Name is required" };
    }

    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    return { message: `${greeting}, ${name}` };
}