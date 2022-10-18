import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { setCookie } from "cookies-next";
import styled from "styled-components";

const Home: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  // console.log("session: ", session?.accessToken);
  // console.log("session: ", session?.sub);

  const handleGoProfilePageClick = () => {
    router.push(process.env.PROFILE_URL as string);
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    setCookie("profile_uuid", session.sub);
  }, [session]);

  return (
    <Main>
      <h1>샘플 사이트</h1>
      {session ? (
        <Button onClick={handleGoProfilePageClick}>프로필</Button>
      ) : (
        <Button onClick={() => signIn("keycloak")}>로그인</Button>
      )}
    </Main>
  );
};

export default Home;

const Main = styled.main`
  box-sizing: border-box;
  word-break: break-all;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  height: 100vh;
`;

const Button = styled.button`
  cursor: pointer;
  width: 160px;
  height: 38px;
  padding: 20px 24px;
  line-height: 2px;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 2px;
  background: #5f51fb;
  outline: none;
  transition: 0.2s;

  &:hover {
    background: #ab9bfb;
  }

  &:active {
    background: #3a2ec3;
  }
`;
