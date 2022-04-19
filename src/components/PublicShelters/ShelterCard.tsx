import { useState } from "react";
import { View } from "react-native";

import { useTranslation } from "next-i18next";
import styled, { css } from "styled-components/native";
import PlaneIcon from "../../../src/style/svgs/plane.svg";
import ChevronDownIcon from "../../../src/style/svgs/chevron-down.svg";
import MarkerIcon from "../../../src/style/svgs/marker.svg";
import UsersIcon from "../../../src/style/svgs/users.svg";
import PhoneIcon from "../../../src/style/svgs/matched_phone.svg";
import { Theme } from "../../style/theme.config";
import { ButtonCta } from "../Buttons";

export const ShelterCard = ({
  name,
  country,
  city,
  occupancy,
  phoneNumber,
}: {
  name: string;
  country: string;
  city: string;
  occupancy: string;
  phoneNumber: string;
}) => {
  const { t } = useTranslation();

  const [isMapVisible, setIsMapVisible] = useState(false);

  const toogleMap = () => setIsMapVisible((pIsMapVisible) => !pIsMapVisible);

  return (
    <Container>
      <FlexContainer>
        <Column>
          <Header>
            <View>
              <Country>{country}</Country>
              <Title>{name}</Title>
            </View>

            <Button onPress={toogleMap}>
              <ChevronDownIcon
                style={{
                  transform: isMapVisible ? "rotate(180deg)" : "rotate(0)",
                }}
              />
            </Button>
          </Header>

          {isMapVisible && <MapWrapper />}
          <SectionInfo>
            <Info>
              <MarkerIcon width={15} height={15} />
              <p
                dangerouslySetInnerHTML={{
                  __html: t("others:forms.generic.city", {
                    city,
                  }),
                }}
              />
            </Info>
            <Info>
              <UsersIcon />

              <p
                dangerouslySetInnerHTML={{
                  __html: t("others:forms.generic.occupancy", {
                    number: occupancy,
                  }),
                }}
              />
            </Info>
            <Info>
              <PhoneIcon />

              <p
                dangerouslySetInnerHTML={{
                  __html: t("others:forms.generic.phoneNumberWithData", {
                    number: phoneNumber,
                  }),
                }}
              />
            </Info>
          </SectionInfo>

          <Footer>
            <ButtonCta
              anchor={
                <FlexTextIcon>
                  <ButtonText>
                    {t("others:publicShelters.details.howToGetThere")}
                  </ButtonText>
                  <PlaneIcon />
                </FlexTextIcon>
              }
            />
          </Footer>
        </Column>

        <DesktopMapWrapper />
      </FlexContainer>
    </Container>
  );
};

const Container = styled.View`
  shadow-color: #000;
  shadow-offset: {
    width: 0,
    height: -20,
  };
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 10;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  height: fit-content;
`;

const Column = styled.View<CommonProp>(
  ({ theme }) => css`
    flex-grow: 1;

    ${theme.getBreakPoint({
      md: css`
        flex-grow: 0;
      `,
    })};
  `
);

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

interface CommonProp {
  theme: Theme;
}

const Footer = styled.View<CommonProp>(
  ({ theme }) => css`
    padding-top: 15px;
    flex-direction: row;
    justify-content: flex-start;

    ${theme.getBreakPoint({
      md: css`
        justify-content: flex-end;
      `,
    })};
  `
);

const Button = styled.TouchableOpacity<CommonProp>(
  ({ theme }) => css`
    display: block;

    ${theme.getBreakPoint({
      lg: css`
        display: none;
      `,
    })};
  `
);

const Country = styled.Text<CommonProp>(
  ({ theme }) => css`
    font-size: 16px;
    color: ${theme.colors.headings};
  `
);

const Title = styled.Text<CommonProp>(
  ({ theme }) => css`
    font-weight: 600;
    font-size: 20px;
    line-height: 23px;
    color: ${theme.colors.headings};
  `
);

const SectionInfo = styled.View`
  flex-grow: 1;
  gap: 18px 0px;
  padding: 15px 0px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-color: #f2f2f2;
`;

const FlexContainer = styled.View<CommonProp>(
  ({ theme }) => css`
    flex-grow: 1;

    ${theme.getBreakPoint({
      md: css`
        flex-direction: row;
        gap: 0px 25px;
      `,
    })};
  `
);

const Info = styled.View<CommonProp>(
  ({ theme }) => css`
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #f5f4f4;
    gap: 0px 5px;
    font-size: 14px;
    line-height: 19px;
    padding: 0px 5px;

    ${theme.getBreakPoint({
      md: css`
        font-size: 16px;
      `,
    })};
  `
);

const ButtonText = styled.Text<CommonProp>(
  ({ theme }) => css`
    color: ${theme.colors.headings};
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  `
);

const FlexTextIcon = styled.View<CommonProp>(
  ({ theme }) => css`
    gap: 0px 10px;
    align-items: center;
    flex-direction: row;
    color: ${theme.colors.headings};
  `
);

export const MapWrapper = styled.View<CommonProp>(
  () => css`
    flex-grow: 1;
    height: 200px;
    background: #cecece;
    border-radius: 4px;
  `
);

export const DesktopMapWrapper = styled(MapWrapper)<CommonProp>(
  ({ theme }) => css`
    display: none;
    height: 100%;

    ${theme.getBreakPoint({
      md: css`
        display: block;
      `,
    })};
  `
);
