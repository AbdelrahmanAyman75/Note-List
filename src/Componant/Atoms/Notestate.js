import { atom } from "recoil";

 export const NoteState = atom({
    key: 'NoteState', // unique ID (with respect to other atoms/selectors)
    default:0, // default value (aka initial value)
  });
