import * as z from "zod";
import { Controller, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { useIntl } from "react-intl";
import messages from "~src/components/translations";
import DateRangeInput from "./DateRangeInput";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const checkoutFormSchema = z.object({
  name: z.string().max(255).min(3),
  email: z.string().email(),
  phoneNumber: z.string(),
  dateRange: z.date().array(),
});

export interface ICheckoutFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  dateRange: [Date | undefined, Date | undefined];
}

export default function CheckoutForm() {
  const t = useIntl();
  const {
    control,
    formState: { errors },
  } = useFormContext<ICheckoutFormInputs>();

  return (
    <form>
      <FormControllerSection>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t.formatMessage(messages.checkoutFormNameFieldLabel)}
              error={Boolean(errors.name)}
              helperText={errors.name ? errors.name?.message : ""}
              fullWidth
            />
          )}
        />
        {errors.name && (
          <span style={{ color: "red" }}>
            {t.formatMessage(messages.validationFieldRequired)}
          </span>
        )}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t.formatMessage(messages.checkoutFormEmailFieldLabel)}
              error={Boolean(errors.email)}
              helperText={errors.email ? errors.email?.message : ""}
              fullWidth
            />
          )}
        />
        {errors.email && (
          <span style={{ color: "red" }}>
            {t.formatMessage(messages.validationFieldRequired)}
          </span>
        )}
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t.formatMessage(
                messages.checkoutFormPhoneNumberFieldLabel
              )}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber ? errors.phoneNumber?.message : ""}
              fullWidth
            />
          )}
        />
        {errors.phoneNumber && (
          <span style={{ color: "red" }}>
            {t.formatMessage(messages.validationFieldRequired)}
          </span>
        )}
      </FormControllerSection>
      <Section>
        <Typography gutterBottom variant="sectionTitle">
          {t.formatMessage(messages.checkoutDateRangeFieldLabel)}
        </Typography>
        <DateRangeInput control={control} name="dateRange" />
        {errors.dateRange && (
          <span style={{ color: "red" }}>
            {t.formatMessage(messages.validationFieldRequired)}
          </span>
        )}
      </Section>
    </form>
  );
}

const Section = styled(Box)<BoxProps>(() => ({
  display: "flex",
  "& .MuiFormControl-root": {
    flex: "1 1 auto",
  },
  "& .nice-dates": {
    width: "100%",
  },
}));

const FormControllerSection = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "20px",
}));
