import { PropsWithChildren } from "react"

export default function ErrorMessage({children}:PropsWithChildren) {
  return (
    <div role="alert" className="my-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">
      <span aria-hidden="true" className="mt-0.5">!</span>
      {children}
      </div>
  )
}
