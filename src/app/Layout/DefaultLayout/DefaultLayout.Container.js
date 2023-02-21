import { getMasterData } from '../../../redux/reducers/masterdataReducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DefaultLayout from './DefaultLayout'

const mapStateToProps = createStructuredSelector({
    // email: getEmail,
    // error: getError,
    // loading: isLoading,
    // loginType: getLoginType,
});

const mapDispatchToProps = {
    getMasterData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
