import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/client";
import { Provider } from "next-auth/providers";

import { FaArrowCircleRight } from "react-icons/fa";
import { AiFillHeart, AiFillPlusCircle } from "react-icons/ai";

import styles from "../../../styles/components/Auth/CredentialsForm.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface CredentialsFormProps {
  provider: Provider;
  csrfToken: string;
}

export default function CredentialsForm(props: CredentialsFormProps) {
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [newUser, setNewUser] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState<string | string[]>("");
  const [password, setPassword] = useState("");

  const [isLoginStarted, setIsLoginStarted] = useState(false);
  const [loginError, setLoginError] = useState<string | string[]>("");

  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error);
      setEmail(router.query.email);
    }
  }, [router]);

  useEffect(() => {
    if (visibilityPassword) {
      setTypeInputPassword("text");
    } else {
      setTypeInputPassword("password");
    }
  }, [visibilityPassword]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoginStarted(true);
    signIn("credentials", {
      name,
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  const NewUserButton = ({ className }) => {
    return (
      <button
        className={className}
        type="button"
        onClick={() => {
          setNewUser(!newUser);
        }}
      >
        {newUser ? (
          <>
            <AiFillHeart color="red" />
            {"Já tenho acesso : )"}
          </>
        ) : (
          <>
            <AiFillPlusCircle color="#3BA540" />
            Primeira vez aqui ?
          </>
        )}
      </button>
    );
  };

  const ForgotMyPasswordButton = ({ className }) => {
    if (!newUser) {
      return (
        <div className={className}>
          <Link href="/">esqueci minha senha</Link>
        </div>
      );
    }
    return <></>;
  };

  const SubmitButton = ({ className }) => {
    return (
      <button className={className} type="submit" disabled={isLoginStarted}>
        <FaArrowCircleRight />
      </button>
    );
  };

  const ShowPassword = ({ className }) => {
    return (
      <label className={className}>
        Exibir senha:
        <input
          type="checkbox"
          checked={visibilityPassword}
          onChange={() => {
            setVisibilityPassword(!visibilityPassword);
          }}
        ></input>
      </label>
    );
  };

  return (
    <div className={styles.credentialsProvider}>
      <NewUserButton className={styles.newUser} />
      <form className={styles.credentialsForm} onSubmit={(e) => handleLogin(e)}>
        <div className={styles.entries}>
          <input
            name="csrfToken"
            type="hidden"
            defaultValue={props.csrfToken}
          />
          {newUser && (
            <>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}
          <label htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <span className={styles.error}>{loginError}</span> */}
          <label htmlFor="loginPassword">Senha</label>
          <input
            id="loginPassword"
            type={typeInputPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.preSubmit}>
          <ShowPassword className={styles.showPassword} />
          <ForgotMyPasswordButton className={styles.forgotPassword} />
        </div>
        <SubmitButton className={styles.submit} />
      </form>
    </div>
  );
}
