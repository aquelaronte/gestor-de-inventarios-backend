// Interfaz hecha para crear cuenta
interface UserSignUp {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  company: string;
}

// Interfaz hecha para iniciar sesión
interface UserSignIn {
  email: string;
  password: string;
}

export { UserSignUp, UserSignIn };
