import actionTypes from './actionTypes';
import {
    handleGetAllCode,
    handleCreateNewUser,
    handleGetUserInfo,
    handleDeleteUser,
    handleUpdateUser,
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleSaveDoctorDetail,
    handleGetDoctorDetailById,
    handleSavedoctorSchedule,
} from '../../services/index';

import * as userServices from '../../services/userService';

/**
 * GET GENDEE
 *
 */
export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER });
            let data = {
                gender: await handleGetAllCode('GENDER'),
                role: await handleGetAllCode('ROLE'),
                position: await handleGetAllCode('POSITION'),
            };

            // console.log(data);
            if (data && data.errCode !== 0) {
                dispatch(fetchGenderSuccess(data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
        }
    };
};

export const fetchGenderSuccess = (data) => {
    return { type: actionTypes.FETCH_GENDER_SUCCESS, data: data };
};
export const fetchGenderFail = () => {
    return { type: actionTypes.FETCH_GENDER_FAIL };
};

/**
 * CREATE USER
 *
 *
 */

export const fetchCreateUser = (data) => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CREATE_USER, data: {} });
            let fetchData = await handleCreateNewUser(data);

            if (fetchData && fetchData.errCode === 0) {
                dispatch(fetchCreateUserSuccess(fetchData));
                // fetchGetAllUser();
            } else {
                dispatch(fetchCreateUserFail(fetchData));
            }
        } catch (e) {
            dispatch(fetchCreateUserFail(e));
        }
    };
};

export const fetchCreateUserSuccess = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_SUCCESS, data };
};

export const fetchCreateUserFail = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_FAIL, data };
};

/**
 * GET ALL USER
 *
 *
 */

export const fetchGetAllUser = () => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GET_ALL_USER, data: [] });
            let fetchData = await handleGetUserInfo('all');
            if (fetchData && fetchData.errCode === 0) {
                dispatch(fetchGetAllUserSuccess(fetchData));
            } else {
                dispatch(fetchGetAllUserFail(fetchData));
            }
        } catch (e) {
            dispatch(fetchGetAllUserFail(e));
        }
    };
};

export const fetchGetAllUserSuccess = (data) => {
    return { type: actionTypes.FETCH_GET_ALL_USER_SUCCESS, data };
};

export const fetchGetAllUserFail = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_FAIL, data };
};

/**
 * DELETE USER
 *
 */

export const deleteUser = (id) => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DETELE_USER });
            let response = await handleDeleteUser(id);
            if (response && response.errCode === 0) {
                dispatch(deleteUserSuccess(response));
            } else {
                dispatch(deleteUserFail(response));
            }
        } catch (e) {
            dispatch(deleteUserFail(e));
        }
    };
};

export const deleteUserSuccess = (data) => {
    return { type: actionTypes.DETELE_USER_SUCCESS, data };
};

export const deleteUserFail = (data) => {
    return { type: actionTypes.DETELE_USER_FAIL, data };
};

/**
 * UPDATE USER
 */

export const fetchUpdateUser = (data) => {
    console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPDATE_USER, data: {} });
            let response = await handleUpdateUser(data);
            if (response && response.errCode === 0) {
                dispatch(fetchUpdateUserSuccess(response));
            } else {
                dispatch(fetchUpdateUserFail(response));
            }
        } catch (e) {
            dispatch(deleteUserFail(e));
        }
    };
};

export const fetchUpdateUserSuccess = (data) => {
    return { type: actionTypes.UPDATE_USER_SUCCESS, data };
};

export const fetchUpdateUserFail = (data) => {
    return { type: actionTypes.UPDATE_USER_FAIL, data };
};

/**
 * GET TOP 10 DOCTOR
 */

export const getTopdoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_TOP, data: {} });
            let response = await handleGetTopDoctor(limit);
            // console.log('get top doctor', response);
            if (response && response.errCode === 0) {
                dispatch(getTopdoctorSuccess(response));
            } else {
                dispatch(getTopdoctorFail(response));
            }
        } catch (e) {
            dispatch(getTopdoctorFail());
        }
    };
};

export const getTopdoctorSuccess = (data) => {
    return { type: actionTypes.GET_DOCTOR_TOP_SUCCESS, data };
};

export const getTopdoctorFail = (data) => {
    return { type: actionTypes.GET_DOCTOR_TOP_FAIL, data };
};

/**
 * GET ALL DOCTOR
 */

