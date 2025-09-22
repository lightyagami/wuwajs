"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureGuideModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MonsterDetectionFilterAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionFilterAll");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../UniverseEditor/Interface/IEntity");
const IVar_1 = require("../../../UniverseEditor/Interface/IVar");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const MapUtil_1 = require("../Map/MapUtil");
const AdventureDefine_1 = require("./AdventureDefine");
const AdventureGuideController_1 = require("./AdventureGuideController");
const ENERGYCOST_ID = 5;
class AdventureGuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.P4l = false;
    this.EVe = new Map();
    this.U4l = new Map();
    this.eql = new Map();
    this.CurrentGuideTabName = undefined;
    this.SVe = new Map();
    this.yVe = 0;
    this.IVe = 0;
    this.TVe = 0;
    this.LVe = 0;
    this.DVe = 0;
    this.RVe = 0;
    this.UVe = undefined;
    this.AVe = 0;
    this.PVe = 0;
    this.xVe = 0;
    this.wVe = 0;
    this.BVe = 0;
    this.bVe = 0;
    this.qVe = false;
    this.CurrentMonsterId = 0;
    this.CurrentSilentId = 0;
    this.DetectionRedDotRecord = undefined;
    this.GVe = new Map();
    this.NVe = new Map();
    this.OVe = new Map();
    this.AllMonsterDetectionRecord = new Map();
    this.AllDungeonDetectionRecord = new Map();
    this.AllSilentAreaDetectionRecord = new Map();
    this.hK1 = [];
    this.lK1 = [];
    this.CurrentShowLevel = 1;
    this.CurrentSelectSuitIndex = 0;
    this.HandleShowNightMareParam = 0;
    this.VVe = new Map();
    this.TypeUnLockMap = new Map();
    this.GuideTypeUnLockMap = new Map();
    this.HVe = undefined;
    this.jVe = new Array();
    this.tql = new Set([0, 1]);
    this.DDu = new Map();
  }
  get HasInitData() {
    return this.P4l;
  }
  UpdateSilentFirstAwards(e, t = false) {
    if (t) {
      this.EVe.set(e, Protocol_1.Aki.Protocol.wks.ovs);
    } else {
      this.EVe.set(e, Protocol_1.Aki.Protocol.wks.CM_);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SilentRewardReceived, e);
  }
  OnLeaveLevel() {
    return true;
  }
  GetSilentFirstAwardById(e) {
    return this.EVe.get(e);
  }
  CheckCanGetFirstAward() {
    for (const e of this.EVe.values()) {
      if (e === Protocol_1.Aki.Protocol.wks.CM_) {
        return true;
      }
    }
    return false;
  }
  CheckCanGetFirstAwardById(e) {
    e = this.EVe.get(e);
    return !!e && e === Protocol_1.Aki.Protocol.wks.CM_;
  }
  CheckCanGetFirstAwardByTypeId(e) {
    for (const r of this.EVe) {
      var t = this.GetSilentAreaDetectData(r[0]);
      if (t.Conf.Secondary === e && r[1] === Protocol_1.Aki.Protocol.wks.CM_) {
        return true;
      }
    }
    return false;
  }
  GetAdventureGuideTabList() {
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("AdventureGuideView");
    var r = t.length;
    var i = [];
    let n = -1;
    var o = this.GetAllTaskFinish();
    for (let e = 0; e < r; e++) {
      var s = t[e];
      if (o && s.ChildViewName === "AdventureTargetView") {
        n = e;
      } else if (this.GetIsTabViewHaveData(s.ChildViewName) && ModelManager_1.ModelManager.FunctionModel.IsOpen(s.FunctionId)) {
        i.push(s);
      }
    }
    if (n !== -1) {
      i.push(t[n]);
    }
    return i;
  }
  GetRewardChaptersList() {
    return this.lK1;
  }
  GetUnLockChaptersList() {
    return this.hK1;
  }
  GetIsFromManualDetect() {
    return this.qVe;
  }
  SetFromManualDetect(e) {
    this.qVe = e;
  }
  SetUnLockChapters(e) {
    this.hK1 = e;
  }
  SetRewardChapters(e) {
    this.lK1 = e;
  }
  SetTaskById(e, t, r) {
    var i = this.GetTaskRecordById(e);
    if (i) {
      i.Status = t;
      i.Progress = r;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AdventureGuide", 5, "开拓任务id不存在", ["Id", e]);
    }
  }
  GetDetectingMonsterMarkId() {
    return this.LVe;
  }
  GetDetectingDungeonMarkId() {
    return this.DVe;
  }
  GetDetectingSilentAreaMarkId() {
    return this.RVe;
  }
  GetDetectingSlientAreaMarkType() {
    return this.UVe;
  }
  GetCurDetectingMonsterConfId() {
    return this.yVe;
  }
  GetCurDetectingDungeonConfId() {
    return this.IVe;
  }
  GetCurDetectingSilentAreaConfId() {
    return this.TVe;
  }
  GetMonsterDetectData(e) {
    return this.AllMonsterDetectionRecord.get(e);
  }
  GetDetectingMonsterId() {
    return this.AVe;
  }
  SetDetectingMonsterId(e) {
    this.AVe = e;
  }
  SetDetectingDungeonId(e) {
    this.PVe = e;
  }
  GetDetectingDungeonId() {
    return this.PVe;
  }
  SetDetectingSilentAreaId(e) {
    this.xVe = e;
  }
  GetDetectingSilentAreaId() {
    return this.xVe;
  }
  GetPendingMonsterConfId() {
    return this.wVe;
  }
  GetPendingDungeonConfId() {
    return this.BVe;
  }
  GetPendingSilentAreaConfId() {
    return this.bVe;
  }
  GetChapterProgress(e) {
    var e = this.SVe.get(e);
    var t = {
      Received: 0,
      Total: e.length
    };
    for (const r of e) {
      if (r.Status >= Protocol_1.Aki.Protocol.Aks.Proto_Received) {
        t.Received++;
      }
    }
    return t;
  }
  GetLevelOfLevelPlay(e) {
    e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e);
    if (e === undefined) {
      return 0;
    }
    let t = 0;
    if (e.ReferenceAllEntity) {
      for (const n of e.ReferenceAllEntity) {
        var r;
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n);
        if (i === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("AdventureGuide", 9, "玩法关联实体丢失", ["entity ", n]);
          }
        } else {
          r = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(i.BlueprintType);
          i = (0, IEntity_1.decompressEntityData)(i, r);
          if ((r = (0, IComponent_1.getComponent)(i.ComponentsData, "AttributeComponent")).Level > t) {
            t = r.Level;
          }
        }
      }
    }
    return t;
  }
  GetCostOfLevelPlay(e) {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e);
    if (e === undefined || (e = e.LevelPlayRewardConfig).Type === "None" || e.Type === "Variable") {
      return 0;
    } else {
      return ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(e.RewardId).Cost.get(ENERGYCOST_ID);
    }
  }
  GetPlayLevelPosition(e) {
    e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e);
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.LevelPlayEntityId);
    return Vector_1.Vector.Create(e.Transform.Pos.X, e.Transform.Pos.Y, e.Transform.Pos.Z);
  }
  GetSilentAreaDetectData(e) {
    return this.AllSilentAreaDetectionRecord.get(e);
  }
  GetSoundAreaDetectData(e) {
    return this.AllDungeonDetectionRecord.get(e);
  }
  GetAllDetectMonsters() {
    return this.AllMonsterDetectionRecord;
  }
  GetAllDetectDungeons() {
    return this.AllDungeonDetectionRecord;
  }
  GetDungeonRecordsForRedDot(e, t) {
    var r = new Array();
    var e = this.VVe.get(e);
    if (e) {
      for (const i of e) {
        if ((!t || i.DungeonDetectionRecord.Conf.MatType === t) && !this.IsDetectionPreOpen(i) && !i.IsLock) {
          r.push(i);
        }
      }
    }
    return r;
  }
  GetCanShowDungeonRecordsByType(e, t, r = true) {
    var i = new Array();
    var n = this.VVe.get(e);
    if (!n) {
      return [false, i];
    }
    for (const o of n) {
      if ((!t || o.DungeonDetectionRecord.Conf.MatType === t) && (!!this.IsDetectionPreOpen(o) || !o.IsLock || e === 63)) {
        i.push(o);
      }
    }
    if (r) {
      if (e === 6 || e === 62) {
        const s = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map();
        if (e === 6) {
          i.forEach(e => {
            var t = e.Conf.SubDungeonId;
            if (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(t)) {
              s.set(e.Conf.Id, true);
            }
          });
          LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew, s);
        }
        i.sort((e, t) => {
          var r = e.Conf.SubDungeonId;
          var i = t.Conf.SubDungeonId;
          var r = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(r) ? 1 : 0;
          var i = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(i) ? 1 : 0;
          if (r != i) {
            return r - i;
          } else if ((r = !s.get(e.Conf.Id)) != !s.get(t.Conf.Id)) {
            if (r) {
              return -1;
            } else {
              return 1;
            }
          } else if ((i = e.Conf.SortId) !== (r = t.Conf.SortId)) {
            return r - i;
          } else {
            return e.Conf.Id - t.Conf.Id;
          }
        });
      } else {
        i.sort((e, t) => {
          var r = this.IsDetectionPreOpen(e) ? 1 : 0;
          var i = this.IsDetectionPreOpen(t) ? 1 : 0;
          if (r != i) {
            return i - r;
          } else if ((i = this.IsDetectionNewContentOpen(e) ? 1 : 0) != (r = this.IsDetectionNewContentOpen(t) ? 1 : 0)) {
            return r - i;
          } else if ((r = e.Conf.SortId) !== (i = t.Conf.SortId)) {
            return i - r;
          } else {
            return e.Conf.Id - t.Conf.Id;
          }
        });
      }
    }
    return [i[0].DungeonDetectionRecord !== undefined && i[0].DungeonDetectionRecord.Conf.DetectionTabType !== 0 || i[0].SilentAreaDetectionRecord !== undefined && i[0].SilentAreaDetectionRecord.Conf.DetectionTabType !== 0, i];
  }
  GetAllDetectSilentAreas() {
    return this.AllSilentAreaDetectionRecord;
  }
  GetDungeonDetectRecordByEntryId(e) {
    for (const r of this.AllDungeonDetectionRecord.keys()) {
      var t = this.AllDungeonDetectionRecord.get(r);
      if (t.Conf.DungeonId === e) {
        return t;
      }
    }
  }
  GetAllTaskFinish() {
    for (var [, e] of this.SVe) {
      for (const t of e) {
        if (t.Status !== Protocol_1.Aki.Protocol.Aks.Proto_Received) {
          return false;
        }
      }
    }
    return true;
  }
  SetCurDetectingMonsterConfId(e) {
    if (this.yVe !== 0) {
      this.AllMonsterDetectionRecord.get(this.yVe).IsTargeting = false;
    }
    var t = this.AllMonsterDetectionRecord.get(e);
    if (t !== undefined) {
      t.IsTargeting = true;
    }
    this.yVe = e;
  }
  SetDetectingMonsterRefreshTime(e, t) {
    this.AllMonsterDetectionRecord.get(e).RefreshTime = t;
  }
  SetCurDetectingDungeonConfId(e) {
    if (this.IVe !== 0) {
      this.AllDungeonDetectionRecord.get(this.IVe).IsTargeting = false;
    }
    var t = this.AllDungeonDetectionRecord.get(e);
    if (t !== undefined) {
      t.IsTargeting = true;
    }
    this.IVe = e;
  }
  SetCurDetectingMonsterMarkId(e) {
    this.LVe = e;
  }
  SetDetectingDungeonMarkId(e) {
    this.DVe = e;
  }
  SetDetectingSilentAreaMarkId(e, t) {
    this.RVe = e;
    this.UVe = t;
  }
  SetCurDetectingSilentAreaConfId(e) {
    var t = this.AllSilentAreaDetectionRecord.get(this.TVe);
    if (this.TVe !== 0 && t) {
      t.IsTargeting = false;
    }
    var t = this.AllSilentAreaDetectionRecord.get(e);
    if (t) {
      t.IsTargeting = true;
    }
    this.TVe = e;
  }
  GetSilentAreaConfVaild(e) {
    return !!this.AllSilentAreaDetectionRecord.get(e);
  }
  OnInit() {
    this.InitAdventureTaskConfig();
    return true;
  }
  InitDetectionData() {
    var e;
    for (const i of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllMonsterDetection()) {
      this.AllMonsterDetectionRecord.set(i.Id, new AdventureDefine_1.MonsterDetectionRecord(i, true, 0));
    }
    for (const n of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllDungeonDetection()) {
      var t = new AdventureDefine_1.DungeonDetectionRecord(n, true, 0);
      this.AllDungeonDetectionRecord.set(n.Id, t);
      let e = this.VVe.get(n.Secondary);
      if (!e) {
        e = [];
        this.VVe.set(n.Secondary, e);
      }
      t = new AdventureDefine_1.SoundAreaDetectionRecord(0, t);
      e.push(t);
    }
    for (const o of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllSilentAreaDetection()) {
      var r = new AdventureDefine_1.SilentAreaDetectionRecord(o, o.LockCon !== 0, 0);
      this.AllSilentAreaDetectionRecord.set(o.Id, r);
      let e = this.VVe.get(o.Secondary);
      if (!e) {
        e = [];
        this.VVe.set(o.Secondary, e);
      }
      r = new AdventureDefine_1.SoundAreaDetectionRecord(1, undefined, r);
      e.push(r);
    }
    for ([e] of this.VVe) {
      if (!ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(e)?.ConditionGroupId) {
        this.TypeUnLockMap.set(e, true);
      }
    }
    ControllerHolder_1.ControllerHolder.AdventureGuideController.GetDetectionLabelInfoRequest();
  }
  UpdateByAdventureManualResponse(e) {
    if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 23795);
    } else {
      this.P4l = true;
      this.hK1 = e.NMs.sK1;
      this.lK1 = e.NMs.aK1;
      for (const i of e.NMs.UMs) {
        this.WVe(i);
      }
      for (const n of e.FMs) {
        this.KVe(n);
      }
      this.HandleMonsterDetectLockStatus(e.$Ms);
      this.FullUpdateDetectionPreOpenData(1, e.wE_);
      this.FullUpdateDetectionPreOpenData(0, e.LE_);
      this.UpdateDetectionServerConfig(0, e.bE_);
      this.UpdateDetectionServerConfig(1, e.TE_);
      this.EVe.clear();
      if (e.jMs.size !== 0) {
        for (const o of Object.keys(e.jMs)) {
          var t = e.jMs[o];
          var r = Number(o);
          this.EVe.set(r, t);
          if (t === Protocol_1.Aki.Protocol.wks.CM_) {
            ControllerHolder_1.ControllerHolder.AdventureGuideController.EmitRedDotFirstAwardEvent(r);
          }
        }
      }
    }
  }
  FullUpdateDetectionPreOpenData(e, t) {
    var r = this.U4l.get(e) ?? new Map();
    this.U4l.set(e, r);
    r.clear();
    for (const i of t) {
      r.set(i.RE_, i);
    }
  }
  UpdateDetectionServerConfig(e, t) {
    var r = this.eql.get(e) ?? new Map();
    this.eql.set(e, r);
    r.clear();
    for (const i of t) {
      r.set(i.s5n, i);
    }
  }
  HandleMonsterDetectLockStatus(e) {
    let t = false;
    let r = false;
    for (const s of e.GMs) {
      var i = this.GetMonsterDetectData(s);
      if (i !== undefined) {
        i.IsLock = false;
      }
    }
    for (const a of e.OMs) {
      var n = this.GetSoundAreaDetectData(a);
      if (n !== undefined) {
        n.IsLock = false;
        r = true;
      }
    }
    for (const h of e.kMs) {
      var o = this.GetSilentAreaDetectData(h);
      if (o !== undefined) {
        o.IsLock = false;
        t = true;
      }
    }
    if (t) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.UpdateAdventureNewSoundAreaTabRedDot();
    }
    if (r) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.UpdateAdventureNewChallengeTabRedDot();
    }
  }
  WVe(t) {
    var r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAdventureTaskConfig(t.s5n);
    if (r) {
      var i = r.ChapterId;
      var n = this.SVe.get(i);
      let e = undefined;
      if (n === undefined) {
        e = new Array();
        this.SVe.set(i, e);
      } else {
        e = n;
      }
      i = e.find(e => e.AdventureTaskBase.Id === t.s5n);
      if (i !== undefined) {
        i.Progress = t.PMs;
        i.Status = t.Y4n;
      } else {
        e.push(new AdventureDefine_1.AdventureTaskRecord(r, t.Y4n));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AdventureGuide", 5, "找不到id为的开拓任务", ["task.Proto_Id", t.s5n]);
    }
  }
  KVe(t) {
    switch (t.h5n) {
      case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
        var r = this.AllMonsterDetectionRecord.get(t.o8n);
        if (r !== undefined) {
          if (r.RefreshTime > t.qMs) {
            r.RefreshTime = t.qMs;
          }
        } else {
          r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMonsterDetectionConfById(t.o8n);
          this.AllMonsterDetectionRecord.set(t.o8n, new AdventureDefine_1.MonsterDetectionRecord(r, r.LockCon === 0, t.qMs));
        }
        break;
      case Protocol_1.Aki.Protocol.r8n.sxu:
        r = this.AllDungeonDetectionRecord.get(t.o8n);
        if (r !== undefined) {
          if (r.RefreshTime > t.qMs) {
            r.RefreshTime = t.qMs;
          }
        } else {
          var r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDungeonDetectionConfById(t.o8n);
          var i = new AdventureDefine_1.DungeonDetectionRecord(r, r.LockCon === 0, t.qMs);
          this.AllDungeonDetectionRecord.set(t.o8n, i);
          let e = this.VVe.get(r.Secondary);
          if (!e) {
            e = [];
            this.VVe.set(r.Secondary, e);
          }
          r = new AdventureDefine_1.SoundAreaDetectionRecord(0, i);
          e.push(r);
        }
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
        i = this.AllSilentAreaDetectionRecord.get(t.o8n);
        if (i !== undefined) {
          if (i.RefreshTime > t.qMs) {
            i.RefreshTime = t.qMs;
          }
        } else {
          r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(t.o8n);
          i = new AdventureDefine_1.SilentAreaDetectionRecord(r, r.LockCon === 0, t.qMs);
          this.AllSilentAreaDetectionRecord.set(t.o8n, i);
          this.UpdateDetectSilentAreas(i);
          let e = this.VVe.get(i.Conf.Secondary);
          if (!e) {
            e = [];
            this.VVe.set(i.Conf.Secondary, e);
          }
          r = new AdventureDefine_1.SoundAreaDetectionRecord(1, undefined, i);
          e.push(r);
        }
    }
  }
  GetChapterTasks(e) {
    return this.SVe.get(e);
  }
  SortChapterTasks(e) {
    var t = this.SVe.get(e);
    t.sort((e, t) => {
      var r = e.Status < Protocol_1.Aki.Protocol.Aks.Proto_Received ? e.Status : -e.Status;
      var i = t.Status < Protocol_1.Aki.Protocol.Aks.Proto_Received ? t.Status : -t.Status;
      if (r !== i) {
        return i - r;
      } else {
        return e.AdventureTaskBase.Id - t.AdventureTaskBase.Id;
      }
    });
    this.SVe.set(e, t);
    return t;
  }
  GetTaskRecordById(e, t) {
    let r = undefined;
    if (t !== 0 && t !== undefined) {
      for (const i of r = this.SVe.get(t)) {
        if (i.AdventureTaskBase.Id === e) {
          return i;
        }
      }
    } else {
      for (const n of this.SVe.keys()) {
        for (const o of r = this.SVe.get(n)) {
          if (o.AdventureTaskBase.Id === e) {
            return o;
          }
        }
      }
    }
  }
  InitAdventureTaskConfig() {
    for (const r of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllAdventureTaskConfig()) {
      var t = r.ChapterId;
      let e = undefined;
      if (this.SVe.get(t) === undefined) {
        e = new Array();
        this.SVe.set(t, e);
      } else {
        e = this.SVe.get(t);
      }
      e.push(new AdventureDefine_1.AdventureTaskRecord(r, Protocol_1.Aki.Protocol.Aks.Proto_UnFinish));
    }
  }
  GetMaxLevelOfBlueprintType(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntityIdOfBlueprintType(e);
    let r = 0;
    if (t.length === 0 && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("AdventureGuide", 9, "未找到实体配置", ["type ", e]);
    }
    for (const n of t) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n);
      if (i?.ComponentsData !== undefined && (i = (0, IComponent_1.getComponent)(i.ComponentsData, "AttributeComponent")).Level > r) {
        r = i.Level;
      }
    }
    return r;
  }
  GetSilentAreaLevel(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
    if (e?.ComponentsData !== undefined) {
      return (0, IComponent_1.getComponent)(e.ComponentsData, "AttributeComponent").Level;
    }
  }
  UpdatePendingMonsterList(e, t) {
    if (e.length !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AdventureGuide", 5, "更新怪物探测信息", ["怪物id", e[0].s5n], ["探测id", e[0].o8n], ["RefreshTime", e[0].qMs]);
      }
      if (t !== this.GetCurDetectingMonsterConfId()) {
        this.GVe.clear();
        this.wVe = t;
      }
      for (const i of e) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(i.s5n, i.w7n).Transform.Pos;
        var r = {
          Id: i.s5n,
          RefreshTime: i.qMs,
          MapId: i.w7n,
          PositionX: r.X,
          PositionY: r.Y,
          PositionZ: r.Z
        };
        this.GVe.set(i.s5n, r);
      }
    }
  }
  UpdatePendingDungeonList(e, t) {
    if (t !== this.GetCurDetectingDungeonConfId()) {
      this.NVe.clear();
      this.BVe = t;
    }
    for (const i of e) {
      var r;
      if (i.BMs) {
        r = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(i.s5n);
        if (r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.TeleportEntityConfigId, i.w7n)) {
          r = {
            Id: i.s5n,
            RefreshTime: i.qMs,
            MapId: i.w7n,
            PositionX: r.Transform.Pos.X ?? 0,
            PositionY: r.Transform.Pos.Y ?? 0,
            PositionZ: r.Transform.Pos.Z ?? 0
          };
          this.NVe.set(i.s5n, r);
        }
      } else {
        this.NVe.delete(i.s5n);
      }
    }
  }
  UpdatePendingSilentAreaList(e, t) {
    if (t !== this.GetCurDetectingSilentAreaConfId()) {
      this.OVe.clear();
      this.bVe = t;
    }
    for (const i of e) {
      var r;
      if (i.BMs) {
        if ((r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(i.s5n)) !== undefined) {
          r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.LevelPlayEntityId, i.w7n).Transform.Pos;
          r = {
            Id: i.s5n,
            RefreshTime: i.qMs,
            MapId: i.w7n,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z
          };
          this.OVe.set(i.s5n, r);
        }
      } else {
        this.OVe.delete(i.s5n);
      }
    }
  }
  GetMonsterPendingList() {
    return this.GVe;
  }
  GetDungeonPendingList() {
    return this.NVe;
  }
  GetSilentAreaPendingList() {
    return this.OVe;
  }
  IsTaskOfChapter(e, t) {
    return this.GetTaskRecordById(e).AdventureTaskBase.ChapterId === t;
  }
  CleanCurTrackingMonster() {
    var e = this.GetMonsterDetectData(this.yVe);
    if (e) {
      e.IsTargeting = false;
    }
    this.SetCurDetectingMonsterConfId(0);
    this.SetCurDetectingMonsterMarkId(0);
    this.SetDetectingMonsterId(0);
  }
  CleanCurTrackingDungeon() {
    var e = this.GetSoundAreaDetectData(this.IVe);
    if (e) {
      e.IsTargeting = false;
    }
    this.SetCurDetectingDungeonConfId(0);
    this.SetDetectingDungeonMarkId(0);
    this.SetDetectingDungeonId(0);
  }
  CleanCurTrackingSilentArea() {
    var e = this.GetSilentAreaDetectData(this.TVe);
    if (e) {
      e.IsTargeting = false;
    }
    this.SetCurDetectingSilentAreaConfId(0);
    this.SetDetectingSilentAreaMarkId(0);
    this.SetDetectingSilentAreaId(0);
  }
  GetAllCulledMonsters() {
    var e;
    if (!this.HVe) {
      e = MonsterDetectionFilterAll_1.configMonsterDetectionFilterAll.GetConfigList();
      this.HVe = e ? new Set(e.map(e => e.EntityConfigId)) : new Set();
    }
    return this.HVe;
  }
  CheckTargetDungeonTypeCanShow(e) {
    return this.TypeUnLockMap.get(e);
  }
  GetAllCanShowDungeonTypeList(e, t = true) {
    let r = undefined;
    var i;
    var n;
    var e = e || this.CurrentGuideTabName;
    r = e === "NewSoundAreaView" ? 3 : 2;
    var o = new Array();
    for ([i, n] of this.VVe) {
      var s = n[0];
      if ((s.Type !== 0 || s.DungeonDetectionRecord.Conf.GuideId === r) && (s.Type !== 1 || s.SilentAreaDetectionRecord.Conf.GuideId === r)) {
        if (this.CheckTargetDungeonTypeCanShow(i)) {
          o.push(i);
        }
      }
    }
    if (t) {
      return o.sort((e, t) => ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(e).SortNumber - ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(t).SortNumber);
    } else {
      return o;
    }
  }
  GetIsTabViewHaveData(e) {
    let t = undefined;
    if (e === "NewSoundAreaView") {
      t = 3;
    } else if (e === "DisposableChallengeView") {
      t = 2;
    }
    if (!t) {
      return true;
    }
    for (var [r, i] of this.VVe) {
      i = i[0];
      if ((i.Type !== 0 || i.DungeonDetectionRecord.Conf.GuideId === t) && (i.Type !== 1 || i.SilentAreaDetectionRecord.Conf.GuideId === t) && this.CheckTargetDungeonTypeCanShow(r)) {
        return true;
      }
    }
    return false;
  }
  get DetectionSilentAreasDataList() {
    return this.jVe;
  }
  InitAllDetectSilentAreasList() {
    var e = new Map();
    for (const n of this.AllSilentAreaDetectionRecord.values()) {
      var t = e.get(n.Conf.Secondary);
      if (t) {
        t.push(n);
      } else {
        (t = new Array()).push(n);
        e.set(n.Conf.Secondary, t);
      }
    }
    for (const o of e.values()) {
      o.sort(AdventureGuideController_1.silentAreasSortFunc);
    }
    for (const s of Array.from(e.keys()).sort((e, t) => t - e)) {
      var r = e.get(s);
      if (r.length !== 0) {
        var i = r[0].Conf.DangerType;
        for (const a of r) {
          this.jVe.push({
            IsShow: false,
            DangerType: i,
            SilentAreaDetectionData: a,
            SilentAreaTitleData: undefined
          });
        }
      }
    }
  }
  UpdateDetectSilentAreas(e) {
    for (const t of this.jVe) {
      if (t.SilentAreaDetectionData && t.SilentAreaDetectionData.Conf.Id === e.Conf.Id) {
        t.SilentAreaDetectionData = e;
        break;
      }
    }
  }
  GetShowSilentAreasList(e, t, r) {
    if (t !== undefined) {
      var i = t;
      for (const o of this.jVe) {
        this.XVe(e, o, i);
      }
    } else if (r !== undefined) {
      var n = this.GetSilentAreaDetectData(r);
      if (n) {
        for (const s of this.jVe) {
          this.XVe(e, s, n.Conf.Secondary);
        }
      }
    } else {
      for (const a of this.jVe) {
        this.XVe(e, a, undefined);
      }
    }
  }
  XVe(e, t, r) {
    e.push(t);
  }
  CheckShowDoubleRewardRedDot() {
    var e;
    return !!ActivityDoubleRewardController_1.ActivityDoubleRewardController.HasAnyDoubleRewardActivityShowing() && !!ActivityDoubleRewardController_1.ActivityDoubleRewardController.IsAnyActivityHasLeftUpCount() && (!(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RedDotAdventureNewSoundAreaTabLastUpdateTime)) || e < TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp());
  }
  CheckRedDotAdventureNewSoundAreaTab() {
    if (this.CheckShowDoubleRewardRedDot()) {
      return true;
    }
    for (const e of this.GetAllCanShowDungeonTypeList("NewSoundAreaView", false)) {
      if (this.CheckRedDotSecondary(e)) {
        return true;
      }
    }
    return false;
  }
  CheckRedDotChallengeTab() {
    for (const e of this.GetAllCanShowDungeonTypeList("DisposableChallengeView", false)) {
      if (this.CheckRedDotSecondary(e)) {
        return true;
      }
    }
    return false;
  }
  CheckRedDotSecondary(e) {
    for (const t of this.GetDungeonRecordsForRedDot(e, undefined)) {
      if (this.CheckRedDotDetectionItemByRecord(t)) {
        return true;
      }
    }
    return false;
  }
  CheckRedDotDetectionItemByRecord(e) {
    var t = e.Conf;
    return !!t && !!t.LockCon && !e.IsLock && this.DetectionRedDotRecord?.get(t.Id) !== true && !this.IsDetectionFinished(e);
  }
  IsDetectionFinished(e) {
    var t = e.Conf.Secondary;
    if (t === 61) {
      return ModelManager_1.ModelManager.LordGymModel.GetGymEntranceAllFinish(e.Conf.AdditionalId);
    } else {
      return (t === 6 || t === 62) && (t = e.Conf.SubDungeonId, ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(t));
    }
  }
  RecordAllDetectionBySecondary(e) {
    for (const t of this.GetDungeonRecordsForRedDot(e, undefined)) {
      if (this.CheckRedDotDetectionItemByRecord(t)) {
        this.RecordDetection(t);
      }
    }
  }
  RecordDetection(e) {
    e = e.Conf.Id;
    if (this.DetectionRedDotRecord && !this.DetectionRedDotRecord.has(e)) {
      this.DetectionRedDotRecord.set(e, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DetectionRedDotRecord, this.DetectionRedDotRecord);
    }
  }
  CheckExtraRedDotSecondary(e) {
    for (const t of this.GetDungeonRecordsForRedDot(e, undefined)) {
      if (this.CheckExtraRedDotDetectionItemByRecord(t)) {
        return true;
      }
    }
    return false;
  }
  CheckExtraRedDotDetectionItemByRecord(e) {
    return e.Conf.Secondary === 29 && (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.GetRogueRedDotState() ?? false);
  }
  IsDetectionTypeAllowPreOpen(e) {
    return this.tql.has(e);
  }
  IsDetectionPreOpen(e) {
    if (!this.IsDetectionTypeAllowPreOpen(e.Type)) {
      return false;
    }
    var t = this.GetPreOpenDetectionConf(e.Conf.Id, e.Type, e.Conf.PreOpenId);
    if (t === undefined) {
      return false;
    }
    var r = t.ConditionGroup;
    let i = true;
    if (r > 0) {
      i = !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(r.toString(), undefined);
    }
    var r = this.U4l.get(e.Type)?.get(t.Id);
    let n = false;
    if (r && (e = MathUtils_1.MathUtils.LongToNumber(r.AE_), t = MathUtils_1.MathUtils.LongToNumber(r.PE_), e <= (r = TimeUtil_1.TimeUtil.GetServerTimeStamp())) && r <= t) {
      n = true;
    }
    return i && n;
  }
  IsDetectionNewContentOpen(e) {
    var t;
    var e = this.eql.get(e.Type)?.get(e.Conf.Id);
    let r = false;
    return r = e && (t = MathUtils_1.MathUtils.LongToNumber(e.xE_), e = MathUtils_1.MathUtils.LongToNumber(e.UE_), t <= (t = TimeUtil_1.TimeUtil.GetServerTimeStamp())) && t <= e ? true : r;
  }
  GetPreOpenDetectionConf(e, t, r) {
    var e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfList(e, t, r);
    var i = this.U4l.get(t);
    for (const n of e) {
      if (i?.get(n.Id)) {
        return n;
      }
    }
  }
  GetSearchList(t, r) {
    var i = [];
    if (!(t.length <= 0)) {
      let e = undefined;
      try {
        e = new RegExp(r, "i");
      } catch {
        return i;
      }
      for (const n of t) {
        if (!n.IsLock && !!n.Conf && !((MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Conf.Name) ?? "").search(e) < 0)) {
          i.push(n);
        }
      }
    }
    return i;
  }
  UpdateNightMareMsg(e, t, r) {
    e = this.BDu(e, t);
    this.DDu.set(e, r);
  }
  BDu(e, t) {
    return MapUtil_1.MapUtil.GetGamePlayKey(e, t);
  }
  GetNightMareTarget(e, t) {
    if (!e || !t) {
      return [-1, -1];
    }
    var r = ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetLevelPlayNightMareConfig(t);
    if (!r) {
      return [-1, -1];
    }
    var i = [-1, -1];
    for (const o of r?.Vars ?? []) {
      var n = this.GetVar(e, t, o);
      if (i[0] < 0) {
        i[0] = n ?? 0;
      } else {
        i[1] = n ?? r.DefaultValues.at(1) ?? 0;
      }
    }
    return i;
  }
  GetVar(e, t, r) {
    e = this.BDu(e, t);
    t = this.DDu.get(e);
    if (t !== undefined) {
      var i = t[r];
      if (i !== undefined) {
        let e = undefined;
        switch ((0, IVar_1.getVarTypeByIndex)(i.iTs)) {
          case "Boolean":
            e = i.rTs;
            break;
          case "Float":
            e = i.sTs;
            break;
          case "Int":
            e = MathUtils_1.MathUtils.LongToNumber(i.oTs);
            break;
          case "String":
            e = i.nTs;
            break;
          default:
            e = undefined;
        }
        return e;
      }
    }
  }
  IsNightMareHaveConfig(e, t) {
    return ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetLevelPlayNightMareConfig(t) !== undefined;
  }
  IsRoleTutorialNew(e) {
    return !(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map()).get(e);
  }
  SetRoleTutorialNew(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map();
    t.set(e, true);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew, t);
  }
}
exports.AdventureGuideModel = AdventureGuideModel;
//# sourceMappingURL=AdventureGuideModel.js.map