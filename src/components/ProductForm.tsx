import { Product } from "../types"

type ProductFormProps = {
  product?: Product
  //Con el signo ? hace que es prop sea opcional
}

export default function ProductForm({product}:ProductFormProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
          <label
            className="field-label"
            htmlFor="name"
          >Nombre del producto</label>
          <input
            id="name"
            type="text"
            className="field-input"
            placeholder="Ej. Monitor ultrapanorámico"
            required
            minLength={2}
            name="name"
            defaultValue={product?.name}
          />
        </div>
        <div>
          <label
            className="field-label"
            htmlFor="price"
          >Precio</label>
          <input
            id="price"
            type="number"
            className="field-input"
            placeholder="0,00"
            min="0.01"
            step="0.01"
            required
            name="price"
            defaultValue={product?.price}
          />
        </div>
    </div>
  )
}
