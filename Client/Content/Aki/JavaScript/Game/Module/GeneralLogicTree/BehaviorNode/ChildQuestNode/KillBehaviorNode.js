"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KillBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class KillBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.xXt = undefined;
    this.PXt = [];
    this.$Xt = 0;
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) {
      return false;
    }
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.Kill) {
      return false;
    }
    this.TrackTextRuleInner = 1;
    this.PXt = [];
    for (const t of e.ExistTargets) {
      this.PXt.push(t);
    }
    for (const s of e.TargetsToAwake) {
      this.PXt.push(s);
    }
    this.$Xt = e.ExistTargets.length + e.TargetsToAwake.length;
    return true;
  }
  OnUpdateProgress(e) {
    return !!e.mEs && (this.xXt = e.mEs, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeEntityKilled, this.NodeId, this.xXt.SEs), true);
  }
  GetProgress() {
    if (this.IsSuccess) {
      return this.GetProgressMax();
    } else {
      return this.xXt?.SEs?.length.toString() ?? "0";
    }
  }
  GetProgressMax() {
    if (this.xXt) {
      return this.xXt?.IEs?.toString() ?? "0";
    } else {
      return this.$Xt.toString();
    }
  }
}
exports.KillBehaviorNode = KillBehaviorNode;
//# sourceMappingURL=KillBehaviorNode.js.map