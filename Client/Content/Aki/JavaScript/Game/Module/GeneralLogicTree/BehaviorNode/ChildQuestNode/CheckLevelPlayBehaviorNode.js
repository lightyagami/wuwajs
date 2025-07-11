"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckLevelPlayBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckLevelPlayBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.xXt = -0;
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && e.Condition.Type === IQuest_1.EChildQuest.CheckLevelPlay && (this.xXt = 0, this.TrackTextRuleInner = 1, true);
  }
  OnUpdateProgress(e) {
    this.xXt = e.fEs ?? 0;
    return true;
  }
  GetProgress() {
    return this.xXt.toString();
  }
}
exports.CheckLevelPlayBehaviorNode = CheckLevelPlayBehaviorNode;
//# sourceMappingURL=CheckLevelPlayBehaviorNode.js.map