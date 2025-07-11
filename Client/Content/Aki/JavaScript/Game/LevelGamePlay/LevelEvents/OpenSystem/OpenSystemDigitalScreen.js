"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemDigitalScreen = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const DigitalScreenController_1 = require("../../DigitalScreen/DigitalScreenController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemDigitalScreen extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var t;
    return !!e && !!e.BoardId && (t = {
      FadeBeforeHide: e.FadeInScreenWhenClose ?? false
    }, await DigitalScreenController_1.DigitalScreenController.OpenDigitalScreenById(e.BoardId, t, r?.Type === 9));
  }
  GetViewName(e) {
    e = ModelManager_1.ModelManager.DigitalScreenModel.GetDataConfig(e.BoardId);
    if (e?.Prefab !== 0 && e?.Prefab === 1) {
      return "DigitalScreenB";
    } else {
      return "DigitalScreenA";
    }
  }
}
exports.OpenSystemDigitalScreen = OpenSystemDigitalScreen;
//# sourceMappingURL=OpenSystemDigitalScreen.js.map