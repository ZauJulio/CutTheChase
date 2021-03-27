import React from "react";

import { FcGoogle } from "react-icons/fc";
import {
  FaArrowCircleRight,
  FaDiscord,
  FaFacebookSquare,
  FaTwitterSquare,
} from "react-icons/fa";

import styles from "../styles/components/AuthProviders.module.scss";
import { signIn } from "next-auth/client";


const CredentialsForm = ({ provider, csrfToken }) => {
  return (
    <form
      className={styles.credentialsForm}
      method="post"
      action="/api/auth/callback/credentials"
      defaultValue={csrfToken}
    >
      <div className={styles.entries}>
        <input name="csrfToken" type="hidden" />
        <label>
          Nome
          <input name="firstname" type="text" />
        </label>
        <label>
          Sobrenome
          <input name="lastname" type="text" />
        </label>
        <label>
          Email
          <input name="email" type="text" />
        </label>
        <label>
          Senha
          <input name="password" type="text" />
        </label>
      </div>
      <button type="submit">
        <FaArrowCircleRight />
      </button>
    </form>
  );
};

const ExternalProviders = ({ providers, className }) => {
  const icons = [
    { id: "google", icon: FcGoogle, color: "" },
    { id: "discord", icon: FaDiscord, color: "#6C86DA" },
    { id: "facebook", icon: FaFacebookSquare, color: "#4267B2" },
    { id: "twitter", icon: FaTwitterSquare, color: "#1DA1F2" },
  ];

  const IconProvider = ({ id }) => {
    const iconFromProvider = icons.find((icon) => icon.id === id);
    const Icon = iconFromProvider.icon;
    const color = iconFromProvider.color;

    return <Icon color={color} />;
  };

  return (
    <div className={className}>
      {providers.map((provider) => (
        <div key={provider.name}>
          <button
            className={styles.provider}
            onClick={() => signIn(provider.id)}
          >
            Entrar com {provider.name}
            <IconProvider id={provider.id} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default function AuthProviders({ providers, csrfToken }) {
  const credentialsProvider = providers.find(
    (provider) => provider.id === "credentials"
  );

  return (
    <div>
      <div className={styles.authProviders}>
        <CredentialsForm
          provider={credentialsProvider}
          csrfToken={csrfToken}
        />
        <div className={styles.separator}>
          <div className={styles.barSepacer} />
          Ou
          <div className={styles.barSepacer} />
        </div>
        <ExternalProviders
          className={styles.externalProviderss}
          providers={providers.slice(1)}
        />
      </div>
    </div>
  );
}
