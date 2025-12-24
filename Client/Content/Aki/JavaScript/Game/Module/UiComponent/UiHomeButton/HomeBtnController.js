"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeBtnController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
class HomeBtnController extends ControllerBase_1.ControllerBase {
  static AddExtraAsyncCallback(e, r) {
    this.urm.set(e, r);
  }
  static AddExtraCallback(e, r) {
    this.urm.set(e, r);
  }
  static RemoveExtraCallback(e) {
    this.urm.delete(e);
  }
  static OnClear() {
    this.urm.clear();
    return true;
  }
  static ExecuteBtnClick() {
    if (ModelManager_1.ModelManager.HomeBtnModel.EnableHomeBtnLogic) {
      this.Gto();
    } else {
      this.crm();
    }
  }
  static async Gto() {
    const e = this.urm.size > 0 ? new Map(this.urm) : undefined;
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "HomeBtnController");
    UiManager_1.UiManager.ResetToBattleView(() => {
      this.drm(e);
    });
  }
  static async drm(e) {
    if (e) {
      for (var [r, a] of e) {
        a = a();
        if (a instanceof Promise) {
          await a;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("HomeBtn", 87, "执行页面直接返回主界面的额外逻辑", ["viewName", r]);
        }
      }
    }
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "HomeBtnController");
  }
  static crm() {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("HomeBtnTips_Unavailable");
  }
  static CreateHomeBtnFromUiItem(e, r, a) {
    var t;
    var o;
    if (ModelManager_1.ModelManager.HomeBtnModel.GetShowHomeBtn(r)) {
      if (t = e.GetOwner()?.GetComponentByClass(UE.TsUiHomeHelper_C.StaticClass())) {
        o = this.Yxf(r);
        t.CreateHomeBtn(o);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HomeBtn", 87, "父节点没有TsUiHomeHelper", ["displayName", e.GetDisplayName()]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("HomeBtn", 87, "传入的viewName不支持配置Home键或Home键功能被关闭", ["viewName", r], ["tag", a]);
    }
  }
  static CreateHomeBtnFromView(e) {
    var r;
    var a;
    if (e.Info && (r = e.Info.Name, ModelManager_1.ModelManager.HomeBtnModel.GetShowHomeBtn(r)) && (e.Info?.Type === UiLayerType_1.ELayerType.Normal || e.Info?.Type === UiLayerType_1.ELayerType.Pop) && ModelManager_1.ModelManager.HomeBtnModel.GetNeedFindComponent(r)) {
      e = e.GetRootActor();
      if (e = UE.LGUIBPLibrary.GetComponentInChildren(e, UE.TsUiHomeHelper_C.StaticClass(), false)) {
        a = this.Yxf(r);
        e.CreateHomeBtn(a);
      } else {
        ModelManager_1.ModelManager.HomeBtnModel.AddViewNameToNoFindComponent(r);
      }
    }
  }
  static Yxf(e) {
    return ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e)?.HomeBtnStyle ?? 1;
  }
}
(exports.HomeBtnController = HomeBtnController).urm = new Map();
//# sourceMappingURL=HomeBtnController.js.map