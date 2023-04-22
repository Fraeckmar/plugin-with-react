"use strict";
(self["webpackChunkbooking_calendar_2"] = self["webpackChunkbooking_calendar_2"] || []).push([["src_components_BookingPost_js"],{

/***/ "./src/components/BookedDates.js":
/*!***************************************!*\
  !*** ./src/components/BookedDates.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_Date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom/Date */ "./src/components/custom/Date.js");



class BookedDates extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
  constructor(props) {
    super(props);
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'card xw-100 p-0 border-0 shadow ' + (this.props.bookId ? '' : 'd-none')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "card-header border-0"
    }, " Booking Details "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card-body p-0"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      className: "table m-0 table-bordered"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "border-bottom-0 px-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Selected Date(s)")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "border-bottom-0 px-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "m-0 ps-2 list-disc"
    }, Object.keys(this.props.bookedDates)?.map((_date, idx) => {
      let mo = parseFloat(_date.split('-')[1]) - 1;
      let day = _date.split('-')[2];
      let monthName = _custom_Date__WEBPACK_IMPORTED_MODULE_2__["default"].monthNames[mo];
      if (this.props.rateType == 'default') {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
          key: idx
        }, monthName, " ", day);
      }
    })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      className: this.props.rateType == 'default' ? 'd-none' : ''
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: " px-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Total")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: " px-3"
    }))))));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (BookedDates);

/***/ }),

/***/ "./src/components/BookingPost.js":
/*!***************************************!*\
  !*** ./src/components/BookingPost.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _custom_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom/API */ "./src/components/custom/API.js");
/* harmony import */ var _custom_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom/Spinner */ "./src/components/custom/Spinner.js");
/* harmony import */ var _forms_BookingForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms/BookingForm */ "./src/components/forms/BookingForm.js");
/* harmony import */ var _forms_SidebarRightForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forms/SidebarRightForm */ "./src/components/forms/SidebarRightForm.js");
/* harmony import */ var _BookedDates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BookedDates */ "./src/components/BookedDates.js");
/* harmony import */ var _custom_Calendar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/Calendar */ "./src/components/custom/Calendar.js");
/* harmony import */ var _custom_GenField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./custom/GenField */ "./src/components/custom/GenField.js");
/* harmony import */ var _custom_legend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./custom/legend */ "./src/components/custom/legend.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");












