interface UserRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  company?: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export { UserRegister, UserLogin };
