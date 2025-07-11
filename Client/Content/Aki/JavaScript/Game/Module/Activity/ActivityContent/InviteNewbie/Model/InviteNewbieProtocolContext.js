"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieProtocolContext = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ActivityData_1 = require("../../../ActivityData");
class InviteNewbieProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor(e) {
    super();
    this.Kk1 = undefined;
    this.Score = 0;
    this.i5l = undefined;
    this.i5l = e;
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
    }
  }
  GetExDataRedPointShowState() {
    return this.i5l.HasRedDot;
  }
}
exports.InviteNewbieProtocolContext = InviteNewbieProtocolContext;
//# sourceMappingURL=InviteNewbieProtocolContext.js.map