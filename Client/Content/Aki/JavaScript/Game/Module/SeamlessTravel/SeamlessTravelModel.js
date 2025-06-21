"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelModel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Global_1 = require("../../Global"),
  GameModePromise_1 = require("../../World/Define/GameModePromise");
class SeamlessTravelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.svo = !1, this.InSeamlessTraveling = !1, this.HasPreEnableSeamlessTravel = !1, this.SeamlessEndHandle = void 0, this.Config = void 0, this.SeamlessTravelController = void 0, this.SeamlessTravelDefaultController = void 0, this.SeamlessTravelTeamDefaultController = new Array, this.SeamlessTravelPlayerEntityHandle = void 0, this.SeamlessTravelPlayerTeamHandles = new Array, this.SeamlessTravelCamera = void 0, this.SeamlessTravelScreenEffect = void 0, this.UseTreadmill = !1, this.SeamlessTravelTreadmill = void 0, this.UseKeepKite = !1, this.SeamlessTravelKeepKite = void 0, this.UseKeepMovementMode = !1, this.SeamlessTravelKeepMovementMode = void 0, this.SeamlessTravelPostProcess = void 0, this.SeamlessTravelSceneEffect = void 0, this.cvo = [], this.SeamlessTravelInputDistributeTags = [], this.MeshAssetLoadedPromise = void 0, this.ScreenEffectStartedPromise = void 0, this.ScreenEffectEndedPromise = void 0, this.TransitionFloorLoadedPromise = void 0, this.EnterTransitionMapPromise = void 0, this.EnterDestinationMapPromise = void 0, this.TransitionFloorUnloadedPromise = void 0, this.EffectAssetLoadedPromise = void 0, this.KiteInitPromise = void 0, this.PostProcessAssetLoadedPromise = void 0, this.PostProcessBlendedInPromise = void 0, this.PostProcessBlendedOutPromise = void 0, this.SceneEffectAssetLoadedPromise = void 0, this.SceneEffectStartedPromise = void 0, this.SceneEffectEndedPromise = void 0
  }
  get IsSeamlessTravel() {
    return this.svo
  }
  set IsSeamlessTravel(e) {
    this.InSeamlessTraveling && Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 29, "无缝加载中，禁止修改是否无缝加载"), this.svo = e
  }
  OnClear() {
    return this.ClearSeamlessTravelActor(), !0
  }
  AddSeamlessTravelActor(e) {
    return e?.IsValid() ? (this.cvo.push(e), UE.KuroStaticLibrary.SetActorPermanent(e, !0, !0), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 29, "[AddSeamlessTravelActor] Actor Invalid"), !1)
  }
  RemoveSeamlessTravelActor(e) {
    var i;
    return e?.IsValid() ? (0 <= (i = this.cvo.indexOf(e)) && this.cvo.splice(i, 1), UE.KuroStaticLibrary.SetActorPermanent(e, !1, !0), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 29, "[RemoveSeamlessTravelActor] Actor Invalid"), !1)
  }
  IsSeamlessTravelActor(e) {
    return e?.IsValid() ? 0 <= this.cvo.indexOf(e) : (Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 29, "[IsSeamlessTravelActor] Actor Invalid"), !1)
  }
  GetSeamlessTravelRoleEntityHandle(e) {
    for (const i of this.SeamlessTravelPlayerTeamHandles)
      if (i.Entity.GetComponent(0).GetCreatureDataId() === e) return i
  }
  CreatePromise() {
    this.MeshAssetLoadedPromise = new GameModePromise_1.GameModePromise, this.ScreenEffectStartedPromise = new GameModePromise_1.GameModePromise, this.ScreenEffectEndedPromise = new GameModePromise_1.GameModePromise, this.EnterTransitionMapPromise = new GameModePromise_1.GameModePromise, this.EnterDestinationMapPromise = new GameModePromise_1.GameModePromise, this.TransitionFloorLoadedPromise = new GameModePromise_1.GameModePromise, this.TransitionFloorUnloadedPromise = new GameModePromise_1.GameModePromise, this.KiteInitPromise = new GameModePromise_1.GameModePromise, this.EffectAssetLoadedPromise = new GameModePromise_1.GameModePromise, this.PostProcessAssetLoadedPromise = new GameModePromise_1.GameModePromise, this.PostProcessBlendedInPromise = new GameModePromise_1.GameModePromise, this.PostProcessBlendedOutPromise = new GameModePromise_1.GameModePromise, this.SceneEffectAssetLoadedPromise = new GameModePromise_1.GameModePromise, this.SceneEffectStartedPromise = new GameModePromise_1.GameModePromise, this.SceneEffectEndedPromise = new GameModePromise_1.GameModePromise
  }
  ClearPromise() {
    this.MeshAssetLoadedPromise = void 0, this.ScreenEffectStartedPromise = void 0, this.ScreenEffectEndedPromise = void 0, this.EnterTransitionMapPromise = void 0, this.EnterDestinationMapPromise = void 0, this.TransitionFloorLoadedPromise = void 0, this.TransitionFloorUnloadedPromise = void 0, this.KiteInitPromise = void 0, this.EffectAssetLoadedPromise = void 0, this.PostProcessAssetLoadedPromise = void 0, this.PostProcessBlendedInPromise = void 0, this.PostProcessBlendedOutPromise = void 0, this.SceneEffectAssetLoadedPromise = void 0, this.SceneEffectStartedPromise = void 0, this.SceneEffectEndedPromise = void 0
  }
  ClearSeamlessTravelActor() {
    for (const e of this.cvo) e?.IsValid() && UE.KuroStaticLibrary.SetActorPermanent(e, !1, !1);
    this.cvo.length = 0
  }
  GetIsKeepingCurrentMovementMode() {
    var e, i;
    return !(!this.IsSeamlessTravel || !this.SeamlessTravelKeepMovementMode?.IsActive) && (e = (i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.CharacterMovement)?.MovementMode, i = i?.CustomMovementMode, void 0 !== e) && void 0 !== i && this.SeamlessTravelKeepMovementMode.TargetMovementMode === e && this.SeamlessTravelKeepMovementMode.TargetCustomMode === i
  }
}
exports.SeamlessTravelModel = SeamlessTravelModel;
//# sourceMappingURL=SeamlessTravelModel.js.map