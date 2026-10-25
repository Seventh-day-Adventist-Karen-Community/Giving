
const InputErrorComponent = ({ error }: { error?: string }) => {
    return (
        error ?
            <>
                <p  className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
                {/* <div className='text-red-600 text-xs transition-all'>{error}</div> */}
            </>
            : <> </>
    )
}

export default InputErrorComponent