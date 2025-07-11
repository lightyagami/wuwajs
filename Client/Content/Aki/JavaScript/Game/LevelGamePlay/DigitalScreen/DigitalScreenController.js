"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalScreenController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class DigitalScreenController extends UiControllerBase_1.UiControllerBase {
  static async OpenDigitalScreenById(e, r, a = false) {
    var i = ModelManager_1.ModelManager.DigitalScreenModel.GetDataConfig(e);
    if (!ModelManager_1.ModelManager.DigitalScreenModel.InitDigitalScreen(e)) {
      return false;
    }
    let o = "DigitalScreenA";
    if (i?.Prefab === 0) {
      o = "DigitalScreenA";
    } else if (i?.Prefab === 1) {
      o = "DigitalScreenB";
    }
    if (UiManager_1.UiManager.IsViewOpen(o)) {
      return true;
    }
    let t = undefined;
    if (a) {
      const n = new CustomPromise_1.CustomPromise();
      UiManager_1.UiManager.OpenViewByPlot(o, r, (e, r) => {
        t = r;
        n.SetResult();
      });
      await n.Promise;
    } else {
      t = await UiManager_1.UiManager.OpenViewAsync(o, r);
    }
    return t !== undefined;
  }
}
exports.DigitalScreenController = DigitalScreenController;
//# sourceMappingURL=DigitalScreenController.js.map