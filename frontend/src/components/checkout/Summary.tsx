import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import messages from "../translations";
import { useIntl } from "react-intl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import { formatAsMoney } from "~src/lib/util";
import { IRide } from "~src/@types/IRide";
import { useFormContext } from "react-hook-form";
import { ICheckoutFormInputs } from "~src/forms/checkoutForm";
import AlertDialog from "~src/forms/Confirm";

interface StringIndex {
  [k: string]: string | number;
}

interface SummaryProps {
  summaryPurchaseValues: StringIndex[];
  summaryProductsValues: Pick<IRide, "title" | "media" | "type">[];
}

/**
 * A summary component composed of the current rental data
 * selected by the user and also of the product that user
 * has selected.
 * @param props
 * @returns
 */
export default function Summary(props: SummaryProps) {
  const { summaryPurchaseValues, summaryProductsValues } = props;
  const t = useIntl();
  const { handleSubmit } = useFormContext<ICheckoutFormInputs>();

  function onSubmit(values: ICheckoutFormInputs) {
    localStorage.setItem("form", JSON.stringify(values));
  }

  return (
    <Section>
      {summaryProductsValues.map((summaryProduct, index) => (
        <Card key={`summaryProduct-${index}`} sx={{ maxWidth: "200px" }}>
          <CardMedia
            component="img"
            height="100"
            image={summaryProduct.media}
          />
          <Box>
            <CardContent>
              <Typography gutterBottom variant="cardTitle">
                {summaryProduct.title}
              </Typography>
              <Typography gutterBottom component="p">
                {summaryProduct.type}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
      <Card>
        <CardContent>
          <Typography variant="sectionTitle" component="p">
            {t.formatMessage(messages.checkoutSummary)}
          </Typography>
          {summaryPurchaseValues.map((purchaseSummary, index) =>
            typeof purchaseSummary.fieldValue === "string" ? (
              <Typography component="p" key={index}>
                {formatAsMoney(purchaseSummary.fieldValue)}
              </Typography>
            ) : (
              <Typography component="p" key={index}>
                {purchaseSummary.fieldValue / 24}{" "}
                {t.formatMessage(messages.daysSuffix, {
                  dayCount: purchaseSummary.fieldValue,
                })}
              </Typography>
            )
          )}
        </CardContent>
        <CardActions>
          <AlertDialog
            actionButtonLabel={t.formatMessage(messages.applyForRent)}
            onSuccess={handleSubmit(onSubmit)}
          >
            {summaryPurchaseValues.map((purchaseSummary, index) =>
              typeof purchaseSummary.fieldValue === "string" ? (
                <Typography component="p" key={index}>
                  {formatAsMoney(purchaseSummary.fieldValue)}
                </Typography>
              ) : (
                <Typography component="p" key={index}>
                  {purchaseSummary.fieldValue / 24}{" "}
                  {t.formatMessage(messages.daysSuffix, {
                    dayCount: purchaseSummary.fieldValue,
                  })}
                </Typography>
              )
            )}
          </AlertDialog>
        </CardActions>
      </Card>
    </Section>
  );
}

const Section = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));
