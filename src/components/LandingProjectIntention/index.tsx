import { useRouter } from "next/router";
import styled, { css } from "styled-components/native";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ButtonCta } from "../Buttons";
import { Routes } from "../../consts/router";
import { Theme } from "../../style/theme.config";
import { AuthContext } from "../../../pages/_app";
import { useContext } from "react";
import styledWeb from "styled-components";

const Container = styled.View`
  width: 100%;
`;

const ContentWrapper = styled.View`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }: { theme: Theme }) => `${theme.maxContainerWidth}px`};
`;

const TextContainer = styled.View`
  padding: 16px;
  max-width: 740px;
`;

const Title = styled.Text`
  color: ${({ theme }: { theme: Theme }) => `${theme.colors.text}`};
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  margin-top: 130px;
  max-width: 300px;

  ${({ theme }: { theme: Theme }) =>
    theme.getBreakPoint({
      lg: css`
        font-size: 44px;
        line-height: 52px;
        max-width: none;
        margin-top: 88px;
      `,
    })}
`;

const SubTitleWrapper = styled.View`
  margin-top: 10px;
  display: inline-block;
  max-width: 300px;

  ${({ theme }: { theme: Theme }) =>
    theme.getBreakPoint({
      lg: css`
        margin-top: 40px;
        max-width: none;
      `,
    })}
`;

const SubTitle = styledWeb.div` //TODO: react native doesn't support dangerouslySetInnerHTML attribute. When we create the mobile app extract this component and create a version working with both web and mobile
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }: { theme: Theme }) => `${theme.colors.text}`};
  margin-top: 30px;

  b {
    font-weight: 700;
  }

  ${({ theme }: { theme: Theme }) =>
    theme.getBreakPoint({
      lg: css`
        font-size: 20px;
        line-height: 28px;
        margin-top: 40px;
      `,
    })}

`;

const ButtonContainer = styled.View`
  align-items: flex-start;
  margin-top: 50px;
  margin-bottom: 145px;

  ${({ theme }: { theme: Theme }) =>
    theme.getBreakPoint({
      lg: css`
        margin-top: 28px;
        flex-direction: row;
        margin-top: 104px;
      `,
    })}
`;

const ButtonStyle = styled(ButtonCta)<{ first?: boolean; theme: Theme }>`
  margin-top: 17px;
  font-size: 16px;

  ${({ theme, first }) =>
    !first &&
    theme.getBreakPoint({
      lg: css`
        margin-left: 20px;
      `,
    })}
`;

const LandingProjectIntention = () => {
  const { t } = useTranslation("landingPage");
  const { t: t_others } = useTranslation("others");
  const router = useRouter();
  const { identity, account } = useContext(AuthContext);

  const isAccountVerified =
    identity && account?.confirmedEmail && account?.confirmedPhone;

  const welcomeAppDescription = t_others("welcomePage.appDescription");
  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          {/* @ts-expect-error TODO: fix prop types */}
          <Title accessibilityRole="heading" accessibilityLevel={1}>
            {t("projectIntention.title")}
          </Title>

          <SubTitleWrapper>
            <SubTitle
              dangerouslySetInnerHTML={{ __html: welcomeAppDescription }}
            />
          </SubTitleWrapper>

          <ButtonContainer>
            {isAccountVerified ? (
              <>
                <Link href="/guest">
                  <a>
                    <ButtonStyle
                      colorOpposite
                      anchor={t("projectIntention.lookingForHelp")}
                    />
                  </a>
                </Link>
                <Link href="/host">
                  <a>
                    <ButtonStyle
                      colorOpposite
                      anchor={t("projectIntention.shareHelp")}
                    />
                  </a>
                </Link>
              </>
            ) : (
              <ButtonStyle
                first
                colorOpposite
                anchor={t("common:shareLocation")}
                onPress={(event) => {
                  event?.preventDefault();
                  router.push(`/${router?.locale}${Routes.SIGN_IN}`);
                }}
              />
            )}
          </ButtonContainer>
        </TextContainer>
      </ContentWrapper>
    </Container>
  );
};

export default LandingProjectIntention;
