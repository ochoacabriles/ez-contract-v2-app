import PropTypes from 'prop-types';
import { GeneralContainer } from './elements';

const MainLayout = ({ children }) => {
  return (
    <GeneralContainer>
      <>{children}</>
    </GeneralContainer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
