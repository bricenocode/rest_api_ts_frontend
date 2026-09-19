import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

export default function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? error.statusText || "No se pudo cargar esta vista." : error instanceof Error ? error.message : "Ha ocurrido un error inesperado."

  return <main className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-5 text-center"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-rose-50 text-2xl font-black text-rose-600">!</div><h1 className="mt-5 text-2xl font-black text-slate-950">No hemos podido completar la solicitud</h1><p className="mt-3 text-slate-500">{message}</p><Link to="/" className="button-primary mt-6">Volver al inventario</Link></div></main>
}
