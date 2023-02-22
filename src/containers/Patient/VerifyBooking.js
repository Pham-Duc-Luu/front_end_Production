import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './VerifyBooking.scss';
import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../HomePage/Footer/Footer';
class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            doctorId: '',
            loading: true,
        };
    }

    async componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ loading: false });
        // }, 5000);
        let token = new URLSearchParams(this.props?.location?.search)?.get('token');
        let doctorId = new URLSearchParams(this.props?.location?.search)?.get('doctorId');
        this.setState({
            token,
            doctorId,
        });
        console.log(token, doctorId);
        this.props.handleVerifyBooking({ token, doctorId });
    }

    componentDidUpdate(prevProps) {
        if (this.props.verifyBookingRes.errCode === 0 && this.props.verifyBookingRes !== prevProps.verifyBookingRes) {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className="">
                <HomeHeader />
                {this.state.loading ? (
                    <div className="loading">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                ) : (
                    <div
                        className="container text-success"
                        style={{
                            height: '60vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                        }}
                    >
                        VERIFY BOOKING
                    </div>
                )}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        verifyBookingRes: state.admin.verifyBookingRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleVerifyBooking: (data) => dispatch(actions.handleVerifyBooking(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
