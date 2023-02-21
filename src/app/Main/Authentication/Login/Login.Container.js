import { loginRedux } from '../../../redux/reducers/userReducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoginComponent from './Login.Component'

const mapStateToProps = createStructuredSelector({
    // email: getEmail,
    // error: getError,
    // loading: isLoading,
    // loginType: getLoginType,
});

const mapDispatchToProps = {
    loginRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
