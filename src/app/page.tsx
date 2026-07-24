
import { getUser } from "./utils/getUser";

export default async function Home() {

 const user = await getUser();

 console.log('user' , user)


  // const authResult = await response.json();
  // console.log('authResult ', authResult)

  return (
    <div>
      Hello {user ? user.name : 'Guest'}
    </div>
  );
}