"use strict";
(self["webpackChunkbooking_calendar_2"] = self["webpackChunkbooking_calendar_2"] || []).push([["src_components_CalendarPost_js"],{

/***/ "./src/components/CalendarPost.js":
/*!****************************************!*\
  !*** ./src/components/CalendarPost.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _custom_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom/API */ "./src/components/custom/API.js");
/* harmony import */ var _forms_CalendarForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms/CalendarForm */ "./src/components/forms/CalendarForm.js");
/* harmony import */ var _custom_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom/Spinner */ "./src/components/custom/Spinner.js");






const CalendarPost = () => {
  let {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useParams)();
  const [showLoading, setShowLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isVisible: showLoading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_forms_CalendarForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
    id: id,
    setShowLoading: setShowLoading
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (CalendarPost);

/***/ }),

/***/ "./src/components/custom/Navigate.js":
/*!*******************************************!*\
  !*** ./src/components/custom/Navigate.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");



const Navigate = _ref => {
  let {
    navTo
  } = _ref;
  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (navTo) {
      navigate(navTo);
    }
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};
/* harmony default export */ __webpack_exports__["default"] = (Navigate);

/***/ }),

/***/ "./src/components/custom/Notification.js":
/*!***********************************************!*\
  !*** ./src/components/custom/Notification.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class Notification extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    if (this.props.isVisible) {
      setTimeout(() => {
        this.props.closeNotif();
      }, 3000);
    }
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: 'wpcb-notif pe-4 h6 fw-normal alert alert-' + this.props.type + ' ' + (this.props.isVisible ? '' : 'd-none')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: 'fa fa-lg fa-' + this.props.icon + '-circle'
    }), "\xA0", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, this.props.message), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "wpcb-notif-dismiss",
      onClick: this.props.closeNotif
    }, "\xD7")));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Notification);

/***/ }),

/***/ "./src/components/custom/User.js":
/*!***************************************!*\
  !*** ./src/components/custom/User.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const USER = {};
USER.id = document.getElementById('wpcb_current_user').value;
/* harmony default export */ __webpack_exports__["default"] = (USER);

/***/ }),

/***/ "./src/components/forms/CalendarForm.js":
/*!**********************************************!*\
  !*** ./src/components/forms/CalendarForm.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tippyjs_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @tippyjs/react */ "./node_modules/@tippyjs/react/dist/tippy-react.esm.js");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "./node_modules/tippy.js/dist/tippy.css");
/* harmony import */ var _custom_Date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../custom/Date */ "./src/components/custom/Date.js");
/* harmony import */ var _custom_CalendarGoTo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../custom/CalendarGoTo */ "./src/components/custom/CalendarGoTo.js");
/* harmony import */ var _PopupStatus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PopupStatus */ "./src/components/forms/PopupStatus.js");
/* harmony import */ var _custom_API__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../custom/API */ "./src/components/custom/API.js");
/* harmony import */ var _custom_Spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../custom/Spinner */ "./src/components/custom/Spinner.js");
/* harmony import */ var _custom_legend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../custom/legend */ "./src/components/custom/legend.js");
/* harmony import */ var _custom_Navigate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../custom/Navigate */ "./src/components/custom/Navigate.js");
/* harmony import */ var _custom_User__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../custom/User */ "./src/components/custom/User.js");
/* harmony import */ var _custom_Function__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../custom/Function */ "./src/components/custom/Function.js");
/* harmony import */ var _custom_Notification__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../custom/Notification */ "./src/components/custom/Notification.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");















