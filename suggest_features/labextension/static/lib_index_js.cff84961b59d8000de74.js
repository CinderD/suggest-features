"use strict";
(self["webpackChunksuggesting_features"] = self["webpackChunksuggesting_features"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "./lib/widget.js");


/**
 * Initialization data for the jupyterlab-play-cell-button extension.
 */
const extension = {
    id: 'jupyterlab-play-cell-button',
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.INotebookTracker],
    autoStart: true,
    activate: (app, nbTrack) => {
        nbTrack.currentChanged.connect(() => {
            const notebookPanel = nbTrack.currentWidget;
            const notebook = nbTrack.currentWidget.content;
            notebookPanel.context.ready.then(async () => {
                let currentCell = null;
                let currentCellPlayButton = null;
                nbTrack.activeCellChanged.connect(() => {
                    // Remove the existing play button from
                    // the previously active cell. This may
                    // well introduce bugs down the road and
                    // there is likely a better way to do this
                    if (currentCell) {
                        notebook.widgets.map((c) => {
                            const currentLayout = c.layout;
                            currentLayout.widgets.map(w => {
                                if (w === currentCellPlayButton) {
                                    currentLayout.removeWidget(w);
                                }
                            });
                        });
                    }
                    const cell = notebook.activeCell;
                    const newButton = new _widget__WEBPACK_IMPORTED_MODULE_1__.CellPlayButton(cell);
                    // regular expression to check if users add '#check features' command in the cell's input area
                    // if so, add our button & corresponding visualzation to this particular cell
                    var generalReg = /#check features/;
                    if (generalReg.test(cell.inputArea.node.innerText)) {
                        cell.layout.addWidget(newButton);
                    }
                    currentCell = cell;
                    currentCellPlayButton = newButton;
                });
            });
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ }),

/***/ "./lib/widget.js":
/*!***********************!*\
  !*** ./lib/widget.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selfLabIcon": () => (/* binding */ selfLabIcon),
/* harmony export */   "CellPlayButton": () => (/* binding */ CellPlayButton)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_table_grid_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/table-grid.svg */ "./style/table-grid.svg");
/* harmony import */ var _style_study2_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/study2.html */ "./style/study2.html");



/// <reference path="node.d.ts"/>
// import the button logo & html visualization as modules

// import * as URL from "url";
// let Mytable = URL.parse("https://github.com/CinderD/suggest-features/blob/main/style/study2.html");
// import Mytable from 'https://raw.githubusercontent.com/CinderD/suggest-features/main/style/study2.html';
// var Mytable = require("../style/study2.html");

// var  Mytable = require ("../style/study2.html");
var myButton = document.createElement('style');
myButton.type = 'widget/css';
myButton.innerHTML = '.myButton { color: #F00; }';
// utilize the LabIcon component from Jupyter UI
const selfLabIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon({
    name: 'selfLabIcon',
    svgstr: _style_table_grid_svg__WEBPACK_IMPORTED_MODULE_3__.default
});
const Button = ({ icon, onClick, }) => (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("button", { type: "button", onClick: () => onClick(), className: "cellButton" },
    react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon.resolveReact, { icon: selfLabIcon, className: "cellButton-icon", tag: "span", width: "20px", height: "20px" })));
// definition of iframe
const Mynode = document.createElement("div");
var ifra_1 = document.createElement('iframe');
ifra_1.id = 'Myifra_1';
var count = 0;
const CodeCellButtonComponent = ({ cell, }) => {
    // to control the hide & appear of iframe window
    cell.outputArea.hide();
    // below is the part to create the iframe in output area
    cell.outputArea.node.append(Mynode);
    // function to hide the iframe window
    const clearCell = async () => {
        count += 1;
        Mynode.removeChild(ifra_1);
        cell.outputArea.hide();
    };
    // function to show the iframe visualization graph  
    const executeCell = async () => {
        Mynode.appendChild(ifra_1);
        cell.outputArea.show();
        count += 1;
        ifra_1.setAttribute('src', _style_study2_html__WEBPACK_IMPORTED_MODULE_4__.default);
        ifra_1.height = document.documentElement.clientHeight.toString();
        ifra_1.width = '100%';
    };
    return (
    // need to wrapping the component with one single tag if return multiple buttons
    react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement(Button, { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.stopIcon, onClick: () => (count % 2 == 1 ? clearCell : executeCell)() })));
};
class CellPlayButton extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    constructor(cell) {
        super();
        /**
         * Constructs a new CellPlayButton widget.
         */
        this.cell = null;
        this.cell = cell;
        this.addClass('jp-CellButton');
    }
    render() {
        switch (this.cell.model.type) {
            // if the cell belongs to a code cell type, add a button to it
            case 'code':
                return react__WEBPACK_IMPORTED_MODULE_2___default().createElement(CodeCellButtonComponent, { cell: this.cell });
            default:
                break;
        }
    }
}


/***/ }),

/***/ "./style/study2.html":
/*!***************************!*\
  !*** ./style/study2.html ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9848d36c5d61e9a069c87a3350f3924a.html");

/***/ }),

