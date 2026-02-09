function ArticleHeader() {
  return (
    <div className="mt-20 px-4">
      <div className="relative flex items-center">
        <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-cyan-400 to-purple-500" />

        <h1 className="relative mx-auto px-6 text-4xl font-semibold rounded-2xl text-white bg-[#0a0a0a] outline-transparent">
          Articles
        </h1>
      </div>
    </div>
  )
}

export default ArticleHeader
