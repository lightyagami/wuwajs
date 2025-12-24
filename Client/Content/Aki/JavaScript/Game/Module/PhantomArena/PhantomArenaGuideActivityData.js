"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaGuideActivityData = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityData_1 = require("../Activity/ActivityData");
class PhantomArenaGuideActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.FRe = 0;
    this.THs = 0;
    this.VQm = 0;
    this.pQa = false;
    this.HQm = 0;
  }
  GetExDataRedPointShowState() {
    return !!ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.HQm) && ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityRedDot(this.HQm);
  }
  PhraseEx(t) {
    t = t.Zjm;
    if (t) {
      this.FRe = t.B5n;
      this.THs = t.P6n;
      this.VQm = t.e$m;
      this.pQa = t.t$m;
      this.HQm = t.i$m;
    }
  }
  UpdateReceiveState(t) {
    this.pQa = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetQuestId() {
    return this.FRe;
  }
  GetDropId() {
    return this.THs;
  }
  GetTargetNum() {
    return this.VQm;
  }
  GetIsReceiveReward() {
    return this.pQa;
  }
  GetPhantomArenaActivityId() {
    return this.HQm;
  }
}
exports.PhantomArenaGuideActivityData = PhantomArenaGuideActivityData;
//# sourceMappingURL=PhantomArenaGuideActivityData.js.map