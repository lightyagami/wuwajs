"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviourHomeBtn = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
class UiBehaviourHomeBtn {
  constructor() {
    this.Lto = undefined;
  }
  SetViewInfo(e) {
    this.Lto = e;
  }
  OnAfterUiStart() {
    var e;
    var r;
    var o;
    if (this.Lto && this.Lto.Info && (r = this.Lto, e = this.Lto.Info.Name, ModelManager_1.ModelManager.HomeBtnModel.GetShowHomeBtn(r)) && (r.Info?.Type === UiLayerType_1.ELayerType.Normal || r.Info?.Type === UiLayerType_1.ELayerType.Pop) && ModelManager_1.ModelManager.HomeBtnModel.GetNeedFindComponent(e)) {
      r = r.GetRootActor();
      if (r = UE.LGUIBPLibrary.GetComponentInChildren(r, UE.TsUiHomeHelper_C.StaticClass(), false)) {
        if ((o = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e)?.HomeBtnStyle) !== undefined) {
          r.CreateHomeBtn(o);
        }
      } else {
        ModelManager_1.ModelManager.HomeBtnModel.AddViewNameToNoFindComponent(e);
      }
    }
  }
  OnBeforeDestroy() {
    if (this.Lto && this.Lto.Info) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.RemoveExtraCallback(this.Lto.Info.Name);
    }
  }
  AddExtraAsyncCallback(e) {
    if (this.Lto && this.Lto.Info) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.AddExtraAsyncCallback(this.Lto.Info.Name, e);
    }
  }
  AddExtraCallback(e) {
    if (this.Lto && this.Lto.Info) {
      ControllerHolder_1.ControllerHolder.HomeBtnController.AddExtraCallback(this.Lto.Info.Name, e);
    }
  }
}
exports.UiBehaviourHomeBtn = UiBehaviourHomeBtn;
//# sourceMappingURL=UiBehaviourHomeBtn.js.map