import styled from "styled-components/native";
import StyledContainer from "../Container/index";

export const Container = styled(StyledContainer)`
  position: relative;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "100%" : "140px;")};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

export const TextBold = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
`;

export const GradientBackground = styled.ImageBackground`
  position: absolute;
  background-color: transparent;
  height: 10px;
  width: 100%;
  background-size: stretch;
  width: 100vw;
  height: 50;
  bottom: 0;
`;

export const ButtonContainer = styled.View`
  align-items: center;
`;