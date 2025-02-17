export const initialUserData = {
  firstName: "",
  lastName: "",
  phone: "",
  hobbies: [] as string[],
};

interface UserState {
  firstName: string;
  lastName: string;
  phone: string;
  hobbies: string[];
}

type UserAction =
  | { type: "SET_FIRSTNAME"; payload: string }
  | { type: "SET_LASTNAME"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_HOBBIES"; payload: string[] };

export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "SET_FIRSTNAME":
      return { ...state, firstName: action.payload };
    case "SET_LASTNAME":
      return { ...state, lastName: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "SET_HOBBIES":
      return { ...state, hobbies: [...action.payload] };
    default:
      return state;
  }
};
