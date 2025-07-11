"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemInformationView = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const InfoDisplayController_1 = require("../../../Module/InfoDisplay/InfoDisplayController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInformationView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    if (!e.BoardId) {
      return false;
    }
    const n = new CustomPromise_1.CustomPromise();
    var r = {
      FadeBeforeHide: e.FadeInScreenWhenClose ?? false
    };
    return !!InfoDisplayController_1.InfoDisplayController.OpenInfoDisplay(e.BoardId, e => {
      n.SetResult(e);
    }, r, o?.Type === 9) && n.Promise;
  }
  GetViewName(e) {
    let o = undefined;
    e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayType(e.BoardId);
    if (e === 1) {
      o = "InfoDisplayTypeOneView";
    } else if (e === 2) {
      o = "InfoDisplayTypeTwoView";
    } else if (e === 3) {
      o = "InfoDisplayTypeThreeView";
    } else if (e === 4) {
      o = "InfoDisplayTypeFourNewView";
    }
    return o;
  }
}
exports.OpenSystemInformationView = OpenSystemInformationView;
//# sourceMappingURL=OpenSystemInformationView.js.map