export const getAllDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_DOCTOR, data: {} });
            let response = await handleGetAllDoctor();
            // console.log('get top doctor', response);
            if (response && response.errCode === 0) {
                dispatch(getAllDoctorSuccess(response));
            } else {
                dispatch(getAllDoctorFail(response));
            }
        } catch (e) {
            dispatch(getAllDoctorFail());
        }
    };
};

export const getAllDoctorSuccess = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_SUCCESS, data };
};

export const getAllDoctorFail = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_FAIL, data };
};

/**
 * CREATE DESCRIPTIONS
 */

export const saveDoctorDetail = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_DOCTOR_DETAIL, data: {} });
            let response = await handleSaveDoctorDetail(data);
            // console.log('get top doctor', response);
            if (response && response.errCode === 0) {
                dispatch(saveDoctorDetailSuccess(response));
            } else {
                dispatch(saveDoctorDetailFail(response));
            }
        } catch (e) {
            dispatch(saveDoctorDetailFail());
        }
    };
};

export const saveDoctorDetailSuccess = (data) => {
    return { type: actionTypes.SAVE_DOCTOR_DETAIL_SUCCESS, data };
};

export const saveDoctorDetailFail = (data) => {
    return { type: actionTypes.SAVE_DOCTOR_DETAIL_FAIL, data };
};

/**
 * GET DOCTOR BY ID
 */

export const getDoctorDetailById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOTOR_BY_ID, data: {} });
            let response = await handleGetDoctorDetailById(id);
            if (response && response.errCode === 0) {
                dispatch(getDoctorDetailByIdSuccess(response));
            } else {
                dispatch(getDoctorDetailByIdFail(response));
            }
        } catch (e) {
            dispatch(getDoctorDetailByIdFail());
        }
    };
};

export const getDoctorDetailByIdSuccess = (data) => {
    return { type: actionTypes.GET_DOTOR_BY_ID_SUCCESS, data };
};

export const getDoctorDetailByIdFail = (data) => {
    return { type: actionTypes.GET_DOTOR_BY_ID_FAIL, data };
};

/**
 * GET DOCTOR BY ID
 */

export const getSchedule = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_SCHEDULE, data: {} });
            let response = await handleGetAllCode('TIME');
            if (response && response.errCode === 0) {
                dispatch(getScheduleSuccess(response));
            } else {
                dispatch(getScheduleFail(response));
            }
        } catch (e) {
            dispatch(getScheduleFail());
        }
    };
};

export const getScheduleSuccess = (data) => {
    return { type: actionTypes.GET_SCHEDULE_SUCCESS, data };
};

export const getScheduleFail = (data) => {
    return { type: actionTypes.GET_SCHEDULE_FAIL, data };
};

/**
 * SAVE MANAGE SCHEDULE
 */

export const saveDoctorSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_SCHEDULE, data: {} });
            let response = await handleSavedoctorSchedule(data);
            if (response && response.errCode === 0) {
                dispatch(saveDoctorScheduleSuccess(response));
            } else {
                dispatch(saveDoctorScheduleFail(response));
            }
        } catch (e) {
            dispatch(saveDoctorScheduleFail());
        }
    };
};

export const saveDoctorScheduleSuccess = (data) => {
    return { type: actionTypes.SAVE_SCHEDULE_SUCCESS, data };
};

export const saveDoctorScheduleFail = (data) => {
    return { type: actionTypes.SAVE_SCHEDULE_FAIL, data };
};

/**
 * GET DOCTOR SCHEDULE
 */

export const handleGetDoctorSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DAILY_SCHEDULE, data: {} });
            let response = await userServices.handleGetDoctorScheduleById(data);
            if (response && response.errCode === 0) {
                dispatch(handleGetDoctorScheduleSuccess(response));
            } else {
                dispatch(handleGetDoctorScheduleFail(response));
            }
        } catch (e) {
            dispatch(handleGetDoctorScheduleFail());
        }
    };
};

export const handleGetDoctorScheduleSuccess = (data) => {
    return { type: actionTypes.GET_DAILY_SCHEDULE_SUCCESS, data };
};

export const handleGetDoctorScheduleFail = (data) => {
    return { type: actionTypes.GET_DAILY_SCHEDULE_FAIL, data };
};

/**
 * GET SELECTION ITEM
 */

export const handleGetTypeBykey = (key) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.ALLCODES_TYPE, data: {} });
            let response = await userServices.handleGetAllCode(key);
            if (response && response.errCode === 0) {
                dispatch(handleGetTypeBykeySuccess({ ...response, key }));
            } else {
                dispatch(handleGetTypeBykeyFail({ ...response, key }));
            }
        } catch (e) {
            dispatch(handleGetTypeBykeyFail());
        }
    };
};

