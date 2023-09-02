export interface IRouteSignIn {
    email: string;
    password: string;
}

export interface IRouteSignUp {
    email: string;
    name: string;
    password: string;
    cpassword?: string;
}