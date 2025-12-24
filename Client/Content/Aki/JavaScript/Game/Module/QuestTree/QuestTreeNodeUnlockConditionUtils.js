"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeUnlockConditionFactory = undefined;
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SkipTaskManager_1 = require("../SkipInterface/SkipTaskManager");
const JUMP_TYPE_HELP = "HelpWindow";
const JUMP_TYPE_GOTO = "OpenBoard";
class QuestTreeNodeUnlockConditionFactory {
  constructor() {
    this.BDd = new Map();
  }
  static get Instance() {
    if (!this.cj) {
      this.cj = new QuestTreeNodeUnlockConditionFactory();
      this.cj.AU();
    }
    return this.cj;
  }
  Create(e, t) {
    var n = this.BDd.get(e.Type);
    if (n) {
      return new n(e, t);
    }
  }
  AU() {
    this.BDd.set("ExploreLevel", QuestTreeNodeUnlockConditionExploreLevel);
    this.BDd.set("PreQuest", QuestTreeNodeUnlockConditionPreQuest);
    this.BDd.set("PreChildQuest", QuestTreeNodeUnlockConditionPreChildQuest);
    this.BDd.set("Item", QuestTreeNodeUnlockConditionItem);
    this.BDd.set("PreLevelPlay", QuestTreeNodeUnlockConditionPreLevelPlay);
    this.BDd.set("Gender", QuestTreeNodeUnlockConditionGender);
    this.BDd.set("OpenDate", QuestTreeNodeUnlockConditionOpenDate);
    this.BDd.set("PreDungeon", QuestTreeNodeUnlockConditionPreDungeon);
    this.BDd.set("SystemState", QuestTreeNodeUnlockConditionSystemState);
  }
}
(exports.QuestTreeNodeUnlockConditionFactory = QuestTreeNodeUnlockConditionFactory).cj = undefined;
class QuestTreeNodeUnlockConditionBase {
  constructor(e, t) {
    this.Condition = e;
    this.QuestId = t;
    this.HasGotoByDefault = false;
    this.Type = undefined;
    this.CustomConfig = undefined;
    this.DefaultGoto = () => {};
    this.Goto = () => {
      if (this.CustomConfig && this.CustomConfig.JumpType === JUMP_TYPE_GOTO) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.CustomConfig.ParamsId);
      } else {
        this.DefaultGoto();
      }
    };
    this.Type = e.Type;
    this.CustomConfig = ConfigManager_1.ConfigManager.QuestTreeConfig.GetCustomGotoConfigByQuestIdAndType(t, this.Type);
  }
  get HasGoto() {
    return this.CustomConfig?.JumpType === JUMP_TYPE_GOTO || this.HasGotoByDefault;
  }
  get DefaultText() {
    var e = ConfigManager_1.ConfigManager.QuestTreeConfig.GetNodeUnlockConditionDefaultConfigByType(this.Type);
    if (e) {
      return e.Desc;
    } else {
      return "";
    }
  }
  get DefaultHelpId() {
    var e = ConfigManager_1.ConfigManager.QuestTreeConfig.GetNodeUnlockConditionDefaultConfigByType(this.Type);
    if (e) {
      return e.HelpId;
    } else {
      return 0;
    }
  }
  get Text() {
    if (this.CustomConfig) {
      return this.CustomConfig.CustomTextKey;
    } else {
      return this.DefaultText;
    }
  }
  get HelpId() {
    if (this.CustomConfig && this.CustomConfig.JumpType === JUMP_TYPE_HELP) {
      return this.CustomConfig.ParamsId;
    } else {
      return this.DefaultHelpId;
    }
  }
  get TextParam() {
    return [];
  }
}
class QuestTreeNodeUnlockConditionExploreLevel extends QuestTreeNodeUnlockConditionBase {
  constructor() {
    super(...arguments);
    this.Type = "ExploreLevel";
  }
  get IsFinished() {
    var e = this.Condition;
    return ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel() >= e.ExploreLevel;
  }
  get TextParam() {
    return [this.Condition.ExploreLevel];
  }
}
class QuestTreeNodeUnlockConditionPreQuest extends QuestTreeNodeUnlockConditionBase {
  constructor() {
    super(...arguments);
    this.HasGotoByDefault = true;
    this.DefaultGoto = () => {
      var e = this.Condition.PreQuest;
      ControllerHolder_1.ControllerHolder.QuestTreeController.JumpToQuest(e);
    };
  }
  get IsFinished() {
    var e = this.Condition.PreQuest;
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3;
  }
  get TextParam() {
    var e = this.Condition.PreQuest;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e);
    return [PublicUtil_1.PublicUtil.GetConfigTextByKey(e?.TidName ?? "")];
  }
}
class QuestTreeNodeUnlockConditionPreChildQuest extends QuestTreeNodeUnlockConditionBase {
  constructor() {
    super(...arguments);
    this.HasGotoByDefault = true;
    this.DefaultGoto = () => {
      var e = this.Condition.PreQuest;
      ControllerHolder_1.ControllerHolder.QuestTreeController.JumpToQuest(e);
    };
  }
  get IsFinished() {
    var e = this.Condition;
    var t = e.PreChildQuest.QuestId;
    var n = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
    return n === 3 || n === 2 && !!(n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t)) && !!(t = n.Tree?.GetNode(e.PreChildQuest.ChildQuestId)) && t.IsSuccess;
  }
  get TextParam() {
    var e = this.Condition;
    var t = e.PreChildQuest.QuestId;
    var n = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(t);
    var n = PublicUtil_1.PublicUtil.GetConfigTextByKey(n?.TidName ?? "");
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
    if (t && (e = t.Tree?.GetNode(e.PreChildQuest.ChildQuestId)) && (t = ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetNodeTrackText(t.TreeId, e.NodeId))) {
      return [t];
    } else {
      return [n];
    }
  }
}
class QuestTreeNodeUnlockConditionItem extends QuestTreeNodeUnlockConditionBase {
  get IsFinished() {
    for (const n of this.Condition.Items) {
      var e = n.ItemId;
      var t = n.Count;
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) < t) {
        return false;
      }
    }
    return true;
  }
}
class QuestTreeNodeUnlockConditionPreLevelPlay extends QuestTreeNodeUnlockConditionBase {
  get IsFinished() {
    var e = this.Condition.PreLevelPlay;
    return ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(e, ICondition_1.ELevelPlayState.Complete, "Eq");
  }
  get TextParam() {
    var e = this.Condition.PreLevelPlay;
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e);
    if (e) {
      return [PublicUtil_1.PublicUtil.GetConfigTextByKey(e.Name)];
    } else {
      return [];
    }
  }
}
class QuestTreeNodeUnlockConditionGender extends QuestTreeNodeUnlockConditionBase {
  get IsFinished() {
    return (this.Condition.Gender === "女" ? 0 : 1) === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
  }
}
class QuestTreeNodeUnlockConditionOpenDate extends QuestTreeNodeUnlockConditionBase {
  get IsFinished() {
    return false;
  }
}
class QuestTreeNodeUnlockConditionPreDungeon extends QuestTreeNodeUnlockConditionBase {
  get IsFinished() {
    var e = this.Condition.Dungeon.DungeonId;
    return ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e);
  }
  get TextParam() {
    var e = this.Condition.Dungeon.DungeonId;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    if (e) {
      return [PublicUtil_1.PublicUtil.GetConfigTextByKey(e.MapName)];
    } else {
      return [];
    }
  }
}
class QuestTreeNodeUnlockConditionSystemState extends QuestTreeNodeUnlockConditionBase {
  get IsFinished() {
    var e = this.Condition;
    switch (e.Config.Type) {
      case ICondition_1.ECheckSystemStateType.TrackMoonBuilding:
        return ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(e.Config.BuildingId).IsBuild === e.Config.IsBuilt;
      case ICondition_1.ECheckSystemStateType.TrackMoonPopularity:
        var t = e.Config.Popularity;
        var n = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
        switch (e.Config.Compare) {
          case "Eq":
            return n === t;
          case "Gt":
            return t < n;
          case "Lt":
            return n < t;
          case "Ge":
            return t <= n;
          case "Le":
            return n <= t;
          case "Ne":
            return n !== t;
          default:
            return false;
        }
      default:
        return false;
    }
  }
}
//# sourceMappingURL=QuestTreeNodeUnlockConditionUtils.js.map