"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieProtocolContext = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const H5CircumUrlById_1 = require("../../../../../../Core/Define/ConfigQuery/H5CircumUrlById");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityData_1 = require("../../../ActivityData");
const CLICKKEY = 1;
class InviteNewbieProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor(e) {
    super();
    this.Kk1 = undefined;
    this.wer = false;
    this.NWu = false;
    this.Score = 0;
    this.AttachedModel = undefined;
    this.AttachedModel = e;
  }
  get InviteCode() {
    return this.Kk1;
  }
  set InviteCode(e) {
    this.Kk1 = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InviteNewbieInviteCodeChanged, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InviteNewbie", 64, "邀请码变更", ["InviteCode", e]);
    }
  }
  Dispose() {}
  PhraseEx(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InviteNewbie", 64, "解析邀请新人活动数据", ["ActivityData", e]);
    }
    e = e.KRc;
    if (e !== undefined) {
      this.InviteCode = e.XRc;
      this.Score = e.SMs;
      this.ChangeServerRedDotState(e.qKc);
    }
  }
  get BgPath() {
    var e = this.Id;
    return H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.BgPath;
  }
  SetCurrentLoginClickState(e) {
    this.NWu = e;
  }
  GetClickRedDotState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, CLICKKEY, 0, 0) === 0;
  }
  SaveClickRedDotState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, CLICKKEY, 0, 0, 1);
  }
  ChangeServerRedDotState(e) {
    this.wer = e;
  }
  GetExDataRedPointShowState() {
    return this.GetClickRedDotState() || this.wer && !this.NWu;
  }
}
exports.InviteNewbieProtocolContext = InviteNewbieProtocolContext;
//# sourceMappingURL=InviteNewbieProtocolContext.js.map