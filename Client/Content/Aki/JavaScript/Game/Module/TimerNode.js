"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerNode = undefined;
const IQuest_1 = require("../../UniverseEditor/Interface/IQuest");
const ChildQuestNodeBase_1 = require("./GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase");
class TimerNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.TimerUiConfig = undefined;
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.Timer && (this.TimerUiConfig = e.UiConfig, true);
  }
}
exports.TimerNode = TimerNode;
//# sourceMappingURL=TimerNode.js.map