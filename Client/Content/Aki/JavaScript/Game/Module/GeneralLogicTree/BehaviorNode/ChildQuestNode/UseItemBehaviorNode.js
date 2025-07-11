"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseItemBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class UseItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.xXt = undefined;
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && e.Condition.Type === IQuest_1.EChildQuest.UseItem && (this.TrackTextRuleInner = 1, true);
  }
  OnUpdateProgress(e) {
    return !!e.bVn && (this.xXt = e.bVn, true);
  }
  GetProgress() {
    return this.xXt?.m9n?.toString() ?? "0";
  }
}
exports.UseItemBehaviorNode = UseItemBehaviorNode;
//# sourceMappingURL=UseItemBehaviorNode.js.map