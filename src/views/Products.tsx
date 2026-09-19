import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts()
  return products
}
export async function action({request}: ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[];
  const available = products.filter(product => product.availability).length
  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-indigo-600">CATÁLOGO</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Productos</h1><p className="mt-2 max-w-xl text-sm text-slate-500">Administra el inventario y controla su disponibilidad desde un único lugar.</p></div><Link to="productos/nuevo" className="button-primary">＋ Agregar producto</Link></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="metric-card"><span className="metric-icon bg-indigo-50 text-indigo-600">▦</span><div><p className="metric-label">Total productos</p><p className="metric-value">{products.length}</p></div></div><div className="metric-card"><span className="metric-icon bg-emerald-50 text-emerald-600">✓</span><div><p className="metric-label">Disponibles</p><p className="metric-value">{available}</p></div></div><div className="metric-card"><span className="metric-icon bg-amber-50 text-amber-600">◷</span><div><p className="metric-label">No disponibles</p><p className="metric-value">{products.length - available}</p></div></div></div>
      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-slate-900">Inventario</h2><p className="text-sm text-slate-500">Actualiza el estado o gestiona cada producto.</p></div><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{products.length} registros</span></div>
      <div className="overflow-x-auto">
        {products.length ? (
            <table className="w-full min-w-[680px] table-auto">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Disponibilidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {
                  products.map( product => (
                <ProductDetails
                      key = {product.id}
                      product = {product}
                    />
                  ))
                }
            </tbody>
          </table>
        ) :(
          <div className="px-6 py-16 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">＋</div><p className="mt-4 font-bold text-slate-900">Tu inventario está vacío</p><p className="mt-1 text-sm text-slate-500">Crea tu primer producto para comenzar a gestionar el catálogo.</p><Link to="productos/nuevo" className="button-primary mt-5">Crear producto</Link></div>
        )}
      </div>
      </section>
    </>
  )
}

