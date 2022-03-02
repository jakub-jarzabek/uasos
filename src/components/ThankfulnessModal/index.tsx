import { View } from "react-native";
import { ButtonCta } from "../Buttons";
import FormSentIcon from "../../style/svgs/form_sent.svg";
import {
  ThankfulnessHeader,
  ThankfulnessModalButtonCtaWrapper,
  ThankfulnessModalContentWrapper,
  ThankfulnessModalTextWrapper,
  ThankfulnessText,
} from "./style";
import CardModal from "../CardModal";
import { useTranslation } from "next-i18next";
import { View } from "react-native";

export const ThankfulnessModal = () => {
  const { t } = useTranslation();
  return (
    <CardModal>
      <ThankfulnessModalContentWrapper>
        <View
          style={{
            minWidth: 160 * 1.25,
            minHeight: 105 * 1.25,
          }}
        >
          <FormSentIcon
            width={160 * 1.25}
            height={105 * 1.25}
            viewBox="0 0 160 105"
          />
        </View>
        <ThankfulnessModalTextWrapper>
          <ThankfulnessHeader>
            {t("thankfulnessModal.thankYou")}
          </ThankfulnessHeader>
          <ThankfulnessText>
            {t("thankfulnessModal.applicationSent")}
          </ThankfulnessText>

          <ThankfulnessText style={{ marginTop: 24 }}>
            {t("thankfulnessModal.informWhenAccomodationFound")}
          </ThankfulnessText>
        </ThankfulnessModalTextWrapper>
        <ThankfulnessModalButtonCtaWrapper>
          <ButtonCta anchor={t("backToHomePage")} onPress={() => {}} />
        </ThankfulnessModalButtonCtaWrapper>
      </ThankfulnessModalContentWrapper>
    </CardModal>
  );
};
