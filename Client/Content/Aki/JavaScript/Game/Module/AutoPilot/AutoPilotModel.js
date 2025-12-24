"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotModel = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const TransportDefine_1 = require("../Transport/TransportDefine");
const TransportNetworkController_1 = require("../Transport/TransportNetworkController");
const AutoPilotCirclePathResult_1 = require("./AutoPilotCirclePathResult");
const AutoPilotDefine_1 = require("./AutoPilotDefine");
const AutoPilotFindPathResult_1 = require("./AutoPilotFindPathResult");
class AutoPilotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.b8m = false;
    this.R8m = false;
    this.w8m = undefined;
    this.L8m = undefined;
    this.fmf = undefined;
    this.A8m = 0;
    this.D8m = 0;
    this.U8m = -1;
    this.x8m = 0;
    this.B8m = 0;
    this.k8m = 0;
    this.q8m = 0;
    this.O8m = 0;
    this.gmf = undefined;
    this.Cmf = false;
    this.IsDebugMode = false;
    this.IsSkipConfirmBoxShow = true;
    this.MapIdToCirclePathMap = new Map();
    this.AutoPilotMovieCameraRowName = "";
    this.AutoPilotMovieCameraInitialIndex = 0;
    this.EnterCircleRoadId = 0;
    this.e8m = {
      Value: 0
    };
    this.yIf = {
      NearestPos: Vector_1.Vector.Create()
    };
    this.RideShareBtnProgress = 0;
    this.HideQuickTransferConfirmBox = false;
    this.IsAllowExitByMove = false;
    this.DebugRoadWayIds = [];
    this.DebugCircleId = 0;
    this.IsOnMotor = false;
    this.LastActorLocation = Vector_1.Vector.Create();
    this.SplineMoveComp = undefined;
    this.IsSummonWaitingEnterVehicle = false;
    this.U9f = 0;
    this.VehicleEntity = undefined;
    this.HighLightSampleDist = 0;
    this.AutoPilotRoadWayWidthOffset = 0;
    this.AutoPilotExitHorizontalDistThreshold = 0;
    this.AutoPilotExitVerticalDistThreshold = 0;
    this.yeg = false;
    this.N8m = false;
    this.n21 = t => {
      if (!!this.w8m && !ModelManager_1.ModelManager.TrackModel?.IsTracking(this.w8m.TrackSource, this.w8m.MarkId)) {
        this.SetTrackingMarkItem(undefined);
      }
    };
  }
  get ActorComp() {
    return ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(3);
  }
  OnInit() {
    this.TIf();
    this.Ore();
    return true;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.n21);
  }
  TIf() {
    this.A8m = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotPlayerToTargetDistanceThreshold") ?? 0, 2);
    this.D8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotSplineDistanceThreshold") ?? 0;
    this.U8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotSkillHighLightTime") ?? -1;
    this.x8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotEnterMovieModeTimeThreshold") ?? 0;
    this.B8m = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotEnterMovieModeDistanceThreshold") ?? 0, 2);
    this.k8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotCanSkipTimeThreshold") ?? 0;
    this.q8m = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotCanSkipDistanceThreshold") ?? 0, 2);
    this.AutoPilotMovieCameraRowName = CommonParamById_1.configCommonParamById.GetStringConfig("AutoPilotMovieCameraRowName") ?? "3.0大世界电影镜头";
    this.AutoPilotMovieCameraInitialIndex = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotMovieCameraInitialIndex") ?? 0;
    this.IsAllowExitByMove = CommonParamById_1.configCommonParamById.GetBoolConfig("AutoPilotExitByMove") ?? false;
    this.AutoPilotRoadWayWidthOffset = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotRoadWayWidthOffset") ?? 0;
    this.AutoPilotExitHorizontalDistThreshold = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotExitHorizontalDistanceThreshold") ?? 1800, 2);
    this.AutoPilotExitVerticalDistThreshold = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotExitVerticalDistanceThreshold") ?? 1200;
    this.HighLightSampleDist = AutoPilotDefine_1.HIGHLIGHTLINEDISTANCEINTERVAL;
    this.UpdateCirclePathData();
  }
  UpdateCirclePathData() {
    this.MapIdToCirclePathMap.clear();
    this.MapIdToCirclePathMap.set(105, {
      RoadBuildIdArray: [0],
      CircleIds: [0]
    });
    var t;
    var e;
    var i;
    var o = ConfigManager_1.ConfigManager.InfrastructureConfig?.GetAutoPilotCircle();
    if (o && !(o.length <= 0)) {
      for (const r of o) {
        if (this.gwf(r.RoadBuildIdArray)) {
          t = r.MapId;
          e = r.AutoPilotCirclePathId;
          if (this.MapIdToCirclePathMap.has(t)) {
            i = this.MapIdToCirclePathMap.get(t);
            if (r.RoadBuildIdArray.length > i.RoadBuildIdArray.length) {
              i.RoadBuildIdArray = Array.from(r.RoadBuildIdArray);
              i.CircleIds.length = 0;
              i.CircleIds.push(e);
            } else if (r.RoadBuildIdArray.length === i.RoadBuildIdArray.length) {
              i.CircleIds.push(e);
            }
          } else {
            this.MapIdToCirclePathMap.set(t, {
              RoadBuildIdArray: Array.from(r.RoadBuildIdArray),
              CircleIds: [e]
            });
          }
        }
      }
    }
  }
  gwf(t) {
    for (const i of t) {
      var e = ModelManager_1.ModelManager.InfrastructureModel?.GetRoadDataByRoadId(i);
      if (!e || e.Status !== Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
        return false;
      }
    }
    return true;
  }
  GetIsTracking(t) {
    return this.w8m?.MarkId === t;
  }
  SetTrackingMarkItem(t) {
    var e;
    if (this.w8m?.MarkId !== t?.MarkId && (this.ClearTrackingData(), e = this.w8m, this.w8m = t, this.w8m && (this.SetTrackingData({
      TargetPos: this.w8m.WorldPosition,
      MapId: this.w8m.MapId
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemAutoPilotTrackStateChange, this.w8m.MarkType, this.w8m.MarkId)), e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemAutoPilotTrackStateChange, e.MarkType, e.MarkId);
    }
  }
  ClearData() {
    this.ClearTrackingData();
    this.ClearCirclePathResult();
  }
  ClearFindPathResult() {
    this.L8m = undefined;
  }
  ClearCirclePathResult() {
    this.fmf = undefined;
  }
  SetTrackingData(t) {
    this.gmf = t;
    this.RefreshFindPath();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateAutoPilotLine);
  }
  ClearTrackingData() {
    ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("ClearTrackingData");
    this.gmf = undefined;
    this.ClearFindPathResult();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateAutoPilotLine);
  }
  GetSplineDistanceThreshold() {
    return this.D8m;
  }
  GetFindPathResult() {
    return this.L8m;
  }
  GetCirclePathResult() {
    return this.fmf;
  }
  RefreshFindPath() {
    if (this.gmf && this.ActorComp) {
      let t = false;
      if (!this.L8m) {
        this.L8m = new AutoPilotFindPathResult_1.AutoPilotFindPathResult();
        t = true;
      }
      if (this.b8m) {
        this.L8m.RefreshDataInAutoPilot();
      } else if (t || this.L8m.IsNeedRefreshByFindPath(this.ActorComp.ActorLocationProxy)) {
        var e = this.gmf.TargetPos;
        let t = undefined;
        if (Vector_1.Vector.DistSquared2D(this.ActorComp.ActorLocationProxy, e) > this.A8m && !(t = TransportNetworkController_1.TransportNetworkController.FindPath(this.ActorComp.ActorLocationProxy, e, true, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AutoPilot", 87, "TransportNetworkController.FindPath return null");
          }
        } else {
          this.L8m.RefreshData(this.gmf.MapId, this.ActorComp.ActorLocationProxy, e, t);
        }
      }
    }
  }
  RefreshCirclePath(t, e) {
    this.fmf ||= new AutoPilotCirclePathResult_1.AutoPilotCirclePathResult(t, e);
    this.fmf.RefreshPathToCircleData();
  }
  GetIsInAutoPilot() {
    return this.b8m;
  }
  GetAutoPilotState() {
    return this.U9f;
  }
  SetAutoPilotState(t) {
    var e;
    var t = (this.U9f = t) !== 0;
    if (this.b8m !== t) {
      this.b8m = t;
      e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity?.GetComponent(242)?.VehicleEntity?.GetComponent(215);
      if (t) {
        if (!e?.HasTag(AutoPilotDefine_1.autoPilotTag)) {
          e?.AddTag(AutoPilotDefine_1.autoPilotTag);
        }
      } else if (e?.HasTag(AutoPilotDefine_1.autoPilotTag)) {
        e?.RemoveTag(AutoPilotDefine_1.autoPilotTag);
      }
      AudioSystem_1.AudioSystem.PostEvent(t ? "play_ui_moto_autopilot_tips_enter" : "play_ui_moto_autopilot_tips_exit");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAutoPilotStateChange, t);
    }
  }
  GetIsInMovieMode() {
    return this.R8m;
  }
  SetIsInMovieMode(t) {
    this.R8m = t;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorInMovieModeChange, t);
  }
  GetPlayerToTargetDistanceThreshold() {
    return this.A8m;
  }
  GetEnterMovieModeTimeThreshold() {
    return this.x8m;
  }
  GetEnterMovieModeDistanceThreshold() {
    return this.B8m;
  }
  GetCanSkipTimeThreshold() {
    return this.k8m;
  }
  GetCanSkipDistanceThreshold() {
    return this.q8m;
  }
  GetSkillHighLightTime() {
    return this.U8m;
  }
  GetAutoPilotTime() {
    return this.O8m;
  }
  AddAutoPilotTime(t) {
    this.O8m += t;
  }
  ResetAutoPilotTime() {
    this.O8m = 0;
  }
  get IsPlayerInAutoPilotArea() {
    return ModelManager_1.ModelManager.MapModel?.CurrentWorldMapConfigId === 105 || this.N8m;
  }
  set IsPlayerInAutoPilotArea(t) {
    if (this.N8m !== t) {
      if (!t && this.gmf) {
        this.SetTrackingMarkItem(undefined);
      }
      this.N8m = t;
    }
  }
  GetIsCanShowSkipBtn() {
    return this.Cmf;
  }
  SetIsCanShowSkipBtn(t) {
    this.Cmf = t;
  }
  GetEnableAutoPilot() {
    return this.e8m;
  }
  SetEnableAutoPilot(t, e) {
    this.e8m.Value = t;
    this.e8m.DisableReason = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "设置可巡航的状态", ["value", t], ["reason", e]);
    }
  }
  GetNearestRoadway() {
    return this.yIf;
  }
  SetNearestRoadway(t, e) {
    this.yIf.NearestPos.DeepCopy(t);
    this.yIf.Roadway = e;
    this.RefreshIsOnNearestRoadway();
    if (e) {
      t = (0, TransportDefine_1.getRoadwayAutopilotSprintConfig)(e);
      if ((t === 1 || t === 2) && this.yeg) {
        this.m7f(true);
        return;
      }
    }
    this.m7f(false);
  }
  m7f(t) {
    var e;
    if (this.ActorComp && (e = this.ActorComp.Entity.GetComponent(242))?.VehicleType === "Motorcycle" && (e = e?.VehicleEntity?.GetComponent(254))) {
      if (t) {
        if (!e.HasTag(AutoPilotDefine_1.motorUnlimitedNitroTag)) {
          e.AddTag(AutoPilotDefine_1.motorUnlimitedNitroTag);
        }
      } else if (e.HasTag(AutoPilotDefine_1.motorUnlimitedNitroTag)) {
        e.RemoveTag(AutoPilotDefine_1.motorUnlimitedNitroTag);
      }
    }
  }
  RefreshIsOnNearestRoadway() {
    var t;
    var e;
    if (this.ActorComp && (e = this.yIf.Roadway)) {
      t = Vector_1.Vector.DistSquared(this.yIf.NearestPos, this.ActorComp.ActorLocationProxy);
      e = e.Width / 2 + this.AutoPilotRoadWayWidthOffset;
      e = Math.pow(e, 2);
      this.yeg = !(e < t);
    } else {
      this.yeg = false;
    }
  }
  GetIsOnNearestRoadway() {
    return this.yeg;
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.n21);
  }
  OnClear() {
    this.ClearData();
    this.MapIdToCirclePathMap.clear();
    this.kre();
    return true;
  }
}
exports.AutoPilotModel = AutoPilotModel;
//# sourceMappingURL=AutoPilotModel.js.map