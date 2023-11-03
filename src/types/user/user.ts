export interface AllUsersResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddUserResponse {
  id: string;
  email: string;
}

export interface AddNewUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface OneUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UsersIdAndLastnameResponse {
  id: string;
  lastName: string;
}
