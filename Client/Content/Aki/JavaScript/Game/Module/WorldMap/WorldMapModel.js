"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapModel = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const TrimLru_1 = require("../../../Core/Container/TrimLru");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../Activity/ActivityControllerHolder");
const MapUtil_1 = require("../Map/MapUtil");
const MapLogger_1 = require("../Map/Misc/MapLogger");
const TowerData_1 = require("../TowerDetailUi/TowerData");
const WorldMapAxisInteractValidation_1 = require("./WorldMapAxisInteractValidation");
class WorldMapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LevelEventDisableFlag = false;
    this.CustomMarkSize = 0;
    this.MapScale = -0;
    this.MapScaleMin = -0;
    this.MapScaleMax = -0;
    this.zNl = true;
    this.JNl = true;
    this.p_d = 1;
    this.ghl = undefined;
    this.CurrentFocalMarkType = 0;
    this.CurrentFocalMarkId = 0;
    this.WorldMapId = undefined;
    this.WorldMapCurrentMultiMapId = undefined;
    this.LastBigSceneMiniMapInfo = undefined;
    this.IsBattleViewOpen = false;
    this.WorldMapAxisInteractValidation = new WorldMapAxisInteractValidation_1.WorldMapAxisInteractValidation();
    this.NDl = new Map();
    this.FDl = new Map();
    this.sGl = 0;
    this.MapRangeInfo = undefined;
    this.NavigateMarkShowRangeInfo = undefined;
    this.EnableInstanceDungeonFilterMark = false;
    this.jlc = new TrimLru_1.TrimLru(3000);
    this.Ofc = undefined;
    this.PendingOpenWorldMapQuestId = undefined;
    this.HideQuickTransferConfirmBox = false;
    this.LastWorldMapPointerWorldPosition = undefined;
    this.N61 = undefined;
    this.tMd = [];
    this.p3o = undefined;
    this.GEr = Info_1.Info.IsPlayInEditor;
    this.iMd = (e, t) => {
      var r = e.LeftTime;
      var a = t.LeftTime;
      const i = CommonParamById_1.configCommonParamById.GetIntConfig("MapPeriodicActivityTime");
      var o = (e, t, r) => e > 0 && e <= i && t ? 1 : e > 0 && e <= i && !r ? 2 : t ? 3 : r ? 5 : 4;
      var e = o(r, e.RedPoint, e.IsFinish);
      var o = o(a, t.RedPoint, t.IsFinish);
      if (e !== o) {
        return e - o;
      } else {
        return r - a;
      }
    };
    this.zSd = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(1);
      var t = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: t?.GetCycleConfig()?.MapMark ?? 0,
        MarkType: ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId).ObjectType,
        Focal: true
      });
    };
    this.ZSd = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(2);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: e.MarkId,
        MarkType: ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId).ObjectType,
        Focal: true
      });
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason, ModelManager_1.ModelManager.TowerModel.CurrentSeason);
    };
    this.eMd = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(3);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: e.MarkId,
        MarkType: ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId).ObjectType,
        Focal: true
      });
    };
  }
  get CustomMarksIsShow() {
    return this.zNl;
  }
  get CompletedPlayPointMarkIsShow() {
    return this.JNl;
  }
  get JoystickClickMultiplier() {
    return this.p_d;
  }
  get WaitToTeleportMarkConfigId() {
    return this.ghl;
  }
  set WaitToTeleportMarkConfigId(e) {
    this.ghl = e;
  }
  GetDebugMapPath() {
    this.N61 ||= UE.NewArray(UE.Vector2D);
    return this.N61;
  }
  OnInit() {
    this.CustomMarkSize = ConfigManager_1.ConfigManager.WorldMapConfig.GetCommonValue("custom_mark_size");
    this.ResetMapScale();
    this.WorldMapAxisInteractValidation.Init();
    this.sGl = (CommonParamById_1.configCommonParamById.GetFloatConfig("SoundBoxSfxCoolTime") ?? 0) * 1000;
    this.WorldMapId = undefined;
    this.LastBigSceneMiniMapInfo = undefined;
    this.JNl = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowFinishedPlayPointMark, true);
    this.zNl = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowCustomMark, true);
    this.p_d = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickClickMultiplier, 1);
    return true;
  }
  OnClear() {
    this.WorldMapAxisInteractValidation.Clear();
    this.NDl.clear();
    this.FDl.clear();
    MapLogger_1.MapLogger.Clear();
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  ResetMapScale() {
    var e = this.WorldMapId ?? 1;
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e);
    if (t) {
      this.MapScaleMax = t.BigMapMaxScale / t.BigMapDefaultScale;
      this.MapScaleMin = t.BigMapMinScale / t.BigMapDefaultScale;
      t = (ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e)?.BigMapDefaultScale ?? 0) / 100;
      if (this.MapScale === 0) {
        this.MapScale = t;
      } else {
        this.MapScale = Math.max(this.MapScaleMin, Math.min(this.MapScaleMax, this.MapScale));
      }
    }
  }
  GetEntityPosition(e, t) {
    var r = t + "_" + e;
    let a = this.jlc.Get(r);
    var i = Vector_1.Vector.Create();
    if (a) {
      i.FromUeVector(a);
    } else {
      t = ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(t, e)?.Transform[0];
      a = t ? Vector_1.Vector.Create(t.X, t.Y, t.Z) : Vector_1.Vector.Create(0, 0, 0);
      this.jlc.Put(r, a);
      i.FromUeVector(a);
    }
    return i;
  }
  GetEntityAreaId(e, t) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityData(e, t)?.AreaId ?? 0;
  }
  UpdateAreaExploreInfo(e) {
    if (e) {
      var t = new Array();
      for (const r of e.HVn) {
        t.push({
          ExploreProgressId: r.qPs,
          ExplorePercent: r.BPs
        });
      }
      this.p3o = {
        AreaId: e.p6n,
        ExploreProgress: t,
        ExplorePercent: e.BPs
      };
    }
  }
  GetAreaExploreInfo() {
    return this.p3o;
  }
  RecordPlaySoundMarkSfx(e) {
    var t = Time_1.Time.ServerStopTimeStamp;
    this.NDl.set(e, t);
  }
  SetPlaySoundMarkSfxForbidden(e, t) {
    this.FDl.set(e, t);
  }
  IsSoundMarkSfxCoolingDown(e) {
    var e = this.NDl.get(e) ?? 0;
    var t = this.sGl;
    return Time_1.Time.ServerStopTimeStamp - e <= t;
  }
  IsSoundMarkSfxForbidden(e) {
    return this.FDl.get(e) ?? false;
  }
  SetCompletedPlayPointMarkShow(e) {
    return this.JNl !== e && (this.JNl = e, LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowFinishedPlayPointMark, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ToggleShowCompletedPlayMark, e), true);
  }
  SetCustomMarksShow(e) {
    return this.zNl !== e && (this.zNl = e, LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowCustomMark, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ToggleShowCustomMark, e), true);
  }
  SetJoystickClickMultiplier(e) {
    this.p_d = Math.max(0, Math.min(CommonParamById_1.configCommonParamById.GetFloatConfig("MapJoystickClickMaxMultiplier"), e));
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickClickMultiplier, this.p_d);
  }
  GetPlayerPosition() {
    var e;
    if (ModelManager_1.ModelManager.MapModel.CurrentInWorld) {
      if (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3)) {
        return Vector_1.Vector.Create(e.ActorLocationProxy);
      } else {
        return Vector_1.Vector.Create();
      }
    } else {
      return MapUtil_1.MapUtil.GetLastBigScenePlayerPosition();
    }
  }
  IsPlayerInInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType;
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    return e !== Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance || t !== 13;
  }
  IsPlayerInWorldInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType;
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    return e === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance && t === 12;
  }
  IsPlayerInBigWorldInstanceDungeon() {
    return ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
  }
  IsPlayerInStoryInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType;
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    var t = t === 1 || t === 2 || t === 0;
    return e === Protocol_1.Aki.Protocol.i4s.Proto_NormalInstance && t;
  }
  IsPlayerInActivityInstanceDungeon() {
    return !this.IsPlayerInBigWorldInstanceDungeon() && !this.IsPlayerInStoryInstanceDungeon();
  }
  InstIsType(e, t, r) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    return e?.InstType === t && e?.InstSubType === r;
  }
  CheckGamePlayIsTracked(e) {
    var t;
    var r;
    return !!this.NavigateMarkShowRangeInfo && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 69, "检查玩法是否需要追踪", ["playInfo-playId", e.Id], ["NavigateMarkShowRangeInfo", this.NavigateMarkShowRangeInfo]), this.NavigateMarkShowRangeInfo.GamePlayId !== e.Id) && !UiManager_1.UiManager.IsViewOpen("WorldMapView") && !this.NavigateMarkShowRangeInfo.IsDiscover && !(e = this.NavigateMarkShowRangeInfo.MarkId, t = this.NavigateMarkShowRangeInfo.MarkType, r = this.NavigateMarkShowRangeInfo.ExploreTypeName, r = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(r, r), this.NavigateMarkShowRangeInfo.IsDiscover = true, ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e), ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
      MarkType: t,
      MarkId: e,
      Track: true
    }), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PlayPointFind_Text", r), 0);
  }
  get CurrentWorldMapConfigId() {
    return this.WorldMapId ?? ModelManager_1.ModelManager.MapModel.CurrentMapConfigId;
  }
  get CurrentWorldMapInstanceId() {
    if (this.WorldMapId === undefined || this.WorldMapId === ModelManager_1.ModelManager.MapModel.CurrentMapConfigId) {
      return ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    } else {
      return this.WorldMapId;
    }
  }
  GetCurrentLocateWorldMapInstanceId(e) {
    if (this.WorldMapId === undefined) {
      return ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    } else if (this.WorldMapId === ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId) {
      if (e &&= ModelManager_1.ModelManager.MapModel.GetDungeonEntranceConfig(ModelManager_1.ModelManager.GameModeModel.InstanceDungeon)) {
        return e.Id;
      } else {
        return ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      }
    } else {
      return this.WorldMapId;
    }
  }
  SearchMarkMapConfigId(e) {
    return ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.MapId ?? ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
  }
  get WorldMapGravity() {
    return this.Ofc ?? ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity;
  }
  set WorldMapSelectGravity(e) {
    this.Ofc = e;
  }
  get WorldMapSelectGravity() {
    return this.Ofc;
  }
  SetWorldMapSelectedGravity(e, t) {
    this.WorldMapSelectGravity = this.GetFinalWorldMapGravity(e, t);
    return this.WorldMapSelectGravity;
  }
  GetFinalWorldMapGravity(e, t) {
    if (this.IsGravityMap(e)) {
      if (t !== undefined && t !== 0) {
        return t;
      } else {
        return ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity;
      }
    } else {
      return 1;
    }
  }
  IsGravityMap(e) {
    return ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e, false)?.IsGravityMap ?? false;
  }
  IsNeedCustomizedThumbnail(e) {
    return ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e, false)?.IsNeedCustomizedThumbnail ?? false;
  }
  set EnableDebug(e) {
    this.GEr = e;
  }
  get EnableDebug() {
    return !Info_1.Info.IsBuildShipping && this.GEr;
  }
  get ActivityListData() {
    return this.tMd;
  }
  UpdateActivityListItemData(e = true) {
    var t = [];
    var r = this.rMd();
    if (r) {
      t.push(r);
    }
    var r = this.oMd();
    if (r) {
      t.push(r);
    }
    var r = this.nMd();
    if (r) {
      t.push(r);
    }
    if (e) {
      t.sort(this.iMd);
    } else {
      const a = new Map();
      this.tMd.forEach((e, t) => {
        a.set(e.Id, t);
      });
      t.sort((e, t) => {
        return (a.get(e.Id) ?? Number.MAX_SAFE_INTEGER) - (a.get(t.Id) ?? Number.MAX_SAFE_INTEGER);
      });
    }
    this.tMd.length = 0;
    this.tMd.push(...t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapActivityListDataUpdate);
  }
  rMd() {
    const t = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
    var e;
    var r;
    if (t && t.IsUnLock()) {
      e = t.Score ?? 0;
      r = t.GetCycleConfig()?.MaxScore ?? 0;
      return {
        Id: 1,
        LeftTimeText: t.GetCycleCountDownData().CountDownText ?? "",
        LeftTime: t.GetCycleRemainTime() ?? 0,
        CurrentNum: e,
        TotalNum: r,
        IsFinish: t.IsScoreRewardAllReceive(),
        RedPoint: t.HasNewCycle(),
        OnClickCb: this.zSd,
        OnLeftTimeRefreshCb: e => {
          e.LeftTime = t.GetCycleRemainTime() ?? 0;
          e.LeftTimeText = t.GetCycleCountDownData().CountDownText ?? "";
        }
      };
    }
  }
  oMd() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10055)) {
      const n = ModelManager_1.ModelManager.TowerModel;
      var e = MathUtils_1.MathUtils.LongToNumber(n.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
      var t = n.GetSeasonCountDownData();
      var r = n.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      var a = n.GetDifficultyAllStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      var i = n.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY);
      var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason) ?? -1;
      return {
        Id: 2,
        LeftTime: e > 0 ? e : 0,
        LeftTimeText: t.CountDownText ?? "",
        CurrentNum: r,
        TotalNum: a,
        IsFinish: i === 1,
        RedPoint: o < n.CurrentSeason,
        OnClickCb: this.ZSd,
        OnLeftTimeRefreshCb: e => {
          var t = MathUtils_1.MathUtils.LongToNumber(n.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
          e.LeftTime = t > 0 ? t : 0;
          e.LeftTimeText = n.GetSeasonCountDownData().CountDownText ?? "";
        }
      };
    }
  }
  nMd() {
    var e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityShipTowerController?.Data;
    if (e && e.IsUnLock()) {
      const a = ModelManager_1.ModelManager.ShipTowerModel;
      var [t, r] = a.GetEndlessRewardProgressNumData();
      return {
        Id: 3,
        LeftTimeText: a.GetSeasonCountDownData().CountDownText ?? "",
        LeftTime: a.GetRemainTime(),
        CurrentNum: t,
        TotalNum: r,
        IsFinish: t === r && t !== 0,
        RedPoint: e.HasNewCycle(),
        OnClickCb: this.eMd,
        OnLeftTimeRefreshCb: e => {
          e.LeftTime = a.GetRemainTime();
          e.LeftTimeText = a.GetSeasonCountDownData().CountDownText ?? "";
        }
      };
    }
  }
}
exports.WorldMapModel = WorldMapModel;
//# sourceMappingURL=WorldMapModel.js.map