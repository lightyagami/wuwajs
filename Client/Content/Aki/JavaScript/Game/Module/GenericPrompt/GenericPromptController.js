"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericPromptController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const GenericPromptDefine_1 = require("./GenericPromptDefine");
class GenericPromptController extends UiControllerBase_1.UiControllerBase {
  static ShowPromptByCode(e, ...r) {
    var t;
    var n = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(e);
    if (n) {
      t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(e);
      GenericPromptController.ShowPromptByItsType(n.TypeId, t, undefined, r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GenericPrompt", 10, "配置不存在，请检查\"t.通用提示.xlsx\"", ["Id", e]);
    }
  }
  static ShowPromptByCodeWithCallback(e, r, ...t) {
    var n;
    var o = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(e);
    if (o) {
      n = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(e);
      GenericPromptController.ShowPromptByItsType(o.TypeId, n, undefined, t, undefined, Number(e), r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GenericPrompt", 10, "配置不存在，请检查\"t.通用提示.xlsx\"", ["Id", e]);
    }
  }
  static ShowPromptByItsType(e, r, t, n, o, i, a, s, m, _ = false, g) {
    i = {
      TypeId: e,
      PromptId: i,
      MainTextObj: r,
      ExtraTextObj: t,
      MainTextParams: n,
      ExtraTextParams: o,
      CloseCallback: a,
      Duration: m,
      PromptKey: g,
      ...s
    };
    if (e === 9) {
      ModelManager_1.ModelManager.GenericPromptModel.ApplyPromptParamHub(i);
    } else if (r = GenericPromptDefine_1.genericPromptView[e]) {
      if (_) {
        UiManager_1.UiManager.OpenViewByPlot(r, i);
      } else {
        UiManager_1.UiManager.OpenView(r, i);
      }
    }
  }
  static GetViewNameByPromptId(e) {
    var r = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(e);
    if (r) {
      return GenericPromptDefine_1.genericPromptView[r.TypeId] || undefined;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GenericPrompt", 10, "配置不存在，请检查\"t.通用提示.xlsx\"", ["Id", e]);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.HYt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, this.HYt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.HYt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLoadMap, this.HYt);
  }
  static CancelPromptByPromptKey(e) {
    ModelManager_1.ModelManager.GenericPromptModel.RemovePromptParamHubByKey(e);
  }
}
(exports.GenericPromptController = GenericPromptController).HYt = () => {
  if (!UiManager_1.UiManager.IsViewOpen("GenericPromptView")) {
    UiManager_1.UiManager.OpenView("GenericPromptView");
  }
};
//# sourceMappingURL=GenericPromptController.js.map