export const handleGetTypeBykeySuccess = (data) => {
    return { type: actionTypes.ALLCODES_TYPE_SUCCESS, data };
};

export const handleGetTypeBykeyFail = (data) => {
    return { type: actionTypes.ALLCODES_TYPE_FAIL, data };
};

/**
 * HANDLE CREATE BOOKING
 */

export const handleCreateBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_BOOKING, data: {} });
            let response = await userServices.handleCreateBooking(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleCreateBookingSuccess({ ...response }));
            } else {
                dispatch(handleCreateBookingFail({ ...response }));
            }
        } catch (e) {
            console.log(123);
            dispatch(handleCreateBookingFail());
        }
    };
};

export const handleCreateBookingSuccess = (data) => {
    return { type: actionTypes.CREATE_BOOKING_SUCCESS, data };
};

export const handleCreateBookingFail = (data) => {
    return { type: actionTypes.CREATE_BOOKING_FAIL, data };
};

/**
 * HANDLE CREATE BOOKING
 */

export const handleVerifyBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.VERIFY_BOOKING, data: {} });
            let response = await userServices.handleVerifyBooking(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleVerifyBookingSuccess({ ...response }));
            } else {
                dispatch(handleVerifyBookingFail({ ...response }));
            }
        } catch (e) {
            console.log(123);
            dispatch(handleVerifyBookingFail());
        }
    };
};

export const handleVerifyBookingSuccess = (data) => {
    return { type: actionTypes.VERIFY_BOOKING_SUCCESS, data };
};

export const handleVerifyBookingFail = (data) => {
    return { type: actionTypes.VERIFY_BOOKING_FAIL, data };
};

/**
 * SAVE SPECIALIST
 */

export const handleSaveSpecialist = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_SPECIALIST, data: {} });
            let response = await userServices.handleSaveSpecialist(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleSaveSpecialistSuccess({ ...response }));
            } else {
                dispatch(handleSaveSpecialistFail({ ...response }));
            }
        } catch (e) {
            console.log(123);
            dispatch(handleSaveSpecialistFail());
        }
    };
};

export const handleSaveSpecialistSuccess = (data) => {
    return { type: actionTypes.SAVE_SPECIALIST_SUCCESS, data };
};

export const handleSaveSpecialistFail = (data) => {
    return { type: actionTypes.SAVE_SPECIALIST_FAIL, data };
};

/**
 * SAVE SPECIALIST
 */

export const handleGetAllSpecialist = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_SPECIALIST, data: {} });
            let response = await userServices.handleGetAllSpecialist(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleGetAllSpecialistSuccess({ ...response }));
            } else {
                dispatch(handleGetAllSpecialistFail({ ...response }));
            }
        } catch (e) {
            console.log(123);
            dispatch(handleGetAllSpecialistFail());
        }
    };
};

export const handleGetAllSpecialistSuccess = (data) => {
    return { type: actionTypes.GET_ALL_SPECIALIST_SUCCESS, data };
};

export const handleGetAllSpecialistFail = (data) => {
    return { type: actionTypes.GET_ALL_SPECIALIST_FAIL, data };
};

/**
 * GET_SPECIALIST
 */

export const handleGetSpecialist = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_SPECIALIST, data: {} });
            let response = await userServices.handleGetSpecialist(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleGetSpecialistSuccess({ ...response }));
            } else {
                dispatch(handleGetSpecialistFail({ ...response }));
            }
        } catch (e) {
            console.log(123);
            dispatch(handleGetSpecialistFail());
        }
    };
};

export const handleGetSpecialistSuccess = (data) => {
    return { type: actionTypes.GET_SPECIALIST_SUCCESS, data };
};

export const handleGetSpecialistFail = (data) => {
    return { type: actionTypes.GET_SPECIALIST_FAIL, data };
};

/**
 *     // GET ALL DOCTOR BELONG TO SPECIALIST

 */

export const hanleGetAllDoctorBelongToSpecialist = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_DOCTOR_BELONG_TO_SPECIALIST, data: {} });
            let response = await userServices.hanleGetAllDoctorBelongToSpecialist(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(hanleGetAllDoctorBelongToSpecialistSuccess({ ...response }));
            } else {
                dispatch(hanleGetAllDoctorBelongToSpecialistFail({ ...response }));
            }
        } catch (e) {
            dispatch(hanleGetAllDoctorBelongToSpecialistFail());
        }
    };
};

