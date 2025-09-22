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
      const o = CommonParamById_1.configCommonParamById.GetIntConfig("MapPeriodicActivityTime");
      var i = (e, r, t) => e > 0 && e <= o && r ? 1 : e > 0 && e <= o && !t ? 2 : r ? 3 : t ? 5 : 4;
      var e = i(t, e.RedPoint, e.IsFinish);
      var i = i(a, r.RedPoint, r.IsFinish);
      if (e !== i) {
        return e - i;
      } else {
        return t - a;
      }
    };
    this.Pvd = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: e.MarkId,
        MarkType: ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId).ObjectType,
        Focal: true
      });
      ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew);
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
      var e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityShipTowerController?.Data;
      if (e) {
        ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(e);
      }
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
    var o = Vector_1.Vector.Create();
    if (a) {
      o.FromUeVector(a);
    } else {
      r = ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(r, e)?.Transform[0];
      a = r ? Vector_1.Vector.Create(r.X, r.Y, r.Z) : Vector_1.Vector.Create(0, 0, 0);
      this.jlc.Put(t, a);
      o.FromUeVector(a);
    }
    return o;
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
    this.Uvd.length = 0;
    var r = this.kvd();
    if (r) {
      this.Uvd.push(r);
    }
    var r = this.Ovd();
    if (r) {
      this.Uvd.push(r);
    }
    var r = this.qvd();
    if (r) {
      this.Uvd.push(r);
    }
    if (e) {
      this.Uvd.sort(this.Bvd);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapActivityListDataUpdate);
  }
  kvd() {
    var e;
    var r;
    var t = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
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
        RedPoint: t.GetIfFirstOpen(),
        OnClickCb: this.Pvd
      };
    }
  }
  Ovd() {
    var e;
    var r;
    var t;
    var a;
    var o;
    var i;
    var n;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10055)) {
      e = ModelManager_1.ModelManager.TowerModel;
      r = MathUtils_1.MathUtils.LongToNumber(e.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
      t = e.GetSeasonCountDownData();
      a = e.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      o = e.GetDifficultyAllStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      i = e.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY);
      n = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason) ?? -1;
      return {
        Id: 2,
        LeftTime: r > 0 ? r : 0,
        LeftTimeText: t.CountDownText ?? "",
        CurrentNum: a,
        TotalNum: o,
        IsFinish: i === 1,
        RedPoint: n < e.CurrentSeason,
        OnClickCb: this.Dvd
      };
    }
  }
  qvd() {
    var e;
    var r;
    var t;
    var a = ActivityControllerHolder_1.ActivityControllerHolder.ActivityShipTowerController?.Data;
    if (a && a.IsUnLock()) {
      [r, t] = (e = ModelManager_1.ModelManager.ShipTowerModel).GetEndlessRewardProgressNumData();
      return {
        Id: 3,
        LeftTimeText: e.GetSeasonCountDownData().CountDownText ?? "",
        LeftTime: e.GetRemainTime(),
        CurrentNum: r,
        TotalNum: t,
        IsFinish: r === t && r !== 0,
        RedPoint: a.GetIfFirstOpen(),
        OnClickCb: this.xvd
      };
    }
  }
}
exports.WorldMapModel = WorldMapModel;
//# sourceMappingURL=WorldMapModel.js.map