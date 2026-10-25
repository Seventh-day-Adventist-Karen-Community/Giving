export type AccountType = {
    firstname?: string,
    firstname_error?: string,
    lastname?: string,
    lastname_error?: string,
    username: string,
    username_error?: string,
    password: string,
    password_error?: string,
    password1: string,
    password1_error?: string,
    password2: string,
    password2_error?: string,
    email: string,
    email_error?: string,
    address?: string,
    address_error?: string,
    phone_number?: string,
    phone_number_error?: string,
    avatar?: any,
    avatar_name?: string,
    avatar_error?: string,
    errored?: boolean
}

export type AuthResponse = {
    payload?: {
        username: string,
        exp: number,
        origIat: number
      },
    refreshExpiresIn?: number,
    token?: string,
    success: boolean,
    errors: object
}