import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Clinic.scss';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonUtils from '../../../utils/CommonUtils';

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgURL: '',
            contentHTML: '',
            contentMarkDown: '',
            clinicName: '',
            image: '',
            address: '',
            description: '',
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (this.props.saveClinicRes !== prevProps.saveClinicRes) {
            if (this.props.saveClinicRes.errCode === 0) {
                this.notifySuccess('Create clinic successful');
                this.setState({
                    imgURL: '',
                    contentHTML: '',
                    contentMarkDown: '',
                    clinicName: '',
                    image: '',
                    description: '',
                });
            } else {
                this.notifyError('Create clinic fail');
            }
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text,
        });
    };

    notifySuccess(message) {
        toast.success(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    notifyError(message) {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    async handleOnChangeImage(e) {
        if (e.target.files[0]) {
            let imgBase64 = await CommonUtils.convertBase64(e.target.files[0]);
            this.setState({
                imgURL: URL.createObjectURL(e.target.files[0]),
                image: imgBase64,
            });
        }
        // let file = e.target.files[0];
        // let base64 = await CommonUtils.convertBase64(file);
    }

    render() {
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        return (
            <div className="clinic-manage p-2">
                <div className="title p-4">
                    <FormattedMessage id="system.clinic-manage.title" />
                </div>
                <div className="container">
                    <div className="row my-2">
                        <div className="col">
                            <div className="doctor-select col">
                                <label for="clinic-name" className="">
                                    <FormattedMessage id="system.clinic-manage.clinic-name" />
                                </label>

                                <input
                                    type="text"
                                    id="clinic-name"
                                    class="form-control"
                                    // placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => this.setState({ clinicName: e.target.value })}
                                    value={this.state.clinicName}
                                />
                            </div>{' '}
                            <div className="doctor-select col">
                                <label for="clinic-name" className="">
                                    <FormattedMessage id="system.clinic-manage.clinic-address" />
                                </label>

                                <input
                                    type="text"
                                    id="clinic-name"
                                    class="form-control"
                                    // placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => this.setState({ address: e.target.value })}
                                    value={this.state.address}
                                />
                            </div>
                        </div>

                        <div className="clinic-image col">
                            <label
                                htmlFor="inputFileImg"
                                type="button"
                                className="upload bg- col-12 btn btn-outline-secondary"
                            >
                                <span>
                                    <FormattedMessage id="system.clinic-manage.clinic-image" />
                                </span>
                                <input
                                    type="file"
                                    id="inputFileImg"
                                    style={{ display: 'none' }}
                                    onChange={(e) => this.handleOnChangeImage(e)}
                                    accept=".jpg,.png"
                                />
                                <i class="fas fa-upload"></i>
                            </label>
                            <div
                                className=" img-preview"
                                style={{
                                    height: '100px',
                                    // width: '100px',
                                    backgroundImage: `url(${this.state.imgURL})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                }}
                                onClick={() => {
                                    this.state.imgURL && this.setState({ isOpen: true });
                                }}
                            ></div>
                        </div>
                    </div>
                    {/* 
                    <div className=" row my-2">
                        <label for="description" className="">
                            <FormattedMessage id="system.doctor-manage.introductory-information" />
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="border rounded form-control"
                            rows="4"
                            onChange={(e) => {
                                this.setState({ description: e.target.value });
                            }}
                            value={this.state.description}
                        ></textarea>
                    </div> */}
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown}
                    />

                    <div
                        className="clinic-manage-submit btn btn-warning px-2 m-4"
                        onClick={() => {
                            let { contentHTML, contentMarkDown, clinicName, image, description, address } = this.state;
                            this.props.handleSaveClinic({
                                descriptionHTML: contentHTML,
                                descriptionMarkdown: contentMarkDown,
                                name: clinicName,
                                image: image,
                                address: address,
                            });
                        }}
                    >
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        saveClinicRes: state.admin.saveClinicRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { handleSaveClinic: (data) => dispatch(actions.handleSaveClinic(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
