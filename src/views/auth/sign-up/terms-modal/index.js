import Modal from 'blockdemy-ui/modal';
import ReactMarkdown from 'react-markdown';

const TermsModal = ({ active, setShowModal, terms }) => (
  <Modal active={active} size="large" closeButton={() => setShowModal(false)}>
    <ReactMarkdown>{terms}</ReactMarkdown>
  </Modal>
);

export default TermsModal;