class CalendarForm extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: this.props.id ? 'Edit' : 'New',
      calendarTitle: '',
      date: _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].current,
      datesData: {},
      enableDays: [],
      availableDates: [],
      passDays: [],
      monthDays: [],
      monthDayNums: [],
      monthName: '',
      caledarHtml: '',
      events: {},
      fontSizes: {
        dayNum: 'inherit',
        dayName: 'inherit'
      },
      collapsing: [],
      dateHeight: 'auto',
      selectedDates: [],
      hovered: [],
      selectedDate: {},
      selectedDayNum: 0,
      selectedDayData: {},
      showPopupStatus: false,
      showLoading: false,
      notif: {
        msg: '',
        icon: '',
        type: '',
        visible: false
      },
      noEventsMsg: '',
      errMsg: '',
      navTo: ''
    };
    this.mouseEnterNav = this.mouseEnterNav.bind(this);
    this.mouseLeaveNav = this.mouseLeaveNav.bind(this);
    this.monthNameClickHandle = this.monthNameClickHandle.bind(this);
    this.setCalendarDates = this.setCalendarDates.bind(this);
    this.updateCalendarData = this.updateCalendarData.bind(this);
    this.dateClickHandle = this.dateClickHandle.bind(this);
    this.updateGoToVisibility = this.updateGoToVisibility.bind(this);
  }
  updateGoToVisibility(isShow) {
    this.setState({
      showGoTo: isShow
    });
  }
  updateCalendarData(date, data) {
    let datesData = this.state.datesData;
    datesData[date] = data;
    this.setState({
      showPopupStatus: false,
      datesData: datesData
    });
  }
  dateClickHandle(date, dayData, dayNum) {
    this.setState({
      showPopupStatus: true,
      selectedDate: date,
      selectedDayData: dayData,
      selectedDayNum: dayNum
    });
  }
  mouseEnterNav(key) {
    this.setState({
      hovered: [key]
    });
  }
  mouseLeaveNav() {
    this.setState({
      hovered: []
    });
  }
  gotoCalendar(isNext) {
    let newDate = this.state.date;
    newDate = isNext ? _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].addMonths(newDate, 1) : _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].subMonths(newDate, 1);
    this.setCalendarDates(newDate);
    this.setState({
      date: newDate
    });
  }
  monthNameClickHandle() {
    this.setState({
      showGoTo: true
    });
  }
  collapseHandle(date) {
    let collapsing = [];
    if (!this.state.collapsing.includes(date)) {
      collapsing.push(date);
    }
    this.setState({
      collapsing: collapsing
    });
  }
  submitHandle(e) {
    e.preventDefault();
    this.props.setShowLoading(true);
    this.setState({
      errMsg: '',
      showLoading: true
    });
    let params = {
      user_id: _custom_User__WEBPACK_IMPORTED_MODULE_10__["default"].id,
      calendar_id: this.props.id,
      calendar_title: this.state.calendarTitle,
      action: this.state.action,
      dates: this.state.datesData
    };
    _custom_API__WEBPACK_IMPORTED_MODULE_6__["default"].post('wpcb/calendar_data', params).then(res => {
      let calendarId = res.data;
      if (this.state.action.toLowerCase() == 'new') {
        this.setState({
          navTo: '/calendar/' + calendarId,
          action: 'Edit'
        });
        this.props.id = calendarId;
      }
      this.getDalendarData();
      react_notifications__WEBPACK_IMPORTED_MODULE_13__.NotificationManager.success('Calendar save successfully.');
    }).catch(err => {
      console.log('Submti calendar err');
      console.log(err);
      this.setState({
        errMsg: 'Something went wrong during submission of form.'
      });
    });
  }
  setCalendarDates(date) {
    let passDays = [];
    let monthDayNums = [];
    let year = date.getFullYear();
    let month = date.getMonth();
    let datesData = this.state.datesData;
    date = new Date(year, month, 1);
    let advancedYear = year;
    let advancedMonth = month + 1;
    if (month == 11) {
      advancedYear = advancedYear + 1;
      advancedMonth = month + 2;
    }
    let monthLastDay = new Date(year, advancedMonth, 0).getDate();
    let passMonthLastDay = new Date(year, month, 0);

    // Pass Month Days
    for (let i = 0; i < date.getDay(); i++) {
      let passDay = passMonthLastDay.getDate() - i;
      passDays.push(passDay);
    }
    let events = {};
    let availableDates = [];

    // Current Month Days
    for (let i = 1; i <= monthLastDay; i++) {
      monthDayNums.push(i);
      let _date = new Date(year, month, i);
      let _dayName = _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].dayNames[_date.getDay()];
      if (this.state.enableDays.includes(_dayName)) {
        availableDates.push(i);
      }
      let plusDay = _custom_Function__WEBPACK_IMPORTED_MODULE_11__["default"].leftFillNum(i, 2);
      let plusMo = _custom_Function__WEBPACK_IMPORTED_MODULE_11__["default"].leftFillNum(_date.getMonth() + 1, 2);
      let plusDate = year + '-' + plusMo + '-' + plusDay;
      let moname = _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].monthNames[month];
      if (datesData.hasOwnProperty(plusDate) && datesData[plusDate].description) {
        events[plusDate] = {
          date: moname + ' ' + i,
          desc: datesData[plusDate].description
        };
      }
    }
    let noEventsMsg = Object.values(events).length ? '' : 'No data to show.';

    // Next Month
    this.setState({
      date: date,
      passDays: passDays.reverse(),
      monthDayNums: monthDayNums,
      monthName: _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].monthNames[date.getMonth()],
      availableDates: availableDates,
      events: events,
      noEventsMsg: noEventsMsg
    });
  }
  getDalendarData() {
    this.props.setShowLoading(true);
    this.setState({
      showLoading: true
    });
    let requests = [_custom_API__WEBPACK_IMPORTED_MODULE_6__["default"].post('wpcb/get_settings', {
      setting: 'general',
      field: 'enable_days'
    })];
    if (this.props.id) {
      requests.push(_custom_API__WEBPACK_IMPORTED_MODULE_6__["default"].get('wpcb/calendar_data/' + this.props.id));
    }
    Promise.all(requests).then(res => {
      let enableDays = res[0].data;
      for (let idx in enableDays) {
        enableDays[idx] = enableDays[idx].toUpperCase();
      }
      this.setState({
        enableDays,
        showLoading: false
      });
      if (this.props.id) {
        let calData = res[1].data;
        let dates = calData.other_booked_dates;
        let calendarTitle = calData.calendar_title;
        let datesData = {};
        for (let yrMo in dates) {
          for (let date in dates[yrMo]) {
            let dateData = dates[yrMo][date];
            datesData[date] = dateData;
          }
        }
        this.setState({
          datesData,
          calendarTitle
        });
      }
      this.setCalendarDates(this.state.date);
      this.props.setShowLoading(false);
    }).catch(err => {
      console.log(err);
    });
  }
  componentDidMount() {
    let box = document.getElementById('calendarDays');
    let date = _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].current;
    if (box.offsetWidth) {
      let dateHeight = box.offsetWidth / 7 + 'px';
      this.setState({
        dateHeight: dateHeight,
        date: date
      });
    }
    this.getDalendarData();
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'p-2 px-3 ' + this.props.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_notifications__WEBPACK_IMPORTED_MODULE_13__.NotificationContainer, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Navigate__WEBPACK_IMPORTED_MODULE_9__["default"], {
      navTo: this.state.navTo
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'alert alert-danger ' + (this.state.errMsg ? '' : 'd-none')
    }, this.state.errMsg), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
      onSubmit: e => {
        this.submitHandle(e);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mb-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "h3"
    }, this.state.action, " Calendar"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      className: "form-control",
      value: this.state.calendarTitle,
      onChange: e => this.setState({
        calendarTitle: e.target.value
      }),
      required: true
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12 col-md-4 pt-1"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mt-3 shadow p-3 border border-light"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Events & Holidays"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: 'p-1 ' + (this.state.noEventsMsg ? '' : 'd-none')
    }, this.state.noEventsMsg), Object.keys(this.state.events)?.map((_date, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: idx,
        className: 'shadow-sm border border-light rounded p-2 mt-2 bg-light',
        onClick: () => this.collapseHandle(_date),
        role: "button"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'd-flex justify-content-between align-items-center ' + (this.state.collapsing.includes(_date) ? 'fw-bold' : 'fw-semibold')
      }, this.state.events[_date].date, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: 'fa fa-angle-' + (this.state.collapsing.includes(_date) ? 'up' : 'down')
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'border border-start-0 border-end-0 border-bottom-0 mt-2 pt-2 collapse ' + (this.state.collapsing.includes(_date) ? 'show' : ''),
        onClick: e => e.stopPropagation(),
        role: "text"
      }, this.state.events[_date].desc));
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12 col-md-4"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card calendar shadow border-0 p-0 xw-100"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card-header py-3 d-flex justify-content-between align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      role: "button",
      className: 'h4 m-0 p-1 shadow rounded-circle ' + (this.state.hovered.includes('arrowLeft') ? '' : 'text-secondary'),
      onMouseLeave: this.mouseLeaveNav,
      onClick: () => this.gotoCalendar(false)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      class: "fa fa-angle-left p-0 px-2",
      onMouseEnter: () => this.mouseEnterNav('arrowLeft')
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'h3 mx-5 m-0 text-center text-uppercase ' + (this.state.hovered.includes('monthName') ? '' : 'text-secondary'),
      role: "button",
      onMouseLeave: this.mouseLeaveNav,
      onClick: this.monthNameClickHandle
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      onMouseEnter: () => this.mouseEnterNav('monthName')
    }, _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].monthNames[this.state.date.getMonth()], " ", this.state.date.getFullYear())), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      role: "button",
      className: 'h4 m-0 p-1 shadow rounded-circle ' + (this.state.hovered.includes('arrowRight') ? '' : 'text-secondary'),
      onMouseLeave: () => this.mouseLeaveNav(),
      onClick: () => this.gotoCalendar(true)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      class: "fa fa-angle-right p-0 px-2",
      onMouseEnter: () => this.mouseEnterNav('arrowRight')
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "calendarDays",
      className: "days"
    }, _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].dayNames?.map((dayName, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "day_name",
        style: {
          width: '14.28%'
        }
      }, " ", dayName, " ");
    }), this.state.passDays?.map((dayNum, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "day_num ignore",
        style: {
          width: '14.28%'
        }
      });
    }), this.state.monthDayNums?.map((dayNum, idx) => {
      let _mo = _custom_Date__WEBPACK_IMPORTED_MODULE_3__["default"].getMonth2Digit(this.state.date.getMonth());
      let _year = this.state.date.getFullYear();
      let _day = dayNum < 10 ? '0' + dayNum : dayNum;
      let _date = _year + '-' + _mo + '-' + _day;
      let _dateData = this.state.datesData.hasOwnProperty(_date) ? this.state.datesData[_date] : {};
      let _status = this.state.availableDates.includes(dayNum) ? 'available' : 'unavailable';
      _status = this.state.datesData.hasOwnProperty(_date) ? _dateData.status : _status;
      let _desc = this.state.datesData.hasOwnProperty(_date) ? _dateData.description : '';
      _dateData.status = _status;
      _dateData.description = _desc;
      let bookedStatus = _status == 'booked' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "booked-status d-block"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        class: "fa fa-check"
      })) : '';
      if (_dateData.description) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tippyjs_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
          content: _dateData.description
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: idx,
          className: 'day_num ' + _status,
          style: {
            height: this.state.dateHeight
          },
          onClick: () => this.dateClickHandle(_date, _dateData, dayNum),
          "data-tooltip-id": "my-tooltip",
          "data-tooltip-content": "Hello world!"
        }, dayNum, bookedStatus));
      } else {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: idx,
          className: 'day_num ' + _status,
          style: {
            height: this.state.dateHeight
          },
          onClick: () => this.dateClickHandle(_date, _dateData, dayNum),
          "data-tooltip-id": "my-tooltip",
          "data-tooltip-content": "Hello world!"
        }, dayNum, bookedStatus);
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_CalendarGoTo__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isVisible: this.state.showGoTo,
      date: this.state.date,
      updateGoToVisibility: this.updateGoToVisibility,
      setDate: this.setCalendarDates
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12 col-md-4 pt-1"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mt-3 shadow p-3 border border-light"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Legend"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_legend__WEBPACK_IMPORTED_MODULE_8__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mt-3 shadow p-3 border border-light"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "submit",
      className: "btn btn-secondary w-100"
    }, "Save"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PopupStatus__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dayData: this.state.selectedDayData,
      date: this.state.selectedDate,
      isVisible: this.state.showPopupStatus,
      updateCalendarData: this.updateCalendarData,
      day: this.state.selectedDayNum
    }));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (CalendarForm);

