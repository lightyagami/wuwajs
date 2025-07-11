"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
class TeleportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.QIo = undefined;
    this.XIo = undefined;
    this.$Io = undefined;
    this.StartGravityDirectCache = undefined;
    this.YIo = undefined;
    this.JIo = undefined;
    this.TargetGravityDirectCache = undefined;
    this.pml = true;
    this.TeleportMode = 1;
    this.TeleportCameraFadeStatus = undefined;
    this.CallSource = undefined;
    this.CheckStreamingCompletedTimerId = undefined;
    this.CheckPhysicsCompletedTimerId = undefined;
    this.zIo = undefined;
    this.DisableAutoFade = false;
    this.x$s = undefined;
    this.eTo = undefined;
    this.tTo = undefined;
    this.shh = undefined;
    this.AllowTeleport = true;
    this.TeleportEntityCreatureDataId = 0;
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
  }
  get IsTeleport() {
    return this.QIo;
  }
  set IsTeleport(t) {
    this.QIo = t;
  }
  get StartPosition() {
    return this.XIo;
  }
  set StartPosition(t) {
    this.XIo = t;
  }
  get StartRotation() {
    return this.$Io;
  }
  set StartRotation(t) {
    this.$Io = t;
  }
  get StartGravityDirect() {
    return this.StartGravityDirectCache;
  }
  set StartGravityDirect(t) {
    this.StartGravityDirectCache = t;
  }
  get TargetPosition() {
    return this.YIo;
  }
  set TargetPosition(t) {
    this.YIo = t;
  }
  get TargetRotation() {
    return this.JIo;
  }
  set TargetRotation(t) {
    this.JIo = t;
  }
  get TargetGravityDirect() {
    return this.TargetGravityDirectCache;
  }
  set TargetGravityDirect(t) {
    this.TargetGravityDirectCache = t;
  }
  get NeedRestoreCamera() {
    return this.pml;
  }
  set NeedRestoreCamera(t) {
    this.pml = t;
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
  OnInit() {
    this.XIo = Vector_1.Vector.Create();
    this.YIo = Vector_1.Vector.Create();
    this.$Io = Rotator_1.Rotator.Create();
    this.JIo = Rotator_1.Rotator.Create();
    this.StartGravityDirectCache = Vector_1.Vector.Create();
    this.TargetGravityDirectCache = Vector_1.Vector.Create();
    return !(this.TeleportCameraFadeStatus = false);
  }
  OnClear() {
    this.XIo = undefined;
    this.YIo = undefined;
    this.$Io = undefined;
    this.JIo = undefined;
    this.StartGravityDirectCache = undefined;
    this.TargetGravityDirectCache = undefined;
    return !(this.TeleportCameraFadeStatus = false);
  }
  OnLeaveLevel() {
    return this.AllowTeleport = true;
  }
  CreatePromise() {
    this.zIo = new GameModePromise_1.GameModePromise();
    this.x$s = new GameModePromise_1.GameModePromise();
    this.eTo = new GameModePromise_1.GameModePromise();
    this.tTo = new GameModePromise_1.GameModePromise();
    this.ScreenEffectStarted = new GameModePromise_1.GameModePromise();
    this.TreadmillLoaded = new GameModePromise_1.GameModePromise();
    this.LeastTimeFinished = new GameModePromise_1.GameModePromise();
    this.TreadmillDisappeared = new GameModePromise_1.GameModePromise();
    this.PostProcessBlendedIn = new GameModePromise_1.GameModePromise();
    this.PostProcessBlendedOut = new GameModePromise_1.GameModePromise();
    this.shh = new GameModePromise_1.GameModePromise();
  }
  ResetPromise() {
    this.zIo = undefined;
    this.x$s = undefined;
    this.eTo = undefined;
    this.tTo = undefined;
    this.ScreenEffectStarted = undefined;
    this.TreadmillLoaded = undefined;
    this.LeastTimeFinished = undefined;
    this.TreadmillDisappeared = undefined;
    this.PostProcessBlendedIn = undefined;
    this.PostProcessBlendedOut = undefined;
    this.shh = undefined;
  }
  GetIsKeepingCurrentMovementMode() {
    var t;
    var i;
    return !!this.IsInSeamlessTeleport && !!this.KeepMovementMode?.IsActive && (t = (i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.CharacterMovement)?.MovementMode, i = i?.CustomMovementMode, t !== undefined) && i !== undefined && this.KeepMovementMode.TargetMovementMode === t && this.KeepMovementMode.TargetCustomMode === i;
  }
}
exports.TeleportModel = TeleportModel;
//# sourceMappingURL=TeleportModel.js.map