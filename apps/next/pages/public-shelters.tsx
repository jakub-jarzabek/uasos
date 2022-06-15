import React from "react";
import styled, { css } from "styled-components/native";

import { PublicSheltersLayout } from "../src/components/PublicShelters";
import { CompositionAppBody } from "../src/components/Compositions";
import AppBack from "../src/components/AppBack";
import { Theme } from "../src/style/theme.config";
import { Routes } from "../src/consts/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const StyledAppBack = styled(AppBack)<{ theme: Theme }>(
  ({ theme }) => css`
    ${theme.getBreakPoint({
      md: css`
        display: none;
      `,
    })}
  `
);

const PublicShelters = () => (
  <CompositionAppBody>
    <StyledAppBack to={Routes.HOMEPAGE} />
    <PublicSheltersLayout />
  </CompositionAppBody>
);

export default PublicShelters;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale))),
  },
});
