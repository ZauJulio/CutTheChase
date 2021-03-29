import React, { useEffect, useState } from "react";
import { Provider } from "next-auth/providers";

import CredentialsForm from "./CredentialsForm";
import ExternalProviders from "./ExternalProviders";

import styles from "../../styles/components/Auth/AuthProviders.module.scss";

interface AuthProvidersProps {
  className: string;
  providers: Provider[];
  csrfToken: string;
}

export default function AuthProviders(props: AuthProvidersProps) {
  const credentialsProvider = props.providers.find(
    (provider) => provider.id === "credentials"
  );

  return (
    <div>
      <div className={`${styles.authProvidersContainer} ${props.className}`}>
        <CredentialsForm
          provider={credentialsProvider}
          csrfToken={props.csrfToken}
        />
        <div className={styles.separator}>
          <div className={styles.barSepacer} />
          Ou
          <div className={styles.barSepacer} />
        </div>
        <ExternalProviders
          providers={props.providers.slice(1)}
        />
      </div>
    </div>
  );
}
