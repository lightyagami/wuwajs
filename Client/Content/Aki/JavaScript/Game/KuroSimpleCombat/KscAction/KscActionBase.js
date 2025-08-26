"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionBase = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiAsyncTask_1 = require("../../Ui/Base/UiAsyncTask");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
class KscActionBase {
  constructor(s) {
    this.EntityId = 0;
    this.Promise = undefined;
    this.IsCancel = false;
    this.TaskInternal = undefined;
    this.KscCtrl = undefined;
    this.EntityId = s;
    this.KscCtrl = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController;
  }
  get Name() {
    return `KscAction_[${this.EntityId}]`;
  }
  async Run() {
    if (!this.Promise && !this.IsCancel) {
      this.Promise = new CustomPromise_1.CustomPromise();
      await this.RunContent();
      await this.Promise.Promise;
    }
  }
  Cancel() {
    this.IsCancel = true;
    this.CancelContent();
  }
  SetResult() {
    this.Promise?.SetResult();
  }
  get Task() {
    this.TaskInternal ||= new UiAsyncTask_1.UiAsyncTask(this.Name, this.Run.bind(this), this.Cancel.bind(this), this.LogInfo.bind(this));
    return this.TaskInternal;
  }
  LogInfo() {
    return `${this.constructor.name}[S: ${this.TaskInternal?.Status}]`;
  }
  Info(s, t, ...i) {
    KscLog_1.KscLog.Info(s, 69, KscEnv_1.KscEnv.KscWorld, t, ...i);
  }
  Warn(s, t, ...i) {
    KscLog_1.KscLog.Warn(s, 69, KscEnv_1.KscEnv.KscWorld, t, ...i);
  }
  Error(s, t, ...i) {
    KscLog_1.KscLog.Error(s, 69, KscEnv_1.KscEnv.KscWorld, t, ...i);
  }
  CancelContent() {}
}
exports.KscActionBase = KscActionBase;
//# sourceMappingURL=KscActionBase.js.map