"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyQuest = undefined;
const Quest_1 = require("./Quest");
class DailyQuest extends Quest_1.Quest {
  constructor() {
    super(...arguments);
    this.TriggerQuestTips = false;
  }
  SetUpBehaviorTree(e) {
    super.SetUpBehaviorTree(e);
    e.SetMapMarkResident(true);
  }
}
exports.DailyQuest = DailyQuest;
//# sourceMappingURL=DailyQuest.js.map