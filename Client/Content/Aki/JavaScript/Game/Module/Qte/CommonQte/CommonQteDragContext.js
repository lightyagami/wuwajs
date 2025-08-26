"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteDragContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteDragContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.s7 = 0;
    this.wco = 0;
    this.fgt = 0;
    this.ZZu = 0;
    this.Type = 3;
  }
  OnSetConfig(t) {
    t = t.BaseConfig.DragConfig;
    this.fgt = t.Direction * MathUtils_1.MathUtils.DegToRad;
    this.ZZu = t.ToleranceAngle * MathUtils_1.MathUtils.DegToRad;
  }
  OnGetAction() {
    return "Ui右摇杆";
  }
  OnGetUiConfig() {
    if (this.Config) {
      return this.Config.BaseConfig.DragConfig;
    }
  }
  OnResponse() {
    if (this.Config && this.IsPending()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PlayExtraEffect(this.HandleId);
      this.AudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventResponse, this.UiActor);
    }
  }
  OnResponseEnd() {
    ControllerHolder_1.ControllerHolder.CommonQteController.StopExtraEffect(this.HandleId);
    if (this.AudioHandle) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.AudioHandle);
      this.AudioHandle = 0;
    }
  }
  OnUpdateTime(t) {
    if (this.Config) {
      this.PassTime += t;
      if (!this.IsPermanent && this.PassTime > this.Duration) {
        this.QteFail();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "Context中获取不到Config", ["QteId", this.QteId]);
      }
      ControllerHolder_1.ControllerHolder.CommonQteController.StopCurrentQte();
    }
  }
  CheckQteConditionMatch() {
    var t = this.Config?.BaseConfig.DragConfig;
    return !!t && this.s7 >= t.SlideLength && Math.abs(this.wco - this.fgt) < this.ZZu;
  }
  SetDraggingInfo(t, e) {
    this.s7 = t;
    this.wco = e;
    this.CheckQteConditionAndDoSuccess();
  }
  IsAttachToActor() {
    return !!this.Config?.BaseConfig.DragConfig.IsAttachToActor;
  }
  GetAttachConfig() {
    return this.Config?.BaseConfig.DragConfig.AttachConfig;
  }
}
exports.CommonQteDragContext = CommonQteDragContext;
//# sourceMappingURL=CommonQteDragContext.js.map