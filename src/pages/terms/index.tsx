
const TermsPage = () => {
  return (
    <div className="min-h-screen w-screen px-40 mt-10">
      <div className="text-sm flex items-center gap-2">
        {["Home", "Terms"].map((item, index) => {
          return (
            <div key={index}>
              <span className={`${item === "Home" ? 'text-gray-700 hover:underline cursor-pointer' : 'text-gray-400'}`}>{item}</span>
              {item === "Home" ? (
                <span className="ml-2 text-gray-400">/</span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TermsPage