/***/ }),

/***/ "./src/components/forms/PopupStatus.js":
/*!*********************************************!*\
  !*** ./src/components/forms/PopupStatus.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class PopupStatus extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUpdate: false,
      date: '',
      data: {},
      selectedStatus: '',
      activeTab: 'status'
    };
    this.submitHandle = this.submitHandle.bind(this);
    this.setStatusData = this.setStatusData.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
  }
  setStatusData(e) {
    let value = e.target.value;
    let data = this.state.data;
    data.status = value;
    this.setState({
      data: data,
      selectedStatus: value
    });
  }
  changeTabHandle(activeTab) {
    this.setState({
      activeTab
    });
  }
  descriptionChange(e) {
    let value = e.target.value;
    let data = this.state.data;
    data.description = value;
    this.setState({
      data: data
    });
  }
  submitHandle() {
    this.props.updateCalendarData(this.state.date, this.state.data);
  }
  componentDidUpdate() {
    if (Object.values(this.props.dayData).length && this.state.date != this.props.date) {
      let setVar = {
        date: this.props.date,
        data: this.props.dayData,
        dataUpdate: true,
        selectedStatus: this.props.dayData.status
      };
      this.setState(setVar);
    }
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'modal ' + (this.props.isVisible ? 'd-block' : ''),
      tabindex: "-1"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-dialog"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-content modal-content shadow border-0 mt-5 go-to"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-header border-0 p-0"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      role: "button",
      className: 'text-secondary h5 m-0 py-3 px-2 rounded-top border-bottom ' + (this.state.activeTab == 'status' ? ' border-secondary' : 'border-white'),
      onClick: () => this.changeTabHandle('status')
    }, "Day ", this.props.day)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      role: "button",
      className: 'text-secondary h5 m-0 py-3 px-2 rounded-top border-bottom d-flex justify-content-bwtween ' + (this.state.activeTab == 'bookings' ? 'border-secondary' : 'border-white'),
      onClick: () => this.changeTabHandle('bookings')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Bookings \xA0"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "badge bg-primary rounded-pill",
      style: {
        fontSize: '12px',
        padding: '3px 7px',
        lineHeight: '1.4'
      }
    }, this.props.dayData.booking_numbers && this.props.dayData.booking_numbers.length ? this.props.dayData.booking_numbers.length : '')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: this.state.activeTab == 'status' ? '' : 'd-none'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "form-check form-check-inline"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      class: "form-check-input",
      name: "date_status",
      value: "available",
      type: "radio",
      checked: this.state.data.status == 'available',
      onChange: this.setStatusData
    }), "Available")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "form-check form-check-inline"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      class: "form-check-input",
      name: "date_status",
      value: "unavailable",
      type: "radio",
      checked: this.state.data.status == 'unavailable',
      onChange: this.setStatusData
    }), "Unavailable")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "form-check form-check-inline"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      class: "form-check-input",
      name: "date_status",
      value: "booked",
      type: "radio",
      checked: this.state.data.status == 'booked',
      onChange: this.setStatusData
    }), "Booked")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "mt-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "Description"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
      class: "form-control",
      onChange: this.descriptionChange,
      value: this.state.data.description
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: this.state.activeTab == 'bookings' ? '' : 'd-none'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      class: "ps-3 list-disc"
    }, this.props.dayData.booking_numbers?.map((bookingNo, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "m-0 h6",
        key: idx
      }, bookingNo);
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: this.props.dayData.booking_numbers && this.props.dayData.booking_numbers.length ? 'd-none' : ''
    }, "No booking(s) found.")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-footer p-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "btn btn-sm btn-info text-white",
      onClick: this.submitHandle
    }, "OK")))));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (PopupStatus);

/***/ })

}]);
//# sourceMappingURL=src_components_CalendarPost_js.js.map