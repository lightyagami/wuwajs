"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralLogicTreeModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const MissionViewDefine_1 = require("../BattleUi/Views/MissionView/MissionViewDefine");
const BaseBehaviorTree_1 = require("./BaseBehaviorTree/BaseBehaviorTree");
const GeneralLogicTreeDefine_1 = require("./Define/GeneralLogicTreeDefine");
const GeneralLogicTreeUtil_1 = require("./GeneralLogicTreeUtil");
class GeneralLogicTreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.dYt = undefined;
    this.CYt = undefined;
    this.c$1 = undefined;
    this.gYt = undefined;
    this.pKs = undefined;
    this.fYt = undefined;
    this.IsWakeUp = false;
    this.ExpressionOccupationTreeIncId = undefined;
    this.CountDownViewClosing = false;
    this.DisableInput = false;
    this.nno = 0;
    this.HistorySoarScore = 0;
  }
  OnInit() {
    this.dYt = BigInt(0);
    this.CYt = new Map();
    this.c$1 = new Map();
    this.gYt = new Map();
    this.fYt = new Map();
    this.pKs = new Map();
    return true;
  }
  OnLeaveLevel() {
    this.pYt();
    return true;
  }
  OnChangeMode() {
    this.pYt();
    return true;
  }
  pYt() {
    for (var [, e] of this.CYt) {
      e.SetSleep(true);
    }
    this.IsWakeUp = false;
  }
  OnClear() {
    this.CYt?.clear();
    this.CYt = undefined;
    this.gYt?.clear();
    this.gYt = undefined;
    this.fYt?.clear();
    this.fYt = undefined;
    this.c$1?.clear();
    return !(this.c$1 = undefined);
  }
  SetTimerUiOwnerId(e) {
    this.dYt = e;
  }
  IsTimerUiOwner(e) {
    return this.dYt === e;
  }
  CreateBehaviorTree(i) {
    var r = MathUtils_1.MathUtils.LongToBigInt(i.C9n);
    let t = this.CYt.get(r);
    if (t) {
      t.Recover(i);
      return t;
    }
    let n = !this.IsWakeUp;
    switch (i.hps) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        var o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i.sEs);
        if (o) {
          s = o.IsHideInTaskList || o.Type === 11;
          t = new BaseBehaviorTree_1.BaseBehaviorTree(r, i.sEs, i.hps, o.DungeonId, o.QuestMarkId, o.OnlineType, o.GetUiPriority(), o.IsNewQuest, s);
          o.SetUpBehaviorTree(t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "创建任务行为树时：任务不存在", ["任务Id", i.sEs]);
        }
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        {
          var s = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(i.sEs);
          if (!s) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "创建玩法行为树时：玩法不存在", ["玩法Id", i.sEs]);
            }
            break;
          }
          let e = undefined;
          if (s.CustomIconId !== 0) {
            e = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(s.CustomIconId)?.MarkId;
          }
          (t = new BaseBehaviorTree_1.BaseBehaviorTree(r, i.sEs, i.hps, ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e ?? GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID, s.OnlineType, s.GetUiPriority())).SetUseInnerTrackIconId(e !== undefined);
          s.SetUpBehaviorTree(t);
          break;
        }
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        {
          o = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
          if (!o) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "创建副本行为树时：副本不存在", ["副本Id", i.sEs]);
            }
            break;
          }
          let e = GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;
          switch (o.SubType) {
            case 2:
              e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(1);
              break;
            case 1:
              e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(3);
          }
          n = !ModelManager_1.ModelManager.GameModeModel.WorldDone;
          t = new BaseBehaviorTree_1.BaseBehaviorTree(r, i.sEs, i.hps, ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e, o.OnlineType, o.GetUiPriority());
          o.SetUpBehaviorTree(t);
          break;
        }
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "创建行为树时找不到对应的行为树类型", ["行为树类型Id", i.hps]);
        }
    }
    if (t) {
      this.CYt.set(r, t);
      this.fYt.set(r, i.d9n);
      let e = this.gYt.get(i.hps);
      if (!e) {
        e = new Map();
        this.gYt.set(i.hps, e);
      }
      e.set(r, t);
      t.InitTree(i, n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCreateBehaviorTree, r);
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GeneralLogicTree", 18, "创建行为树失败", ["行为树类型Id", i.hps], ["行为树Id", i.sEs]);
    }
  }
  RemoveBehaviorTree(e) {
    var i = this.CYt.get(e);
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, e);
      i.Destroy();
      this.CYt.delete(e);
      this.gYt.get(i.BtType)?.delete(e);
      return i;
    }
  }
  AddToPendingDestroy(e, i) {
    if (this.c$1) {
      this.c$1.set(e, i);
    }
  }
  TryToRemovePendingDestroy(e) {
    if (this.c$1 && this.CYt?.get(e) === undefined) {
      this.c$1.delete(e);
    }
  }
  GetBehaviorTree(e, i = false) {
    var r = this.CYt.get(e);
    if (r || !i) {
      return r;
    } else {
      return this.c$1.get(e);
    }
  }
  GetBehaviorTreeOwnerId(e) {
    if (e !== undefined) {
      return this.fYt.get(e);
    }
  }
  GetAllBehaviorTrees() {
    return this.CYt;
  }
  SaveUpdateInfo(e, i) {
    var r;
    var t;
    var n;
    var e = this.GetBehaviorTree(e);
    if (e) {
      n = (e = e.GetBlackBoard()).CreateShowData();
      r = e.ContainTag(8);
      t = ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
      n = new MissionViewDefine_1.QuestUpdateTipsShowData(n, t, r, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestUpdateInfoAdd, n);
      e.RemoveTag(8);
    }
  }
  SaveUpdateInfoByQuestId(e) {
    var i;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e) {
      i = ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
      e = MissionViewDefine_1.LackResourceQuestViewShowData.Create(e.Id, e.QuestMarkId, e.NameKey, new MissionViewDefine_1.LackResourceQuestTextInfo("quest_lackResource_text"), undefined);
      e = new MissionViewDefine_1.QuestUpdateTipsShowData(e, i, true, 0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestUpdateInfoAdd, e);
    }
  }
  ApplyExpressionOccupation(e) {
    if (e && this.ExpressionOccupationTreeIncId !== e) {
      this.ExpressionOccupationTreeIncId = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation, e);
    }
  }
  IsExpressionInOccupying() {
    return this.ExpressionOccupationTreeIncId !== undefined;
  }
  IsExpressionOccupyingByTree(e) {
    return this.ExpressionOccupationTreeIncId !== undefined && this.ExpressionOccupationTreeIncId === e;
  }
  TryReleaseExpressionOccupation(e) {
    if (this.ExpressionOccupationTreeIncId && this.ExpressionOccupationTreeIncId === e) {
      this.ExpressionOccupationTreeIncId = undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation, e);
    }
  }
  UpdateGuideLineStartShowTime() {
    this.nno = TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetGuideLineStartShowTime() {
    return this.nno;
  }
  AddOccupationInfo(e) {
    this.pKs.set(e.qEs, MathUtils_1.MathUtils.LongToBigInt(e.w5n));
  }
  RemoveOccupationInfo(e) {
    this.pKs.delete(e);
  }
  IsOccupationExist(e) {
    return this.pKs.get(e) !== undefined;
  }
  GetOccupationTreeId(e) {
    return this.pKs.get(e);
  }
  GetOccupationQuestName(e) {
    var e = this.pKs.get(e);
    if ((e = e && this.GetBehaviorTree(e)) && e.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
      return ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId)?.Name ?? "";
    } else {
      return "";
    }
  }
  GetBehaviorTreeName(e) {
    var e = this.GetBehaviorTree(e);
    let i = "";
    if (e) {
      e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(e.BtType, e.TreeConfigId);
      i = e.Name;
    }
    return i;
  }
}
exports.GeneralLogicTreeModel = GeneralLogicTreeModel;
//# sourceMappingURL=GeneralLogicTreeModel.js.map