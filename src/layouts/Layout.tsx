import { NavLink, Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <div className="min-h-screen lg:flex">
      <aside className="bg-slate-950 text-white lg:min-h-screen lg:w-72 lg:flex-shrink-0">
        <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-7 lg:py-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500 font-black">P</div>
            <div><p className="font-black tracking-tight">Productly</p><p className="text-xs text-slate-400">Operations dashboard</p></div>
          </div>
        </div>
        <nav aria-label="Navegación principal" className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-2 lg:px-4">
          <NavLink to="/" end className={({isActive}) => `flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <span aria-hidden="true">▦</span> Productos
          </NavLink>
          <NavLink to="/productos/nuevo" className={({isActive}) => `flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <span aria-hidden="true">＋</span> Nuevo producto
          </NavLink>
        </nav>
        <div className="hidden px-7 lg:block lg:pt-16"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Portfolio project</p><p className="mt-3 text-sm leading-6 text-slate-400">CRUD real, validación y estados de interfaz para equipos de producto.</p></div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur md:px-10"><div className="mx-auto flex max-w-6xl items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Workspace</p><p className="mt-1 text-sm text-slate-500">Gestiona tu catálogo con claridad</p></div><div className="hidden rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:block">● API conectada</div></div></header>
        <main className="mx-auto max-w-6xl px-5 py-7 md:px-10 md:py-10"><Outlet/></main>
      </div>
    </div>
  )
}
