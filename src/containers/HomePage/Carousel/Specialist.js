import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Specialist.scss';

import { FormattedMessage } from 'react-intl';

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

class Specialist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialistArr: [],
        };
    }
    componentDidMount() {
        this.props.handleGetAllSpecialist(8);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getAllSpecialistRes !== this.props.getAllSpecialistRes) {
            this.setState({
                specialistArr: this.props.getAllSpecialistRes?.data,
            });
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
        };

        return (
            <div className="specailist-carousel m-5 p-5">
                <div className="carousel-header">
                    <div className="title text-secondary">
                        {<FormattedMessage id="homebanner.Specialist.main-title" />}
                    </div>
                    <div className="more bg-light border border-dark rounded">
                        {<FormattedMessage id="homebanner.more" />}
                    </div>
                </div>
                <Slider {...settings}>
                    {' '}
                    {Array.isArray(this.state.specialistArr) &&
                        this.state.specialistArr.map((item, index) => {
                            let specialistImg = item?.image;

                            return (
                                <div>
                                    <div
                                        className="img-cover"
                                        onClick={() => {
                                            this.props.history.push(`/specialist/${item.id}`);
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        getAllSpecialistRes: state.admin.getAllSpecialistRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { handleGetAllSpecialist: (limit) => dispatch(actions.handleGetAllSpecialist(limit)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialist));
