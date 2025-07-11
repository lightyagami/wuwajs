"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckEntityStateNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckEntityStateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.xXt = undefined;
    this.PXt = [];
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) {
      return false;
    }
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.CheckEntityState) {
      return false;
    }
    if (e.Conditions) {
      this.PXt = [];
      for (const t of e.Conditions) {
        this.PXt.push(t.EntityId);
      }
    }
    this.TrackTextRuleInner = 1;
    return true;
  }
  OnUpdateProgress(e) {
    return !!e.MEs && (this.xXt = e.MEs, true);
  }
  GetProgress() {
    return this.xXt?.F4n?.length.toString() ?? "0";
  }
  GetProgressMax() {
    return this.PXt?.length.toString() ?? "0";
  }
}
exports.CheckEntityStateNode = CheckEntityStateNode;
//# sourceMappingURL=CheckEntityStateNode.js.map