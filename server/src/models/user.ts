export class User {
    private _userName: string;
    private _email: string;
    private _password: string;

    constructor(userName: string, email: string, password: string) {
        this._userName = userName;
        this._email = email;
        this._password = password;
    };

    public get userName() {
        return this._userName;
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }
}