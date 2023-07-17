import React, { useCallback, useEffect } from "react";
import OnboardingTemplate from "../component/templates/onboarding";
import onb1 from "../../assets/onboarding/1.png";
import onb2 from "../../assets/onboarding/2.png";
import onb3 from "../../assets/onboarding/3.png";
import { setOnboardingComplete } from "../helper/settings";
import { useNavigation } from "@react-navigation/native";
import { GameNavigatorProps } from "../route/game";

const Onboarding: React.VoidFunctionComponent = () => {
  const navigation = useNavigation<GameNavigatorProps>();

  const handleFinish = useCallback(async () => {
    await setOnboardingComplete();
    navigation.replace("Main");
  }, [navigation]);

  return (
    <OnboardingTemplate
      slides={[
        {
          image: onb1,
          imageAlt: "Ilustração de uma mulher com uma lâmpada",
          text: "O Comunizika tem o objetivo de auxiliar no desenvolvimento da comunicação de crianças afetadas pelo Zica Virus e por outros problemas genéticos ou cogênitos.",
          title: "Olá! :)",
        },
        {
          image: onb2,
          imageAlt: "Ilustração de pessoas resolvendo um quebra-cabeça.",
          text: "Todas as atividades contarão com instruções detalhadas de como realiza-las e ao final você poderá registrar o desempenho da criança.",
          title: "Para começar",
        },
        {
          image: onb3,
          imageAlt: "Ilustração de uma mulher com um lápis.",
          text: "Clique em saiba mais caso queira informações sobre o Comunizika e sobre a metodologia que utilizamos em nossas atividades!",
          title: "Ainda tem dúvidas?",
        },
      ]}
      onFinish={handleFinish}
    />
  );
};

export default Onboarding;
