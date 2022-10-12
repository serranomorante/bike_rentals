import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
// import { createRideFactory } from "~src/factories/Ride";
import usePaths from "~src/lib/paths";
import { RideService } from "~src/services/RideService";
import { useRegions } from "../regions/RegionsProvider";
import messages from "../translations";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { formatAsMoney } from "~src/lib/util";

/**
 * Detail page for a Ride.
 * This `ride` can be of any type:
 * Bike, Skate, Skateboard, etc...
 */
export default function RideDetail() {
  const { id } = useParams();
  const t = useIntl();
  const paths = usePaths();
  const { currentLocale } = useRegions();
  const [searchParams, _] = useSearchParams();
  if (typeof id === "undefined") {
    throw Error("Ride ID cannot be undefined.");
  }
  const resourceType = searchParams.get("resourcetype");
  if (!resourceType) {
    throw Error("Ride should have a resource type.");
  }
  const rideService = new RideService();
  const rideQuery = useQuery(["api/v1/rides", { id, resourceType }], () =>
    rideService.getRideDetail(id, resourceType, currentLocale)
  );
  const rideTypesQuery = useQuery(
    ["api/v1/rides/types", { currentLocale }],
    () => rideService.getRideTypes(currentLocale)
  );

  if (rideQuery.isLoading || rideTypesQuery.isLoading) {
    return <div>Cargando...</div>;
  }

  if (rideQuery.isError || rideTypesQuery.isError) {
    return <div>Ocurrio un error</div>;
  }

  if (typeof rideQuery.data === "undefined") {
    return null;
  }

  if (typeof rideTypesQuery.data === "undefined") {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CBox>
          <CardMedia
            component="img"
            height="400"
            image={rideQuery.data.media}
          />
          <Box>
            <CardContent>
              <Typography gutterBottom variant="cardTitle">
                {rideQuery.data?.title}
              </Typography>
              <Typography gutterBottom component="p">
                {
                  rideTypesQuery.data.find(
                    (rideType) => rideType.id === rideQuery.data!.type
                  )!.title
                }
              </Typography>
              <Typography>{formatAsMoney(rideQuery.data.basePrice)}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                variant="outlined"
                component={RouterLink}
                to={paths.checkout
                  ._rideSlug(id)
                  ._rideResourceType(resourceType)
                  .$url()}
              >
                {t.formatMessage(messages.goToCheckout)}
              </Button>
            </CardActions>
          </Box>
        </CBox>
      </Card>
    </Container>
  );
}

const CBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexWrap: "wrap",
  "& > .MuiCardMedia-root": {
    flex: "2 1 200px",
  },
  "& > .MuiBox-root": {
    flex: "1 1 auto",
  },
}));
