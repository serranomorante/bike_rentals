import * as React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { createRideFactory } from "~src/factories/Ride";
import CheckoutForm, {
  checkoutFormSchema,
  ICheckoutFormInputs,
} from "~src/forms/checkoutForm";
import { RideService } from "~src/services/RideService";
import { useRegions } from "../regions/RegionsProvider";
import { useMachine } from "@xstate/react";
import rideRentCalculation from "~src/machines/rideRentCalculation";
import { IModifierData } from "~src/@types/IModifier";
import { intervalToDuration } from "date-fns";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Summary from "./Summary";
import Container from "@mui/material/Container";
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import messages from "../translations";

/**
 * Checkout component.
 * @returns
 */
export default function Checkout() {
  const { currentLocale } = useRegions();
  const [searchParams] = useSearchParams();
  const t = useIntl();
  const [state, send] = useMachine(rideRentCalculation);
  const checkoutFormMethods = useForm<ICheckoutFormInputs>({
    resolver: zodResolver(checkoutFormSchema),
  });
  const { dateRange } = useWatch({
    control: checkoutFormMethods.control,
  });
  const rideSlug = searchParams.get("rideslug");
  const resourceType = searchParams.get("resourcetype");
  if (!resourceType || !rideSlug) {
    throw Error("You need to pass rideId and resourceType as query params.");
  }

  const rideService = new RideService();
  const rideQuery = useQuery(["api/v1/rides", { rideSlug, resourceType }], () =>
    rideService.getRideDetail(rideSlug, resourceType, currentLocale)
  );
  const ridePriceSettingsQuery = useQuery("api/v1/rides/price-settings", () =>
    rideService.getPriceSettings(currentLocale)
  );
  const rideTypeQuery = useQuery(
    ["api/v1/rides/types", { currentLocale }],
    () => rideService.getRideTypes(currentLocale)
  );

  React.useEffect(() => {
    if (typeof rideQuery.data === "undefined") {
      return;
    }

    if (typeof ridePriceSettingsQuery.data === "undefined") {
      return;
    }

    if (typeof dateRange === "undefined") {
      return;
    }

    if (!(dateRange[0] && dateRange[1])) {
      return;
    }

    const startDate = dateRange[0];
    const endDate = dateRange[1];

    const rideFactory = createRideFactory(rideQuery.data, resourceType);
    const ride = rideFactory.getInstance();
    const interval = intervalToDuration({
      start: startDate,
      end: endDate,
    });

    if (typeof interval.days === "undefined") {
      return;
    }

    const intervalDays = interval.days + 1;
    const hoursInBetween = intervalDays * 24;

    const modifierData: IModifierData = {
      ride: ride,
      selectedStartHour: startDate.getDate() * 24,
      selectedHours: hoursInBetween,
      ...ridePriceSettingsQuery.data,
    };
    send("DATE_RANGE_CHANGE", { modifierFactoryData: modifierData });
  }, [dateRange]);

  if (
    rideQuery.isLoading ||
    ridePriceSettingsQuery.isLoading ||
    rideTypeQuery.isLoading
  ) {
    return <div>Cargando...</div>;
  }

  if (
    rideQuery.isError ||
    ridePriceSettingsQuery.isError ||
    rideTypeQuery.isError
  ) {
    return <div>Ocurrio un error</div>;
  }

  if (typeof rideQuery.data === "undefined") {
    throw Error("Ride response data is undefined.");
  }

  if (typeof rideTypeQuery.data === "undefined") {
    throw Error("Ride Types response data is undefined.");
  }

  return (
    <Container maxWidth="md">
      <FormProvider {...checkoutFormMethods}>
        <Section>
          <CPaper>
            <Typography gutterBottom variant="sectionTitle">
              {t.formatMessage(messages.rentalApplication)}
            </Typography>
            <CheckoutForm />
          </CPaper>
          <Summary
            summaryProductsValues={[
              {
                title: rideQuery.data.title,
                media: rideQuery.data.media,
                type: rideTypeQuery.data.find(
                  (rideType) => rideType.id === rideQuery.data!.type
                )!.title,
              },
            ]}
            summaryPurchaseValues={[
              {
                fieldName: "selectedHours",
                fieldValue:
                  state.context.modifierFactoryData?.selectedHours ?? 0,
              },
              {
                fieldName: "total",
                fieldValue: state.context.rentTotal ?? "0.00",
              },
            ]}
          />
        </Section>
      </FormProvider>
    </Container>
  );
}

const Section = styled(Box)<BoxProps>(() => ({
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
}));

const CPaper = styled(Paper)<PaperProps>(() => ({
  padding: "20px",
}));
