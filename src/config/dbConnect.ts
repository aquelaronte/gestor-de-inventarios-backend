import mongoose, { ConnectOptions } from "mongoose";

/**
 * Establece conexión con la base de datos, indica en la consola si fue exitoso o no
 * @param uri Llave para conectarse a la base de datos
 */
function mongoConnect(uri: string): void {
  mongoose
    .connect(uri, <ConnectOptions>{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection with database was successfull"))
    .catch((reason: unknown) =>
      console.log(
        "Connection with database was unsuccessfull, reason was: \n" + reason
      )
    );
}

export default mongoConnect;