export const hanleGetAllDoctorBelongToSpecialistSuccess = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_BELONG_TO_SPECIALIST_SUCCESS, data };
};

export const hanleGetAllDoctorBelongToSpecialistFail = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_BELONG_TO_SPECIALIST_FAIL, data };
};

/**
 *     SAVE_CLINIC
 */

export const handleSaveClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_CLINIC, data: {} });
            let response = await userServices.handleSaveClinic(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleSaveClinicSuccess({ ...response }));
            } else {
                dispatch(handleSaveClinicFail({ ...response }));
            }
        } catch (e) {
            dispatch(handleSaveClinicFail(e));
        }
    };
};

export const handleSaveClinicSuccess = (data) => {
    return { type: actionTypes.SAVE_CLINIC_SUCCESS, data };
};

export const handleSaveClinicFail = (data) => {
    return { type: actionTypes.SAVE_CLINIC_FAIl, data };
};

/**
 *     GET_ALL_CLINIC
 */

export const handleGetAllClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_CLINIC, data: {} });
            let response = await userServices.handleGetAllClinic(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(handleGetAllClinicSuccess({ ...response }));
            } else {
                dispatch(handleGetAllClinicFail({ ...response }));
            }
        } catch (e) {
            dispatch(handleGetAllClinicFail(e));
        }
    };
};

export const handleGetAllClinicSuccess = (data) => {
    return { type: actionTypes.GET_ALL_CLINIC_SUCCESS, data };
};

export const handleGetAllClinicFail = (data) => {
    return { type: actionTypes.GET_ALL_CLINIC_FAIL, data };
};

/**
 *     GET_CLINIC
 */

export const getClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_CLINIC, data: {} });
            let response = await userServices.getClinic(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(getClinicSuccess({ ...response }));
            } else {
                dispatch(getClinicFail({ ...response }));
            }
        } catch (e) {
            dispatch(getClinicFail(e));
        }
    };
};

export const getClinicSuccess = (data) => {
    return { type: actionTypes.GET_CLINIC_SUCCESS, data };
};

export const getClinicFail = (data) => {
    return { type: actionTypes.GET_CLINIC_FAIL, data };
};

/**
 *     GET_ALL_DOCTOR_BELONG_TO_CLINIC
 */

export const getAllDoctorBelongToClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_DOCTOR_BELONG_TO_CLINIC, data: {} });
            let response = await userServices.getAllDoctorBelongToClinic(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(getAllDoctorBelongToClinicSuccess({ ...response }));
            } else {
                dispatch(getAllDoctorBelongToClinicFail({ ...response }));
            }
        } catch (e) {
            dispatch(getAllDoctorBelongToClinicFail(e));
        }
    };
};

export const getAllDoctorBelongToClinicSuccess = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_BELONG_TO_CLINIC_SUCCESS, data };
};

export const getAllDoctorBelongToClinicFail = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_BELONG_TO_CLINIC_FAIL, data };
};

/**
 *     GET_ALL_BOOKING
 */

export const getAllBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_BOOKING, data: {} });
            let response = await userServices.getAllBooking(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(getAllBookingSuccess({ ...response }));
            } else {
                dispatch(getAllBookingFail({ ...response }));
            }
        } catch (e) {
            dispatch(getAllBookingFail(e));
        }
    };
};

export const getAllBookingSuccess = (data) => {
    return { type: actionTypes.GET_ALL_BOOKING_SUCCESS, data };
};

export const getAllBookingFail = (data) => {
    return { type: actionTypes.GET_ALL_BOOKING_FAIL, data };
};

/**
 *     SAVE_BOOKING_STATU
 */

export const saveBookingStatu = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_BOOKING_STATU, data: {} });
            let response = await userServices.saveBookingStatu(data);
            // console.log(response);
            if (response && response.errCode === 0) {
                dispatch(saveBookingStatuSuccess({ ...response }));
            } else {
                dispatch(saveBookingStatuFail({ ...response }));
            }
        } catch (e) {
            dispatch(saveBookingStatuFail(e));
        }
    };
};

export const saveBookingStatuSuccess = (data) => {
    return { type: actionTypes.SAVE_BOOKING_STATU_SUCCESS, data };
};

export const saveBookingStatuFail = (data) => {
    return { type: actionTypes.SAVE_BOOKING_STATU_FAIL, data };
};
