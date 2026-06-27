# AGENTS

## Propósito

Este proyecto es una aplicación frontend React + Vite. Usa rutas con `react-router-dom`, llamadas API con `axios` y autenticación basada en `localStorage`.

## Qué debe saber el agente

- La app es una SPA React con JSX y no usa TypeScript.
- El enrutamiento principal está en `src/routes/AppRoutes.jsx`.
- Las páginas se encuentran en `src/pages/`.
- Las llamadas a la API se centralizan en `src/api.js` y se consumen desde `src/services/`.
- La API backend se asume en `http://localhost:8000/api`.
- El token JWT se guarda en `localStorage` como `token` y protege rutas en `AppRoutes.jsx`.
- El proyecto usa Bootstrap (`bootstrap`, `bootstrap-icons`) y también tiene Tailwind instalado, pero el estilo principal actual usa CSS estándar y Bootstrap.
- El proyecto usa ESLint con `eslint.config.js` y reglas recomendadas para React y hooks.

## Comandos importantes

- `npm run dev` — iniciar servidor de desarrollo Vite.
- `npm run build` — generar build de producción.
- `npm run lint` — ejecutar ESLint sobre el proyecto.
- `npm run preview` — previsualizar el build localmente.

## Convenciones de código

- Las funciones de servicio en `src/services/` devuelven `res.data` de Axios.
- Los endpoints usan rutas como `/usuarios`, `/producto`, `/beneficios`, según el servicio.
- La mayoría de los componentes de página tienen su propio CSS local, p. ej. `src/pages/Login.css`.
- Importar siempre el wrapper de API desde `src/api.js` cuando se hacen solicitudes.

## Archivos clave

- `src/routes/AppRoutes.jsx` — rutas públicas y protegidas.
- `src/api.js` — configuración base de Axios.
- `src/services/` — lógica de llamadas al backend.
- `src/pages/` — pantallas principales de la app.
- `eslint.config.js` — configuración de lint.
- `package.json` — dependencias y scripts.

## Recomendaciones para el agente

- Priorizar cambios en `src/services/` para nuevas integraciones API.
- Mantener la protección de rutas basada en el token existente.
- No asumir que hay backend dentro de este repositorio; el frontend se comunica con un backend externo.
- Consultar `package.json` si se necesita confirmar dependencias o scripts.
- Evitar copiar contenido de `README.md` de plantilla; su valor real es limitado para este proyecto.
