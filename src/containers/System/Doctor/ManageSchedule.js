import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { FormattedMessage } from 'react-intl';
import actionTypes from '../../../store/actions/actionTypes';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { dateFormat } from '../../../utils';
import { toast } from 'react-toastify';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            currentDate: '',
            selectedOption: {},
            doctorList: [],
            timeList: [],
            isDisabled: false,
            allBooking: [],
            language: '',
        };
    }

    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getSchedule();
        if (this.props.userInfo.roleId === 'R2') this.setState({ isDisabled: true });
        this.props.getAllBooking(this.props.userInfo.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctor !== prevProps.allDoctor) {
            let selectedOption;
            this.setState({
                doctorList: this.props.allDoctor.map((value, index) => {
                    if (value.id === this.props.userInfo.id) {
                        // console.log(value);
                        selectedOption = { value: value, label: `${value.firstName} ${value.lastName}` };
                    }
                    return { value: value, label: `${value.firstName} ${value.lastName}` };
                }),
            });
            this.setState({ selectedOption });
        }

        if (this.props.timeSchedule !== prevProps.timeSchedule) {
            if (this.props.timeSchedule && this.props.timeSchedule.length > 0) {
                let timeList = this.props.timeSchedule.map((item) => {
                    return { ...item, isSelected: false };
                });
                this.setState({ timeList: timeList });
            }
        }

        if (this.props.saveScheduleRes !== prevProps.saveScheduleRes) {
        }

        if (this.props.language !== prevProps.language) {
            this.setState({ language: this.props.language });
        }
        if (this.props.allBookingRes !== prevProps.allBookingRes) {
            this.setState({ allBooking: this.props.allBookingRes.data });
        }

        if (this.props.saveBookingStatusRes !== prevProps.saveBookingStatusRes) {
            console.log(123);
            this.props.getAllBooking({
                id: this.props.userInfo.id,
                date: this.state.currentDate,
            });
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption, doctorId: selectedOption.value.id }, () => {
            // console.log(this.state);
        });
        this.props.getDoctorDetailById(selectedOption.value.id);
        // console.log(selectedOption.value.id);
    };

    handleOnChageDatePicker = (date) => {
        // this.setState({ currentDate: moment(date[0]).format(dateFormat.SEND_TO_SERVER) });

        this.setState({ currentDate: new Date(date[0]).getTime() });
        // console.log(this.state.currentDate);
        this.props.getAllBooking({
            id: this.props.userInfo.id,
            date: this.state.currentDate,
        });
    };

    handleOnSubmit = () => {
        let { doctorId, selectedOption, currentDate } = this.state;
        let submitTime = this.state.timeList
            .filter((time) => time.isSelected)
            .map((time) => {
                return { timeType: time.keyMap, doctorId, date: currentDate };
            });

        if (doctorId && currentDate && submitTime.length > 0) {
            toast.success('successful');
            this.props.saveDoctorSchedule(submitTime);
        } else {
            toast.error('error');
        }
        // console.log(submitTime);
    };
    render() {
        return (
            <div className="manage-schedule">
                <div className="container">
                    <div className="title m-4 ">Quan li lich kham benh </div>
                    <div className="row my-4">
                        <div className="doctor col ">
                            <label>Chon bac sy</label>
                            <Select
                                value={this.state.selectedOption}
                                isDisabled={this.state.isDisabled}
                                onChange={this.handleChange}
                                options={this.state.doctorList}
                            />
                        </div>
                        <div className="day col">
                            <label>Chon bac sy</label>
                            <DatePicker
                                onChange={this.handleOnChageDatePicker}
                                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                    </div>

                    {!this.state.isDisabled && (
                        <>
                            <div className="time m-4">
                                {this.state.timeList &&
                                    this.state.timeList.length > 0 &&
                                    this.state.timeList.map((time, index, arr) => {
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`btn ${
                                                    time.isSelected ? ' btn-warning' : 'btn-light'
                                                } mx-2 px-2`}
                                                onClick={() => {
                                                    time.isSelected = !time.isSelected;
                                                    this.setState({
                                                        timeList: arr,
                                                    });
                                                }}
                                            >
                                                {this.props.language === 'en' ? time.valueEn : time.valueVi}
                                            </button>
                                        );
                                    })}
                            </div>
                            <button
                                type="button"
                                class=" m-4 btn btn-primary mx-2 px-2"
                                onClick={() => this.handleOnSubmit()}
                            >
                                Submit
                            </button>
                        </>
                    )}

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Thoi gian</th>
                                <th scope="col">Ho va ten</th>
                                <th scope="col">status</th>

                                <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allBooking?.length > 0 &&
                                this.state.allBooking.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                {this.state.language === 'vi'
                                                    ? item?.time?.valueEn
                                                    : item?.time?.valueVi}
                                            </td>
                                            <td>{item?.User?.email}</td>
                                            <td>
                                                {this.state.language === 'vi'
                                                    ? item?.status?.valueEn
                                                    : item?.status?.valueVi}
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    class="btn btn-warning px-2 "
                                                    onClick={() => {
                                                        this.props.saveBookingStatu({ id: item.id, statu: 'S3' });
                                                    }}
                                                >
                                                    Đã khám
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-danger px-2 mx-2"
                                                    onClick={() => {
                                                        this.props.saveBookingStatu({ id: item.id, statu: 'S4' });
                                                    }}
                                                >
                                                    Hủy khám
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        timeSchedule: state.admin.timeSchedule,
        saveScheduleRes: state.admin.saveScheduleRes,
        allBookingRes: state.admin.allBookingRes,
        saveBookingStatusRes: state.admin.saveBookingStatusRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
        getSchedule: () => dispatch(actions.getSchedule()),
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
        saveDoctorSchedule: (data) => dispatch(actions.saveDoctorSchedule(data)),
        getAllBooking: (id) => dispatch(actions.getAllBooking(id)),
        saveBookingStatu: (data) => dispatch(actions.saveBookingStatu(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
