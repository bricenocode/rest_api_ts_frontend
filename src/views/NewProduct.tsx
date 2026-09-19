import { Link, Form, useActionData, ActionFunctionArgs, redirect} from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())

  let error = ''

  if(Object.values(data).includes('')){
    error = 'Todos los campos son obligatorios'
  }
  
  if(error.length){
    return error
  }
  await addProduct(data)

  return redirect('/')
}


export default function NewProduct() {

    const error = useActionData() as string

  return (
    <div className="mx-auto max-w-3xl"><div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-indigo-600">CATÁLOGO / NUEVO</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Registrar producto</h1><p className="mt-2 text-sm text-slate-500">Añade un producto al inventario con sus datos principales.</p></div><Link to="/" className="button-secondary">← Volver</Link></div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" method="POST"><ProductForm/><div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Link to="/" className="button-secondary">Cancelar</Link><button type="submit" className="button-primary">Registrar producto</button></div></Form>
    </div>
  )
}
