import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { LANGUAGES } from '../../utils';
import { Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import localization from 'moment/locale/vi';

import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../HomePage/Footer/Footer';
import './ClinicPage.scss';
import * as actions from '../../store/actions/index';
import ClinicInfo from '../Patient/Doctor/ClinicInfo';
import ClinicItem from './Clinicitem';
import img from '../../assets/doctor.jpg';

class ClinicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDate: [],
            language: '',
            dropdownOpen: false,
            choosenDate: {},
            dailySchedule: [],
            image: '',
            firstName: '',
            lastName: '',
            contentHTML: '',
            contentMarkDown: '',
            description: '',
            doctorId: '',
            specialtyId: '',
            clinicId: '',
            positionData: {},
            dropdownOpen: false,
            arrDate: [],
            choosenDate: {},
            dailySchedule: [],
            modal: false,
            gender: [],
            language: '',
            price: {},

            time: '',
            date: '',
            currentDate: '',

            patientName: '',
            patientPhone: '',
            patientEmail: '',
            patientAddress: '',
            patientNote: '',
            patientGender: '',
            patientDate: '',
            patientTimeType: '',

            allDoctorClinic: [],
        };
    }

    async componentDidMount() {
        await this.handleCreateListOfDay(this.props.language);
        this.props.getClinic(this.props.match?.params?.id);
        this.props.getAllDoctorBelongToClinic(this.props.match?.params?.id);
    }

    handleCreateListOfDay(language) {
        let arrDate = [];

        for (let i = 0; i < 7; i++) {
            let obj = {};
            language === LANGUAGES.EN
                ? (obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM'))
                : (obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'));

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }

        this.setState({
            choosenDate: arrDate[0],
        });

        if (arrDate && arrDate.length > 0) {
            this.setState({
                arrDate: arrDate,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.handleCreateListOfDay(this.props.language);
        }

        if (this.props.getClinicRes !== prevProps.getClinicRes) {
            this.setState({
                contentHTML: this.props.getClinicRes.data.descriptionHTML,
            });
        }
        if (this.props.getAllDoctorBelongToClinicRes !== prevProps.getAllDoctorBelongToClinicRes) {
            // console.log(this.props.getAllDoctorBelongToClinicRes);
            this.setState({
                allDoctorClinic: this.props.getAllDoctorBelongToClinicRes.data,
            });
        }
    }

    render() {
        return (
            <>
                <HomeHeader />
                <div className="clinic-page ">
                    <div className="clinic-description p-4 mx-5  shadow p-3 mb-4 bg-white rounded row">
                        <div className="clinic-name my-3">{this.state.name}</div>
                        <div className=" " dangerouslySetInnerHTML={{ __html: this.state.contentHTML }}></div>
                    </div>
                    {this.state?.allDoctorClinic?.length > 0 &&
                        this.state.allDoctorClinic.map((item) => {
                            return <ClinicItem allDoctorSpecialist={item} />;
                        })}
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getDoctorDetailByIdResponse: state.admin.getDoctorDetailByIdResponse,
        getDailyScheduleRes: state.admin.getDailyScheduleRes,
        language: state.app.language,
        gender: state.admin.gender,
        createBookingRes: state.admin.createBookingRes,
        getAllDoctorBelongToSpecialistRes: state.admin.getAllDoctorBelongToSpecialistRes,
        getClinicRes: state.admin.getClinicRes,
        getAllDoctorBelongToClinicRes: state.admin.getAllDoctorBelongToClinicRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
        getClinic: (id) => dispatch(actions.getClinic(id)),
        getAllDoctorBelongToClinic: (id) => dispatch(actions.getAllDoctorBelongToClinic(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicPage);
