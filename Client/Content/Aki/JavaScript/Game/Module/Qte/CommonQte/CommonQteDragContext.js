"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteDragContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
const DEGREE_90_RAD = Math.PI * 0.5;
const DEGREE_270_RAD = Math.PI * -0.5;
class CommonQteDragContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.s7 = 0;
    this.wco = 0;
    this.fgt = 0;
    this.UZu = 0;
    this.Type = 3;
  }
  OnSetConfig(t) {
    t = t.BaseConfig.DragConfig;
    this.fgt = t.Direction * MathUtils_1.MathUtils.DegToRad;
    this.UZu = t.ToleranceAngle * MathUtils_1.MathUtils.DegToRad;
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
    if (t) {
      if (t.ViewType === 0) {
        if (this.s7 >= t.SlideLength && Math.abs(this.wco - this.fgt) <= this.UZu) {
          return true;
        }
      } else if (t.ViewType === 2) {
        if (this.s7 >= t.SlideLength && Math.abs(this.wco - DEGREE_90_RAD) <= this.UZu) {
          return true;
        }
      } else if (t.ViewType === 3) {
        if (this.s7 >= t.SlideLength && Math.abs(this.wco - DEGREE_270_RAD) <= this.UZu) {
          return true;
        }
      } else if (t.ViewType === 4) {
        if (Math.abs(this.wco - DEGREE_90_RAD) <= this.UZu) {
          return true;
        }
      } else if (t.ViewType === 5 && this.s7 >= 1) {
        return true;
      }
    }
    return false;
  }
  GetProgress() {
    var t = this.Config?.BaseConfig.DragConfig;
    if (t) {
      if (t.ViewType === 2) {
        if (Math.abs(this.wco - DEGREE_90_RAD) < this.UZu) {
          return this.s7 / t.SlideLength;
        } else {
          return 0;
        }
      } else if (t.ViewType === 3) {
        if (Math.abs(this.wco - DEGREE_270_RAD) < this.UZu) {
          return this.s7 / t.SlideLength;
        } else {
          return 0;
        }
      } else if (t.ViewType === 4) {
        return Math.abs(this.wco) / DEGREE_90_RAD;
      } else if (t.ViewType === 5) {
        return this.s7;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  SetDraggingInfo(t, i) {
    this.s7 = t;
    this.wco = i;
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