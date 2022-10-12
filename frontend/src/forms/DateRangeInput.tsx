import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { DateRangePicker } from "react-nice-dates";
import { useRegions } from "~src/components/regions/RegionsProvider";
import { getDateFnsLocale } from "~src/lib/regions";
import TextField from "@mui/material/TextField";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default function DateRangeInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName>) {
  const { field } = useController(props);
  const { currentLocale } = useRegions();

  const defaultValues =
    Array.isArray(field.value) && field.value.length == 2
      ? field.value
      : [undefined, undefined];

  function handleStartDateChange(newStartDate: Date | null) {
    field.onChange([newStartDate, defaultValues[1]]);
  }

  function handleEndDateChange(newEndDate: Date | null) {
    field.onChange([defaultValues[0], newEndDate]);
  }

  return (
    <DateRangePicker
      startDate={defaultValues[0]}
      endDate={defaultValues[1]}
      onStartDateChange={handleStartDateChange}
      onEndDateChange={handleEndDateChange}
      minimumDate={new Date()}
      // minimumLength={1}
      locale={getDateFnsLocale(currentLocale)}
      format="dd MMM yyyy"
    >
      {({ startDateInputProps, endDateInputProps }) => (
        <Section>
          <TextField {...startDateInputProps} />
          <TextField {...endDateInputProps} />
        </Section>
      )}
    </DateRangePicker>
  );
}

const Section = styled(Box)<BoxProps>(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  "& div": {
    flex: "1 1 auto",
  },
}));
