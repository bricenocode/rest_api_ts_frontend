# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Productly · Product Manager

Administrador de productos con una interfaz SaaS moderna para gestionar un catálogo mediante operaciones CRUD conectadas a una API REST existente.

## Funcionalidades y stack

- Listado responsive con métricas, precios en EUR y badges de disponibilidad.
- Alta, edición, cambio de disponibilidad y eliminación con confirmación.
- Validación con Valibot, errores visibles, foco accesible y navegación responsive.
- React 18, TypeScript, Vite, Tailwind CSS, React Router data APIs y Axios.

## Configuración local

Requisitos: Node.js 18+ y una API compatible con el contrato existente.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Configura `VITE_API_URL` con el origen de la API, por ejemplo `http://localhost:4000`. El cliente consume `/api/products` y `/api/products/:id` con los métodos GET, POST, PUT, PATCH y DELETE según la operación. No se incluyen secretos en el repositorio: `.env.local` está ignorado y `.env.example` solo contiene un valor ficticio.

## Scripts

`npm run dev` inicia Vite · `npm run lint` ejecuta ESLint · `npm run build` valida TypeScript y genera producción · `npm run preview` sirve el build local.

## Decisiones técnicas y valor de portfolio

React Router concentra loaders y actions cerca de cada ruta CRUD. Axios conserva el contrato HTTP y transforma errores de red/validación en mensajes visibles mediante un error boundary. Valibot valida las respuestas antes de renderizarlas. El resultado demuestra integración REST, accesibilidad, manejo de errores y una evolución cuidada de CRUD básico a experiencia lista para uso real.
