import { RecoilState, atom } from "recoil";

interface User{
  email:string
  name:string 
  id:string
  image_url:string


  }
interface Todos{
  id:string,
  label:string,
  completed:boolean,
  description:string,
  timestamp:string,
  userId:string,
  createdAt:string
}

export const overlayState = atom({
  key: "overlayState",
  default: false,
});

export const todosState = atom<Todos[]>({
 key:"todosState",
 default:[] 
})
export const userState = atom<User>({
  key:"userState",
  default:{
    email:"",
    name:"",
    id:"",
    image_url:"",
    
  }
})

