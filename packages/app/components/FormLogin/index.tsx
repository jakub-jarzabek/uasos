/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "app/common-i18n/use-translation";
import styled, { css } from "styled-components/native";

import { ButtonCta, ButtonSM } from "../Buttons";
import CompositionSection from "../Compositions/CompositionSection/index.web";

import FormContainer from "./FormContainer";
import { Theme } from "app/provider/theme/theme.config";
import { FormProvider, useForm } from "react-hook-form";
import { FormType } from "../../helpers/FormTypes";
import GoToRegister from "./GoToRegister";
import FormTextInput from "../Inputs/FormTextInput";
import LostPass from "./LostPass";
import { Authorization } from "../../hooks/useAuth";
import { ConfirmationResult, getRedirectResult } from "firebase/auth";
import SmsVerificationModal from "../SmsVerificationModal";
import SmsVerificationSuccessModal from "../SmsVerificationSuccessModal";
import { ErrorText } from "../FormRegisterWithSocials/styles";
import { auth } from "../../../lib/firebase-app";
import CardModal from "../CardModal";
import { PROVIDERS } from "./constants";

const FormLogin = () => {
  const { t } = useTranslation();

  const [passwordInput, setPasswordInput] = useState(false);
  const [phoneLoginConfirmation, setPhoneLoginConfirmation] =
    useState<ConfirmationResult | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [smsVerificationSuccess, setSmsVerificationSuccess] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [providerLoginError, setProviderLoginError] = useState<boolean>(false);

  const formFields = useForm<FormType>();

  const {
    handleSubmit,
    formState: { errors },
  } = formFields;
  // eslint-disable-next-line
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // eslint-disable-next-line
  const PHONE_WITHOUT_PREFIX_REGEX = /^\d{10}$/;
  // eslint-disable-next-line
  const PHONE_REGEX = /[+]([^\d]*\d){8}/;
  const EMAIL_OR_PHONE_REGEX =
    // eslint-disable-next-line
    /(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)|([+]([^\d]*\d){8})/;
  const onSubmit = async (data: {
    login: { phoneOrEmail: string; password?: string };
  }) => {
    setError("");
    if (
      /* eslint-disable-next-line */
      data.login.hasOwnProperty("password") &&
      data.login.password &&
      PHONE_REGEX.test(data.login.phoneOrEmail)
    ) {
      setPasswordInput(false);
      delete data.login.password;
    }
    if (
      /* eslint-disable-next-line */
      data.login.hasOwnProperty("password") &&
      data.login.password &&
      passwordInput
    ) {
      try {
        await Authorization.signInWithEmail(
          data.login.phoneOrEmail,
          data.login.password
        );
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("wrong-password")) {
            setError(t("others:forms.login.invalidPassword"));
          }
          if (error.message.includes("user-not-found")) {
            setError("Invalid email");
          }
          if (error.message.includes("too-many-requests")) {
            setError("Too many requests");
          }
        }
      }
    } else {
      if (EMAIL_REGEX.test(data.login.phoneOrEmail)) {
        setPasswordInput(true);
      } else if (PHONE_REGEX.test(data.login.phoneOrEmail)) {
        try {
          const captcha = Authorization.recaptcha
            ? Authorization.recaptcha
            : Authorization.initCaptcha("captcha__container");
          const confirmation = await Authorization.signInWithPhone(
            data.login.phoneOrEmail,
            captcha
          );
          setPhoneLoginConfirmation(confirmation);
          setPhoneNumber(data.login.phoneOrEmail);
        } catch (error) {
          // eslint-disable-next-line
          // @ts-ignore
          setError("Invalid phone number");
        }
      }
    }
  };

  // const handlePassErrorMsg = (type: string): string => {
  //   switch (type) {
  //     case "minLength":
  //       return t("validations.toShortPassword");
  //     case "required":
  //       return t("validations.invalidPassword");
  //     default:
  //       return t("validations.invalidPassword");
  //   }
  // };
  useEffect(() => {
    (async function checkIfLoginSucced() {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        setProviderLoginError(true);
      }
    })();
  }, []);
  const validateSheba = (str: string) => {
    const isPhoneWithoutPrefixValid = PHONE_WITHOUT_PREFIX_REGEX.test(str);
    const isPhoneOrEmail = EMAIL_OR_PHONE_REGEX.test(str);
    if (PHONE_REGEX.test(str) && passwordInput) {
      setPasswordInput(false);
    }

    if (!str) {
      setPasswordInput(false);
      return "Your phone or email is required";
    } else if (str.length >= 50) {
      return "Your contact information should be lesss than 50 symbols";
    } else if (isPhoneWithoutPrefixValid) {
      return "+38";
    } else if (!isPhoneOrEmail) {
      setPasswordInput(false);
      return t("others:forms.login.emailOrPhoneDetail");
    }
  };

  const handleSignIn = async (providerId: string) => {
    switch (providerId) {
      case PROVIDERS.FACEBOOK:
        {
          await Authorization.signInWithFacebook();
        }
        break;
      case PROVIDERS.GOOGLE:
        {
          await Authorization.signInWithGoogle();
        }
        break;
    }
  };

  return (
    <>
      <CompositionSection padding={[40, 15, 0, 15]} flexGrow="2">
        <FormContainer>
          <FormHeader>{t("others:forms.login.login")}</FormHeader>
          {Object.values(PROVIDERS).map((provider) => (
            <ButtonSM
              key={provider}
              id={provider}
              onPress={() => handleSignIn(provider)}
              anchor={
                provider === PROVIDERS.FACEBOOK
                  ? t("others:forms.login.signInFacebook")
                  : t("others:forms.login.signInGoogle")
              }
            />
          ))}
          <Spacer />
          <FormProvider {...formFields}>
            <FormTextInput
              name={"login.phoneOrEmail"}
              label={t("others:forms.login.emailOrPhone")}
              styles={{ wrapper: { marginBottom: 12 } }}
              rules={{
                validate: validateSheba,
              }}
              error={errors?.login?.phoneOrEmail}
              errorMsg={errors?.login?.phoneOrEmail?.message}
            />
            {passwordInput ? (
              <>
                <FormTextInput
                  name={"login.password"}
                  label={t("others:forms.generic.password")}
                  secureTextEntry
                  rules={{
                    required: true,
                    maxLength: 50,
                    minLength: 8,
                  }}
                  error={errors?.login?.password}
                  errorMsg={t("others:forms.login.invalidPassword")}
                />
                <LostPass />
              </>
            ) : (
              <></>
            )}
            <ButtonCta
              style={{
                width: "130px",
                height: "43px",
                display: "flex",
                marginBottom: "30px",
                alignSelf: "flex-end",
                marginTop: 50,
              }}
              anchor={t("others:forms.login.login")}
              onPress={handleSubmit(onSubmit, () => {})}
            />
            <View nativeID="captcha__container" style={{ display: "none" }} />
          </FormProvider>
          {phoneLoginConfirmation ? (
            <SmsVerificationModal
              phoneNumber={phoneNumber}
              confirmation={phoneLoginConfirmation}
              setVerificationSuccess={setSmsVerificationSuccess}
              mode="LOGIN"
              callback={() => null}
              close={() => setPhoneLoginConfirmation(null)}
            />
          ) : (
            <></>
          )}
          {smsVerificationSuccess ? <SmsVerificationSuccessModal /> : <></>}
          {error ? <ErrorText>{error}</ErrorText> : <></>}
          {providerLoginError ? (
            <CardModal
              closeable
              onModalClose={() => setProviderLoginError(false)}
            >
              <ErrorText>
                {t("others:desktop.checks.emailAlreadyInUse")}
              </ErrorText>
            </CardModal>
          ) : (
            <></>
          )}
        </FormContainer>
      </CompositionSection>
      <GoToRegister />
    </>
  );
};

export default FormLogin;

export const FormHeader = styled.View<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.textOnCta};
  font-weight: bold;
  font-size: 24px;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: 0.5px;

  ${({ theme }) =>
    theme.styleFor({
      web: css`
        margin-top: 0.83em;
        margin-bottom: 0.83em;
        margin-left: 0;
        margin-right: 0;
      `,
      native: css`
        margin-top: ${theme.scale(14 * 0.83)}px;
        margin-bottom: ${theme.scale(14 * 0.83)}px;
        margin-left: 0;
        margin-right: 0;
      `,
    })}
`;

export const Spacer = styled.View<{ theme: Theme }>`
  ${({ theme }) =>
    theme.styleFor({
      web: css`
        margin-bottom: 60px;
      `,
      native: css`
        margin-bottom: ${theme.scale(60)}px; ;
      `,
    })}
`;
