import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Clinic.scss';

import chuyenkhoamat from '../../../assets/images/chuyen-khoa-mat.jpg';
import cotsong from '../../../assets/images/cot-song.jpg';
import nhikhoa from '../../../assets/images/nhi-khoa.jpg';
import roiloantamthan from '../../../assets/images/roi-loan-tam-than.jpg';
import sanphukhoa from '../../../assets/images/san-phu-khoa.jpg';
import sieuamthai from '../../../assets/images/sieu-am-thai.jpg';
import taimuihong from '../../../assets/images/tai-mui-hong.jpg';
import thankinh from '../../../assets/images/than-kinh.jpg';
import tieuhoa from '../../../assets/images/tieu-hoa.jpg';
import timmach from '../../../assets/images/tim-mach.jpg';
import xuongkhop from '../../../assets/images/xuong-khop.jpg';
import yhoccotruyen from '../../../assets/images/y-hoc-co-truyen.jpg';

import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className="custom-nextArrow text-secondary border-secondary rounded border " onClick={onClick}>
            {' '}
            <i class="fas fa-chevron-right "></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="custom-preArrow text-secondary border-secondary rounded border ">
            <i class="fas fa-chevron-left"></i>
        </div>
    );
}

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = { clinicArr: [] };
    }

    componentDidMount() {
        this.props.handleGetAllClinic(10);
    }
    componentDidUpdate(prevProps) {
        if (this.props.getAllClinicRes !== prevProps.getAllClinicRes) {
            console.log(this.props.getAllClinicRes);
            if (this.props.getAllClinicRes.errCode === 0 && this.props.getAllClinicRes.data.length > 0) {
                this.setState({
                    clinicArr: this.props.getAllClinicRes?.data,
                });
            }
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            cssEase: 'linear',
        };
        console.log(this.state.clinicArr);
        return (
            <div className="bg-light">
                <div className="clinic-carousel m-5 p-5">
                    <div className="carousel-header">
                        <div className="title text-secondary">Cac Chuyen Khoa Pho Bien</div>
                        <div className="more bg-light border border-dark rounded">Xem Them</div>
                    </div>
                    <Slider {...settings}>
                        {this.state.clinicArr.length > 0 &&
                            this.state.clinicArr.map((item, index) => {
                                let specialistImg = item?.image;
                                return (
                                    <div>
                                        <div
                                            className="img-cover"
                                            onClick={() => {
                                                this.props.history.push(`/clinic/${item.id}`);
                                            }}
                                        >
                                            <img src={specialistImg} />
                                            <div className="title text-secondary">{item.name}</div>
                                            <div className="decription"></div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        getAllClinicRes: state.admin.getAllClinicRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { handleGetAllClinic: (data) => dispatch(actions.handleGetAllClinic(data)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
