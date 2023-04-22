"use strict";
(self["webpackChunkbooking_calendar_2"] = self["webpackChunkbooking_calendar_2"] || []).push([["src_components_Report_js"],{

/***/ "./src/components/Report.js":
/*!**********************************!*\
  !*** ./src/components/Report.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom/API */ "./src/components/custom/API.js");
/* harmony import */ var _custom_GenField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom/GenField */ "./src/components/custom/GenField.js");
/* harmony import */ var _custom_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom/Spinner */ "./src/components/custom/Spinner.js");
/* harmony import */ var react_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-csv */ "./node_modules/react-csv/index.js");






class Report extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: '',
      dateTo: '',
      status: '',
      customer: '',
      customers: {},
      statusList: [],
      showLoding: false,
      CSVDownload: '',
      errMsg: '',
      fileName: 'Online Booking - ' + new Date().getTime()
    };
    this.setFieldValue = this.setFieldValue.bind(this);
    this.formSubmitHandle = this.formSubmitHandle.bind(this);
  }
  setFieldValue(field, value) {
    this.setState({
      [field]: value
    });
  }
  formSubmitHandle(e) {
    e.preventDefault();
    let dateFrom = null;
    let dateTo = null;
    if (this.state.dateFrom) {
      let yr = this.state.dateFrom.getFullYear();
      let mo = this.state.dateFrom.getMonth() + 1;
      let day = this.state.dateFrom.getDate();
      dateFrom = yr + '-' + mo + '-' + day;
    }
    if (this.state.dateTo) {
      let yr = this.state.dateTo.getFullYear();
      let mo = this.state.dateTo.getMonth() + 1;
      let day = this.state.dateTo.getDate();
      dateTo = yr + '-' + mo + '-' + day;
    }
    const formParams = {
      date_from: dateFrom,
      date_to: dateTo,
      status: this.state.status,
      customer: this.state.customer
    };
    this.setState({
      showLoding: true,
      CSVDownload: ''
    });
    _custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].post('wpcb/report_data', formParams).then(res => {
      const headers = res.data.headers;
      const data = res.data.data;
      if (Object.values(data).length) {
        this.setState({
          errMsg: '',
          successMsg: Object.values(data).length + ' record(s) found.',
          CSVDownload: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_csv__WEBPACK_IMPORTED_MODULE_5__.CSVDownload, {
            headers: Object.values(headers),
            data: Object.values(data),
            filename: this.state.fileName
          })
        });
      } else {
        this.setState({
          successMsg: '',
          errMsg: 'No record(s) found.'
        });
      }
      this.setState({
        showLoding: false
      });
    }).catch(err => {
      console.log('Error in getting report data');
      console.log(err);
      this.setState({
        showLoding: false,
        errMsg: 'Something went wrong',
        successMsg: ''
      });
    });
  }
  componentDidMount() {
    this.setState({
      showLoding: true
    });
    Promise.all([_custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].get('wpcb/customers'), _custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].get('wpcb/customer_field'), _custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].get('wpcb/status_list')]).then(res => {
      const customerData = res[0].data.bookings;
      const field = res[1].data;
      const statusList = res[2].data;
      let customers = [];
      for (let _data of Object.values(customerData)) {
        customers.push(_data[field.key]);
      }
      this.setState({
        customers,
        statusList,
        showLoding: false
      });
    }).catch(err => {
      console.log('Error in retrieving of customers');
      console.log(err);
      this.setState({
        showLoding: true
      });
    });
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, this.state.CSVDownload, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isVisible: this.state.showLoding
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: 'alert alert-danger ' + (this.state.errMsg ? '' : 'd-none')
    }, this.state.errMsg), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: 'alert alert-success ' + (this.state.successMsg ? '' : 'd-none')
    }, this.state.successMsg), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "h4"
    }, "Generate Report"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
      onSubmit: this.formSubmitHandle
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card card-body border-0 shadow"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "row mb-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12 col-md-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "form-label"
    }, "From: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_GenField__WEBPACK_IMPORTED_MODULE_3__["default"], {
      field: {
        type: 'date',
        key: 'dateFrom',
        value: this.state.dateFrom,
        class: 'form-control',
        required: true
      },
      setFieldValue: this.setFieldValue
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12 col-md-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "form-label"
    }, "To:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_GenField__WEBPACK_IMPORTED_MODULE_3__["default"], {
      field: {
        type: 'date',
        key: 'dateTo',
        value: this.state.dateTo,
        class: 'form-control'
      },
      setFieldValue: this.setFieldValue
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mb-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "form-label"
    }, "Status:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_GenField__WEBPACK_IMPORTED_MODULE_3__["default"], {
      field: {
        type: 'select',
        key: 'status',
        value: this.state.status,
        class: 'form-select',
        options: this.state.statusList
      },
      setFieldValue: this.setFieldValue
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mb-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "form-label"
    }, "Customer:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_GenField__WEBPACK_IMPORTED_MODULE_3__["default"], {
      field: {
        type: 'select',
        key: 'customer',
        value: this.state.customer,
        class: 'form-select',
        options: this.state.customers
      },
      setFieldValue: this.setFieldValue
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mt-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "submit",
      className: "btn btn-primary"
    }, "Generate"))))));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Report);

/***/ })

}]);
//# sourceMappingURL=src_components_Report_js.js.map