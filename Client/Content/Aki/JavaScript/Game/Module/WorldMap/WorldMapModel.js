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
    this.Mld = 1;
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
    this.Uvd = [];
    this.p3o = undefined;
    this.GEr = Info_1.Info.IsPlayInEditor;
    this.Bvd = (e, r) => {
      var t = e.LeftTime;
      var a = r.LeftTime;
      const i = CommonParamById_1.configCommonParamById.GetIntConfig("MapPeriodicActivityTime");
      var o = (e, r, t) => e > 0 && e <= i && r ? 1 : e > 0 && e <= i && !t ? 2 : r ? 3 : t ? 5 : 4;
      var e = o(t, e.RedPoint, e.IsFinish);
      var o = o(a, r.RedPoint, r.IsFinish);
      if (e !== o) {
        return e - o;
      } else {
        return t - a;
      }
    };
    this.Pvd = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(1);
      var r = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: r?.GetCycleConfig()?.MapMark ?? 0,
        MarkType: ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId).ObjectType,
        Focal: true
      });
    };
    this.Dvd = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(2);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: e.MarkId,
        MarkType: ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId).ObjectType,
        Focal: true
      });
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason, ModelManager_1.ModelManager.TowerModel.CurrentSeason);
    };
    this.xvd = () => {
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
    return this.Mld;
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
    this.Mld = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickClickMultiplier, 1);
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
    this.MapScale = (ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(1)?.BigMapDefaultScale ?? 0) / 100;
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(1);
    if (e) {
      this.MapScaleMax = e.BigMapMaxScale / e.BigMapDefaultScale;
      this.MapScaleMin = e.BigMapMinScale / e.BigMapDefaultScale;
    }
  }
  GetEntityPosition(e, r) {
    var t = r + "_" + e;
    let a = this.jlc.Get(t);
    var i = Vector_1.Vector.Create();
    if (a) {
      i.FromUeVector(a);
    } else {
      r = ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(r, e)?.Transform[0];
      a = r ? Vector_1.Vector.Create(r.X, r.Y, r.Z) : Vector_1.Vector.Create(0, 0, 0);
      this.jlc.Put(t, a);
      i.FromUeVector(a);
    }
    return i;
  }
  GetEntityAreaId(e, r) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityData(e, r)?.AreaId ?? 0;
  }
  UpdateAreaExploreInfo(e) {
    if (e) {
      var r = new Array();
      for (const t of e.HVn) {
        r.push({
          ExploreProgressId: t.qPs,
          ExplorePercent: t.BPs
        });
      }
      this.p3o = {
        AreaId: e.p6n,
        ExploreProgress: r,
        ExplorePercent: e.BPs
      };
    }
  }
  GetAreaExploreInfo() {
    return this.p3o;
  }
  RecordPlaySoundMarkSfx(e) {
    var r = Time_1.Time.ServerStopTimeStamp;
    this.NDl.set(e, r);
  }
  SetPlaySoundMarkSfxForbidden(e, r) {
    this.FDl.set(e, r);
  }
  IsSoundMarkSfxCoolingDown(e) {
    var e = this.NDl.get(e) ?? 0;
    var r = this.sGl;
    return Time_1.Time.ServerStopTimeStamp - e <= r;
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
    this.Mld = Math.max(0, Math.min(CommonParamById_1.configCommonParamById.GetFloatConfig("MapJoystickClickMaxMultiplier"), e));
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickClickMultiplier, this.Mld);
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
    var r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    return e !== Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance || r !== 13;
  }
  IsPlayerInWorldInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType;
    var r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    return e === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance && r === 12;
  }
  IsPlayerInBigWorldInstanceDungeon() {
    return ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
  }
  IsPlayerInStoryInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType;
    var r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    var r = r === 1 || r === 2 || r === 0;
    return e === Protocol_1.Aki.Protocol.i4s.Proto_NormalInstance && r;
  }
  IsPlayerInActivityInstanceDungeon() {
    return !this.IsPlayerInBigWorldInstanceDungeon() && !this.IsPlayerInStoryInstanceDungeon();
  }
  InstIsType(e, r, t) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    return e?.InstType === r && e?.InstSubType === t;
  }
  CheckGamePlayIsTracked(e) {
    var r;
    var t;
    return !!this.NavigateMarkShowRangeInfo && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 69, "检查玩法是否需要追踪", ["playInfo-playId", e.Id], ["NavigateMarkShowRangeInfo", this.NavigateMarkShowRangeInfo]), this.NavigateMarkShowRangeInfo.GamePlayId !== e.Id) && !UiManager_1.UiManager.IsViewOpen("WorldMapView") && !this.NavigateMarkShowRangeInfo.IsDiscover && !(e = this.NavigateMarkShowRangeInfo.MarkId, r = this.NavigateMarkShowRangeInfo.MarkType, t = this.NavigateMarkShowRangeInfo.ExploreTypeName, t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t), this.NavigateMarkShowRangeInfo.IsDiscover = true, ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e), ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
      MarkType: r,
      MarkId: e,
      Track: true
    }), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PlayPointFind_Text", t), 0);
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
  SetWorldMapSelectedGravity(e, r) {
    this.WorldMapSelectGravity = this.GetFinalWorldMapGravity(e, r);
    return this.WorldMapSelectGravity;
  }
  GetFinalWorldMapGravity(e, r) {
    if (this.IsGravityMap(e)) {
      if (r !== undefined && r !== 0) {
        return r;
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
    return this.Uvd;
  }
  UpdateActivityListItemData(e = true) {
    var r = [];
    var t = this.kvd();
    if (t) {
      r.push(t);
    }
    var t = this.Ovd();
    if (t) {
      r.push(t);
    }
    var t = this.qvd();
    if (t) {
      r.push(t);
    }
    if (e) {
      r.sort(this.Bvd);
    } else {
      const a = new Map();
      this.Uvd.forEach((e, r) => {
        a.set(e.Id, r);
      });
      r.sort((e, r) => {
        return (a.get(e.Id) ?? Number.MAX_SAFE_INTEGER) - (a.get(r.Id) ?? Number.MAX_SAFE_INTEGER);
      });
    }
    this.Uvd.length = 0;
    this.Uvd.push(...r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapActivityListDataUpdate);
  }
  kvd() {
    const r = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
    var e;
    var t;
    if (r && r.IsUnLock()) {
      e = r.Score ?? 0;
      t = r.GetCycleConfig()?.MaxScore ?? 0;
      return {
        Id: 1,
        LeftTimeText: r.GetCycleCountDownData().CountDownText ?? "",
        LeftTime: r.GetCycleRemainTime() ?? 0,
        CurrentNum: e,
        TotalNum: t,
        IsFinish: r.IsScoreRewardAllReceive(),
        RedPoint: r.HasNewCycle(),
        OnClickCb: this.Pvd,
        OnLeftTimeRefreshCb: e => {
          e.LeftTime = r.GetCycleRemainTime() ?? 0;
          e.LeftTimeText = r.GetCycleCountDownData().CountDownText ?? "";
        }
      };
    }
  }
  Ovd() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10055)) {
      const n = ModelManager_1.ModelManager.TowerModel;
      var e = MathUtils_1.MathUtils.LongToNumber(n.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
      var r = n.GetSeasonCountDownData();
      var t = n.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      var a = n.GetDifficultyAllStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      var i = n.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY);
      var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason) ?? -1;
      return {
        Id: 2,
        LeftTime: e > 0 ? e : 0,
        LeftTimeText: r.CountDownText ?? "",
        CurrentNum: t,
        TotalNum: a,
        IsFinish: i === 1,
        RedPoint: o < n.CurrentSeason,
        OnClickCb: this.Dvd,
        OnLeftTimeRefreshCb: e => {
          var r = MathUtils_1.MathUtils.LongToNumber(n.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
          e.LeftTime = r > 0 ? r : 0;
          e.LeftTimeText = n.GetSeasonCountDownData().CountDownText ?? "";
        }
      };
    }
  }
  qvd() {
    var e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityShipTowerController?.Data;
    if (e && e.IsUnLock()) {
      const a = ModelManager_1.ModelManager.ShipTowerModel;
      var [r, t] = a.GetEndlessRewardProgressNumData();
      return {
        Id: 3,
        LeftTimeText: a.GetSeasonCountDownData().CountDownText ?? "",
        LeftTime: a.GetRemainTime(),
        CurrentNum: r,
        TotalNum: t,
        IsFinish: r === t && r !== 0,
        RedPoint: e.HasNewCycle(),
        OnClickCb: this.xvd,
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