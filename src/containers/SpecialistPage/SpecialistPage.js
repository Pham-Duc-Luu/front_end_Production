import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { LANGUAGES } from '../../utils';
import { Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import localization from 'moment/locale/vi';

import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../HomePage/Footer/Footer';
import './SpecialistPage.scss';
import * as actions from '../../store/actions/index';
import ClinicInfo from '../Patient/Doctor/ClinicInfo';
import SpecialistItem from './SpecialistItem';
import img from '../../assets/doctor.jpg';

class SpecialistPage extends Component {
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
            name: '',

            allDoctorSpecialist: [],
        };
    }

    async componentDidMount() {
        // await this.handleCreateListOfDay(this.props.language);
        this.props.handleGetSpecialist(this.props.match?.params?.id);
        this.props.hanleGetAllDoctorBelongToSpecialist(this.props.match?.params?.id);
    }

    // handleCreateListOfDay(language) {
    //     let arrDate = [];

    //     for (let i = 0; i < 7; i++) {
    //         let obj = {};
    //         language === LANGUAGES.EN
    //             ? (obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM'))
    //             : (obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'));

    //         obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
    //         arrDate.push(obj);
    //     }

    //     this.setState({
    //         choosenDate: arrDate[0],
    //     });

    //     if (arrDate && arrDate.length > 0) {
    //         this.setState({
    //             arrDate: arrDate,
    //         });
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.handleCreateListOfDay(this.props.language);
        }
        if (
            this.props.getAllDoctorBelongToSpecialistRes !== prevProps.getAllDoctorBelongToSpecialistRes &&
            this.props.getAllDoctorBelongToSpecialistRes.data &&
            this.props.getAllDoctorBelongToSpecialistRes.data.length > 0
        ) {
            this.setState({
                allDoctorSpecialist: this.props.getAllDoctorBelongToSpecialistRes.data,
            });
        }

        if (this.props.getSpecialistRes !== prevProps.getSpecialistRes) {
            this.setState({
                contentHTML: this.props.getSpecialistRes?.data?.descriptionHTML,
                name: this.props.getSpecialistRes?.data?.name,
            });
            console.log(this.props.getSpecialistRes);
            console.log(this.state.contentHTML);
        }
    }

    render() {
        return (
            <>
                <HomeHeader />
                <div className="specialist-page ">
                    <div
                        className="specilist-description p-4 mx-5  shadow p-3 mb-4 bg-white rounded row"
                        // dangerouslySetInnerHTML={{ __html: this.state.contentHTML }}
                    >
                        <div className="specialist-name my-3">{this.state.name}</div>
                        <div className=" " dangerouslySetInnerHTML={{ __html: this.state.contentHTML }}></div>
                    </div>
                    {this.state?.allDoctorSpecialist.length > 0 &&
                        this.state.allDoctorSpecialist.map((item) => {
                            return <SpecialistItem allDoctorSpecialist={item} />;
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
        getSpecialistRes: state.admin.getSpecialistRes,
        createBookingRes: state.admin.createBookingRes,
        getAllDoctorBelongToSpecialistRes: state.admin.getAllDoctorBelongToSpecialistRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
        fetchGender: () => dispatch(actions.fetchGender()),
        handleGetSpecialist: (id) => dispatch(actions.handleGetSpecialist(id)),
        handleCreateBooking: (data) => dispatch(actions.handleCreateBooking(data)),
        handleGetDoctorSchedule: (data) => dispatch(actions.handleGetDoctorSchedule(data)),
        hanleGetAllDoctorBelongToSpecialist: (id) => dispatch(actions.hanleGetAllDoctorBelongToSpecialist(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistPage);
