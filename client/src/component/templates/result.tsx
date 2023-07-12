import React, { useCallback } from "react";
import { Module } from "../../store/modules";
import MainContainer from "../atom/mainContainer";
import ContentContainer from "../atom/contentContainer";
import Toolbar from "../organism/toolbar";
import styled from "../../pre-start/themes";
import BaseTitle from "../atom/title";
import BaseText from "../atom/text";
import { dp, sp } from "../../helper/resolution";
import Button from "../atom/button";
import { useNavigation } from "@react-navigation/native";
import { GameNavigatorProps } from "../../route/game";
import util from "util";
import t from "../../pre-start/i18n";
import useModules from "../../hooks/useModules";
import useAnswers from "../../hooks/useAnswers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addToStreak, resetStreak } from "../../store/progress";
import { SvgUri } from "react-native-svg";
interface ResultProps {
  module: Module;
  grade: number;
}

const Container = styled(ContentContainer)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled(BaseTitle)`
  font-size: ${sp(24)}px;
  text-align: center;
`;

const Image = styled.Image`
  width: ${dp(180)}px;
  height: ${dp(180)}px;
  margin-bottom: ${dp(19)}px;
  margin-top: ${dp(37)}px;
`;

const SvgImage = styled(SvgUri)`
  margin-bottom: ${dp(19)}px;
  margin-top: ${dp(37)}px;
`;

const Text = styled(BaseText)`
  font-family: ${(props) => props.theme.fontFamily.titleLight};
  font-size: ${sp(16)}px;
  text-align: center;
  margin-top: ${dp(10)}px;
  margin-bottom: ${dp(16)}px;
`;

const Footer = styled.View`
  width: 100%;
`;
/**
const TITLE_MESSAGES: {[key in ResultProps["status"]]: string} = {
  "ended": t("You finished %s"),
};

const CONTENT_MESSAGES: {[key in ResultProps["status"]]: string} = {
  "approved": t("StageSucceeded"),
  "ended": t("NoContent"),
  "reproved": t("StageFailed"),
}; */

/** Templated result screen */
const Result: React.VoidFunctionComponent<ResultProps> = (props) => {
  const navigation = useNavigation<GameNavigatorProps>();
  const modules = useModules();
  const activityStreak = useAppSelector(
    (state) => state.progress.activityStreak
  );
  const approved = useAppSelector((state) => state.progress.grade)! > 0.5;
  const dispatch = useAppDispatch();
  const next = modules.find((el) => el.previous === props.module.id);

  /** Goes back to the modules screen */
  const handleBack = useCallback(() => {
    navigation.pop(2 + activityStreak);
    dispatch(resetStreak());
  }, []);

  const handleReinforcement = useCallback(() => {
    dispatch(addToStreak());
    navigation.replace("Transition", { module: props.module });
  }, []);

  /** Goes to the activities page of the next box */
  const handleNext = useCallback(() => {
    dispatch(addToStreak());
    navigation.replace("Transition", { module: next! });
  }, []);

  const buttons = [
    next ? (
      <Button
        variant={approved ? undefined : "outline"}
        label={"Iniciar o próximo módulo"}
        onPress={handleNext}
      />
    ) : (
      <></>
    ),
    <Button
      variant={approved && next ? "outline" : undefined}
      label={approved ? "Refazer módulo atual" : "Reforçar módulo atual"}
      onPress={handleReinforcement}
    />,
  ];

  return (
    <MainContainer>
      <Toolbar
        accountButton={true}
        closeButton={false}
        logo={true}
        shadow={true}
      />
      <Container>
        {props.module.image.slice(-3) == "svg" ? (
          <SvgImage
            width={dp(180)}
            height={dp(180)}
            accessibilityLabel={props.module.imageAlt}
            uri={props.module.image}
          />
        ) : (
          <Image
            source={{ uri: props.module.image }}
            accessibilityLabel={props.module.imageAlt}
            resizeMode="contain"
          />
        )}
        <Title>{`Parabéns!`}</Title>
        <Text>
          {approved
            ? "Parabéns você conclui o módulo com maestria"
            : "Que legal você concluiu o módulo! Que tal rever alguns conceitos?"}
        </Text>
        <Footer>
          {approved ? buttons[0] : buttons[1]}
          {approved ? buttons[1] : buttons[0]}
          <Button
            variant="outline"
            label={"Voltar ao menu"}
            onPress={handleBack}
          />
        </Footer>
      </Container>
    </MainContainer>
  );
};

export default Result;
