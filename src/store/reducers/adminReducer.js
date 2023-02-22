import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    role: [],
    position: [],
    isloadingGender: false,
    createUserResponse: {},
    users: [],
    deleteResponse: {},
    updateResponse: {},
    topDoctorRes: [],
    allDoctor: [],
    saveDoctorDetailResponse: {},
    getDoctorDetailByIdResponse: {},
    timeSchedule: [],
    saveScheduleRes: {},
    getDailyScheduleRes: {},
    allCodeRes: {},
    createBookingRes: {},
    verifyBookingRes: {},
    saveSpecialistRes: {},
    getAllSpecialistRes: {},
    getSpecialistRes: {},
    getAllDoctorBelongToSpecialistRes: {},
    saveClinicRes: {},
    getAllClinicRes: {},
    getClinicRes: {},
    getAllDoctorBelongToClinicRes: {},
    allBookingRes: {},
    saveBookingStatusRes: {},
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER:
            // console.log('fetch FETCH_GENDER ok!', action);

            return {
                ...state,
                isloadingGender: true,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('fetch FETCH_GENDER_SUCCESS ok!', action);

            return {
                ...state,
                gender: action.data.gender.errCode === 0 ? action.data.gender.data : [],
                role: action.data.role.errCode === 0 ? action.data.role.data : [],
                position: action.data.role.errCode === 0 ? action.data.position.data : [],

                isloadingGender: false,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            // console.log('fetch FETCH_GENDER_FAIL ok!', action);

            return {
                ...state,
                isloadingGender: false,
            };

        /*
            CREATE NEW USER USE REDUX
            
        */

        case actionTypes.FETCH_CREATE_USER:
            // console.log('fetch FETCH_CREATE_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.FETCH_CREATE_USER_SUCCESS:
            // console.log('fetch FETCH_CREATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                createUserResponse: action.data,
            };
        case actionTypes.FETCH_CREATE_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
                createUserResponse: action.data,
            };

        /** GET ALL USER
         *
         *  */

        case actionTypes.FETCH_GET_ALL_USER:
            // console.log('fetch FETCH_GET_ALL_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.FETCH_GET_ALL_USER_SUCCESS:
            // console.log('fetch FETCH_GET_ALL_USER ok!', action);
            return {
                ...state,
                users: action.data.userData,
            };
        case actionTypes.FETCH_GET_ALL_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
            };

        /**
         * DELETE USE
         *
         */

        case actionTypes.DETELE_USER:
            // console.log('fetch FETCH_CREATE_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.DETELE_USER_SUCCESS:
            // console.log('fetch FETCH_CREATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                deleteResponse: action.data,
            };
        case actionTypes.DETELE_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
            };

        /**
         * UPDATE USER
         */

        case actionTypes.UPDATE_USER:
            // console.log('fetch UPDATE_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            // console.log('fetch UPDATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                updateResponse: action.data,
            };
        case actionTypes.UPDATE_USER_FAIL:
            // console.log('fetch UPDATE_USER_FAIL ok!', action);

            return {
                ...state,
                updateResponse: action.data,
            };

        /**
         * GET TOP DOCTOR
         */

        case actionTypes.GET_DOCTOR_TOP:
            return {
                ...state,
            };
        case actionTypes.GET_DOCTOR_TOP_SUCCESS:
            return {
                ...state,
                topDoctorRes: action.data,
            };
        case actionTypes.GET_DOCTOR_TOP_FAIL:
            return {
                ...state,
                topDoctorRes: action.data,
            };

        /**
         * GET ALL DOCTOR
         */

        case actionTypes.GET_ALL_DOCTOR:
            return {
                ...state,
            };
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctor: action.data ? action.data.data : [],
            };
        case actionTypes.GET_ALL_DOCTOR_FAIL:
            return {
                ...state,
                allDoctor: action.data ? action.data.data : [],
            };

        /**
         * CREATE DESCRIPTION
         */
        case actionTypes.SAVE_DOCTOR_DETAIL:
            return {
                ...state,
            };
        case actionTypes.SAVE_DOCTOR_DETAIL_SUCCESS:
            return {
                ...state,
                saveDoctorDetailResponse: action.data,
            };
        case actionTypes.SAVE_DOCTOR_DETAIL_FAIL:
            return {
                ...state,
                saveDoctorDetailResponse: action.data,
            };

        /**
         * GET DOCTOR'S DETAIL BY ID
         */
        case actionTypes.GET_DOTOR_BY_ID:
            // console.log('fetch GET_DOTOR_BY_ID ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_DOTOR_BY_ID_SUCCESS:
            // console.log('fetch GET_DOTOR_BY_ID_SUCCESS ok!', action);
            return {
                ...state,
                getDoctorDetailByIdResponse: action.data,
            };
        case actionTypes.GET_DOTOR_BY_ID_FAIL:
            // console.log('fetch GET_DOTOR_BY_ID_FAIL ok!', action);

            return {
                ...state,
                getDoctorDetailByIdResponse: action.data,
            };

        /**
         * GET SCHEDULE MANAGE
         */
        case actionTypes.GET_SCHEDULE:
            // console.log('fetch GET_SCHEDULE ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_SCHEDULE_SUCCESS:
            // console.log('fetch GET_SCHEDULE_SUCCESS ok!', action);
            return {
                ...state,
                timeSchedule: action.data?.data,
            };
        case actionTypes.GET_SCHEDULE_FAIL:
            // console.log('fetch GET_SCHEDULE_FAIL ok!', action);

            return {
                ...state,
                timeSchedule: action.data?.data,
            };

        /**
         * SAVE SCHEDULE MANAGE
         */
        case actionTypes.SAVE_SCHEDULE:
            // console.log('fetch SAVE_SCHEDULE ok!', action);

            return {
                ...state,
            };
        case actionTypes.SAVE_SCHEDULE_SUCCESS:
            // console.log('fetch SAVE_SCHEDULE_SUCCESS ok!', action);
            return {
                ...state,

                saveScheduleRes: action.data ? action.data : {},
            };
        case actionTypes.SAVE_SCHEDULE_FAIL:
            // console.log('fetch SAVE_SCHEDULE_FAIL ok!', action);
            return {
                ...state,
                saveScheduleRes: action.data ? action.data : {},
            };

        /**
         * GET SCHEDULE
         */
        case actionTypes.GET_DAILY_SCHEDULE:
            // console.log('fetch GET_DAILY_SCHEDULE ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_DAILY_SCHEDULE_SUCCESS:
            // console.log('fetch GET_DAILY_SCHEDULE_SUCCESS ok!', action);
            return {
                ...state,
                getDailyScheduleRes: action.data,
            };
        case actionTypes.GET_DAILY_SCHEDULE_FAIL:
            // console.log('fetch GET_DAILY_SCHEDULE_FAIL ok!', action);
            return {
                ...state,
                getDailyScheduleRes: action.data,
            };

        /**
         * GET ALLCODE
         */
        case actionTypes.ALLCODES_TYPE:
            // console.log('fetch ALLCODES_TYPE ok!', action);

            return {
                ...state,
            };
        case actionTypes.ALLCODES_TYPE_SUCCESS:
            // console.log('fetch ALLCODES_TYPE_SUCCESS ok!', initialState.allCodeRes);
            return {
                ...state,
                allCodeRes: action.data,
            };
        case actionTypes.ALLCODES_TYPE_FAIL:
            // console.log('fetch ALLCODES_TYPE_FAIL ok!', action);
            return {
                ...state,
                allCodeRes: action.data,
            };

        /**
         * CREATE BOOKING
         */
        case actionTypes.CREATE_BOOKING:
            // console.log('fetch CREATE_BOOKING ok!', action);

            return {
                ...state,
            };
        case actionTypes.CREATE_BOOKING_SUCCESS:
            // console.log('fetch CREATE_BOOKING_SUCCESS ok!', action);
            return {
                ...state,
                createBookingRes: action.data,
            };
        case actionTypes.CREATE_BOOKING_FAIL:
            // console.log('fetch CREATE_BOOKING_FAIL ok!', action);
            return {
                ...state,
                createBookingRes: action.data,
            };

        /**
         * CREATE BOOKING
         */
        case actionTypes.VERIFY_BOOKING:
            // console.log('fetch VERIFY_BOOKING ok!', action);

            return {
                ...state,
            };
        case actionTypes.VERIFY_BOOKING_SUCCESS:
            // console.log('fetch VERIFY_BOOKING_SUCCESS ok!', action);
            return {
                ...state,
                verifyBookingRes: action.data,
            };
        case actionTypes.VERIFY_BOOKING_FAIL:
            // console.log('fetch VERIFY_BOOKING_FAIL ok!', action);
            return {
                ...state,
                verifyBookingRes: action.data,
            };

        /**
         *SAVE SPECIALIST
         */
        case actionTypes.SAVE_SPECIALIST:
            // console.log('fetch SAVE_SPECIALIST ok!', action);

            return {
                ...state,
            };
        case actionTypes.SAVE_SPECIALIST_SUCCESS:
            // console.log('fetch SAVE_SPECIALIST_SUCCESS ok!', action);
            return {
                ...state,
                saveSpecialistRes: action.data,
            };
        case actionTypes.SAVE_SPECIALIST_FAIL:
            // console.log('fetch SAVE_SPECIALIST_FAIL ok!', action);
            return {
                ...state,
                saveSpecialistRes: action.data,
            };

        /**
         *GET All SPECIALIST
         */
        case actionTypes.GET_ALL_SPECIALIST:
            // console.log('fetch GET_ALL_SPECIALIST ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_ALL_SPECIALIST_SUCCESS:
            // console.log('fetch GET_ALL_SPECIALIST_SUCCESS ok!', action);
            return {
                ...state,
                getAllSpecialistRes: action.data,
            };
        case actionTypes.GET_ALL_SPECIALIST_FAIL:
            // console.log('fetch GET_ALL_SPECIALIST_FAIL ok!', action);
            return {
                ...state,
                getAllSpecialistRes: action.data,
            };

        /**
         *GET All SPECIALIST
         */
        case actionTypes.GET_SPECIALIST:
            // console.log('fetch GET_SPECIALIST ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_SPECIALIST_SUCCESS:
            // console.log('fetch GET_SPECIALIST_SUCCESS ok!', action);
            return {
                ...state,
                getSpecialistRes: action.data,
            };
        case actionTypes.GET_SPECIALIST_FAIL:
            // console.log('fetch GET_SPECIALIST_FAIL ok!', action);
            return {
                ...state,
                getSpecialistRes: action.data,
            };

        /**
         *GET ALL DOCTOR BELONG TO SPECIALIST
         */
        case actionTypes.GET_ALL_DOCTOR_BELONG_TO_SPECIALIST:
            // console.log('fetch GET_ALL_DOCTOR_BELONG_TO_SPECIALIST ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_ALL_DOCTOR_BELONG_TO_SPECIALIST_SUCCESS:
            // console.log('fetch GET_ALL_DOCTOR_BELONG_TO_SPECIALIST_SUCCESS ok!', action);
            return {
                ...state,
                getAllDoctorBelongToSpecialistRes: action.data,
            };
        case actionTypes.GET_ALL_DOCTOR_BELONG_TO_SPECIALIST_FAIL:
            // console.log('fetch GET_ALL_DOCTOR_BELONG_TO_SPECIALIST_FAIL ok!', action);
            return {
                ...state,
                getAllDoctorBelongToSpecialistRes: action.data,
            };

        /**
         *SAVE_CLINIC
         */
        case actionTypes.SAVE_CLINIC:
            // console.log('fetch SAVE_CLINIC ok!', action);

            return {
                ...state,
            };
        case actionTypes.SAVE_CLINIC_SUCCESS:
            // console.log('fetch SAVE_CLINIC_SUCCESS ok!', action);
            return {
                ...state,
                saveClinicRes: action.data,
            };
        case actionTypes.SAVE_CLINIC_FAIL:
            // console.log('fetch SAVE_CLINIC_FAIL ok!', action);
            return {
                ...state,
                saveClinicRes: action.data,
            };

        /**
         *GET_ALL_CLINIC
         */
        case actionTypes.GET_ALL_CLINIC:
            // console.log('fetch GET_ALL_CLINIC ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_ALL_CLINIC_SUCCESS:
            // console.log('fetch GET_ALL_CLINIC_SUCCESS ok!', action);
            return {
                ...state,
                getAllClinicRes: action.data,
            };
        case actionTypes.GET_ALL_CLINIC_FAIL:
            // console.log('fetch GET_ALL_CLINIC_FAIL ok!', action);
            return {
                ...state,
                getAllClinicRes: action.data,
            };

        /**
         *GET_CLINIC
         */
        case actionTypes.GET_CLINIC:
            // console.log('fetch GET_CLINIC ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_CLINIC_SUCCESS:
            // console.log('fetch GET_CLINIC_SUCCESS ok!', action);
            return {
                ...state,
                getClinicRes: action.data,
            };
        case actionTypes.GET_CLINIC_FAIL:
            // console.log('fetch GET_CLINIC_FAIL ok!', action);
            return {
                ...state,
                getClinicRes: action.data,
            };

        /**
         *GET_ALL_DOCTOR_BELONG_TO_CLINIC
         */
        case actionTypes.GET_ALL_DOCTOR_BELONG_TO_CLINIC:
            // console.log('fetch GET_ALL_DOCTOR_BELONG_TO_CLINIC ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_ALL_DOCTOR_BELONG_TO_CLINIC_SUCCESS:
            // console.log('fetch GET_ALL_DOCTOR_BELONG_TO_CLINIC_SUCCESS ok!', action);
            return {
                ...state,
                getAllDoctorBelongToClinicRes: action.data,
            };
        case actionTypes.GET_ALL_DOCTOR_BELONG_TO_CLINIC_FAIL:
            // console.log('fetch GET_ALL_DOCTOR_BELONG_TO_CLINIC_FAIL ok!', action);
            return {
                ...state,
                getAllDoctorBelongToClinicRes: action.data,
            };

        /**
         *GET_ALL_BOOKING
         */
        case actionTypes.GET_ALL_BOOKING:
            // console.log('fetch GET_ALL_BOOKING ok!', action);

            return {
                ...state,
            };
        case actionTypes.GET_ALL_BOOKING_SUCCESS:
            // console.log('fetch GET_ALL_BOOKING_SUCCESS ok!', action);
            return {
                ...state,
                allBookingRes: action.data,
            };
        case actionTypes.GET_ALL_BOOKING_FAIL:
            // console.log('fetch GET_ALL_BOOKING_FAIL ok!', action);
            return {
                ...state,
                allBookingRes: action.data,
            };

        /**
         *SAVE_BOOKING_STATU
         */
        case actionTypes.SAVE_BOOKING_STATU:
            // console.log('fetch SAVE_BOOKING_STATU ok!', action);

            return {
                ...state,
            };
        case actionTypes.SAVE_BOOKING_STATU_SUCCESS:
            // console.log('fetch SAVE_BOOKING_STATU_SUCCESS ok!', action);
            return {
                ...state,
                saveBookingStatusRes: action.data,
            };
        case actionTypes.SAVE_BOOKING_STATU_FAIL:
            // console.log('fetch SAVE_BOOKING_STATU_FAIL ok!', action);
            return {
                ...state,
                saveBookingStatusRes: action.data,
            };
        default:
            return state;
    }
};

export default adminReducer;
