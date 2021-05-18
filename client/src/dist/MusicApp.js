"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./MusicApp.module.css");
var react_router_dom_1 = require("react-router-dom");
var UserHome_1 = require("./pages/UserHome");
var Support_1 = require("./pages/Support");
function MusicApp() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/" }, "This is the Landing Page"),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/user_home" },
                    react_1["default"].createElement(UserHome_1["default"], null)),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/support" },
                    react_1["default"].createElement(Support_1["default"], null))))));
}
exports["default"] = MusicApp;
