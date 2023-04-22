"use strict";
(self["webpackChunkbooking_calendar_2"] = self["webpackChunkbooking_calendar_2"] || []).push([["src_components_Calendars_js"],{

/***/ "./src/components/Calendars.js":
/*!*************************************!*\
  !*** ./src/components/Calendars.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tippyjs_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tippyjs/react */ "./node_modules/@tippyjs/react/dist/tippy-react.esm.js");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "./node_modules/tippy.js/dist/tippy.css");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _custom_API__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom/API */ "./src/components/custom/API.js");
/* harmony import */ var material_react_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! material-react-table */ "./node_modules/material-react-table/dist/esm/material-react-table.esm.js");
/* harmony import */ var _custom_Confirm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom/Confirm */ "./src/components/custom/Confirm.js");
/* harmony import */ var _custom_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom/Spinner */ "./src/components/custom/Spinner.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");










const Bookings = () => {
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [isApiCalled, setIsApiCalled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [rowSelection, setRowSelection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [selectedIds, setSelectedIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [isModalShow, setModalVisibility] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [showConfirm, setShowConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [deleteId, setDeleteId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [showSpinner, setShowSpinner] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const copyHandle = (bookId, shortcode, e) => {
    let clases = document.getElementsByClassName('shortcode-copy');
    for (var i = 0; i < clases.length; i++) {
      clases[i].innerText = 'Copy';
    }
    document.getElementById('copy-' + bookId).innerHTML = 'Copied';
    navigator.clipboard.writeText(shortcode);
  };
  const resetCopied = () => {
    let clases = document.getElementsByClassName('shortcode-copy');
    setTimeout(() => {
      for (var i = 0; i < clases.length; i++) {
        clases[i].innerText = 'Copy';
      }
    }, 1000);
  };
  const columns = [{
    accessorKey: 'actions',
    header: 'Actions',
    Cell: _ref => {
      let {
        cell
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "px-2"
      }, cell.getValue());
    },
    size: 1
  }, {
    accessorKey: 'post_title',
    header: 'Calendar Name'
  }, {
    accessorKey: 'post_date',
    header: 'Date Plublish'
  }, {
    accessorKey: 'post_author',
    header: 'Author'
  }, {
    accessorKey: 'shortcode_id',
    header: 'Shortcode',
    size: 200,
    Cell: _ref2 => {
      let {
        cell
      } = _ref2;
      let value = cell.getValue();
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tippyjs_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
        content: "Insert this shortcode into your page."
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: ""
      }, "[wpcb_booking id=", value, "]"), "\xA0 ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
        role: "button",
        className: "badge bg-secondary text-white",
        onClick: e => copyHandle(value, '[wpcb_booking id=' + value + ']', e),
        onMouseLeave: resetCopied
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "shortcode-copy",
        id: 'copy-' + value
      }, "Copy"))));
    }
  }];
  const deleteHandle = id => {
    let ids = [id];
    setShowSpinner(true);
    setShowConfirm(false);
    _custom_API__WEBPACK_IMPORTED_MODULE_3__["default"].post('wpcb/delete_posts', {
      ids
    }).then(res => {
      react_notifications__WEBPACK_IMPORTED_MODULE_7__.NotificationManager.success('Calendar deleted successfully.');
      getCalendarsData();
    }).catch(err => {
      console.log('Error in deteling calendar');
      console.log(err);
    });
  };
  const getCalendarsData = () => {
    _custom_API__WEBPACK_IMPORTED_MODULE_3__["default"].get('wpcb/calendars').then(res => {
      let _data = [];
      let calendars = res.data;
      setShowSpinner(false);
      for (let id in calendars) {
        let itemData = {
          id: id,
          post_title: calendars[id].post_title,
          post_author: calendars[id].post_author,
          post_date: calendars[id].post_date,
          shortcode_id: calendars[id].shortcode_id,
          actions: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Link, {
            to: '/calendar/' + id,
            className: "text-secondary",
            title: "Edit",
            style: {
              fontSize: '20px'
            }
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
            className: "fa fa-pencil"
          })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
            className: "text-danger mx-2",
            title: "Delete",
            role: "button",
            style: {
              fontSize: '20px'
            },
            onClick: () => {
              setDeleteId(id);
              setShowConfirm(true);
            }
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
            className: "fa fa-trash"
          })))
        };
        _data.push(itemData);
      }
      console.log(_data);
      setData(_data);
      setIsLoading(false);
    }).catch(err => {
      console.log('Error in bookings');
      console.log(err);
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!isApiCalled) {
      setIsApiCalled(true);
      getCalendarsData();
    }
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_notifications__WEBPACK_IMPORTED_MODULE_7__.NotificationContainer, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isVisible: showSpinner
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_Confirm__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isVisible: showConfirm,
    id: deleteId,
    setVisibility: setShowConfirm,
    confirmAction: deleteHandle,
    type: "calendar"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(material_react_table__WEBPACK_IMPORTED_MODULE_4__["default"], {
    columns: columns,
    data: data,
    state: {
      rowSelection,
      isLoading: isLoading
    },
    initialState: {
      density: 'compact'
    },
    enableHiding: false,
    enableFullScreenToggle: false,
    renderTopToolbarCustomActions: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Link, {
      className: "btn btn-sm btn-outline-primary",
      to: '/calendar'
    }, "Add New ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa fa-plus"
    }))
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Bookings);

/***/ }),

/***/ "./src/components/custom/Confirm.js":
/*!******************************************!*\
  !*** ./src/components/custom/Confirm.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class Confirm extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'modal ' + (this.props.isVisible ? 'd-block' : ''),
      style: {
        backgroundColor: '#86868640'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-dialog w-100 text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "modal-content modal-content bg-white border-0"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
      className: "modal-header justify-content-start h5 m-0 border-0"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      class: "fa fa-info-circle text-danger"
    }, "\xA0"), " Are you sure to delete selected ", this.props.type ? this.props.type : 'item', "?"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "modal-footer p-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      class: "btn btn-outline-danger",
      "data-mdb-dismiss": "modal",
      onClick: () => this.props.setVisibility(false)
    }, "Cancel"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      class: "btn btn-danger confirm",
      onClick: () => this.props.confirmAction(this.props.id)
    }, "Confirm"))))));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Confirm);

/***/ })

}]);
//# sourceMappingURL=src_components_Calendars_js.js.map