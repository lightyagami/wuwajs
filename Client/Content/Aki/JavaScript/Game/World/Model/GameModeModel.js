"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GameModeModel = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameMode_1 = require("../Define/GameMode"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  WorldDefine_1 = require("../Define/WorldDefine");
class GameModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.IsSilentLogin = !1, this.GMr = !1, this.NMr = void 0, this.OMr = void 0, this.kMr = !1, this.FMr = !1, this.VMr = !1, this.HMr = !1, this.jMr = "", this.ghh = "", this.WMr = new Array, this.Aoa = void 0, this.KMr = void 0, this.QMr = void 0, this.XMr = void 0, this.$Mr = 0, this.YMr = void 0, this.JMr = !1, this.zMr = !1, this.QIo = !1, this.ZMr = !1, this.eEr = void 0, this.tEr = !1, this.iEr = !1, this.Wdl = !1, this.M0l = IAction_1.EFadeInScreenShowType.Black, this.ShowCenterTextFlow = void 0, this.oEr = !1, this.L3c = void 0, this.w3c = void 0, this.R3c = !1, this.sIl = void 0, this.aIl = void 0, this.ForceDisableGamePaused = !1, this.GamePausedReasons = new Set, this.DataLayerSet = new Set, this.TempDataLayer = [], this.MaterialParameterCollectionMap = new Map, this.TimeDilationMap = new Map, this.rEr = void 0, this.pr_ = !1, this.Wgu = new Map, this.tCu = new Set, this.nEr = 0, this.LoadWorldProfiler = new LogProfiler_1.LogProfiler("加载世界"), this.OpenLoadingProfiler = this.LoadWorldProfiler.CreateChild("打开Loading"), this.OpenLevelProfiler = this.LoadWorldProfiler.CreateChild("加载主Level"), this.PreloadProfiler = this.LoadWorldProfiler.CreateChild("Preload阶段"), this.PreloadApplyMaterialParameterCollectionProfiler = this.PreloadProfiler.CreateChild("应用MPC"), this.PreloadCommonAndEntityProfiler = this.PreloadProfiler.CreateChild("预加载公共资源、实体资源"), this.PreloadControllerProfiler = this.PreloadProfiler.CreateChild("预加载Controller资源"), this.PreloadCommonProfiler = this.PreloadCommonAndEntityProfiler.CreateChild("预加载公共资源"), this.PreloadEntitiesProfiler = this.PreloadCommonAndEntityProfiler.CreateChild("预加载实体"), this.PreloadDangoAbyssMonsterProfiler = new LogProfiler_1.LogProfiler("子房间预加载团子深渊怪物实体"), this.LoadDataLayerAndSubLevelProfiler = this.LoadWorldProfiler.CreateChild("加载DataLayer、加载子关卡"), this.LoadSubLevelProfiler = this.LoadDataLayerAndSubLevelProfiler.CreateChild("加载子Level"), this.LoadDataLayerProfiler = this.LoadDataLayerAndSubLevelProfiler.CreateChild("加载DataLayer"), this.CheckVoxelStreamingSourceProfiler = this.LoadWorldProfiler.CreateChild("等待体素流送"), this.CheckStreamingSourceProfiler = this.LoadWorldProfiler.CreateChild("等待场景流送"), this.CreateEntitiesProfiler = this.LoadWorldProfiler.CreateChild("创建实体"), this.WaitRenderAssetsProfiler = this.LoadWorldProfiler.CreateChild("等待渲染资源"), this.WorldDoneProfiler = this.LoadWorldProfiler.CreateChild("WorldDone"), this.OpenBattleViewProfiler = this.WorldDoneProfiler.CreateChild("打开主界面(WorldDone阶段)"), this.CloseLoadingProfiler = this.LoadWorldProfiler.CreateChild("关闭Loading界面"), this.CloseLoadingPhaseOpenBattleViewProfiler = this.CloseLoadingProfiler.CreateChild("打开主界面(关闭Loading阶段)"), this.sEr = void 0, this.aEr = void 0, this.hEr = void 0, this.lEr = void 0, this.yAr = void 0, this._Er = void 0, this.zIo = void 0, this.x$s = void 0, this.dEr = void 0, this.CEr = void 0, this.gEr = void 0, this.ETn = void 0, this.fEr = void 0, this.vEr = void 0, this.Dbn = void 0, this.MEr = void 0, this.U$_ = void 0, this.SEr = !1, this.agu = GameMode_1.ELoadMapMode.ClientTravel, this.aCu = !1, this.LoadMapControllerEnableWorldPartition = !1, this.YQ1 = void 0
  }
  get JoinSceneInfo() {
    return this.rEr
  }
  set JoinSceneInfo(e) {
    this.rEr = e
  }
  get LoadingPhase() {
    return this.nEr
  }
  set LoadingPhase(e) {
    this.nEr = e
  }
  get Loading() {
    return 1 < this.nEr
  }
  get HasGameModeData() {
    return this.GMr
  }
  set HasGameModeData(e) {
    this.GMr = e
  }
  get Mode() {
    return this.NMr
  }
  set Mode(e) {
    this.NMr = e
  }
  get MapPath() {
    return this.jMr
  }
  set MapPath(e) {
    this.jMr = e
  }
  get LastMapPath() {
    return this.ghh
  }
  AddLoadMapHandle(e) {
    this.OMr || (this.OMr = new Map);
    var t = this.OMr.get(e);
    return t ? this.OMr.set(e, ++t) : this.OMr.set(e, 1), Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 3, "添加LoadMapHandle", ["添加的Handle", e], ["Size", this.OMr.size]), !0
  }
  RemoveLoadMapHandle(e) {
    var t;
    return this.OMr?.has(e) ? (t = this.OMr.get(e), --t ? this.OMr.set(e, t) : this.OMr.delete(e), Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 3, "删除LoadMapHandle", ["删除的Handle", e], ["Size", this.OMr.size]), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "删除LoadManHandle失败", ["Handle", e], ["Size", this.OMr?.size]), !1)
  }
  get MapDone() {
    return !!this.OMr && 0 === this.OMr.size
  }
  get NavMeshDone() {
    return this.kMr
  }
  set NavMeshDone(e) {
    this.kMr = e
  }
  get WorldDone() {
    return this.FMr
  }
  set WorldDone(e) {
    this.FMr = e
  }
  get WorldDoneAndLoadingClosed() {
    return this.VMr
  }
  set WorldDoneAndLoadingClosed(e) {
    this.VMr = e
  }
  get PlayerStarts() {
    return this.WMr
  }
  get MapConfig() {
    return this.QMr
  }
  set MapConfig(e) {
    this.QMr = e
  }
  get InstanceDungeon() {
    return this.XMr
  }
  SetInstanceDungeon(e) {
    this.XMr = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)
  }
  get MapId() {
    return this.$Mr
  }
  set MapId(e) {
    this.$Mr = e
  }
  get InstanceType() {
    return this.YMr
  }
  set InstanceType(e) {
    this.YMr = e
  }
  get IsMulti() {
    return this.JMr
  }
  set IsMulti(e) {
    this.JMr = e
  }
  get ChangeModeState() {
    return this.HMr
  }
  set ChangeModeState(e) {
    this.HMr = e
  }
  get PlayTravelMp4() {
    return this.ZMr
  }
  set PlayTravelMp4(e) {
    this.ZMr = e
  }
  get TravelMp4Path() {
    return this.eEr
  }
  set TravelMp4Path(e) {
    this.eEr = e
  }
  get UseShowCenterText() {
    return this.iEr
  }
  set UseShowCenterText(e) {
    this.iEr = e
  }
  set UseAsBlackScreen(e) {
    this.Wdl = e
  }
  get UseAsBlackScreen() {
    return this.Wdl
  }
  set BlackScreenColor(e) {
    this.M0l = e
  }
  get BlackScreenColor() {
    return this.M0l
  }
  get TravelMp4Playing() {
    return this.tEr
  }
  set TravelMp4Playing(e) {
    this.tEr = e
  }
  get DataLayerSwitching() {
    return this.oEr
  }
  set Mp4FadeInScreenColor(e) {
    this.L3c = e
  }
  get Mp4FadeInScreenColor() {
    return this.L3c
  }
  set Mp4FadeOutScreenColor(e) {
    this.w3c = e
  }
  get Mp4FadeOutScreenColor() {
    return this.w3c
  }
  set NeedOpenBlackScreenWhenTeleportDungeon(e) {
    this.R3c = e
  }
  get NeedOpenBlackScreenWhenTeleportDungeon() {
    return this.R3c
  }
  BeginDataLayerChange() {
    this.oEr = !0, this.sIl = new CustomPromise_1.CustomPromise, this.aIl = new CustomPromise_1.CustomPromise
  }
  get DataLayerChangeVoxelPromise() {
    return this.sIl
  }
  get DataLayerChangeStreamingPromise() {
    return this.aIl
  }
  EndDataLayerChange() {
    this.oEr = !1, this.sIl?.SetResult(!0), this.aIl?.SetResult(!0)
  }
  AddPlayerStart(e) {
    this.WMr.push(e)
  }
  ClearPlayerStart() {
    this.WMr.length = 0
  }
  get VoxelStreamingSource() {
    return this.Aoa
  }
  get StreamingSource() {
    return this.KMr
  }
  get UseWorldPartition() {
    return this.zMr
  }
  set UseWorldPartition(e) {
    this.zMr = e
  }
  get IsTeleport() {
    return this.QIo
  }
  set IsTeleport(e) {
    this.QIo = e
  }
  get BornLocation() {
    return this.sEr
  }
  get BornRotator() {
    return this.aEr
  }
  get RoleLocation() {
    return this.hEr
  }
  OnInit() {
    return UE.KuroStaticLibrary.IsLowMemoryDevice() && this.ScaleStreamingSource(2, .5), super.OnInit()
  }
  static CreateShapedStreamingSource(e, t = 100, i = 1) {
    i = [new UE.StreamingSourceShape(!0, i, 0, !0, t, void 0, void 0)], t = GameModeModel.nQs(MathUtils_1.MathUtils.DefaultTransformDouble, 128, 0, void 0, i);
    return t.K2_AttachToActor(e, void 0, 2, 2, 2, !1), t
  }
  static nQs(e, t, i, s, r) {
    var o = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e),
      h = (o.AddComponentByClass(UE.SceneComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1), o.D_K2_SetActorLocation(e.GetLocation(), !1, void 0, !1), o.AddComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1));
    if (h.Priority = t, h.TargetBehavior = i, s)
      for (const n of s) h.TargetGrids.Add(n);
    if (r)
      for (const a of r) h.Shapes.Add(a);
    return h.bStreamingSourceShouldBlockOnSlowStreaming = !0, h.DisableStreamingSource(), o
  }
  ScaleStreamingSource(e, t) {
    var i;
    !UE.KuroStaticLibrary.IsLowMemoryDevice() || (i = this.Wgu.get(e)) && i === t || (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "缩放流送源", ["Type", e], ["Scale", t]), this.Wgu.set(e, t), this.Qgu())
  }
  CleanScaleStreamingSource(e) {
    UE.KuroStaticLibrary.IsLowMemoryDevice() && this.Wgu.delete(e) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "清理缩放流送源", ["Type", e]), this.Qgu(!0))
  }
  Kgu() {
    let t = 1;
    return this.Wgu.forEach(e => {
      t = Math.min(t, e)
    }), t
  }
  Qgu(i = !1) {
    if ((i || 0 !== this.Wgu.size) && this.KMr?.IsValid()) {
      i = this.KMr.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (i?.IsValid())
        if (0 < this.Wgu.size) {
          var s = this.Kgu(),
            r = (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "更新流送源缩放", ["Scale", s]), i.Shapes.Num());
          let e = void 0,
            t = void 0;
          0 < r && (e = i.Shapes.Get(0)), 1 < r && (t = i.Shapes.Get(1)), e ? e.LoadingRangeScale = s : (e = new UE.StreamingSourceShape(!0, s, 0, !1, 360, void 0, void 0), i.Shapes.Add(e)), t || (t = new UE.StreamingSourceShape(!1, 1, ResourceSystem_1.STREAMING_SOURCE_RADIUS, !1, 360, void 0, void 0), i.Shapes.Add(t))
        } else Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "重置流送源缩放"), i.Shapes.Empty()
    }
  }
  DisableHLODStreaming(e) {
    this.tCu.has(e) || (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "禁止流送HLOD", ["Type", e]), this.tCu.add(e), 1 === this.tCu.size && this.iCu())
  }
  EnableHLODStreaming(e) {
    this.tCu.has(e) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "开启流送HLOD", ["Type", e]), this.tCu.delete(e), 0 === this.tCu.size) && this.iCu(!0)
  }
  iCu(e = !1) {
    if ((e || 0 !== this.tCu.size) && this.KMr?.IsValid()) {
      var t = this.KMr.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (t?.IsValid()) {
        var i = new Set;
        for (let e = 0; e < t.TargetGrids.Num(); ++e) {
          var s = t.TargetGrids.Get(e);
          i.add(FNameUtil_1.FNameUtil.GetDynamicFName(s.toString()))
        }
        if (0 < this.tCu.size)
          for (const r of WorldDefine_1.allHLODGridNames) i.add(r);
        else
          for (const o of WorldDefine_1.allHLODGridNames) i.delete(o);
        t.TargetGrids.Empty();
        for (const h of i) t.TargetGrids.Add(h);
        Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 60, "更新HLOD流送", ["Enabled", 0 === this.tCu.size])
      }
    }
  }
  InitStreamingSources() {
    var e = new UE.TransformDouble(this.BornRotator, this.BornLocation, new UE.VectorDouble(1, 1, 1));
    let t = [WorldDefine_1.voxelGridName];
    this.Aoa?.IsValid() ? this.Aoa?.D_K2_SetActorLocation(e.GetLocation(), !1, void 0, !1) : this.Aoa = GameModeModel.nQs(e, 64, 0, t), UE.KuroStaticLibrary.IsLowMemoryDevice() && (t = t.concat(WorldDefine_1.lowMemoryDeviceExcludeGridNames)), this.KMr?.IsValid() ? this.KMr?.D_K2_SetActorLocation(e.GetLocation(), !1, void 0, !1) : (this.KMr = GameModeModel.nQs(e, 128, 1, t), this.Qgu(), this.iCu()), Log_1.Log.CheckInfo() && Log_1.Log.Info("Level", 7, "StreamingSource出生信息", ["Location", this.BornLocation], ["Rotation", this.BornRotator], ["TargetGrids", t.join(", ")])
  }
  DisableStreamingSources() {
    var e;
    this.Aoa?.IsValid() && (e = this.Aoa.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass()))?.IsValid() && e.DisableStreamingSource(), this.KMr?.IsValid() && (e = this.KMr.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass()))?.IsValid() && e.DisableStreamingSource()
  }
  AttachStreamingSourcesToActor(e) {
    !this.pr_ && e && this.KMr?.IsValid() && this.Aoa?.IsValid() && (this.KMr.K2_AttachToActor(e, void 0, 2, 2, 2, !1), this.Aoa.K2_AttachToActor(e, void 0, 2, 2, 2, !1))
  }
  StartIndependentStreaming(e = void 0) {
    this.KMr?.IsValid() && this.Aoa?.IsValid() && (this.pr_ = !0, this.KMr?.K2_DetachFromActor(1, 1, 1), this.Aoa?.K2_DetachFromActor(1, 1, 1), e) && (this.KMr?.D_K2_SetActorLocation(e, !1, void 0, !1), this.Aoa?.D_K2_SetActorLocation(e, !1, void 0, !1))
  }
  DetachStreamingSourceFromActor() {
    this.KMr?.IsValid() && this.Aoa?.IsValid() && (this.KMr.K2_DetachFromActor(1, 1, 1), this.Aoa.K2_DetachFromActor(1, 1, 1))
  }
  StopIndependentStreaming(e = void 0) {
    this.pr_ = !1, this.AttachStreamingSourcesToActor(e)
  }
  SetBornInfo(e, t) {
    this.sEr = e ? new UE.VectorDouble(e.X, e.Y, e.Z) : void 0, this.hEr = e ? Vector_1.Vector.Create(e) : void 0, this.aEr = t ? new UE.Rotator(t.Pitch, t.Yaw, t.Roll) : void 0
  }
  UpdateBornLocation(e) {
    this.hEr.Set(e.X, e.Y, e.Z)
  }
  FlushTempDataLayers() {
    for (const e of this.TempDataLayer) this.DataLayerSet.add(e)
  }
  AddDataLayer(e) {
    return this.DataLayerSet.has(e) ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 29, "[GameModeModel.AddDataLayer] 重复添加DataLayer。", ["Path", e]), !1) : (this.DataLayerSet.add(e), !0)
  }
  RemoveDataLayer(e) {
    return !!this.HasDataLayer(e) && (this.DataLayerSet.delete(e), !0)
  }
  HasDataLayer(e) {
    return this.DataLayerSet.has(e)
  }
  GetAllDataLayers() {
    return this.DataLayerSet
  }
  get BeginLoadMapPromise() {
    return this.lEr
  }
  get AfterJoinSceneNotifyPromise() {
    return this.yAr
  }
  get OpenLevelPromise() {
    return this._Er
  }
  get StreamingCompleted() {
    return this.zIo
  }
  get VoxelStreamingCompleted() {
    return this.x$s
  }
  get LoadMultiFormationPromise() {
    return this.dEr
  }
  set LoadMultiFormationPromise(e) {
    this.dEr = e
  }
  get PreloadPromise() {
    return this.CEr
  }
  get ApplyMaterialParameterCollectionPromise() {
    return this.gEr
  }
  get ChangeSceneModeEndNotifyPromise() {
    return this.ETn
  }
  get CheckStreamingCompletedTimerId() {
    return this.fEr
  }
  set CheckStreamingCompletedTimerId(e) {
    this.fEr = e
  }
  get CheckRenderAssetsStreamingCompletedTimerId() {
    return this.vEr
  }
  set CheckRenderAssetsStreamingCompletedTimerId(e) {
    this.vEr = e
  }
  get CheckRenderAssetsTimeoutId() {
    return this.Dbn
  }
  set CheckRenderAssetsTimeoutId(e) {
    this.Dbn = e
  }
  get VideoStartPromise() {
    return this.MEr
  }
  get OpenLoadingEnd() {
    return this.U$_
  }
  get RenderAssetDone() {
    return this.SEr
  }
  set RenderAssetDone(e) {
    this.SEr = e
  }
  get LoadMapMode() {
    return this.agu
  }
  set LoadMapMode(e) {
    e >= GameMode_1.ELoadMapMode.Max || e < GameMode_1.ELoadMapMode.ClientTravel || !Number.isInteger(e) ? (Log_1.Log.CheckError() && Log_1.Log.Error("World", 72, "f.副本.xlsx表AkiMapSource Sheet 填错LoadMapMode值", ["loadMapMode", e], ["MapPath", this.MapPath]), this.agu = GameMode_1.ELoadMapMode.ClientTravel) : this.agu = e
  }
  get ForceClientTravel() {
    return this.aCu
  }
  set ForceClientTravel(e) {
    var t = this.aCu;
    this.aCu = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceClientTravelModify, t, e)
  }
  get LoadMapControllerDynamicStreamingLevels() {
    return this.YQ1 || (this.YQ1 = new Map), this.YQ1
  }
  ClearLoadMapControllerData() {
    this.YQ1 && this.YQ1.clear(), this.LoadMapControllerEnableWorldPartition = !1
  }
  CreatePromise() {
    this.lEr = new GameModePromise_1.GameModePromise, this.yAr = new GameModePromise_1.GameModePromise, this._Er = new GameModePromise_1.GameModePromise, this.zIo = new GameModePromise_1.GameModePromise, this.x$s = new GameModePromise_1.GameModePromise, this.CEr = new GameModePromise_1.GameModePromise, this.MEr = new GameModePromise_1.GameModePromise, this.U$_ = new GameModePromise_1.GameModePromise, this.gEr = new GameModePromise_1.GameModePromise
  }
  ResetPromise() {
    this.lEr = void 0, this.yAr = void 0, this._Er = void 0, this.zIo = void 0, this.x$s = void 0, this.CEr = void 0, this.dEr = void 0, this.MEr = void 0, this.U$_ = void 0, this.gEr = void 0
  }
  CreateChangeModePromise() {
    this.ETn = new GameModePromise_1.GameModePromise
  }
  ResetChangeModePromise() {
    this.ETn = void 0
  }
  OnLeaveLevel() {
    this.TempDataLayer.length = 0;
    for (const e of this.DataLayerSet) this.TempDataLayer.push(e);
    return this.DataLayerSet.clear(), this.MaterialParameterCollectionMap.clear(), void 0 !== this.CheckStreamingCompletedTimerId && (TimerSystem_1.TimerSystem.Remove(this.CheckStreamingCompletedTimerId), this.CheckStreamingCompletedTimerId = void 0), this.OMr = void 0, this.kMr = !1, this.FMr = !1, this.VMr = !1, this.ghh = this.jMr, this.jMr = "", this.$Mr = 0, this.JMr = !1, this.YMr = Protocol_1.Aki.Protocol.i4s.Proto_NoneInstance, this.QMr = void 0, this.XMr = void 0, this.zMr = !1, this.QIo = !1, this.RenderAssetDone = !1, this.ResetPromise(), this.fEr = void 0, this.vEr = void 0, !(this.Dbn = void 0)
  }
  OnChangeMode() {
    return this.ResetPromise(), !0
  }
}(exports.GameModeModel = GameModeModel).EnableLoadMapMode = !0;
//# sourceMappingURL=GameModeModel.js.map