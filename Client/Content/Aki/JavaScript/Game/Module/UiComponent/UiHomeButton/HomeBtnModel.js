"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeBtnModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiModel_1 = require("../../../Ui/UiModel");
class HomeBtnModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.dQc = true;
    this.vLd = new Map();
    this.K9d = new Set();
    this.lnm = e => {
      this.dQc = e;
    };
  }
  OnInit() {
    EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.BtnStateUpdate, this.lnm);
    return true;
  }
  get EnableHomeBtnLogic() {
    if (!this.dQc) {
      return false;
    }
    for (const e of UiModel_1.UiModel.NormalStack) {
      if (ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e.Info.Name)?.HomeBtnShowType === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("HomeBtn", 87, "当前有UI界面不支持显示Home键", ["ViewName:", e.Info.Name]);
        }
        return false;
      }
    }
    for (const t of UiModel_1.UiModel.PopList) {
      if (ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(t.Info.Name)?.HomeBtnShowType === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("HomeBtn", 87, "当前有UI界面不支持返回主界面", ["ViewName:", t.Info.Name]);
        }
        return false;
      }
    }
    return true;
  }
  GetShowHomeBtn(e) {
    var t;
    return !!this.dQc && ((t = this.vLd.get(e)) !== undefined ? t : (t = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e)) ? t.HomeBtnShowType === 1 : (Log_1.Log.CheckError() && Log_1.Log.Error("HomeBtn", 87, "未找到UI界面配置", ["ViewName:", e]), false));
  }
  set EnableHomeBtnFunction(e) {
    this.dQc = e;
  }
  get EnableHomeBtnFunction() {
    return this.dQc;
  }
  GmSetHomeBtnShow(e, t) {
    this.vLd.set(e, t);
  }
  AddViewNameToNoFindComponent(e) {
    this.K9d.add(e);
  }
  GetNeedFindComponent(e) {
    return !this.K9d.has(e);
  }
  OnClear() {
    EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.BtnStateUpdate, this.lnm);
    this.vLd.clear();
    this.K9d.clear();
    return true;
  }
}
exports.HomeBtnModel = HomeBtnModel;
//# sourceMappingURL=HomeBtnModel.js.map