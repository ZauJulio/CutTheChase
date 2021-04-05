import React from "react";
import { Provider } from "next-auth/providers";

import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

import ExternalProvider from "./ProviderButton";
import styles from "../../../styles/components/Auth/ExternalProviders.module.scss";
import { IconType } from "react-icons";

interface ExternalProvidersProps {
  className?: string;
  providers: Provider[];
}

export default function ExternalProviders(props: ExternalProvidersProps) {
  const icons: { id: string; icon: IconType; color: string }[] = [
    { id: "google", icon: FcGoogle, color: "" },
    { id: "discord", icon: FaDiscord, color: "#6C86DA" },
    { id: "facebook", icon: FaFacebookSquare, color: "#4267B2" },
    { id: "twitter", icon: FaTwitterSquare, color: "#1DA1F2" },
  ];

  function IconProvider({ id }) {
    const iconOfProvider = icons.find((icon) => icon.id === id);

    if (iconOfProvider === undefined) return <div />;

    const Icon = iconOfProvider.icon;
    const color = iconOfProvider.color;
    return <Icon color={color} />;
  }

  return (
    <div className={`${styles.externalProviders} ${props.className}`}>
      {props.providers.map((provider: Provider, index) => (
        <ExternalProvider key={index} name={provider.name} id={provider.id}>
          <IconProvider id={provider.id} />
        </ExternalProvider>
      ))}
    </div>
  );
}
