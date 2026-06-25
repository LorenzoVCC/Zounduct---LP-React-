# Zounduct — Landing Page (React)

Migración a React de la landing page de **Zounduct — Guide Your Sound**, una app de DJ para gestionar bibliotecas de música independientes.

Proyecto original (HTML/SCSS/JS plano): [Sounduct-Landing_Page](https://github.com/LorenzoVCC/Sounduct-Landing_Page)

## Stack

- **React 19** + **TypeScript**
- **Vite** como build tool
- **SCSS Modules** para estilos por componente
- **ESLint** + **Prettier**

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run lint      # corre ESLint
npm run preview   # preview del build de producción
```

## Estructura

```
src/
  components/   # componentes React, uno por sección de la LP
  styles/       # SCSS globales (variables, mixins, base)
  assets/       # imágenes y recursos estáticos
```