"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreAreaMissionData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
class ExploreAreaMissionData {
  constructor(s) {
    this.AreaId = 0;
    this.QuestId = 0;
    this.QuestNameId = undefined;
    this.QuestStatus = undefined;
    this.QuestType = undefined;
    this.AreaId = s.Area;
    this.QuestId = s.Id;
    var s = ModelManager_1.ModelManager.QuestNewModel;
    var t = s.GetQuestConfig(this.QuestId);
    this.QuestStatus = s.GetQuestState(this.QuestId);
    this.QuestNameId = t?.TidName;
    this.QuestType = t?.Type;
  }
  IsQuestVisible() {
    var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId);
    return !!s && s.CanShowInUiPanel();
  }
  IsBranchQuest() {
    return this.QuestType === 2;
  }
}
exports.ExploreAreaMissionData = ExploreAreaMissionData;
//# sourceMappingURL=ExploreAreaMissionData.js.map