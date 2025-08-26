"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandBubbleProxy = undefined;
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TuningStandBubbleTypeItem_1 = require("./TuningStandBubbleTypeItem");
class TuningStandBubbleProxy {
  constructor(t) {
    this.lxu = new Map();
    this._xu = undefined;
    this.uxu = () => {
      this._xu = undefined;
    };
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.Enter, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeEnter());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.StartLink, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeStartLink());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.InvalidLink, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeInValidLink());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.LinkUp, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeLinkUp());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.LinkMiss, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeLinkMiss());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.LinkComplete, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeLinkComplete());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.Reset, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeReset());
    this.lxu.set(IAction_1.ETuningStandBubbleTriggerType.TooLong, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeTooLong());
    for (const e of t) {
      this.lxu.get(e.TriggerType).Init(e.Flow);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandBubbleEnd, this.uxu);
  }
  TryStartBubbleFlow(t) {
    var e = this.lxu.get(t);
    return !!e && (this._xu !== t || !!e.GetCanInterruptBySelf()) && !!e.TryStartBubble(this._xu !== IAction_1.ETuningStandBubbleTriggerType.Enter) && !(this._xu && this.lxu.get(this._xu)?.Interrupted(), this._xu = t, 0);
  }
  Destroy() {
    for (const t of this.lxu) {
      t[1].Destroy();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandBubbleEnd, this.uxu);
    this.lxu.clear();
  }
}
exports.TuningStandBubbleProxy = TuningStandBubbleProxy;
//# sourceMappingURL=TuningStandBubbleProxy.js.map