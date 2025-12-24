"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportModel = exports.TeleportContext = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
const SeamlessTravelDefine_1 = require("../SeamlessTravel/SeamlessTravelDefine");
const TeleportCore_1 = require("./TeleportCore");
const TeleportSeamlessHelper_1 = require("./TeleportSeamlessHelper");
const TeleportStreamingHelper_1 = require("./TeleportStreamingHelper");
const TeleportTransitionHelper_1 = require("./TeleportTransitionHelper");
class TeleportContext {
  constructor(e) {
    this.ClientReason = undefined;
    this.TargetPosition = undefined;
    this.TeleportMode = undefined;
    this.TargetRotation = undefined;
    this.TargetGravityDirect = undefined;
    this.TargetSpeed = undefined;
    this.ServerReason = undefined;
    this.Option = undefined;
    this.NeedRestoreCamera = true;
    this.GameCtx = undefined;
    this.ElevatorEntity = undefined;
    this.DisableAutoFade = false;
    this.TeleportCfgId = undefined;
    this.NeedRequestToServer = true;
    this.NeedWaitStreaming = true;
    this.KeepCameraRelativeRotation = false;
    this.KeepSpeedRelativeRotation = false;
    this.TeleportCore = undefined;
    this.TeleportTransitionHelper = undefined;
    this.TeleportStreamingHelper = undefined;
    this.TeleportSeamlessHelper = undefined;
    this.TeleportContextId = 0;
    this.TeleportEntity = undefined;
    this.CheckStreamingCompletedTimerId = undefined;
    this.zIo = undefined;
    this.x$s = undefined;
    this.eTo = undefined;
    this.tTo = undefined;
    this.shh = undefined;
    this.Seamless = false;
    this.IsInSeamlessTeleport = false;
    this.SeamlessConfig = undefined;
    this.UseTreadmill = false;
    this.Treadmill = undefined;
    this.UseKeepKite = false;
    this.KeepKite = undefined;
    this.UseKeepMovementMode = false;
    this.KeepMovementMode = undefined;
    this.PostProcess = undefined;
    this.ScreenEffect = undefined;
    this.SceneEffect = undefined;
    this.SeamlessEndHandle = undefined;
    this.ScreenEffectStarted = undefined;
    this.ScreenEffectEnded = undefined;
    this.SceneEffectStarted = undefined;
    this.SceneEffectEnded = undefined;
    this.LeastTimeFinished = undefined;
    this.TreadmillLoaded = undefined;
    this.TreadmillAppeared = undefined;
    this.TreadmillDisappeared = undefined;
    this.PostProcessBlendedIn = undefined;
    this.PostProcessBlendedOut = undefined;
    this.KiteAppeared = undefined;
    this.ClientReason = e.ClientReason;
    this.TargetPosition = e.TargetPosition;
    this.TeleportMode = e.TeleportMode ?? 2;
    this.TargetRotation = e.TargetRotation;
    this.TargetGravityDirect = e.TargetGravityDirect;
    this.TargetSpeed = e.TargetSpeed;
    this.ServerReason = e.ServerReason;
    this.Option = e.Option;
    this.TeleportCfgId = e.TeleportCfgId;
    this.GameCtx = e.GameCtx;
    if (e.NeedRestoreCamera) {
      this.NeedRestoreCamera = e.NeedRestoreCamera;
    }
    if (e.Option?.R$s) {
      this.Seamless = true;
    }
    if (e.NeedRequestToServer !== undefined) {
      this.NeedRequestToServer = e.NeedRequestToServer;
    }
    if (e.NeedWaitStreaming !== undefined) {
      this.NeedWaitStreaming = e.NeedWaitStreaming;
    }
    if (e.DisableAutoFade !== undefined) {
      this.DisableAutoFade = e.DisableAutoFade;
    }
    if (e.KeepCameraRelativeRotation !== undefined) {
      this.KeepCameraRelativeRotation = e.KeepCameraRelativeRotation;
    }
    if (e.KeepSpeedRelativeRotation !== undefined) {
      this.KeepSpeedRelativeRotation = e.KeepSpeedRelativeRotation;
    }
    this.zIo = new GameModePromise_1.GameModePromise();
    this.x$s = new GameModePromise_1.GameModePromise();
    this.eTo = new GameModePromise_1.GameModePromise();
    this.tTo = new GameModePromise_1.GameModePromise();
    this.shh = new GameModePromise_1.GameModePromise();
    this.TeleportCore = new TeleportCore_1.TeleportCore(this);
    this.TeleportTransitionHelper = new TeleportTransitionHelper_1.TeleportTransitionHelper(this);
    this.TeleportStreamingHelper = new TeleportStreamingHelper_1.TeleportStreamingHelper(this);
    if (this.Seamless && (this.TeleportSeamlessHelper = new TeleportSeamlessHelper_1.TeleportSeamlessHelper(this), this.KeepCameraRelativeRotation !== undefined)) {
      this.KeepCameraRelativeRotation = true;
    }
  }
  get StreamingCompleted() {
    return this.zIo;
  }
  get VoxelStreamingCompleted() {
    return this.x$s;
  }
  get TeleportFinishRequest() {
    return this.eTo;
  }
  get CgTeleportCompleted() {
    return this.tTo;
  }
  get TeleportWaitRequest() {
    return this.shh;
  }
  static CreateContext(e) {
    e = new TeleportContext(e);
    this.Axf += 1;
    e.TeleportContextId = this.Axf;
    return e;
  }
  InitSeamlessContext() {
    this.SeamlessConfig = new SeamlessTravelDefine_1.SeamlessTravelContext();
    this.SeamlessConfig.ParseConfig(this.Option.R$s);
    this.ScreenEffectStarted = new GameModePromise_1.GameModePromise();
    this.ScreenEffectEnded = new GameModePromise_1.GameModePromise();
    this.SceneEffectStarted = new GameModePromise_1.GameModePromise();
    this.SceneEffectEnded = new GameModePromise_1.GameModePromise();
    this.LeastTimeFinished = new GameModePromise_1.GameModePromise();
    this.TreadmillLoaded = new GameModePromise_1.GameModePromise();
    this.TreadmillAppeared = new GameModePromise_1.GameModePromise();
    this.TreadmillDisappeared = new GameModePromise_1.GameModePromise();
    this.PostProcessBlendedIn = new GameModePromise_1.GameModePromise();
    this.PostProcessBlendedOut = new GameModePromise_1.GameModePromise();
    this.KiteAppeared = new GameModePromise_1.GameModePromise();
  }
}
(exports.TeleportContext = TeleportContext).Axf = 0;
class TeleportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.kxf = [];
    this.Dxf = undefined;
    this.Uxf = undefined;
    this.atg = undefined;
    this.xxf = undefined;
    this.Bxe = undefined;
    this.htg = undefined;
    this.ltg = undefined;
    this.Bxf = true;
  }
  get TeleportContext() {
    if (this.kxf.length !== 0) {
      return this.kxf[this.kxf.length - 1];
    }
  }
  get IsTeleport() {
    return this.kxf.length > 0;
  }
  get StartPosition() {
    return this.Dxf;
  }
  get StartRotation() {
    return this.Uxf;
  }
  get StartGravityDirect() {
    return this.atg;
  }
  get TargetPosition() {
    return this.xxf;
  }
  get TargetRotation() {
    return this.Bxe;
  }
  get TargetGravityDirect() {
    return this.htg;
  }
  get CameraStartRotation() {
    return this.ltg;
  }
  SetAllowTeleportByUi(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 设置是否允许UI发起传送", ["AllowTeleport", e], ["Reason", t]);
    }
    this.Bxf = e;
  }
  get AllowTeleportByUi() {
    return this.Bxf;
  }
  OnInit() {
    this.Dxf = Vector_1.Vector.Create();
    this.xxf = Vector_1.Vector.Create();
    this.Uxf = Rotator_1.Rotator.Create();
    this.ltg = Rotator_1.Rotator.Create();
    this.Bxe = Rotator_1.Rotator.Create();
    this.atg = Vector_1.Vector.Create();
    this.htg = Vector_1.Vector.Create();
    return true;
  }
  OnClear() {
    this.Dxf = undefined;
    this.xxf = undefined;
    this.Uxf = undefined;
    this.ltg = undefined;
    this.Bxe = undefined;
    this.atg = undefined;
    return !(this.htg = undefined);
  }
  OnLeaveLevel() {
    this.SetAllowTeleportByUi(true, "OnLeaveLevel");
    return true;
  }
  GetIsKeepingCurrentMovementMode() {
    var e;
    var t;
    return !!this.TeleportContext && !!this.TeleportContext.IsInSeamlessTeleport && !!this.TeleportContext.KeepMovementMode?.IsActive && (e = (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.CharacterMovement)?.MovementMode, t = t?.CustomMovementMode, e !== undefined) && t !== undefined && this.TeleportContext.KeepMovementMode.TargetMovementMode === e && this.TeleportContext.KeepMovementMode.TargetCustomMode === t;
  }
  CreateContext(e) {
    if (this.kxf.length > 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送: 尝试在传送过程中再次发起传送, 需要关注");
    }
    e = TeleportContext.CreateContext(e);
    this.kxf.push(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 创建上下文", ["TeleportContextId", e.TeleportContextId], ["ClientReason", e.ClientReason], ["ServerReason", e.ServerReason]);
    }
    return e;
  }
  RemoveContext(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 移除上下文", ["TeleportContextId", t.TeleportContextId]);
    }
    for (let e = 0; e < this.kxf.length; e++) {
      if (this.kxf[e] === t) {
        this.kxf.splice(e);
        return;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送: 移除上下文失败", ["TeleportContextId", t.TeleportContextId]);
    }
  }
}
exports.TeleportModel = TeleportModel;
//# sourceMappingURL=TeleportModel.js.map