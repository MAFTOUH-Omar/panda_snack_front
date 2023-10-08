import React from 'react'
import { Link } from 'react-router-dom'

const NotFounds = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-slate-900">
      <div className="text-center">
        <p className="text-base font-semibold text-lime-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-200">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to={"/"} className="rounded-md bg-lime-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500">Go back home</Link>
          {/* <Link href="#" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link> */}
        </div>
      </div>
    </main>
  )
}

export default NotFounds