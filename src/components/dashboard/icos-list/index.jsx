import Typography from 'blockdemy-ui/typography';
import IcoCard from './ico-card';
import { GridContainer } from './elements';

const IcosList = ({ icos, refresh }) => (
  <>
    <Typography variant="h5" color="primary" my={20}>ICOs:</Typography>
    <GridContainer>
      {icos.map(ico => <IcoCard key={ico.id} ico={ico} refresh={refresh} />)}
    </GridContainer>
  </>
);

export default IcosList;
