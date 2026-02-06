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
const ShipTowerDefine_1 = require("../ShipTower/ShipTowerDefine");
const AdventureDefine_1 = require("./AdventureDefine");
const AdventureGuideController_1 = require("./AdventureGuideController");
const ENERGYCOST_ID = 5;
const DEFAULT_SEASON_ID = -100;
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
    this.HAg = false;
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
    this.jAg = new Map();
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
    let o = -1;
    var n = this.GetAllTaskFinish();
    for (let e = 0; e < r; e++) {
      var a = t[e];
      if (n && a.ChildViewName === "AdventureTargetView") {
        o = e;
      } else if (this.GetIsTabViewHaveData(a.ChildViewName) && ModelManager_1.ModelManager.FunctionModel.IsOpen(a.FunctionId)) {
        i.push(a);
      }
    }
    if (o !== -1) {
      i.push(t[o]);
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
  GetMonsterDetectIdByBlueprintType(e) {
    return this.jAg.get(e);
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
  GetIsMaterialDetect() {
    return this.HAg;
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
  GetChapterReceivedCount(e) {
    let t = 0;
    for (const r of this.SVe.get(e)) {
      if (r.Status >= Protocol_1.Aki.Protocol.Aks.Proto_Received) {
        t++;
      }
    }
    return t;
  }
  GetChapterFinishCount(e) {
    let t = 0;
    for (const r of this.SVe.get(e)) {
      if (r.Status >= Protocol_1.Aki.Protocol.Aks.a3_) {
        t++;
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
      for (const o of e.ReferenceAllEntity) {
        var r;
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o);
        if (i === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("AdventureGuide", 9, "玩法关联实体丢失", ["entity ", o]);
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
        if ((!t || i.DungeonDetectionRecord.Conf.MatType === t) && !this.GetIsDetectionPreOpenByData(i) && !i.IsLock) {
          r.push(i);
        }
      }
    }
    return r;
  }
  GetCanShowDungeonRecordsByType(e, t, r = true) {
    var i = new Array();
    var o = this.VVe.get(e);
    if (!o) {
      return [false, i];
    }
    for (const n of o) {
      if ((!t || n.DungeonDetectionRecord.Conf.MatType === t) && (!!this.GetIsDetectionPreOpenByData(n) || !n.IsLock || e === 63 || e === 64 || !!n.Conf.PeriodicityChallengeType)) {
        i.push(n);
      }
    }
    if (r) {
      if (e === 6 || e === 62) {
        const a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map();
        i.forEach(e => {
          var t = e.Conf.SubDungeonId;
          if (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(t)) {
            a.set(e.Conf.Id, true);
          }
        });
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew, a);
        i.sort((e, t) => {
          var r = e.Conf.SubDungeonId;
          var i = t.Conf.SubDungeonId;
          var r = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(r) ? 1 : 0;
          var i = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(i) ? 1 : 0;
          if (r != i) {
            return r - i;
          } else if ((r = !a.get(e.Conf.Id)) != !a.get(t.Conf.Id)) {
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
          var r = this.GetIsDetectionPreOpenByData(e) ? 1 : 0;
          var i = this.GetIsDetectionPreOpenByData(t) ? 1 : 0;
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
      for (const o of i.BlueprintTypeList) {
        this.jAg.set(o, i.Id);
      }
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
    for (const a of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllSilentAreaDetection()) {
      var r = new AdventureDefine_1.SilentAreaDetectionRecord(a, a.LockCon !== 0, 0);
      this.AllSilentAreaDetectionRecord.set(a.Id, r);
      let e = this.VVe.get(a.Secondary);
      if (!e) {
        e = [];
        this.VVe.set(a.Secondary, e);
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
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16752);
    } else {
      this.P4l = true;
      this.hK1 = e.NMs.sK1;
      this.lK1 = e.NMs.aK1;
      for (const i of e.NMs.UMs) {
        this.WVe(i);
      }
      for (const o of e.FMs) {
        this.KVe(o);
      }
      this.HandleMonsterDetectLockStatus(e.$Ms);
      this.FullUpdateDetectionPreOpenData(1, e.wE_);
      this.FullUpdateDetectionPreOpenData(0, e.LE_);
      this.UpdateDetectionServerConfig(0, e.bE_);
      this.UpdateDetectionServerConfig(1, e.TE_);
      this.EVe.clear();
      if (e.jMs.size !== 0) {
        for (const n of Object.keys(e.jMs)) {
          var t = e.jMs[n];
          var r = Number(n);
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
    for (const a of e.GMs) {
      var i = this.GetMonsterDetectData(a);
      if (i !== undefined) {
        i.IsLock = false;
      }
    }
    for (const s of e.OMs) {
      var o = this.GetSoundAreaDetectData(s);
      if (o !== undefined) {
        o.IsLock = false;
        r = true;
      }
    }
    for (const h of e.kMs) {
      var n = this.GetSilentAreaDetectData(h);
      if (n !== undefined) {
        n.IsLock = false;
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
      var o = this.SVe.get(i);
      let e = undefined;
      if (o === undefined) {
        e = new Array();
        this.SVe.set(i, e);
      } else {
        e = o;
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
  HaveChapterTasksFinish(e) {
    for (const t of this.SVe.get(e) ?? []) {
      if (t.Status === Protocol_1.Aki.Protocol.Aks.a3_) {
        return true;
      }
    }
    return false;
  }
  HaveChapterTasksUnFinish(e) {
    for (const t of this.SVe.get(e) ?? []) {
      if (t.Status === Protocol_1.Aki.Protocol.Aks.Proto_UnFinish) {
        return true;
      }
    }
    return false;
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
      for (const o of this.SVe.keys()) {
        for (const n of r = this.SVe.get(o)) {
          if (n.AdventureTaskBase.Id === e) {
            return n;
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
    for (const o of t) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o);
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
  UpdatePendingMonsterList(e, t, r = false) {
    if (!(e.length <= 0)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AdventureGuide", 5, "更新怪物探测信息", ["配置Id", t]);
      }
      if (t !== this.GetCurDetectingMonsterConfId()) {
        this.GVe.clear();
        this.wVe = t;
        this.HAg = r;
      }
      for (const o of e) {
        for (const n of o.FLd) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n, o.w7n).Transform.Pos;
          var i = {
            Id: n,
            RefreshTime: 0,
            MapId: o.w7n,
            PositionX: i.X,
            PositionY: i.Y,
            PositionZ: i.Z
          };
          this.GVe.set(n, i);
        }
      }
    }
  }
  DeletePendingMonsterList(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AdventureGuide", 5, "更新怪物探测信息-删除对应怪物", ["怪物id", e]);
    }
    this.GVe.delete(e);
  }
  UpdatePendingDungeonList(e, t) {
    if (t !== this.GetCurDetectingDungeonConfId()) {
      this.NVe.clear();
      this.BVe = t;
    }
    for (const i of e) {
      for (const o of i.FLd) {
        var r = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(o);
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.TeleportEntityConfigId, i.w7n);
        if (r) {
          r = {
            Id: o,
            RefreshTime: 0,
            MapId: i.w7n,
            PositionX: r.Transform.Pos.X ?? 0,
            PositionY: r.Transform.Pos.Y ?? 0,
            PositionZ: r.Transform.Pos.Z ?? 0
          };
          this.NVe.set(o, r);
        }
      }
    }
  }
  UpdatePendingSilentAreaList(e, t) {
    if (t !== this.GetCurDetectingSilentAreaConfId()) {
      this.OVe.clear();
      this.bVe = t;
    }
    for (const i of e) {
      for (const o of i.FLd) {
        var r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(o);
        if (r !== undefined) {
          r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.LevelPlayEntityId, i.w7n).Transform.Pos;
          r = {
            Id: o,
            RefreshTime: 0,
            MapId: i.w7n,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z
          };
          this.OVe.set(o, r);
        }
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
    var o;
    var e = e || this.CurrentGuideTabName;
    if (e === "NewSoundAreaView") {
      r = 3;
    } else if (e === "DisposableChallengeView") {
      r = 2;
    } else if (e === "PeriodicityChallengeView") {
      r = 5;
    }
    var n = new Array();
    for ([i, o] of this.VVe) {
      var a = o[0];
      if ((a.Type !== 0 || a.DungeonDetectionRecord.Conf.GuideId === r) && (a.Type !== 1 || a.SilentAreaDetectionRecord.Conf.GuideId === r)) {
        if (this.CheckTargetDungeonTypeCanShow(i)) {
          n.push(i);
        }
      }
    }
    if (t) {
      return n.sort((e, t) => ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(e).SortNumber - ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(t).SortNumber);
    } else {
      return n;
    }
  }
  GetIsTabViewHaveData(e) {
    let t = undefined;
    if (e === "NewSoundAreaView") {
      t = 3;
    } else if (e === "DisposableChallengeView") {
      t = 2;
    } else if (e === "PeriodicityChallengeView") {
      t = 5;
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
    for (const o of this.AllSilentAreaDetectionRecord.values()) {
      var t = e.get(o.Conf.Secondary);
      if (t) {
        t.push(o);
      } else {
        (t = new Array()).push(o);
        e.set(o.Conf.Secondary, t);
      }
    }
    for (const n of e.values()) {
      n.sort(AdventureGuideController_1.silentAreasSortFunc);
    }
    for (const a of Array.from(e.keys()).sort((e, t) => t - e)) {
      var r = e.get(a);
      if (r.length !== 0) {
        var i = r[0].Conf.DangerType;
        for (const s of r) {
          this.jVe.push({
            IsShow: false,
            DangerType: i,
            SilentAreaDetectionData: s,
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
      for (const n of this.jVe) {
        this.XVe(e, n, i);
      }
    } else if (r !== undefined) {
      var o = this.GetSilentAreaDetectData(r);
      if (o) {
        for (const a of this.jVe) {
          this.XVe(e, a, o.Conf.Secondary);
        }
      }
    } else {
      for (const s of this.jVe) {
        this.XVe(e, s, undefined);
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
    return !!t && !e.IsLock && (t.Secondary === 62 || !!t.LockCon) && this.DetectionRedDotRecord?.get(t.Id) !== true && !this.IsDetectionFinished(e);
  }
  CheckRedDotPeriodicityTab() {
    return !!ModelManager_1.ModelManager.AdventureGuideModel.GetPeriodicityRedDot(3, ModelManager_1.ModelManager.TowerModel.CurrentSeason) || !!ModelManager_1.ModelManager.AdventureGuideModel.GetPeriodicityRedDot(6, ModelManager_1.ModelManager.ShipTowerModel.CurSeason) || !!ModelManager_1.ModelManager.AdventureGuideModel.GetPeriodicityRedDot(7, ModelManager_1.ModelManager.WeeklyRogueModel.CycleId);
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
  GetIsDetectionPreOpen(e, t, r) {
    if (!this.IsDetectionTypeAllowPreOpen(t)) {
      return false;
    }
    var i = this.GetPreOpenDetectionConf(e, t, r);
    if (i === undefined) {
      return false;
    }
    let o = false;
    for (const t of AdventureGuideController_1.AdventureGuideController.GetPlayerType()) {
      if (i.PlayTypeArray.includes(t)) {
        o = true;
        break;
      }
    }
    if (!o) {
      return false;
    }
    e = i.ConditionGroup;
    let n = true;
    if (e > 0) {
      n = !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.toString(), undefined);
    }
    var r = this.U4l.get(t)?.get(i.Id);
    let a = false;
    if (r && (e = MathUtils_1.MathUtils.LongToNumber(r.AE_), t = MathUtils_1.MathUtils.LongToNumber(r.PE_), e <= (r = TimeUtil_1.TimeUtil.GetServerTimeStamp())) && r <= t) {
      a = true;
    }
    return n && a;
  }
  GetIsDetectionPreOpenByData(e) {
    return this.GetIsDetectionPreOpen(e.Conf.Id, e.Type, e.Conf.PreOpenId);
  }
  GetIsDetectionPreOpenByRecord(e) {
    return this.GetIsDetectionPreOpen(e.Conf.Id, e instanceof AdventureDefine_1.DungeonDetectionRecord ? 0 : 1, e.Conf.PreOpenId);
  }
  GetIsDetectionPreOpenByPreOpenId(e) {
    e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfById(e);
    return e !== undefined && this.GetIsDetectionPreOpen(e.DetectionId, e.SoundAreaType, e.Id);
  }
  GetIsDetectionPreOpenByDungeonType(e) {
    for (const t of this.VVe.get(e) ?? []) {
      if (this.GetIsDetectionPreOpen(t.Conf.Id, t.Type, t.Conf.PreOpenId)) {
        return true;
      }
    }
    return false;
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
    for (const o of e) {
      if (i?.get(o.Id)) {
        return o;
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
      for (const o of t) {
        if (!o.IsLock && !!o.Conf && !((MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Conf.Name) ?? "").search(e) < 0)) {
          i.push(o);
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
  IOg(e) {
    return ConfigManager_1.ConfigManager.ActivityRegressConfig.GetGachaRoleDevelopInsByDungeonId(e)?.LevelPlayParam ?? 0;
  }
  GetNightMarePreOpenTarget(e) {
    return [ModelManager_1.ModelManager.ActivityRegressModel.NightmarePhantomInstInfoMap.get(e) ?? 0, this.IOg(e)];
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
    for (const n of r?.Vars ?? []) {
      var o = this.GetVar(e, t, n);
      if (i[0] < 0) {
        i[0] = o ?? 0;
      } else {
        i[1] = o ?? r.DefaultValues.at(1) ?? 0;
      }
    }
    return i;
  }
  GetVar(e, t, r) {
    var i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t);
    let o = undefined;
    if ((o = i ? i.Tree?.GetTreeVarByKey(r) : o) === undefined) {
      i = this.BDu(e, t);
      e = this.DDu.get(i);
      if (e === undefined) {
        return;
      }
      o = e[r];
    }
    if (o !== undefined) {
      let e = undefined;
      switch ((0, IVar_1.getVarTypeByIndex)(o.iTs)) {
        case "Boolean":
          e = o.rTs;
          break;
        case "Float":
          e = o.sTs;
          break;
        case "Int":
          e = MathUtils_1.MathUtils.LongToNumber(o.oTs);
          break;
        case "String":
          e = o.nTs;
          break;
        default:
          e = undefined;
      }
      return e;
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
  IsTowerType(e) {
    return e === 3 || e === 1 || e === 2 || e === 4;
  }
  IsShipTowerType(e) {
    return e === 6 || e === 5;
  }
  IsWeeklyRogueType(e) {
    return e === 7;
  }
  GetShipTowerStateListByType(e) {
    var t = [];
    var r = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgBySeason(ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON);
    if (e === 5) {
      for (const o of r) {
        t.push(o.Id);
      }
    } else {
      if (e !== 6) {
        return [];
      }
      var i = ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList;
      for (let e = r.length; e < i.length; e++) {
        t.push(i[e].Id);
      }
    }
    return t;
  }
  GetPeriodicityRedDot(e, t) {
    if (this.IsTowerType(e)) {
      return !!this.CheckTargetDungeonTypeCanShow(5) && (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AdventrueTower) ?? DEFAULT_SEASON_ID) < t;
    } else if (this.IsShipTowerType(e)) {
      return !!this.CheckTargetDungeonTypeCanShow(28) && (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AdventrueShipTowerSeason) ?? DEFAULT_SEASON_ID) < t;
    } else {
      return !!this.IsWeeklyRogueType(e) && !!this.CheckTargetDungeonTypeCanShow(29) && (e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew) !== undefined && !!e.CheckIfInShowTime() && !!e.CycleId && (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AdventrueWeeklyRogue) ?? DEFAULT_SEASON_ID) < t;
    }
  }
  SetPeriodicityRedDot(e, t) {
    if (this.IsTowerType(e)) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AdventrueTower, t);
    }
    if (this.IsShipTowerType(e)) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AdventrueShipTowerSeason, t);
    }
    if (this.IsWeeklyRogueType(e)) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AdventrueWeeklyRogue, t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventurePeriodicityTabUpdate);
  }
  GetRecordById(e) {
    return this.AllDungeonDetectionRecord.get(e) ?? this.AllSilentAreaDetectionRecord.get(e);
  }
}
exports.AdventureGuideModel = AdventureGuideModel;
//# sourceMappingURL=AdventureGuideModel.js.map