export type Product = {
    id: string;
    company: string;
    model: string;
    year: number;
    vin: string;
    color: string;
    price: number;
    owner: User;
    images?: string[];
    isFavourite?: boolean;
};

export type UserRole = "ADMIN" | "USER";

export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    role: UserRole,
    avatar?: string
};

export type UserLogin = {
    username: string;
    password: string;
}

export const userAvatarOptions = {
    wishlist: "Wishlist",
    login: "Login",
    logout: "Logout"
}

export const EMPTY_STRING = "";
export const DEFAULT_ROLE = "USER";
export const EXPIRATION_PREFIX = "__expiration__";
export const AUTHENTICATED_USER = "authenticatedUser";
export const ZERO = "0";
export const ONE = "1";
export const DEFAULT_EXPIRATION_PERIOD = 24;
