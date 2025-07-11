"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetItemBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GetItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.xXt = undefined;
    this.KXt = 0;
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && e.Condition.Type === IQuest_1.EChildQuest.GetItem && (this.KXt = e.Condition.Items.length, this.TrackTextRuleInner = 1, true);
  }
  OnUpdateProgress(e) {
    this.xXt = e.CEs;
    return true;
  }
  GetProgress() {
    return this.KXt.toString();
  }
  GetProgressMax() {
    return this.xXt?.YVn?.length.toString() ?? "0";
  }
}
exports.GetItemBehaviorNode = GetItemBehaviorNode;
//# sourceMappingURL=GetItemBehaviorNode.js.map