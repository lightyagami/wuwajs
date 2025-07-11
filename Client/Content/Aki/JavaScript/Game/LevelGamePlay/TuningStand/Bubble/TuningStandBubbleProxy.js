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
    this.BPu = new Map();
    this.kPu = undefined;
    this.OPu = () => {
      this.kPu = undefined;
    };
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.Enter, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeEnter());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.StartLink, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeStartLink());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.InvalidLink, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeInValidLink());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.LinkUp, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeLinkUp());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.LinkMiss, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeLinkMiss());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.LinkComplete, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeLinkComplete());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.Reset, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeReset());
    this.BPu.set(IAction_1.ETuningStandBubbleTriggerType.TooLong, new TuningStandBubbleTypeItem_1.TuningStandBubbleTypeTooLong());
    for (const e of t) {
      this.BPu.get(e.TriggerType).Init(e.Flow);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandBubbleEnd, this.OPu);
  }
  TryStartBubbleFlow(t) {
    var e = this.BPu.get(t);
    return !!e && (this.kPu !== t || !!e.GetCanInterruptBySelf()) && !!e.TryStartBubble(this.kPu !== IAction_1.ETuningStandBubbleTriggerType.Enter) && !(this.kPu && this.BPu.get(this.kPu)?.Interrupted(), this.kPu = t, 0);
  }
  Destroy() {
    for (const t of this.BPu) {
      t[1].Destroy();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandBubbleEnd, this.OPu);
    this.BPu.clear();
  }
}
exports.TuningStandBubbleProxy = TuningStandBubbleProxy;
//# sourceMappingURL=TuningStandBubbleProxy.js.map