"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeBtnController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
class HomeBtnController extends ControllerBase_1.ControllerBase {
  static AddExtraAsyncCallback(e, r) {
    this.Aem.set(e, r);
  }
  static AddExtraCallback(e, r) {
    this.Aem.set(e, r);
  }
  static RemoveExtraCallback(e) {
    this.Aem.delete(e);
  }
  static OnClear() {
    this.Aem.clear();
    return true;
  }
  static ExecuteBtnClick() {
    if (ModelManager_1.ModelManager.HomeBtnModel.EnableHomeBtnLogic) {
      this.Gto();
    } else {
      this.Dem();
    }
  }
  static async Gto() {
    const e = this.Aem.size > 0 ? new Map(this.Aem) : undefined;
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "HomeBtnController");
    UiManager_1.UiManager.ResetToBattleView(() => {
      this.Uem(e);
    });
  }
  static async Uem(e) {
    if (e) {
      for (var [r, t] of e) {
        t = t();
        if (t instanceof Promise) {
          await t;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("HomeBtn", 87, "执行页面直接返回主界面的额外逻辑", ["viewName", r]);
        }
      }
    }
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "HomeBtnController");
  }
  static Dem() {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("HomeBtnTips_Unavailable");
  }
}
(exports.HomeBtnController = HomeBtnController).Aem = new Map();
//# sourceMappingURL=HomeBtnController.js.map