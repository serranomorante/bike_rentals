import { useQuery } from "react-query";
import { IRide } from "~src/@types/IRide";
import { RideService } from "~src/services/RideService";
import { useRegions } from "../regions/RegionsProvider";
import RidePreview from "./RidePreview";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface RidesBlockProps {
  resourceType: string;
  type: string;
}

export default function RidesBlock(props: RidesBlockProps) {
  const { resourceType, type } = props;
  const { currentLocale } = useRegions();
  const rideService = new RideService();
  const ridesQuery = useQuery(
    ["api/v1/rides-by-type", { currentLocale, resourceType, type }],
    () => rideService.getRidesListByType(currentLocale, resourceType, type)
  );

  if (ridesQuery.isLoading) {
    return <div>Cargando...</div>;
  }

  if (ridesQuery.isError) {
    return <div>Ocurrio un error</div>;
  }

  return (
    <CBox>
      {ridesQuery.data?.map((ride: IRide) => (
        <RidePreview
          key={`${resourceType}-${ride.slug}`}
          {...ride}
          resourceType={resourceType}
        />
      ))}
    </CBox>
  );
}

const CBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  gap: "12px",
  justifyContent: "space-evenly",
  "& .MuiCard-root": {
    flex: "1 1 auto",
  },
}));
