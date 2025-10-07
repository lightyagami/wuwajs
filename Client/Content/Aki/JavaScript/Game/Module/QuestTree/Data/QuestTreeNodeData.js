"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MissionViewStepTextUtil_1 = require("../../BattleUi/Views/MissionView/MissionViewStepTextUtil");
const QuestUtil_1 = require("../../QuestNew/QuestUtil");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const QuestTreeNodeUnlockConditionUtils_1 = require("../QuestTreeNodeUnlockConditionUtils");
class QuestTreeNodeData {
  constructor() {
    this.Id = 0;
    this.Config = undefined;
    this.ChapterId = 0;
    this.RewardItemMap = new Map();
    this.QuestIdList = [];
    this.BelongedNode = undefined;
    this.IsDummy = false;
  }
  get IsTracking() {
    return !this.IsDummy && ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(this.QuestId);
  }
  get Name() {
    if (this.IsDummy) {
      return "QuestTree_Hide";
    } else {
      return this.Config.Name;
    }
  }
  get PreQuestNodes() {
    var e;
    var t = [];
    for (const s of this.Config.PreNode) {
      if (s && s !== this.Id && (e = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.ChapterId)?.NodeMap.get(s))) {
        t.push(e);
      }
    }
    if (this.Config.QuestType === 1 && t.length === 1) {
      var r = t[0];
      if (r.IsMoonChasingQuest()) {
        return r.PreQuestNodes;
      }
    }
    return t;
  }
  get NextQuestNode() {
    var e = this.Config.NextNode;
    if (e !== 0) {
      return ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.ChapterId)?.NodeMap.get(e);
    }
  }
  get State() {
    var e;
    if (this.IsDummy) {
      return 1;
    } else {
      e = ConfigManager_1.ConfigManager.QuestTreeConfig.GetMoonChasingQuestId();
      if (this.Config.QuestArray.includes(e)) {
        if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) >= 2) {
          return 4;
        } else {
          return 0;
        }
      } else if (this.QuestIdList.length === 0 || this.PreQuestNodes.some(e => e.State !== 4)) {
        return 0;
      } else if (this.QuestIdList.every(e => ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 0)) {
        return 1;
      } else if (this.QuestIdList.every(e => ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3)) {
        return 4;
      } else if (this.QuestIdList.some(e => ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 2)) {
        return 3;
      } else if (this.QuestIdList.some(e => ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 1)) {
        return 2;
      } else {
        return 0;
      }
    }
  }
  get Type() {
    if (this.Config.QuestArray.length !== 0) {
      return this.QuestConfig?.Type;
    }
  }
  get TypeIconPath() {
    var e;
    var t = this.Config.QuestArray[0];
    if (t && (e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(this.QuestConfig?.Type ?? 0))) {
      e = QuestUtil_1.QuestUtil.GetQuestMarkId(e.MainId, t) ?? 0;
      return ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e);
    } else {
      return "";
    }
  }
  get StepText() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId);
    if (e && (e = e.Tree?.GetBlackBoard()?.CreateShowData())?.MainStepInfo) {
      return MissionViewStepTextUtil_1.MissionViewStepTextUtil.GetStepTextByConfig(e.Id, e.MainStepInfo);
    } else {
      return "";
    }
  }
  get Desc() {
    if (this.State === 3) {
      return this.QuestConfig?.TidDesc ?? "";
    } else if (this.State === 4) {
      return this.Config.Summary;
    } else {
      return "";
    }
  }
  get RewardList() {
    var e = [];
    for (const t of this.RewardItemMap.values()) {
      e.push(t);
    }
    return e;
  }
  get ImageSmall() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (this.State === 4) {
      if (!this.Config.ImageSmall || this.Config.ImageSmallFemale && e === 0) {
        return this.Config.ImageSmallFemale;
      } else {
        return this.Config.ImageSmall;
      }
    } else if (e === 0) {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_QuestTree_Chapter_Nv_Small");
    } else {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_QuestTree_Chapter_Nan_Small");
    }
  }
  get ImageLarge() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (this.State === 4) {
      if (!this.Config.ImageLarge || this.Config.ImageLargeFemale && e === 0) {
        return this.Config.ImageLargeFemale;
      } else {
        return this.Config.ImageLarge;
      }
    } else if (e === 0) {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TaskTreeMainBgRoleNv");
    } else {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TaskTreeMainBgRoleNan");
    }
  }
  static Create(e) {
    var t = new QuestTreeNodeData();
    t.Config = e;
    t.Id = e.Id;
    t.ChapterId = e.ChapterId;
    t.QuestIdList = e.QuestArray;
    var e = t.QuestId;
    for (const s of ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(e) ?? ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfoFromQuestConfig(e) ?? []) {
      var r = s[0].ItemId;
      if (t.RewardItemMap.has(r)) {
        t.RewardItemMap.get(r)[1] += s[1];
      } else {
        t.RewardItemMap.set(r, [s[0], s[1]]);
      }
    }
    return t;
  }
  static CreateDummyNode(e) {
    var t = new QuestTreeNodeData();
    t.Id = 0;
    t.ChapterId = e.ChapterId;
    t.Config = e;
    t.IsDummy = true;
    return t;
  }
  Clear() {
    this.RewardItemMap.clear();
    this.QuestIdList.length = 0;
    this.PreQuestNodes.length = 0;
  }
  GetAllDirectChildrenInUpArea() {
    if (this.Config.QuestType !== 1) {
      return [];
    }
    var e = [];
    for (const t of ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.ChapterId)?.NodeMap.values() ?? []) {
      if (t.Config.QuestType !== 1 && t.Config.PreNode.includes(this.Id) && t.Config.SortOrder < 0) {
        e.push(t);
      }
    }
    return e;
  }
  GetDirectChildrenGroupsInDownArea() {
    var e;
    var t = new Map();
    if (this.Config.QuestType !== 1) {
      return [];
    }
    const r = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.ChapterId);
    for (const i of r?.NodeMap.values() ?? []) {
      if (i.Config.QuestType !== 1 && i.Config.PreNode.includes(this.Id) && i.Config.SortOrder > 0) {
        e = i.Config.NextNode;
        if (!t.has(e)) {
          t.set(e, []);
        }
        t.get(e).push(i);
      }
    }
    for (const a of t.values()) {
      a.sort((e, t) => e.Config.SortOrder - t.Config.SortOrder);
    }
    var s = [];
    for (const n of Array.from(t.keys()).sort((e, t) => (r.NodeMap.get(e)?.Config.SortOrder ?? 0) - (r.NodeMap.get(t)?.Config.SortOrder ?? 0))) {
      s.push(t.get(n));
    }
    return s;
  }
  IsInPredecessorUnion() {
    return !!this.NextQuestNode && this.NextQuestNode.PreQuestNodes.length > 1;
  }
  IsFirstNodeOfPredecessorUnion() {
    var e;
    return !!this.NextQuestNode && !((e = this.NextQuestNode.PreQuestNodes).length <= 1) && e[0].Id === this.Id;
  }
  IsLastNodeOfPredecessorUnion() {
    var e;
    return !!this.NextQuestNode && !((e = this.NextQuestNode.PreQuestNodes).length <= 1) && e[e.length - 1].Id === this.Id;
  }
  IsLastNodeOfMainQuestChildren() {
    let e = [];
    var t = this.PreQuestNodes;
    if (t && t.length !== 0) {
      for (const r of t) {
        if (r.Config.QuestType !== 1) {
          return false;
        }
      }
      if (t.length > 0) {
        return false;
      }
      t = t[0];
      e = t.GetDirectChildrenGroupsInDownArea();
    } else {
      t = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.ChapterId);
      e = t.GetNoParentNodeGroupList();
    }
    t = e[e.length - 1];
    return t[t.length - 1].Id === this.Id;
  }
  IsLastMainNodeOfChapter() {
    return this.Config.QuestType === 1 && (!!this.Config.IsChapterEnding || !!this.IsDummy);
  }
  GetIncludeNodes(e = true) {
    if (this.Config.NodeType !== 3) {
      return [];
    }
    var t;
    var r = [];
    for (const s of this.Config.IncludeNodes) {
      if (s && s !== this.Id && (t = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.ChapterId)?.NodeMap.get(s)) && (t.State !== 0 || e)) {
        r.push(t);
      }
    }
    return r;
  }
  GetIncludeNodesProgress() {
    var e;
    if (this.Config.NodeType !== 3) {
      return [0, 0];
    } else {
      e = this.GetIncludeNodes(true);
      return [this.GetIncludeNodes(false).length, e.length];
    }
  }
  GetTargetDataList() {
    var e = [];
    if (this.State === 2) {
      var t = {
        Type: 2,
        TextKey: this.Config.AccessDesc
      };
      e.push(t);
    } else if (this.State === 3) {
      t = {
        Type: 2,
        Text: this.StepText
      };
      e.push(t);
    } else if (this.State === 1) {
      for (const s of this.QuestConfig?.ProvideType?.Conditions ?? []) {
        var r = QuestTreeNodeUnlockConditionUtils_1.QuestTreeNodeUnlockConditionFactory.Instance.Create(s);
        var r = {
          Type: 1,
          TextKey: r.DefaultText,
          TextParam: r.DefaultTextParam,
          IsFinished: r.IsFinished,
          HelpId: r.DefaultHelp,
          OnGoto: r.HasGoto ? r.DefaultGoto : undefined
        };
        e.push(r);
      }
    }
    return e;
  }
  SetBelongedNode(e) {
    this.BelongedNode ||= e;
  }
  get QuestConfig() {
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(this.QuestId);
  }
  get QuestId() {
    let e = undefined;
    let t = undefined;
    for (const s of this.Config.QuestArray) {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s);
      if (!e && (r === 1 || r === 2)) {
        e = s;
      }
      if (r === 3) {
        t = s;
      }
    }
    return e ?? t ?? this.Config.QuestArray[0] ?? 0;
  }
  GetOnAcceptGoto() {
    if (this.State === 2) {
      const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId);
      if (t?.GetCanAcceptMapMarkId()) {
        return () => {
          var e = {
            MarkId: t.GetCanAcceptMapMarkId(),
            MarkType: 12,
            OpenFogId: 0
          };
          ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
          return true;
        };
      } else if (this.Config.AccessPath) {
        return () => {
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Config.AccessPath);
          return true;
        };
      } else {
        return () => {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("QuestTree_QuestTrackTips");
          return false;
        };
      }
    }
  }
  IsMoonChasingQuest() {
    var e = ConfigManager_1.ConfigManager.QuestTreeConfig.GetMoonChasingQuestId();
    return this.Config.QuestArray.includes(e);
  }
  HasNewTag() {
    return false;
  }
  RemoveNewTag() {}
}
exports.QuestTreeNodeData = QuestTreeNodeData;
//# sourceMappingURL=QuestTreeNodeData.js.map