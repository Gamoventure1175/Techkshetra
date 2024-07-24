import Events from "@/components/Events";
import Header from "@/components/Header";
import Highlights from "@/components/Highlights";
import { Container } from "@mui/material";
import {SessionProvider} from 'next-auth/react'


export default function Home() {

  return (
    <>
      <Header />
      <Events />
    </>
  );
}
