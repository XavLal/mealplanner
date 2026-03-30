/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Permet d'importer des modules React écrits en `.jsx` depuis TypeScript.
declare module "*.jsx" {
  const Component: any;
  export default Component;
}

