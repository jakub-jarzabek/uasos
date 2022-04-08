import React, { useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../../queries/queryKeys";
import { useRenewItem } from "../../../queries/useListing";

import HomeIllustration from "../../../style/svgs/home_illustration.svg";
import ButtonCta from "../ButtonCta";
import { TargetTypes } from "../EditOfferButton/types";
import {
  CloseButton,
  FormDescription,
  FormFooter,
  FormHeader,
  FormWrapper,
} from "../style";

export default function RenewOffer({
  close,
  targetID,
  targetType,
}: {
  close(): void;
  targetID: string;
  targetType: TargetTypes;
}) {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess } = useRenewItem();
  const queryClient = useQueryClient();

  const handleRenew = () => mutate({ targetID, targetType });

  const closeAfterSuccess = useCallback(() => {
    if (targetType === TargetTypes.GUESTS) {
      queryClient.invalidateQueries([QueryKeys.GET_REQUESTS_LIST]);
    }

    if (targetType === TargetTypes.HOSTS) {
      queryClient.invalidateQueries([QueryKeys.GET_OFFERS_LIST]);
    }

    close();
  }, [queryClient, targetType, close]);

  useEffect(() => {
    if (isSuccess) {
      closeAfterSuccess();
    }
  }, [isSuccess, closeAfterSuccess]);

  return (
    <FormWrapper>
      <CloseButton onPress={close} />
      <HomeIllustration />
      <FormHeader style={{ marginTop: 38 }}>
        {t("others:common.words.renew")}
      </FormHeader>
      <p
        dangerouslySetInnerHTML={{
          __html: t("others:offer.popup.renew.expiredMsg"),
        }}
        style={{ fontSize: 16, marginTop: 40 }}
      />

      <FormDescription style={{ marginTop: 22 }}>
        {t("others:forms.renew.re-activateOffer")}
      </FormDescription>
      <FormFooter style={{ marginTop: 57 }}>
        <ButtonCta
          onPress={close}
          variant="outlined"
          anchor={t("others:common.buttons.cancel")}
        />
        <ButtonCta
          onPress={handleRenew}
          anchor={
            isLoading ? <ActivityIndicator /> : t("others:common.words.renew")
          }
        />
      </FormFooter>
    </FormWrapper>
  );
}
