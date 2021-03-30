import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/client";
import { Provider } from "next-auth/providers";

import { FaArrowCircleRight } from "react-icons/fa";
import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai";

import styles from "../../../styles/components/Auth/CredentialsForm.module.scss";
import Link from "next/link";

interface CredentialsFormProps {
  provider: Provider;
  csrfToken: string;
}

export default function CredentialsForm(props: CredentialsFormProps) {
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    if (visibilityPassword) {
      setTypeInputPassword("text");
    } else {
      setTypeInputPassword("password");
    }
  }, [visibilityPassword]);

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
            <AiFillCloseCircle color="red"/>
            Já tenho acesso !
          </>
        ) : (
          <>
            <AiFillPlusCircle color="#3BA540"/>
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
          <Link href="">esqueci minha senha</Link>
        </div>
      );
    }
    return <></>;
  };

  const SubmitButton = ({ className }) => {
    return (
      <button
        className={className}
        type="submit"
        onClick={() => signIn(props.provider.id)}
      >
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
      <form
        className={styles.credentialsForm}
        method="post"
        action="/api/auth/callback/credentials"
      >
        <div className={styles.entries}>
          <input
            name="csrfToken"
            type="hidden"
            defaultValue={props.csrfToken}
          />
          {newUser && (
            <>
              <label>
                Nome
                <input name="firstname" type="text" />
              </label>
              <label>
                Sobrenome
                <input name="lastname" type="text" />
              </label>
            </>
          )}
          <label>
            Email
            <input name="email" type="text" />
          </label>
          <label>
            Senha
            <input
              name="password"
              type={typeInputPassword}
              pattern="{8, 16}$"
            />
          </label>
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
