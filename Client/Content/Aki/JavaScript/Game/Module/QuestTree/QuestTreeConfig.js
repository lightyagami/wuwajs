"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const NodeUnlockDefaultById_1 = require("../../../Core/Define/ConfigQuery/NodeUnlockDefaultById");
const QuestTreeChapterAll_1 = require("../../../Core/Define/ConfigQuery/QuestTreeChapterAll");
const QuestTreeChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestTreeChapterById");
const QuestTreeCustomJumpConfigAll_1 = require("../../../Core/Define/ConfigQuery/QuestTreeCustomJumpConfigAll");
const QuestTreeNodeByChapterId_1 = require("../../../Core/Define/ConfigQuery/QuestTreeNodeByChapterId");
const QuestTreeNodeById_1 = require("../../../Core/Define/ConfigQuery/QuestTreeNodeById");
const QuestTreeNodeUnlockById_1 = require("../../../Core/Define/ConfigQuery/QuestTreeNodeUnlockById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class QuestTreeConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.w7m = new Map();
  }
  OnInit() {
    for (const r of this.GetAllCustomGotoConfig()) {
      let e = this.w7m.get(r.QuestId);
      if (!e) {
        e = new Map();
        this.w7m.set(r.QuestId, e);
      }
      e.set(r.PreConditionType, r);
    }
    return true;
  }
  OnClear() {
    for (var [, e] of this.w7m) {
      e.clear();
    }
    this.w7m.clear();
    return true;
  }
  GetAllChapters() {
    return QuestTreeChapterAll_1.configQuestTreeChapterAll.GetConfigList() ?? [];
  }
  GetChapterById(e) {
    return QuestTreeChapterById_1.configQuestTreeChapterById.GetConfig(e);
  }
  GetNodeListByChapterId(e) {
    return QuestTreeNodeByChapterId_1.configQuestTreeNodeByChapterId.GetConfigList(e) ?? [];
  }
  GetNodeById(e) {
    return QuestTreeNodeById_1.configQuestTreeNodeById.GetConfig(e);
  }
  GetNodeUnlockConditionById(e) {
    return QuestTreeNodeUnlockById_1.configQuestTreeNodeUnlockById.GetConfig(e);
  }
  GetNodeUnlockConditionDefaultConfigByType(e) {
    return NodeUnlockDefaultById_1.configNodeUnlockDefaultById.GetConfig(e);
  }
  GetMoonChasingQuestId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MoonChasingQuestId") ?? 0;
  }
  GetScrollingScaleDelta() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("QuestTreeScrollingScaleDelta") ?? 0.01;
  }
  GetCustomGotoConfigByQuestIdAndType(e, r) {
    return this.w7m.get(e)?.get(r);
  }
  GetAllCustomGotoConfig() {
    return QuestTreeCustomJumpConfigAll_1.configQuestTreeCustomJumpConfigAll.GetConfigList() ?? [];
  }
}
exports.QuestTreeConfig = QuestTreeConfig;
//# sourceMappingURL=QuestTreeConfig.js.map