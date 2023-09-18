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

export interface IRouteUploadStreamData {
    title: string;
    artist: string;
}

export interface IRouteUploadStreamFile {
    musicFile?: {[fieldname: string]: File[]; } | File[];
    thumbelinaFile?: {[fieldname: string]: File[]; } | File[];
}