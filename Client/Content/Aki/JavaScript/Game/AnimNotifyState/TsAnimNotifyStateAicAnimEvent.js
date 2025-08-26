"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateAicAnimEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.bCallBegin = false;
    this.bCallEnd = false;
    this.Name = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    var t = t.GetOwner();
    if (this.bCallBegin && t instanceof TsBaseCharacter_1.default && (t = t.GetController()).AicTriggerEvent) {
      t.AicTriggerEvent(this.Name);
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    if (this.bCallEnd && t instanceof TsBaseCharacter_1.default && (t = t.GetController()).AicTriggerEvent) {
      t.AicTriggerEvent(this.Name);
    }
    return true;
  }
  GetNotifyName() {
    return "AIC动画通知事件";
  }
}
exports.default = TsAnimNotifyStateAicAnimEvent;
//# sourceMappingURL=TsAnimNotifyStateAicAnimEvent.js.map