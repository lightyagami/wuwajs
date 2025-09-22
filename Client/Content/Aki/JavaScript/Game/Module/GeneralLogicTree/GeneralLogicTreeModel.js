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
    this.GuaranteeActionsWhenLogicTreeRemove = undefined;
  }
  OnInit() {
    this.dYt = BigInt(0);
    this.CYt = new Map();
    this.c$1 = new Map();
    this.gYt = new Map();
    this.fYt = new Map();
    this.pKs = new Map();
    this.GuaranteeActionsWhenLogicTreeRemove = new Map();
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
    this.c$1 = undefined;
    this.GuaranteeActionsWhenLogicTreeRemove?.clear();
    return !(this.GuaranteeActionsWhenLogicTreeRemove = undefined);
  }
  SetTimerUiOwnerId(e) {
    this.dYt = e;
  }
  IsTimerUiOwner(e) {
    return this.dYt === e;
  }
  CreateBehaviorTree(i) {
    var t = MathUtils_1.MathUtils.LongToBigInt(i.C9n);
    let r = this.CYt.get(t);
    if (r) {
      r.Recover(i);
      return r;
    }
    let o = !this.IsWakeUp;
    switch (i.hps) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i.sEs);
        if (n) {
          s = n.IsHideInTaskList || n.Type === 11;
          r = new BaseBehaviorTree_1.BaseBehaviorTree(t, i.sEs, i.hps, n.DungeonId, n.QuestMarkId, n.OnlineType, n.GetUiPriority(), n.IsNewQuest, s);
          n.SetUpBehaviorTree(r);
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
          (r = new BaseBehaviorTree_1.BaseBehaviorTree(t, i.sEs, i.hps, ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e ?? GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID, s.OnlineType, s.GetUiPriority())).SetUseInnerTrackIconId(e !== undefined);
          s.SetUpBehaviorTree(r);
          break;
        }
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        {
          n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
          if (!n) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "创建副本行为树时：副本不存在", ["副本Id", i.sEs]);
            }
            break;
          }
          let e = GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;
          switch (n.SubType) {
            case 2:
              e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(1);
              break;
            case 1:
              e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(3);
          }
          o = !ModelManager_1.ModelManager.GameModeModel.WorldDone;
          r = new BaseBehaviorTree_1.BaseBehaviorTree(t, i.sEs, i.hps, ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e, n.OnlineType, n.GetUiPriority());
          n.SetUpBehaviorTree(r);
          break;
        }
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "创建行为树时找不到对应的行为树类型", ["行为树类型Id", i.hps]);
        }
    }
    if (r) {
      this.CYt.set(t, r);
      this.fYt.set(t, i.d9n);
      let e = this.gYt.get(i.hps);
      if (!e) {
        e = new Map();
        this.gYt.set(i.hps, e);
      }
      e.set(t, r);
      r.InitTree(i, o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCreateBehaviorTree, t);
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GeneralLogicTree", 18, "创建行为树失败", ["行为树类型Id", i.hps], ["行为树Id", i.sEs]);
    }
  }
  RemoveBehaviorTree(e, i = 0) {
    var t = this.CYt.get(e);
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, e, i);
      t.Destroy();
      this.CYt.delete(e);
      this.gYt.get(t.BtType)?.delete(e);
      return t;
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
    var t = this.CYt.get(e);
    if (t || !i) {
      return t;
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
    var t;
    var r;
    var o;
    var e = this.GetBehaviorTree(e);
    if (e) {
      o = (e = e.GetBlackBoard()).CreateShowData();
      t = e.ContainTag(8);
      r = ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
      o = new MissionViewDefine_1.QuestUpdateTipsShowData(o, r, t, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestUpdateInfoAdd, o);
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
  AddGuaranteeActionsWhenLogicTreeRemove(e, i, t) {
    if (t?.Type === 6) {
      t = t.TreeIncId;
      if (!this.GuaranteeActionsWhenLogicTreeRemove.has(t)) {
        this.GuaranteeActionsWhenLogicTreeRemove.set(t, []);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GeneralLogicTree", 93, "当前节点已经结束或者进入新的存档点，存档点前的黑幕保底行为进行额外记录", ["保底行为", e]);
      }
      this.GuaranteeActionsWhenLogicTreeRemove.get(t).push({
        Name: e,
        Params: i
      });
    }
  }
  PopGuaranteeActionsWhenLogicTreeRemove(i, t) {
    if (this.GuaranteeActionsWhenLogicTreeRemove.has(i)) {
      var r = this.GuaranteeActionsWhenLogicTreeRemove.get(i);
      for (let e = r.length - 1; e >= 0; e--) {
        var o = r[e];
        if (o.Name === t.Name) {
          r.splice(e, 1);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("GeneralLogicTree", 93, "移除额外记录的保底行为", ["保底行为", o]);
          }
          if (r.length > 0) {
            this.GuaranteeActionsWhenLogicTreeRemove.set(i, r);
          } else {
            this.GuaranteeActionsWhenLogicTreeRemove.delete(i);
          }
          return o;
        }
      }
    }
  }
}
exports.GeneralLogicTreeModel = GeneralLogicTreeModel;
//# sourceMappingURL=GeneralLogicTreeModel.js.map