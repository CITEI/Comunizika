import { ImageBackground } from "react-native";
import React from "react";
import styled from "../../pre-start/themes";
import { dp } from "../../helper/resolution";
import AudioButton from "../atom/audioButton";

export interface SoundImageProps {
  /** image uri */
  image: string;
  /** image alt description */
  imageAlt: string;
  /** audio uri */
  audio?: string;
}

const Container = styled(ImageBackground)`
  width: 100%;
  height: ${(props) => dp(100)}px;
  background-color: ${(props) => props.theme.color.secondary};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Audio = styled(AudioButton)`
  margin: ${(props) => dp(10)}px;
`;

/** Image with an optional sound */
const SoundImage: React.VoidFunctionComponent<SoundImageProps> = (props) => {
  return (
    <Container
      source={{ uri: props.image }}
      accessibilityHint={props.imageAlt}
      resizeMode="contain"
    >
      {props.audio && <Audio audio={props.audio} />}
    </Container>
  );
};

export default SoundImage;