const BookingPost = () => {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useParams)();
  const bookId = id !== null && id !== void 0 ? id : '';
  const apiUrl = document.getElementById('wpcb_site_url').value + '/wp-json/';
  const userId = document.getElementById('wpcb_current_user').value;
  const state = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
  const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [spinnerVisible, setSpinnerVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [formValues, setFormValues] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [formDisplay, setFormDisplay] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('d-none');
  const [calendarId, setCalendarId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [selectedDates, setSelectedDates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [bookedDates, setBookedDates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [rateType, setRateType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('default');
  const [calendars, setCalendars] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [refreshCalendar, setRefreshCalendar] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [doneLoads, setDoneLoads] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    calendar: false,
    post: false
  });
  const dateClickHandle = () => {
    if (!calendarId) {
      react_notifications__WEBPACK_IMPORTED_MODULE_10__.NotificationManager.error('Please choose calendar first.');
    }
    return calendarId;
  };
  const setFormFieldValues = attFormValues => {
    let newFormValues = formValues;
    for (let key in attFormValues) {
      newFormValues[key] = attFormValues[key];
    }
    setFormValues(newFormValues);
  };
  const submitHandle = e => {
    e.preventDefault();
    if (!selectedDates.length) {
      react_notifications__WEBPACK_IMPORTED_MODULE_10__.NotificationManager.error('No selected date.');
      return;
    }
    let data = {
      user_id: userId,
      calendar_id: calendarId,
      booking_id: bookId,
      action: bookId ? 'edit' : 'new',
      post_title: title,
      fields: formValues,
      selected_dates: selectedDates
    };
    setSpinnerVisible(true);
    _custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].post('wpcb/update_booking_post', data).then(res => {
      let data = res.data;
      react_notifications__WEBPACK_IMPORTED_MODULE_10__.NotificationManager.success(data.message);
      setSpinnerVisible(false);
      setRefreshCalendar(true);
      getBookingData();
      if (!bookId) {
        clearFieldValues();
      }
    }).catch(err => {
      console.log('Error in saving book post');
      console.log(err);
      react_notifications__WEBPACK_IMPORTED_MODULE_10__.NotificationManager.error(err.response.data.message);
      setSpinnerVisible(false);
    });
  };
  const doneLoadData = function (type) {
    let isDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let newDoneLoads = doneLoads;
    newDoneLoads[type] = isDone;
    let allDone = true;
    for (let _type in newDoneLoads) {
      if (!newDoneLoads[_type]) {
        allDone = false;
      }
    }
    setSpinnerVisible(!allDone);
    setDoneLoads(newDoneLoads);
  };
  const setFieldValue = (key, value) => {
    if (key == 'calendarId' && value) {
      let newDoneLoads = doneLoads;
      newDoneLoads.calendar = false;
      setDoneLoads(newDoneLoads);
      setSpinnerVisible(true);
      setCalendarId(value);
      setRefreshCalendar(true);
      clearFieldValues();
    }
  };
  const clearFieldValues = () => {
    if (state.fields) {
      for (let section in state.fields) {
        for (let field_key in state.fields[section]) {
          state.fields[section][field_key].value = '';
        }
      }
    }
    if (state.status_fields) {
      for (let field_key in state.status_fields) {
        state.status_fields[field_key].value = '';
      }
    }
    setFormFieldValues([]);
  };
  const updateSelectedDates = selectedDates => {
    setSelectedDates(selectedDates);
  };
  const getBookingData = () => {
    Promise.all([_custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].get(`wpcb/booking_fields/${bookId}`), _custom_API__WEBPACK_IMPORTED_MODULE_2__["default"].get('wpcb/calendars')]).then(res => {
      let cFields = res[0].data;
      let newBookedDates = {};
      state.fields = cFields.fields;
      state.status_fields = cFields.status_fields;
      if (Object.values(cFields.booked_dates).length) {
        for (let mo in cFields.booked_dates) {
          for (let _date in cFields.booked_dates[mo]) {
            newBookedDates[_date] = {
              price: 0,
              time: ''
            };
          }
        }
      }
      let calData = res[1].data;
      let calendars = {};
      for (let id in calData) {
        calendars[id] = calData[id].post_title;
      }
      setCalendars(calendars);
      setBookedDates(newBookedDates);
      setRateType(cFields.rate_type);
      setTitle(cFields.post_title);
      setCalendarId(cFields.calendar_id);
      setFormDisplay('');
      doneLoadData('post');
    }).catch(err => {
      console.log('Error in retrieving booking fields');
      console.log(err);
    });
  };
  const setBookedDatess = bookedDates => {
    setBookedDates(bookedDates);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (id) {
      setSpinnerVisible(true);
    }
    getBookingData();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {}, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_notifications__WEBPACK_IMPORTED_MODULE_10__.NotificationContainer, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isVisible: spinnerVisible
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'p-2 px-3 ' + formDisplay
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pt-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "h3"
  }, bookId ? 'Edit' : 'New', " Booking"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "form-control",
    required: true,
    value: title,
    onChange: e => {
      setTitle(e.target.value);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "row mt-3 w-100",
    onSubmit: e => {
      submitHandle(e);
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-12 col-md-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card p-0 border-0 shadow mb-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_GenField__WEBPACK_IMPORTED_MODULE_8__["default"], {
    setFieldValue: setFieldValue,
    field: {
      key: 'calendarId',
      type: 'select',
      value: calendarId,
      options: calendars,
      class: 'form-control border-0',
      idxValue: true
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Calendar__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "m-0",
    headingClass: "h4",
    arrowClass: "h6",
    calendarId: calendarId,
    bookId: bookId,
    apiUrl: apiUrl,
    doneLoadData: doneLoadData,
    updateSelectedDates: updateSelectedDates,
    refreshCalendar: refreshCalendar,
    setRefreshCalendar: setRefreshCalendar,
    setBookedDates: setBookedDatess,
    isAdmin: true,
    dateClickHandle: dateClickHandle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card p-3 border-0 shadow"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Legend"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_legend__WEBPACK_IMPORTED_MODULE_9__["default"], null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-12 col-md-6 px-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_forms_BookingForm__WEBPACK_IMPORTED_MODULE_4__["default"], {
    fields: state.fields,
    doneLoadData: doneLoadData,
    setFormFieldValues: setFormFieldValues
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BookedDates__WEBPACK_IMPORTED_MODULE_6__["default"], {
    bookId: bookId,
    bookedDates: bookedDates,
    rateType: rateType
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-12 col-md-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_forms_SidebarRightForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fields: state.status_fields,
    setFormFieldValues: setFormFieldValues
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card card-body w-100 mt-2 border-0 shadow"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Submit"))))));
};
/* harmony default export */ __webpack_exports__["default"] = (BookingPost);

/***/ }),

/***/ "./src/components/forms/SidebarRightForm.js":
/*!**************************************************!*\
  !*** ./src/components/forms/SidebarRightForm.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_GenField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../custom/GenField */ "./src/components/custom/GenField.js");



class SidebarRightForm extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
    this.setFieldValue = this.setFieldValue.bind(this);
  }
  setFieldValue(key, value) {
    let fields = this.state.fields;
    let values = {};
    for (let _key in fields) {
      let _value = _key == key ? value : fields[_key].value;
      fields[_key].value = _value;
      values[_key] = _value;
    }
    this.setState({
      fields: fields
    });
    this.props.setFormFieldValues(values);
  }
  componentDidUpdate() {
    if (this.props.fields && !Object.values(this.state.fields).length) {
      this.setState({
        fields: this.props.fields
      });
      let values = {};
      for (let _key in this.props.fields) {
        values[_key] = this.props.fields[_key].value;
      }
      this.props.setFormFieldValues(values);
    }
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card card-body w-100 border-0 shadow"
    }, Object.keys(this.state.fields)?.map((key, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "form-group",
        key: idx
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
        className: "form-label fw-semibold"
      }, " ", this.state.fields[key].label, " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_GenField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        field: this.state.fields[key],
        setFieldValue: this.setFieldValue
      }));
    })));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (SidebarRightForm);

/***/ })

}]);
//# sourceMappingURL=src_components_BookingPost_js.js.map