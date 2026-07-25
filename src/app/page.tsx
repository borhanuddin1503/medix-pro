
import Hero from "@/components/hero/Hero";
import { getUser } from "./utils/getUser";

export default async function Home() {

 const user = await getUser();

 console.log('user' , user)


  // const authResult = await response.json();
  // console.log('authResult ', authResult)

  return (
    <div>
      <Hero></Hero>
    </div>
  );
}