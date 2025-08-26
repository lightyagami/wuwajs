"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteSelectOptionContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QteDefine_1 = require("../QteDefine");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteSelectOptionContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.ResponseCount = 0;
    this.TargetCount = -1;
    this.SelectOption = -1;
    this.DefaultOption = -1;
    this.Type = 4;
  }
  OnSetConfig(t) {
    this.TargetCount = 1;
    this.DefaultOption = t.BaseConfig.SelectOptionConfig.DefaultOption;
  }
  OnResponse() {
    if (this.Config) {
      if (this.IsPending() || this.IsPendingSuccess()) {
        if (this.IsPending()) {
          this.ResponseCount += 1;
        }
        if (this.CheckQteConditionMatch()) {
          if (this.PassTime < this.LeastDuration) {
            this.QtePendingSuccess();
          } else {
            this.QteSuccess();
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte无法接收响应", ["HandleId", this.HandleId], ["QteId", this.QteId], ["State", this.State]);
      }
    }
  }
  OnQteFail() {
    this.SelectOption = this.DefaultOption;
  }
  OnUpdateTime(t) {
    if (this.Config) {
      this.PassTime += t;
      if (this.CheckQteConditionMatch()) {
        if (this.PassTime < this.LeastDuration) {
          this.QtePendingSuccess();
        } else {
          this.QteSuccess();
        }
      } else if (!this.IsPermanent && this.PassTime > this.Duration) {
        this.QteFail();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "Context中获取不到Config", ["QteId", this.QteId]);
      }
      ControllerHolder_1.ControllerHolder.CommonQteController.StopCurrentQte();
    }
  }
  GetAction(t) {
    return this.OnGetAction(t);
  }
  OnGetAction(t) {
    if (this.Config && (t = this.Config.BaseConfig.SelectOptionConfig.UIConfigList.Get(t ?? 0).Action) > 0 && t < QteDefine_1.qteInputActions.length) {
      return QteDefine_1.qteInputActions[t];
    } else {
      return undefined;
    }
  }
  OnGetUiConfig() {
    if (this.Config) {
      return this.Config.BaseConfig.SelectOptionConfig;
    }
  }
  CheckQteConditionMatch() {
    return this.ResponseCount >= this.TargetCount;
  }
  IsAttachToActor() {
    return !!this.Config?.BaseConfig.SelectOptionConfig.IsAttachToActor;
  }
  GetAttachConfig() {
    return this.Config?.BaseConfig.SelectOptionConfig.AttachConfig;
  }
}
exports.CommonQteSelectOptionContext = CommonQteSelectOptionContext;
//# sourceMappingURL=CommonQteSelectOptionContext.js.map