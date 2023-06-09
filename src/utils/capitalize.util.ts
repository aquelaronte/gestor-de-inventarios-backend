/**
 * Convierte en mayúscula el primer caracter alfabético de un string
 * @param value Valor
 * @returns
 */
const capitalizeString = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

/**
 * Convierte en mayúscula el primer caracter alfabético de todos los strings de un array
 * @param values Valores
 * @returns
 */
const capitalizeArray = (values: string[]): any => {
  let response: string[] = [];
  values.forEach((value) => response.push(capitalizeString(value)));
  return response;
};

export { capitalizeString, capitalizeArray };