/***/ "./style/table-grid.svg":
/*!******************************!*\
  !*** ./style/table-grid.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\r\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\r\n<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t width=\"475.082px\" height=\"475.081px\" viewBox=\"0 0 475.082 475.081\" style=\"enable-background:new 0 0 475.082 475.081;\"\r\n\t xml:space=\"preserve\">\r\n<g>\r\n\t<path d=\"M461.667,49.963c-8.949-8.947-19.698-13.418-32.265-13.418H45.682c-12.562,0-23.317,4.471-32.264,13.418\r\n\t\tC4.473,58.912,0,69.663,0,82.228V392.86c0,12.566,4.473,23.309,13.418,32.261c8.947,8.949,19.701,13.415,32.264,13.415h383.72\r\n\t\tc12.566,0,23.315-4.466,32.265-13.415c8.945-8.952,13.415-19.701,13.415-32.261V82.228\r\n\t\tC475.082,69.663,470.612,58.909,461.667,49.963z M146.183,392.85c0,2.673-0.859,4.856-2.574,6.571\r\n\t\tc-1.712,1.711-3.899,2.562-6.567,2.562h-91.36c-2.662,0-4.853-0.852-6.567-2.562c-1.713-1.715-2.568-3.898-2.568-6.571V338.03\r\n\t\tc0-2.669,0.855-4.853,2.568-6.56c1.714-1.719,3.905-2.574,6.567-2.574h91.363c2.667,0,4.858,0.855,6.567,2.574\r\n\t\tc1.711,1.707,2.57,3.891,2.57,6.56V392.85z M146.183,283.221c0,2.663-0.859,4.854-2.574,6.564\r\n\t\tc-1.712,1.714-3.899,2.569-6.567,2.569h-91.36c-2.662,0-4.853-0.855-6.567-2.569c-1.713-1.711-2.568-3.901-2.568-6.564v-54.819\r\n\t\tc0-2.664,0.855-4.854,2.568-6.567c1.714-1.709,3.905-2.565,6.567-2.565h91.363c2.667,0,4.854,0.855,6.567,2.565\r\n\t\tc1.711,1.713,2.57,3.903,2.57,6.567V283.221z M146.183,173.587c0,2.666-0.859,4.853-2.574,6.567\r\n\t\tc-1.712,1.709-3.899,2.568-6.567,2.568h-91.36c-2.662,0-4.853-0.859-6.567-2.568c-1.713-1.715-2.568-3.901-2.568-6.567V118.77\r\n\t\tc0-2.666,0.855-4.856,2.568-6.567c1.714-1.713,3.905-2.568,6.567-2.568h91.363c2.667,0,4.854,0.855,6.567,2.568\r\n\t\tc1.711,1.711,2.57,3.901,2.57,6.567V173.587z M292.362,392.85c0,2.673-0.855,4.856-2.563,6.571c-1.711,1.711-3.9,2.562-6.57,2.562\r\n\t\tH191.86c-2.663,0-4.853-0.852-6.567-2.562c-1.713-1.715-2.568-3.898-2.568-6.571V338.03c0-2.669,0.855-4.853,2.568-6.56\r\n\t\tc1.714-1.719,3.904-2.574,6.567-2.574h91.365c2.669,0,4.859,0.855,6.57,2.574c1.704,1.707,2.56,3.891,2.56,6.56v54.819H292.362z\r\n\t\t M292.362,283.221c0,2.663-0.855,4.854-2.563,6.564c-1.711,1.714-3.9,2.569-6.57,2.569H191.86c-2.663,0-4.853-0.855-6.567-2.569\r\n\t\tc-1.713-1.711-2.568-3.901-2.568-6.564v-54.819c0-2.664,0.855-4.854,2.568-6.567c1.714-1.709,3.904-2.565,6.567-2.565h91.365\r\n\t\tc2.669,0,4.859,0.855,6.57,2.565c1.704,1.713,2.56,3.903,2.56,6.567v54.819H292.362z M292.362,173.587\r\n\t\tc0,2.666-0.855,4.853-2.563,6.567c-1.711,1.709-3.9,2.568-6.57,2.568H191.86c-2.663,0-4.853-0.859-6.567-2.568\r\n\t\tc-1.713-1.715-2.568-3.901-2.568-6.567V118.77c0-2.666,0.855-4.856,2.568-6.567c1.714-1.713,3.904-2.568,6.567-2.568h91.365\r\n\t\tc2.669,0,4.859,0.855,6.57,2.568c1.704,1.711,2.56,3.901,2.56,6.567v54.817H292.362z M438.536,392.85\r\n\t\tc0,2.673-0.855,4.856-2.562,6.571c-1.718,1.711-3.908,2.562-6.571,2.562h-91.354c-2.673,0-4.862-0.852-6.57-2.562\r\n\t\tc-1.711-1.715-2.56-3.898-2.56-6.571V338.03c0-2.669,0.849-4.853,2.56-6.56c1.708-1.719,3.897-2.574,6.57-2.574h91.354\r\n\t\tc2.663,0,4.854,0.855,6.571,2.574c1.707,1.707,2.562,3.891,2.562,6.56V392.85z M438.536,283.221c0,2.663-0.855,4.854-2.562,6.564\r\n\t\tc-1.718,1.714-3.908,2.569-6.571,2.569h-91.354c-2.673,0-4.862-0.855-6.57-2.569c-1.711-1.711-2.56-3.901-2.56-6.564v-54.819\r\n\t\tc0-2.664,0.849-4.854,2.56-6.567c1.708-1.709,3.897-2.565,6.57-2.565h91.354c2.663,0,4.854,0.855,6.571,2.565\r\n\t\tc1.707,1.713,2.562,3.903,2.562,6.567V283.221z M438.536,173.587c0,2.666-0.855,4.853-2.562,6.567\r\n\t\tc-1.718,1.709-3.908,2.568-6.571,2.568h-91.354c-2.673,0-4.862-0.859-6.57-2.568c-1.711-1.715-2.56-3.901-2.56-6.567V118.77\r\n\t\tc0-2.666,0.849-4.856,2.56-6.567c1.708-1.713,3.897-2.568,6.57-2.568h91.354c2.663,0,4.854,0.855,6.571,2.568\r\n\t\tc1.707,1.711,2.562,3.901,2.562,6.567V173.587z\"/>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n</svg>\r\n");

/***/ })

}]);
//# sourceMappingURL=lib_index_js.cff84961b59d8000de74.js.map