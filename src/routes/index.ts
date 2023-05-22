import { Router } from "express";
import fs from "fs";

const router: Router = Router();

/**
 * Recorre todos los elementos de este directorio ignorando este mismo
 *
 * Incluye todos los archivos en el router y para cada archivo crea una ruta en /api/
 *
 * Por ejemplo:
 * Para el archivo auth.ts:
 *  - Crea la ruta /api/auth
 *  - Importa tambien el router de /api/auth
 *
 * (Para hacer esto es necesario que cada ruta exporte su router sin usar
 * export default)
 */
fs.readdirSync(__dirname).forEach((file) => {
  const fileWithoutExtension = file.split(".")[0];
  if (fileWithoutExtension !== "index") {
    import("./" + fileWithoutExtension).then((route) => {
      router.use("/api/" + fileWithoutExtension, route.router);
    });
  }
});

export default router;
