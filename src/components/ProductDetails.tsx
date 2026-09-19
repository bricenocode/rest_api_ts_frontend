import { Form, useNavigate, ActionFunctionArgs, redirect, useFetcher} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product : Product
}

export async function action({ params }: ActionFunctionArgs) {
  if(params.id !== undefined){
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

export default function ProductDetails({product}:ProductDetailsProps) {
  
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const isAvailable = product.availability
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="p-4 text-sm font-bold text-slate-900">
        {product.name}
      </td>
      <td className="p-4 text-sm font-semibold text-slate-700">
        {formatCurrency(+product.price)}
      </td>
      <td className="p-4 text-sm text-slate-700">
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={product.id}
              aria-label={`Cambiar disponibilidad de ${product.name}`}
              className={`${isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'} rounded-full px-3 py-2 text-xs font-bold transition hover:opacity-80 disabled:cursor-wait disabled:opacity-50`}
            >
            {isAvailable ? 'Disponible' : 'No Disponible'}
            </button>
          </fetcher.Form>
      </td>
      <td className="p-4 text-sm text-slate-700 ">
        <div className="flex gap-2 items-center">
        <button
          onClick={() => navigate(`/productos/${product.id}/editar`)}
          aria-label={`Editar ${product.name}`}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
         >
            Editar
         </button>
         <Form 
          className="w-full"
          method="POST"
          action={`productos/${product.id}/eliminar`}
          onSubmit={ (e) => {
              if( !window.confirm(`¿Eliminar “${product.name}”? Esta acción no se puede deshacer.`)){
                e.preventDefault()
              }
          }}
         >
            <button type="submit" aria-label={`Eliminar ${product.name}`} className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50">Eliminar</button>
         </Form>
        </div>
      </td>
  </tr> 
  )
}
