import RidesBlock from "./ride/RidesBlock";
import Container, { ContainerProps } from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useIntl } from "react-intl";
import messages from "./translations";
import Typography from "@mui/material/Typography";
import Paper, { PaperProps } from "@mui/material/Paper";

export default function Home() {
  const t = useIntl();

  const CATEGORIES = [
    {
      title: t.formatMessage(messages.eBike),
      resourceType: "bike",
      type: "e-bike",
    },
    {
      title: t.formatMessage(messages.regularBike),
      resourceType: "bike",
      type: "regular-bike",
    },
    {
      title: t.formatMessage(messages.ancientBike),
      resourceType: "bike",
      type: "ancient-bike",
    },
  ];

  return (
    <div>
      <CContainer maxWidth="md">
        {CATEGORIES.map((category, index) => (
          <SectionPaper key={`category-${index}`} variant="outlined">
            <Section>
              <Typography variant="sectionTitle" component="p">
                {category.title}
              </Typography>
              <RidesBlock
                resourceType={category.resourceType}
                type={category.type}
              />
            </Section>
          </SectionPaper>
        ))}
      </CContainer>
    </div>
  );
}

const Section = styled(Box)<BoxProps>(() => ({}));

const SectionPaper = styled(Paper)<PaperProps>(() => ({
  padding: "20px",
}));

const CContainer = styled(Container)<ContainerProps>(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));
