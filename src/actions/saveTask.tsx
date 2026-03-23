

export default async function saveTask(task:any) {
    await new Promise((res) => setTimeout(res, 1000));

    return task;
}