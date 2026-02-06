"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldGlobal_1 = require("../../../../World/WorldGlobal");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapDefine_1 = require("../../../Map/MapDefine");
const MapUtil_1 = require("../../../Map/MapUtil");
const SpringManorGameHandleDefine_1 = require("./GameHandle/Base/SpringManorGameHandleDefine");
const SpringManorDefine_1 = require("./SpringManorDefine");
const HEALTH_ID = 3;
class SpringManorModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LOe = 0;
    this.GUe = (e, r, t) => {
      r = r.Entity.GetComponent(0).GetPbDataId();
      if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.CheckIsGuessJokerEntityId(r)) {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.EnterNpcPokerState(r);
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.HideGuessJokerNpc(r);
      } else if (ModelManager_1.ModelManager.DrinksModel.CheckIsDrinksEntity(r)) {
        ModelManager_1.ModelManager.DrinksModel.HideNpcByEntityId(r);
      }
    };
    this.zpe = (e, r) => {
      r = r.Entity.GetComponent(0).GetPbDataId();
      if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetAllGuessJokerNpcIds().includes(r)) {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.ClearHideJokerNpcRecord(r);
      }
    };
    this.O0g = false;
    this.G0g = 0;
    this.jxg = 0;
    this.qkg = undefined;
    this.tkg = 0;
    this.Okg = undefined;
    this.Jqg = undefined;
    this.Vvg = () => {
      var e = this.GetAtmosphereLevel();
      var r = this.ActivityData.GetAtmosphere();
      var t = this.GetNextLevel();
      return {
        Level: e,
        CurLevelAtmosphere: r,
        CurLevelMaxAtmosphere: this.GetLevelNeedExp(t)
      };
    };
    this.V2g = (e, r, t, i, n) => {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(e, r, t, i, n);
    };
    this.H2g = (e, r, t, i, n) => ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(e, r, t, i, n);
    this.j2g = () => {
      var e = this.ActivityData;
      return e && e.IsFunctionUnlocked(3);
    };
    this.$2g = () => {
      var e = this.ActivityData;
      return e && e.IsFunctionUnlocked(4);
    };
    this.W2g = () => {
      var e = this.ActivityData;
      return e && e.IsFunctionUnlocked(6);
    };
    this.Q2g = () => {
      var e = this.ActivityData;
      return e && e.IsFunctionUnlocked(5);
    };
  }
  OnInit() {
    this.K2g();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    return true;
  }
  OnClear() {
    this.X2g();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    return true;
  }
  SetActivityId(e) {
    this.LOe = e;
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe);
  }
  CheckInInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return e !== 0 && (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))?.InstSubType === 12 && e?.WorldDungeonSubType === 2;
  }
  GetRewardTaskTabList() {
    return ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTabConfigByActivityId(this.LOe).map(e => e.Id);
  }
  GetScoreRewardConfigList() {
    return ConfigManager_1.ConfigManager.SpringManorConfig.GetScoreRewardConfigListByActivityId(this.LOe);
  }
  CheckMainQuestIsFinished() {
    if (this.O0g) {
      return this.O0g;
    }
    for (const e of ConfigManager_1.ConfigManager.SpringManorConfig.GetAllMainTaskConfig()) {
      if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.QuestId)) {
        return false;
      }
    }
    return this.O0g = true;
  }
  GetFirstUnFinishedMainQuestConfig() {
    for (const e of ConfigManager_1.ConfigManager.SpringManorConfig.GetAllMainTaskConfig()) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.QuestId) !== 3) {
        return e;
      }
    }
  }
  GetMainQuestRemainTimeText(e, r) {
    e = ConfigManager_1.ConfigManager.SpringManorConfig.GetMainTaskConfigByQuestId(e);
    if (e !== undefined) {
      var t;
      var i = this.ActivityData;
      if (i) {
        i = i.BeginOpenTime;
        t = TimeUtil_1.TimeUtil.GetServerTime();
        if ((i = i + e.OpenDay * TimeUtil_1.TimeUtil.OneDaySeconds - t) <= 0) {
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.LockDesc);
        } else {
          t = this.F0g(i);
          if (r !== undefined && t !== undefined) {
            e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
            return StringUtils_1.StringUtils.Format(e, t);
          } else {
            return t;
          }
        }
      }
    }
  }
  F0g(e) {
    var r = (e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY ? 3 : e >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var t = e >= CommonDefine_1.SECOND_PER_DAY ? 2 : e >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, r, t).CountDownText;
  }
  GetMainQuestId() {
    var e = this.GetFirstUnFinishedMainQuestConfig();
    if (e !== undefined) {
      return e.QuestId;
    }
  }
  GetMainQuestIdList() {
    const r = [];
    ConfigManager_1.ConfigManager.SpringManorConfig.GetAllMainTaskConfig()?.forEach(e => {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.QuestId) !== 3) {
        r.push(e.QuestId);
      }
    });
    return r;
  }
  GetSubQuestList() {
    const r = [];
    ConfigManager_1.ConfigManager.SpringManorConfig.GetAllSubTaskConfig()?.forEach(e => {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.QuestId)) {
        r.push(e.QuestId);
      }
    });
    return r;
  }
  HasAnyQuest() {
    return this.GetMainQuestIdList().length > 0 || this.GetSubQuestList().length > 0;
  }
  IsCurrentTrackQuest(e) {
    if (this.IsMainQuest(e)) {
      return ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(e);
    } else {
      return this.IsTrackingSubQuest(e);
    }
  }
  IsQuestUnlocked(e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    return !!e && e.Status !== Protocol_1.Aki.Protocol.hTs.Proto_InActive;
  }
  IsMainQuest(r) {
    return ConfigManager_1.ConfigManager.SpringManorConfig.GetAllMainTaskConfig().some(e => e.QuestId === r);
  }
  IsSubQuest(r) {
    return ConfigManager_1.ConfigManager.SpringManorConfig.GetAllSubTaskConfig().some(e => e.QuestId === r);
  }
  IsActivityQuest(e) {
    return this.IsMainQuest(e) || this.IsSubQuest(e);
  }
  GetTrackingSubQuestId() {
    return this.G0g;
  }
  CheckTrackingSubQuest() {
    return this.G0g !== 0;
  }
  IsTrackingSubQuest(e) {
    return e !== 0 && this.G0g !== 0 && this.G0g === e;
  }
  SetTrackingSubQuestId(e) {
    this.G0g = e;
  }
  ClearTrackingSubQuest() {
    this.G0g = 0;
  }
  GetCurrentTrackRewardId() {
    return this.jxg;
  }
  GetCurrentTrackRewardPosition() {
    return this.qkg;
  }
  SetCurrentTrackRewardId(e, r) {
    this.jxg = e;
    this.qkg = r;
  }
  ClearCurrentTrackRewardId() {
    this.jxg = 0;
    this.qkg = undefined;
  }
  GetCurrentTrackGetWayId() {
    return this.tkg;
  }
  GetCurrentTrackGetWayPosition() {
    return this.Okg;
  }
  SetCurrentTrackGetWayId(e, r) {
    this.tkg = e;
    this.Okg = r;
  }
  ClearCurrentTrackGetWayId() {
    this.tkg = 0;
    this.Okg = undefined;
  }
  HasAnyCanAutoEndTrack() {
    return this.jxg !== 0 || this.tkg !== 0;
  }
  CheckPositionIsInAutoEndRange(e) {
    var r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    return !!r && (r = this.pW1(r, e), Log_1.Log.CheckWarn() && Log_1.Log.Warn("Activity", 90, "" + r), r < SpringManorDefine_1.AUTO_END_TRACK_DISTANCE);
  }
  pW1(e, r) {
    return Math.round(Vector_1.Vector.Distance(r, e) * MapDefine_1.FLOAT_0_01);
  }
  GetQuestTrackDistanceText(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (r && r.HasBehaviorTree()) {
      e = this.GetQuestCurNodeId(e);
      if (e) {
        if (ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.IsShowNodeTrackDistance(r.TreeId, e)) {
          var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r.TreeId);
          if (t) {
            var i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
            var i = MapUtil_1.MapUtil.GetDungeonsRelation(i, t.DungeonId);
            if (i !== 3) {
              t = r.GetTrackDistance(e);
              if (!r.IsInTrackRange() && t) {
                return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Meter_Text"), t.toString());
              }
            }
          }
        }
      }
    }
  }
  GetQuestTrackPosition(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (r && r.HasBehaviorTree()) {
      e = this.GetQuestCurNodeId(e);
      if (e) {
        return r.GetNodeTrackPosition(e);
      }
    }
  }
  GetQuestCurNodeId(e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e && e.HasBehaviorTree()) {
      var r = e.IsSuspend();
      if (!r) {
        r = e.GetCurrentActiveChildQuestNode();
        if (r) {
          return r.NodeId;
        }
      }
    }
  }
  GetGameplayData(e) {
    return SpringManorGameHandleDefine_1.springManorGameHandleDefine.get(e);
  }
  GetAtmosphereLevel() {
    return this.ActivityData.GetAtmosphereLevel();
  }
  GetNextLevel() {
    var e = this.GetAtmosphereLevel();
    return this.GetLevelNextLevel(e);
  }
  GetLevelNextLevel(e) {
    var r = this.GetMaxLevel();
    if (e < r) {
      return e + 1;
    } else {
      return r;
    }
  }
  GetCanClaimedLevelIdList() {
    var e = ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigByActivityId(this.LOe);
    var r = [];
    var t = this.GetAtmosphereLevel();
    for (const i of e) {
      if (!this.ActivityData.IsLevelRewardClaimed(i.Id) && !(t < i.Id)) {
        if (i.DropId !== 0) {
          r.push(i.Id);
        }
      }
    }
    return r;
  }
  GetAtmosphereLevelStage(e) {
    let r = 1;
    for (const t of SpringManorDefine_1.atmosphereLevelList) {
      if (e < t) {
        break;
      }
      r++;
    }
    return r;
  }
  SetAtmosphereStageUpParam(e) {
    this.Jqg = e;
  }
  GetAtmosphereStageUpParam() {
    var e;
    if (this.Jqg) {
      e = this.Jqg;
      this.Jqg = undefined;
      return e;
    }
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.SpringManorConfig.GetActivityConfigByActivityId(this.LOe);
  }
  GetTotalLevelData() {
    var e = this.GetMaxLevel();
    var r = [];
    for (const i of ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigByActivityId(this.LOe)) {
      var t = {
        Level: i.Level,
        ExpLevel: i.AtmosphereNeed,
        ExpNext: i.AtmosphereNext,
        IsMax: i.Level >= e
      };
      r.push(t);
    }
    return r;
  }
  GetMaxLevel() {
    return ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigByActivityId(this.LOe).length;
  }
  IsMaxLevel(e) {
    return e >= this.GetMaxLevel();
  }
  GetLevelNeedExp(e) {
    return this.GetLevelConfig(e)?.AtmosphereNeed ?? 0;
  }
  GetLevelConfig(e) {
    if (!(e < 1)) {
      var r = ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigByActivityId(this.LOe);
      if (!(e > r.length)) {
        return r[e - 1];
      }
    }
  }
  ScoreToLevel(e) {
    var r = ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigByActivityId(this.LOe);
    let t = r.length;
    for (const i of r) {
      if (e < i.AtmosphereNeed) {
        return t;
      }
      t = i.Level;
    }
    return t;
  }
  IsQuestTracking(e) {
    return e > 0 && (e = ConfigManager_1.ConfigManager.SpringManorConfig.GetConditionGroupQuestId(e), this.IsCurrentTrackQuest(e));
  }
  async TeleportPlayerToEntity(e) {
    var r;
    var e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(e);
    if (e && (r = this._Rr(e.TeleportEntityId))) {
      e = e.TeleportRotator;
      e = Rotator_1.Rotator.Create(Number(e[0]), Number(e[1]), Number(e[2]));
      await ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
        ClientReason: "SpringManorModel.TeleportPlayerToEntity",
        TargetPosition: WorldGlobal_1.WorldGlobal.ToUeVector(r),
        TargetRotation: e.ToUeRotator(),
        TeleportMode: 1
      });
    }
  }
  _Rr(e) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (!r) {
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e)) && e.Transform && e.Transform.Pos) {
        return Vector_1.Vector.Create(e.Transform.Pos.X ?? 0, e.Transform.Pos.Y ?? 0, e.Transform.Pos.Z ?? 0);
      } else {
        return undefined;
      }
    }
    if (r?.IsInit) {
      e = r.Entity.GetComponent(1)?.ActorLocationProxy;
      if (!e) {
        return e;
      }
    }
    return Vector_1.Vector.Create(r.Entity.GetComponent(0).GetLocation());
  }
  CheckAnyBookItemRedDot() {
    return this.CheckBookItemRedDot(2) || this.CheckBookItemRedDot(0) || this.CheckBookItemRedDot(1);
  }
  CheckBookItemRedDot(e) {
    var r = this.ActivityData;
    if (r && r.IsFunctionUnlocked(e === 2 ? 8 : 7)) {
      e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(this.LOe, e);
      if (e) {
        for (const t of e.BookItemIds) {
          if (r.GetBookItemStateById(t) === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetFunctionUnlockRemainText(e) {
    e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetFunctionConfigById(e);
    if (e) {
      var r = this.ActivityData;
      if (r) {
        var r = r.BeginOpenTime;
        var t = TimeUtil_1.TimeUtil.GetServerTime();
        var r = r + e.OpenDay * TimeUtil_1.TimeUtil.OneDaySeconds;
        if (!(r < t)) {
          return this.F0g(r - t);
        }
      }
    }
  }
  IsRoleDead(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    return !e || e.GetAttributeData().GetAttrValueById(HEALTH_ID) <= 0;
  }
  K2g() {
    var e = ModelManager_1.ModelManager.FurnitureModel;
    e.GetAtmosphereLevelDataDelegate = this.Vvg;
    e.SaveLocalDataDelegate = this.V2g;
    e.GetLocalDataDelegate = this.H2g;
    e.GetFurnitureFunctionIsUnlockedDelegate = this.j2g;
    e.GetShopFunctionUnlockedDelegate = this.$2g;
    e.GetHandBookFunctionUnlockedDelegate = this.W2g;
    e.GetPresetFunctionUnlockedDelegate = this.Q2g;
  }
  X2g() {
    var e = ModelManager_1.ModelManager.FurnitureModel;
    e.GetAtmosphereLevelDataDelegate = undefined;
    e.SaveLocalDataDelegate = undefined;
    e.GetLocalDataDelegate = undefined;
    e.GetFurnitureFunctionIsUnlockedDelegate = undefined;
    e.GetShopFunctionUnlockedDelegate = undefined;
    e.GetHandBookFunctionUnlockedDelegate = undefined;
    e.GetPresetFunctionUnlockedDelegate = undefined;
  }
}
exports.SpringManorModel = SpringManorModel;
//# sourceMappingURL=SpringManorModel.js.map