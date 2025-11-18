"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameModeModel = exports.PAUSE_TYPE = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const LogProfiler_1 = require("../../../Core/Common/LogProfiler");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameMode_1 = require("../Define/GameMode");
const GameModePromise_1 = require("../Define/GameModePromise");
const WorldDefine_1 = require("../Define/WorldDefine");
exports.PAUSE_TYPE = 3;
class GameModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsSilentLogin = false;
    this.GMr = false;
    this.NMr = undefined;
    this.OMr = undefined;
    this.kMr = false;
    this.FMr = false;
    this.VMr = false;
    this.HMr = false;
    this.jMr = "";
    this.ghh = "";
    this.WMr = new Array();
    this.Aoa = undefined;
    this.KMr = undefined;
    this.QMr = undefined;
    this.XMr = undefined;
    this.$Mr = 0;
    this.YMr = undefined;
    this.rtm = Protocol_1.Aki.Protocol.i4s.Proto_NoneInstance;
    this.JMr = false;
    this.zMr = false;
    this.QIo = false;
    this.ZMr = false;
    this.eEr = undefined;
    this.tEr = false;
    this.iEr = false;
    this.Wdl = false;
    this.M0l = IAction_1.EFadeInScreenShowType.Black;
    this.ShowCenterTextFlow = undefined;
    this.oEr = false;
    this.L3c = undefined;
    this.w3c = undefined;
    this.R3c = false;
    this.sIl = undefined;
    this.aIl = undefined;
    this.bVd = undefined;
    this.LZu = undefined;
    this.AZu = undefined;
    this.cAd = undefined;
    this.dAd = undefined;
    this.ForceDisableGamePaused = false;
    this.PreAwakeEntityDuringLoad = true;
    this.GamePausedReasons = new Set();
    this.DataLayerSet = new Set();
    this.TempDataLayer = [];
    this.MaterialParameterCollectionMap = new Map();
    this.TimeDilationMap = new Map();
    this.rEr = undefined;
    this.pr_ = false;
    this.S5u = new Map();
    this.P5u = new Map();
    this.aOd = undefined;
    this.nEr = 0;
    this.IsSameMapTraveling = false;
    this.LoadWorldProfiler = new LogProfiler_1.LogProfiler("加载世界");
    this.OpenLoadingProfiler = this.LoadWorldProfiler.CreateChild("打开Loading");
    this.OpenLevelProfiler = this.LoadWorldProfiler.CreateChild("加载主Level");
    this.PreloadProfiler = this.LoadWorldProfiler.CreateChild("Preload阶段");
    this.PreloadApplyMaterialParameterCollectionProfiler = this.PreloadProfiler.CreateChild("应用MPC");
    this.PreloadCommonAndEntityProfiler = this.PreloadProfiler.CreateChild("预加载公共资源、实体资源");
    this.PreloadControllerProfiler = this.PreloadProfiler.CreateChild("预加载Controller资源");
    this.PreloadCommonProfiler = this.PreloadCommonAndEntityProfiler.CreateChild("预加载公共资源");
    this.PreloadEntitiesProfiler = this.PreloadCommonAndEntityProfiler.CreateChild("预加载实体");
    this.PreloadDangoAbyssMonsterProfiler = new LogProfiler_1.LogProfiler("子房间预加载团子深渊怪物实体");
    this.LoadDataLayerAndSubLevelProfiler = this.LoadWorldProfiler.CreateChild("加载DataLayer、加载子关卡");
    this.LoadSubLevelProfiler = this.LoadDataLayerAndSubLevelProfiler.CreateChild("加载子Level");
    this.LoadDataLayerProfiler = this.LoadDataLayerAndSubLevelProfiler.CreateChild("加载DataLayer");
    this.CheckVoxelStreamingSourceProfiler = this.LoadWorldProfiler.CreateChild("等待体素流送");
    this.CheckStreamingSourceProfiler = this.LoadWorldProfiler.CreateChild("等待场景流送");
    this.CreateEntitiesProfiler = this.LoadWorldProfiler.CreateChild("创建实体");
    this.WaitRenderAssetsProfiler = this.LoadWorldProfiler.CreateChild("等待渲染资源");
    this.WorldDoneProfiler = this.LoadWorldProfiler.CreateChild("WorldDone");
    this.OpenBattleViewProfiler = this.WorldDoneProfiler.CreateChild("打开主界面(WorldDone阶段)");
    this.CloseLoadingProfiler = this.LoadWorldProfiler.CreateChild("关闭Loading界面");
    this.CloseLoadingPhaseOpenBattleViewProfiler = this.CloseLoadingProfiler.CreateChild("打开主界面(关闭Loading阶段)");
    this.sEr = undefined;
    this.aEr = undefined;
    this.hEr = undefined;
    this.lEr = undefined;
    this.yAr = undefined;
    this._Er = undefined;
    this.zIo = undefined;
    this.x$s = undefined;
    this.dEr = undefined;
    this.CEr = undefined;
    this.gEr = undefined;
    this.ETn = undefined;
    this.fEr = undefined;
    this.vEr = undefined;
    this.Dbn = undefined;
    this.MEr = undefined;
    this.U$_ = undefined;
    this.SEr = false;
    this.A3u = GameMode_1.ELoadMapMode.ClientTravel;
    this.O5u = false;
    this.LoadMapControllerEnableWorldPartition = false;
    this.OK1 = undefined;
    this.Nur = undefined;
  }
  get JoinSceneInfo() {
    return this.rEr;
  }
  set JoinSceneInfo(e) {
    this.rEr = e;
  }
  get LoadingPhase() {
    return this.nEr;
  }
  set LoadingPhase(e) {
    this.nEr = e;
  }
  get Loading() {
    return this.nEr > 1;
  }
  get HasGameModeData() {
    return this.GMr;
  }
  set HasGameModeData(e) {
    this.GMr = e;
  }
  get Mode() {
    return this.NMr;
  }
  set Mode(e) {
    this.NMr = e;
  }
  get MapPath() {
    return this.jMr;
  }
  set MapPath(e) {
    this.jMr = e;
  }
  get LastMapPath() {
    return this.ghh;
  }
  AddLoadMapHandle(e) {
    this.OMr ||= new Map();
    var t = this.OMr.get(e);
    if (t) {
      this.OMr.set(e, ++t);
    } else {
      this.OMr.set(e, 1);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "添加LoadMapHandle", ["添加的Handle", e], ["Size", this.OMr.size]);
    }
    return true;
  }
  RemoveLoadMapHandle(e) {
    var t;
    if (this.OMr?.has(e)) {
      t = this.OMr.get(e);
      if (--t) {
        this.OMr.set(e, t);
      } else {
        this.OMr.delete(e);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "删除LoadMapHandle", ["删除的Handle", e], ["Size", this.OMr.size]);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "删除LoadManHandle失败", ["Handle", e], ["Size", this.OMr?.size]);
      }
      return false;
    }
  }
  get MapDone() {
    return !!this.OMr && this.OMr.size === 0;
  }
  get NavMeshDone() {
    return this.kMr;
  }
  set NavMeshDone(e) {
    this.kMr = e;
  }
  get WorldDone() {
    return this.FMr;
  }
  set WorldDone(e) {
    this.FMr = e;
  }
  get WorldDoneAndLoadingClosed() {
    return this.VMr;
  }
  set WorldDoneAndLoadingClosed(e) {
    this.VMr = e;
  }
  get PlayerStarts() {
    return this.WMr;
  }
  get MapConfig() {
    return this.QMr;
  }
  set MapConfig(e) {
    this.QMr = e;
  }
  get InstanceDungeon() {
    return this.XMr;
  }
  SetInstanceDungeon(e) {
    this.XMr = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
  }
  get MapId() {
    return this.$Mr;
  }
  set MapId(e) {
    this.$Mr = e;
  }
  get InstanceType() {
    return this.YMr;
  }
  set InstanceType(e) {
    this.YMr = e;
  }
  get LastInstanceType() {
    return this.rtm;
  }
  get IsMulti() {
    return this.JMr;
  }
  set IsMulti(e) {
    this.JMr = e;
  }
  get ChangeModeState() {
    return this.HMr;
  }
  set ChangeModeState(e) {
    this.HMr = e;
  }
  get PlayTravelMp4() {
    return this.ZMr;
  }
  set PlayTravelMp4(e) {
    this.ZMr = e;
  }
  get TravelMp4Path() {
    return this.eEr;
  }
  set TravelMp4Path(e) {
    this.eEr = e;
  }
  get UseShowCenterText() {
    return this.iEr;
  }
  set UseShowCenterText(e) {
    this.iEr = e;
  }
  set UseAsBlackScreen(e) {
    this.Wdl = e;
  }
  get UseAsBlackScreen() {
    return this.Wdl;
  }
  set BlackScreenColor(e) {
    this.M0l = e;
  }
  get BlackScreenColor() {
    return this.M0l;
  }
  get TravelMp4Playing() {
    return this.tEr;
  }
  set TravelMp4Playing(e) {
    this.tEr = e;
  }
  get DataLayerSwitching() {
    return this.oEr;
  }
  set Mp4FadeInScreenColor(e) {
    this.L3c = e;
  }
  get Mp4FadeInScreenColor() {
    return this.L3c;
  }
  set Mp4FadeOutScreenColor(e) {
    this.w3c = e;
  }
  get Mp4FadeOutScreenColor() {
    return this.w3c;
  }
  set NeedOpenBlackScreenWhenTeleportDungeon(e) {
    this.R3c = e;
  }
  get NeedOpenBlackScreenWhenTeleportDungeon() {
    return this.R3c;
  }
  BeginDataLayerChange() {
    this.oEr = true;
    this.sIl = new CustomPromise_1.CustomPromise();
    this.aIl = new CustomPromise_1.CustomPromise();
  }
  get DataLayerChangeVoxelPromise() {
    return this.sIl;
  }
  get DataLayerChangeStreamingPromise() {
    return this.aIl;
  }
  EndDataLayerChange() {
    this.oEr = false;
    this.sIl?.SetResult(true);
    this.aIl?.SetResult(true);
  }
  get ChangeSceneModePromise() {
    return this.bVd;
  }
  get ChangeSceneModeVoxelPromise() {
    return this.LZu;
  }
  get ChangeSceneModeStreamingPromise() {
    return this.AZu;
  }
  get SwitchDataLayerWithSequencePromise() {
    return this.dAd;
  }
  get LoadSwitchDataLayerSequencePromise() {
    return this.cAd;
  }
  AddPlayerStart(e) {
    this.WMr.push(e);
  }
  ClearPlayerStart() {
    this.WMr.length = 0;
  }
  get VoxelStreamingSource() {
    return this.Aoa;
  }
  get StreamingSource() {
    return this.KMr;
  }
  get UseWorldPartition() {
    return this.zMr;
  }
  set UseWorldPartition(e) {
    this.zMr = e;
  }
  get IsTeleport() {
    return this.QIo;
  }
  set IsTeleport(e) {
    this.QIo = e;
  }
  get BornLocation() {
    return this.sEr;
  }
  get BornRotator() {
    return this.aEr;
  }
  get RoleLocation() {
    return this.hEr;
  }
  get SpecialTransitionPb() {
    return this.aOd;
  }
  set SpecialTransitionPb(e) {
    this.aOd = e;
  }
  CreateShapedStreamingSource(e, t = 100, i = 1) {
    i = [new UE.StreamingSourceShape(true, i, 0, true, t, undefined, undefined)];
    t = GameModeModel.nQs(MathUtils_1.MathUtils.DefaultTransformDouble, 128, 0, undefined, i);
    t.K2_AttachToActor(e, undefined, 2, 2, 2, false);
    return t;
  }
  static nQs(e, t, i, s, o) {
    var r = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e);
    r.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    r.D_K2_SetActorLocation(e.GetLocation(), false, undefined, false);
    var h = r.AddComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    h.Priority = t;
    h.TargetBehavior = i;
    if (s) {
      for (const n of s) {
        h.TargetGrids.Add(n);
      }
    }
    if (o) {
      for (const a of o) {
        h.Shapes.Add(a);
      }
    }
    h.bStreamingSourceShouldBlockOnSlowStreaming = true;
    h.DisableStreamingSource();
    return r;
  }
  ScaleStreamingSource(e, t) {
    var i;
    if (!!UE.KuroStaticLibrary.IsLowMemoryDevice() && (!(i = this.S5u.get(e)) || i !== t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 60, "缩放流送源", ["Type", e], ["Scale", t]);
      }
      this.S5u.set(e, t);
      this.M5u();
    }
  }
  CleanScaleStreamingSource(e) {
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && this.S5u.delete(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 60, "清理缩放流送源", ["Type", e]);
      }
      this.M5u(true);
    }
  }
  E5u() {
    let i = 1;
    let s = undefined;
    this.S5u.forEach((e, t) => {
      if (!s || !(t > s)) {
        i = e;
        s = t;
      }
    });
    return i;
  }
  M5u(i = false) {
    if ((i || this.S5u.size !== 0) && this.KMr?.IsValid()) {
      i = this.KMr.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (i?.IsValid()) {
        if (this.S5u.size > 0) {
          var s = this.E5u();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 60, "更新流送源缩放", ["Scale", s]);
          }
          var o = i.Shapes.Num();
          let e = undefined;
          let t = undefined;
          if (o > 0) {
            e = i.Shapes.Get(0);
          }
          if (o > 1) {
            t = i.Shapes.Get(1);
          }
          if (e) {
            e.LoadingRangeScale = s;
          } else {
            e = new UE.StreamingSourceShape(true, s, 0, false, 360, undefined, undefined);
            i.Shapes.Add(e);
          }
          if (!t) {
            t = new UE.StreamingSourceShape(false, 1, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, 360, undefined, undefined);
            i.Shapes.Add(t);
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 60, "重置流送源缩放");
          }
          i.Shapes.Empty();
        }
      }
    }
  }
  DisableHLODStreaming(e, t = 0) {
    var i = this.P5u.get(e);
    if (i === undefined || i !== t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 60, "禁用流送HLOD", ["Type", e], ["Level", t]);
      }
      this.P5u.set(e, t);
      this.x5u();
    }
  }
  EnableHLODStreaming(e) {
    if (this.P5u.delete(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 60, "开启流送HLOD", ["Type", e]);
      }
      this.x5u(true);
    }
  }
  dHd() {
    let t = 2;
    this.P5u.forEach(e => {
      if (e < t) {
        t = e;
      }
    });
    return t;
  }
  x5u(e = false) {
    if ((e || this.P5u.size !== 0) && this.KMr?.IsValid()) {
      var t = this.KMr.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (t?.IsValid()) {
        var i = new Set();
        for (let e = 0; e < t.TargetGrids.Num(); ++e) {
          var s = t.TargetGrids.Get(e);
          i.add(FNameUtil_1.FNameUtil.GetDynamicFName(s.toString()));
        }
        e = this.dHd();
        if (e > 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 60, "重置HLOD流送", ["Level", e]);
          }
          for (const o of WorldDefine_1.firstHLODGridNames) {
            i.delete(o);
          }
          for (const r of WorldDefine_1.secondHLODGridNames) {
            i.delete(r);
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 60, "更新HLOD流送", ["Level", e]);
          }
          for (const h of WorldDefine_1.secondHLODGridNames) {
            i.add(h);
          }
          if (e === 1) {
            for (const n of WorldDefine_1.firstHLODGridNames) {
              i.delete(n);
            }
          } else {
            for (const a of WorldDefine_1.firstHLODGridNames) {
              i.add(a);
            }
          }
        }
        t.TargetGrids.Empty();
        for (const d of i) {
          t.TargetGrids.Add(d);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 60, "更新HLOD流送", ["Enabled", this.P5u.size === 0]);
        }
      }
    }
  }
  InitStreamingSources() {
    var e = new UE.TransformDouble(this.BornRotator, this.BornLocation, new UE.VectorDouble(1, 1, 1));
    let t = [WorldDefine_1.voxelGridName];
    if (this.Aoa?.IsValid()) {
      this.Aoa?.D_K2_SetActorLocation(e.GetLocation(), false, undefined, false);
    } else {
      this.Aoa = GameModeModel.nQs(e, 64, 0, t);
    }
    if (UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      t = t.concat(WorldDefine_1.lowMemoryDeviceExcludeGridNames);
    }
    if (this.KMr?.IsValid()) {
      this.KMr?.D_K2_SetActorLocation(e.GetLocation(), false, undefined, false);
    } else {
      this.KMr = GameModeModel.nQs(e, 128, 1, t);
      this.M5u();
      this.x5u();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 7, "StreamingSource出生信息", ["Location", this.BornLocation], ["Rotation", this.BornRotator], ["TargetGrids", t.join(", ")]);
    }
  }
  DisableStreamingSources() {
    var e;
    if (this.Aoa?.IsValid() && (e = this.Aoa.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass()))?.IsValid()) {
      e.DisableStreamingSource();
    }
    if (this.KMr?.IsValid() && (e = this.KMr.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass()))?.IsValid()) {
      e.DisableStreamingSource();
    }
  }
  AttachStreamingSourcesToActor(e) {
    if (!this.pr_ && e && this.KMr?.IsValid() && this.Aoa?.IsValid()) {
      this.KMr.K2_AttachToActor(e, undefined, 2, 2, 2, false);
      this.Aoa.K2_AttachToActor(e, undefined, 2, 2, 2, false);
    }
  }
  StartIndependentStreaming(e = undefined) {
    if (this.KMr?.IsValid() && this.Aoa?.IsValid() && (this.pr_ = true, this.KMr?.K2_DetachFromActor(1, 1, 1), this.Aoa?.K2_DetachFromActor(1, 1, 1), e)) {
      this.KMr?.D_K2_SetActorLocation(e, false, undefined, false);
      this.Aoa?.D_K2_SetActorLocation(e, false, undefined, false);
    }
  }
  DetachStreamingSourceFromActor() {
    if (this.KMr?.IsValid() && this.Aoa?.IsValid()) {
      this.KMr.K2_DetachFromActor(1, 1, 1);
      this.Aoa.K2_DetachFromActor(1, 1, 1);
    }
  }
  StopIndependentStreaming(e = undefined) {
    this.pr_ = false;
    this.AttachStreamingSourcesToActor(e);
  }
  SetBornInfo(e, t) {
    this.sEr = e ? new UE.VectorDouble(e.X, e.Y, e.Z) : undefined;
    this.hEr = e ? Vector_1.Vector.Create(e) : undefined;
    this.aEr = t ? new UE.Rotator(t.Pitch, t.Yaw, t.Roll) : undefined;
  }
  UpdateBornLocation(e) {
    this.hEr.Set(e.X, e.Y, e.Z);
  }
  FlushTempDataLayers() {
    for (const e of this.TempDataLayer) {
      this.DataLayerSet.add(e);
    }
  }
  AddDataLayer(e) {
    if (this.DataLayerSet.has(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 29, "[GameModeModel.AddDataLayer] 重复添加DataLayer。", ["Path", e]);
      }
      return false;
    } else {
      this.DataLayerSet.add(e);
      return true;
    }
  }
  RemoveDataLayer(e) {
    return !!this.HasDataLayer(e) && (this.DataLayerSet.delete(e), true);
  }
  HasDataLayer(e) {
    return this.DataLayerSet.has(e);
  }
  GetAllDataLayers() {
    return this.DataLayerSet;
  }
  get BeginLoadMapPromise() {
    return this.lEr;
  }
  get AfterJoinSceneNotifyPromise() {
    return this.yAr;
  }
  get OpenLevelPromise() {
    return this._Er;
  }
  get StreamingCompleted() {
    return this.zIo;
  }
  get VoxelStreamingCompleted() {
    return this.x$s;
  }
  get LoadMultiFormationPromise() {
    return this.dEr;
  }
  set LoadMultiFormationPromise(e) {
    this.dEr = e;
  }
  get PreloadPromise() {
    return this.CEr;
  }
  get ApplyMaterialParameterCollectionPromise() {
    return this.gEr;
  }
  get ChangeSceneModeEndNotifyPromise() {
    return this.ETn;
  }
  get CheckStreamingCompletedTimerId() {
    return this.fEr;
  }
  set CheckStreamingCompletedTimerId(e) {
    this.fEr = e;
  }
  get CheckRenderAssetsStreamingCompletedTimerId() {
    return this.vEr;
  }
  set CheckRenderAssetsStreamingCompletedTimerId(e) {
    this.vEr = e;
  }
  get CheckRenderAssetsTimeoutId() {
    return this.Dbn;
  }
  set CheckRenderAssetsTimeoutId(e) {
    this.Dbn = e;
  }
  get VideoStartPromise() {
    return this.MEr;
  }
  get OpenLoadingEnd() {
    return this.U$_;
  }
  get RenderAssetDone() {
    return this.SEr;
  }
  set RenderAssetDone(e) {
    this.SEr = e;
  }
  get LoadMapMode() {
    return this.A3u;
  }
  set LoadMapMode(e) {
    if (e >= GameMode_1.ELoadMapMode.Max || e < GameMode_1.ELoadMapMode.ClientTravel || !Number.isInteger(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 72, "f.副本.xlsx表AkiMapSource Sheet 填错LoadMapMode值", ["loadMapMode", e], ["MapPath", this.MapPath]);
      }
      this.A3u = GameMode_1.ELoadMapMode.ClientTravel;
    } else {
      this.A3u = e;
    }
  }
  get ForceClientTravel() {
    return this.O5u;
  }
  set ForceClientTravel(e) {
    var t = this.O5u;
    this.O5u = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceClientTravelModify, t, e);
  }
  get LoadMapControllerDynamicStreamingLevels() {
    this.OK1 ||= new Map();
    return this.OK1;
  }
  ClearLoadMapControllerData() {
    if (this.OK1) {
      this.OK1.clear();
    }
    this.LoadMapControllerEnableWorldPartition = false;
  }
  CreatePromise() {
    this.lEr = new GameModePromise_1.GameModePromise();
    this.yAr = new GameModePromise_1.GameModePromise();
    this._Er = new GameModePromise_1.GameModePromise();
    this.zIo = new GameModePromise_1.GameModePromise();
    this.x$s = new GameModePromise_1.GameModePromise();
    this.CEr = new GameModePromise_1.GameModePromise();
    this.MEr = new GameModePromise_1.GameModePromise();
    this.U$_ = new GameModePromise_1.GameModePromise();
    this.gEr = new GameModePromise_1.GameModePromise();
  }
  ResetPromise() {
    this.lEr = undefined;
    this.yAr = undefined;
    this._Er = undefined;
    this.zIo = undefined;
    this.x$s = undefined;
    this.CEr = undefined;
    this.dEr = undefined;
    this.MEr = undefined;
    this.U$_ = undefined;
    this.gEr = undefined;
  }
  CreateChangeModePromise() {
    this.ETn = new GameModePromise_1.GameModePromise();
    this.bVd = new CustomPromise_1.CustomPromise();
    this.LZu = new CustomPromise_1.CustomPromise();
    this.AZu = new CustomPromise_1.CustomPromise();
  }
  ResetChangeModePromise() {
    this.ETn = undefined;
    this.bVd = undefined;
    this.LZu = undefined;
    this.AZu = undefined;
  }
  SkipChangeSceneModeWait() {
    this.bVd?.SetResult(true);
    this.LZu?.SetResult(true);
    this.AZu?.SetResult(true);
  }
  CreateSwitchDataLayerWithSequencePromise() {
    this.cAd = new CustomPromise_1.CustomPromise();
    this.dAd = new CustomPromise_1.CustomPromise();
  }
  OnLeaveLevel() {
    this.TempDataLayer.length = 0;
    for (const e of this.DataLayerSet) {
      this.TempDataLayer.push(e);
    }
    this.DataLayerSet.clear();
    this.MaterialParameterCollectionMap.clear();
    if (this.CheckStreamingCompletedTimerId !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.CheckStreamingCompletedTimerId);
      this.CheckStreamingCompletedTimerId = undefined;
    }
    this.OMr = undefined;
    this.kMr = false;
    this.FMr = false;
    this.VMr = false;
    this.ghh = this.jMr;
    this.jMr = "";
    this.$Mr = 0;
    this.JMr = false;
    this.rtm = this.YMr ?? Protocol_1.Aki.Protocol.i4s.Proto_NoneInstance;
    this.YMr = Protocol_1.Aki.Protocol.i4s.Proto_NoneInstance;
    this.QMr = undefined;
    this.XMr = undefined;
    this.zMr = false;
    this.QIo = false;
    this.RenderAssetDone = false;
    this.ResetPromise();
    this.fEr = undefined;
    this.vEr = undefined;
    return !(this.Dbn = undefined);
  }
  OnChangeMode() {
    this.ResetPromise();
    return true;
  }
  SetCacheTimeDilationValue(e) {
    this.Nur = {
      TimeDilation: e
    };
  }
  GetCacheTimeDilationValue() {
    return this.Nur;
  }
  ClearCacheTimeDilationValue() {
    this.Nur = undefined;
  }
}
(exports.GameModeModel = GameModeModel).EnableLoadMapMode = true;
//# sourceMappingURL=GameModeModel.js.map