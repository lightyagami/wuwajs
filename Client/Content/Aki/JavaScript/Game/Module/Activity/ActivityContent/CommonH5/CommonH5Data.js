"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonH5Data = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const H5JumpActivityById_1 = require("../../../../../Core/Define/ConfigQuery/H5JumpActivityById");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const CLICKKEY = 1;
class CommonH5Data extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.GmUrl = undefined;
    this.wer = false;
    this.NWu = false;
  }
  PhraseEx(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Activity", 27, "解析通用H5活动数据", ["ActivityData", t]);
    }
    t = t.u4f;
    if (t !== undefined) {
      this.ChangeServerRedDotState(t.qKc);
    }
  }
  GetBgPrefabPath() {
    return H5JumpActivityById_1.configH5JumpActivityById.GetConfig(this.Id)?.BgPath ?? "";
  }
  ChangeServerRedDotState(t) {
    this.wer = t;
  }
  GetClickRedDotState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, CLICKKEY, 0, 0) === 0;
  }
  SetCurrentLoginClickState(t) {
    this.NWu = t;
  }
  SaveClickRedDotState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, CLICKKEY, 0, 0, 1);
  }
  GetExDataRedPointShowState() {
    return this.GetClickRedDotState() || this.wer && !this.NWu;
  }
  GetRootUrl() {
    var t;
    if (this.GmUrl !== undefined && this.GmUrl !== "") {
      return this.GmUrl;
    } else {
      t = H5JumpActivityById_1.configH5JumpActivityById.GetConfig(this.Id);
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
        return t?.OverseaRootUrl;
      } else {
        return t?.CNRootUrl;
      }
    }
  }
}
exports.CommonH5Data = CommonH5Data;
//# sourceMappingURL=CommonH5Data.js.map