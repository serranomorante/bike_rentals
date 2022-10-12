import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import messages from "../translations";
import usePaths from "~src/lib/paths";
import { formatAsMoney } from "~src/lib/util";

interface RidePreviewProps {
  slug: string;
  title: string;
  basePrice: string;
  media: string;
  resourceType: string;
}

export default function RidePreview(props: RidePreviewProps) {
  const { slug, title, basePrice, media, resourceType } = props;
  const t = useIntl();
  const paths = usePaths();

  return (
    <Card>
      <CardMedia component="img" height="140" image={media} />
      <CardContent>
        <Typography gutterBottom variant="cardTitle">
          {title}
        </Typography>
        <Typography>{formatAsMoney(basePrice)}</Typography>
      </CardContent>
      <CardActions>
        <Link
          component={RouterLink}
          to={paths.rides._slug(slug)._resourceType(resourceType).$url()}
        >
          {t.formatMessage(messages.more)}
        </Link>
      </CardActions>
    </Card>
  );
}
