"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationController = undefined;
const Application_1 = require("../../../Core/Application/Application");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class ApplicationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Application_1.Application.AddApplicationHandler(2, ApplicationController.Nje);
    Application_1.Application.AddApplicationHandler(1, ApplicationController.Oje);
    return true;
  }
  static OnClear() {
    Application_1.Application.RemoveApplicationHandler(2, ApplicationController.Nje);
    Application_1.Application.RemoveApplicationHandler(1, ApplicationController.Oje);
    return true;
  }
}
(exports.ApplicationController = ApplicationController).Nje = () => {};
ApplicationController.Oje = () => {}; //# sourceMappingURL=ApplicationController.js.map