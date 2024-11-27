export default function TaskFilter({searchTask}: {searchTask: (query: string) => void}) {

    const handleSearch = (title: string) => {
        searchTask(title);
    }

    return (
        <div>
            <input
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        handleSearch(e.currentTarget.value)
                }}
                placeholder={"Search task"}
                className={"mt-8 bg-lightGreen w-80 px-5 py-2 rounded-xl outline-none text-lg placeholder:text-deepGreen placeholder:italic"}/>
            {/*<h1 className={"mt-2 text-xl text-lightGreen font-bold"}>Filter</h1>*/}
        </div>
    )
}