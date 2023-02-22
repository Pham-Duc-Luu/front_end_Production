import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { LANGUAGES } from '../../utils';
import { Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import localization from 'moment/locale/vi';

import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../HomePage/Footer/Footer';
import * as actions from '../../store/actions/index';
import ClinicInfo from '../Patient/Doctor/ClinicInfo';
import { withRouter } from 'react-router';

class ClinicItem extends Component {
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

            allDoctorSpecialist: [],
        };
    }

    async componentDidMount() {
        console.log(this.props.allDoctorSpecialist);
        this.setState({
            allDoctorSpecialist: this.props.allDoctorSpecialist,
            doctorId: this.props.allDoctorSpecialist.doctorId,
        });
        await this.handleCreateListOfDay(this.props.language);
        // this.props.hanleGetAllDoctorBelongToSpecialist(this.props.match?.params?.id);
        await this.props.handleGetDoctorSchedule({
            id: this.props.allDoctorSpecialist.doctorId,
            date: this.state.arrDate[0]?.value,
        });
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
        // if (
        //     this.props.getAllDoctorBelongToSpecialistRes !== prevProps.getAllDoctorBelongToSpecialistRes &&
        //     this.props.getAllDoctorBelongToSpecialistRes.data &&
        //     this.props.getAllDoctorBelongToSpecialistRes.data.length > 0
        // ) {
        //     this.setState({
        //         allDoctorSpecialist: this.props.getAllDoctorBelongToSpecialistRes.data,
        //     });
        // }

        if (
            this.props.getDailyScheduleRes !== prevProps.getDailyScheduleRes &&
            +this.props.getDailyScheduleRes.income.id === +this.state.doctorId
        ) {
            console.log(this.props.getDailyScheduleRes);
            if (this.props.getDailyScheduleRes?.data?.length > 0) {
                this.setState({
                    dailySchedule: this.props.getDailyScheduleRes.data,
                });
            } else {
                this.setState({ dailySchedule: [] });
            }
        }
    }

    render() {
        return (
            <>
                <div className=" clinic-page-item p-4 mx-5  shadow p-3 mb-4 bg-white rounded row ">
                    <div className="clinic-doctor col-8">
                        <div className="doctor-img">
                            <img
                                className="m-5"
                                src={this.state.allDoctorSpecialist?.User?.image}
                                alt="An example image"
                            ></img>
                            <span
                                className="more"
                                onClick={() => {
                                    this.props.history.push(
                                        `/detail-doctor/${+this.props.allDoctorSpecialist.doctorId}`,
                                    );

                                    console.log(this.props.allDoctorSpecialist);
                                }}
                            >
                                Xem them
                            </span>
                        </div>
                        <div className="doctor m-3">
                            <div className="doctor-name">bac sy {this.state.allDoctorSpecialist?.User?.lastName}</div>
                            <div className="doctor-description">
                                {this.state.allDoctorSpecialist?.MarkDown?.description}
                            </div>
                        </div>
                    </div>
                    <div className="clinic-doctor-schedule col-4">
                        <div className="doctor-schedule-date">
                            <ButtonDropdown
                                isOpen={this.state.dropdownOpen}
                                toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}
                            >
                                <DropdownToggle className="px-2" caret>
                                    {this.state.choosenDate?.label?.charAt(0).toUpperCase() +
                                        this.state.choosenDate?.label?.slice(1)}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.arrDate && this.state.arrDate.length > 0
                                        ? this.state.arrDate.map((item, index) => {
                                              return (
                                                  <React.Fragment key={index}>
                                                      {index !== 0 && <DropdownItem divider />}
                                                      <DropdownItem
                                                          onClick={() => {
                                                              this.setState({ choosenDate: item });
                                                              this.props.handleGetDoctorSchedule({
                                                                  id: this.props.allDoctorSpecialist.doctorId,
                                                                  date: item.value,
                                                              });
                                                          }}
                                                      >
                                                          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                                                      </DropdownItem>
                                                  </React.Fragment>
                                              );
                                          })
                                        : ''}
                                </DropdownMenu>
                            </ButtonDropdown>

                            <div className="row clinic-info">
                                <div className="calendar my-4 col">
                                    <div className="booking-title">
                                        <i class="fas fa-calendar-alt"></i>
                                        <span>
                                            <FormattedMessage id="homebanner.doctor-page.schedule" />
                                        </span>
                                    </div>
                                    <ul>
                                        {this.state.dailySchedule.length > 0 ? (
                                            this.state.dailySchedule.map((item, index) => {
                                                // console.log(item);
                                                return (
                                                    <li
                                                        type="button"
                                                        class="btn btn-primary btn-lg"
                                                        onClick={() => {
                                                            // this.toggle(item);
                                                            this.props.history.push(
                                                                `/detail-doctor/${+this.props.allDoctorSpecialist
                                                                    .doctorId}`,
                                                            );

                                                            this.setState({
                                                                patientDate: item.date,
                                                                patientTimeType: item.timeType,
                                                            });
                                                        }}
                                                        key={index}
                                                        className="bg-warning col-1 m-2 p-2"
                                                    >
                                                        {this.props.language === LANGUAGES.EN
                                                            ? item?.timeTypeData?.valueEn
                                                            : item?.timeTypeData?.valueVi}
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <li
                                                type="button"
                                                class="btn btn-primary btn-lg"
                                                className="bg-warning col-1 m-2 p-2"
                                            >
                                                <FormattedMessage id="homebanner.doctor-page.no-schedule" />
                                            </li>
                                        )}
                                    </ul>
                                    {this.state.dailySchedule.length > 0 && (
                                        <div className="m-3">
                                            <i className="fas fa-hand-point-up"></i>
                                            <span>
                                                <FormattedMessage id="homebanner.doctor-page.booking" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ClinicInfo
                                doctorInfo={{
                                    errCode: 0,
                                    data: { Doctor_infor: this.state.allDoctorSpecialist },
                                }}
                            />
                        </div>
                        <div className="doctor-price"></div>
                    </div>
                </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
        fetchGender: () => dispatch(actions.fetchGender()),
        handleCreateBooking: (data) => dispatch(actions.handleCreateBooking(data)),
        handleGetDoctorSchedule: (data) => dispatch(actions.handleGetDoctorSchedule(data)),
        hanleGetAllDoctorBelongToSpecialist: (id) => dispatch(actions.hanleGetAllDoctorBelongToSpecialist(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClinicItem));
