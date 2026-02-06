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
    this.lYm = 0;
    this.pQa = false;
    this._Ym = 0;
  }
  GetExDataRedPointShowState() {
    return !!ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this._Ym) && ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityRedDot(this._Ym);
  }
  PhraseEx(t) {
    t = t.zWm;
    if (t) {
      this.FRe = t.B5n;
      this.THs = t.P6n;
      this.lYm = t.JWm;
      this.pQa = t.ZWm;
      this._Ym = t.eQm;
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
    return this.lYm;
  }
  GetIsReceiveReward() {
    return this.pQa;
  }
  GetPhantomArenaActivityId() {
    return this._Ym;
  }
}
exports.PhantomArenaGuideActivityData = PhantomArenaGuideActivityData;
//# sourceMappingURL=PhantomArenaGuideActivityData.js.map