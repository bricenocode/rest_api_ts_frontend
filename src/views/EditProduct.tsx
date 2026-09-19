import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import {getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id)
    if (!product) {
      throw new Response('', { status: 404, statusText: 'No Encontrado' })
      return redirect('/')
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  let error = ''

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  if (error.length) {
    return error
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id)
  }

  return redirect('/')
}

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
]

export default function EditProduct() {

  const error = useActionData() as string
  const product = useLoaderData() as Product

  return (
    <div className="mx-auto max-w-3xl"><div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-indigo-600">CATÁLOGO / EDITAR</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Editar producto</h1><p className="mt-2 text-sm text-slate-500">Actualiza la información y disponibilidad de {product.name}.</p></div><Link to="/" className="button-secondary">← Volver</Link></div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" method="POST"><ProductForm product={product}/>

        <div className="mb-4">
          <label
            className="field-label mt-5"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="field-input"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Link to="/" className="button-secondary">Cancelar</Link><button type="submit" className="button-primary">Guardar cambios</button></div></Form>
    </div>
  )
}

