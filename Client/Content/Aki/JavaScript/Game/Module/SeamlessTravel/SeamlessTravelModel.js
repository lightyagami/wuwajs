"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Global_1 = require("../../Global");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
class SeamlessTravelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.svo = false;
    this.InSeamlessTraveling = false;
    this.HasPreEnableSeamlessTravel = false;
    this.SeamlessEndHandle = undefined;
    this.Config = undefined;
    this.SeamlessTravelController = undefined;
    this.SeamlessTravelDefaultController = undefined;
    this.SeamlessTravelTeamDefaultController = new Array();
    this.SeamlessTravelPlayerEntityHandle = undefined;
    this.SeamlessTravelPlayerTeamHandles = new Array();
    this.SeamlessTravelCamera = undefined;
    this.SeamlessTravelScreenEffect = undefined;
    this.UseTreadmill = false;
    this.SeamlessTravelTreadmill = undefined;
    this.UseKeepKite = false;
    this.SeamlessTravelKeepKite = undefined;
    this.UseKeepMovementMode = false;
    this.SeamlessTravelKeepMovementMode = undefined;
    this.SeamlessTravelPostProcess = undefined;
    this.SeamlessTravelSceneEffect = undefined;
    this.cvo = [];
    this.SeamlessTravelInputDistributeTags = [];
    this.MeshAssetLoadedPromise = undefined;
    this.ScreenEffectStartedPromise = undefined;
    this.ScreenEffectEndedPromise = undefined;
    this.TransitionFloorLoadedPromise = undefined;
    this.EnterTransitionMapPromise = undefined;
    this.EnterDestinationMapPromise = undefined;
    this.TransitionFloorUnloadedPromise = undefined;
    this.EffectAssetLoadedPromise = undefined;
    this.KiteInitPromise = undefined;
    this.PostProcessAssetLoadedPromise = undefined;
    this.PostProcessBlendedInPromise = undefined;
    this.PostProcessBlendedOutPromise = undefined;
    this.SceneEffectAssetLoadedPromise = undefined;
    this.SceneEffectStartedPromise = undefined;
    this.SceneEffectEndedPromise = undefined;
  }
  get IsSeamlessTravel() {
    return this.svo;
  }
  set IsSeamlessTravel(e) {
    if (this.InSeamlessTraveling && Log_1.Log.CheckError()) {
      Log_1.Log.Error("SeamlessTravel", 29, "无缝加载中，禁止修改是否无缝加载");
    }
    this.svo = e;
  }
  OnClear() {
    this.ClearSeamlessTravelActor();
    return true;
  }
  AddSeamlessTravelActor(e) {
    if (e?.IsValid()) {
      this.cvo.push(e);
      UE.KuroStaticLibrary.SetActorPermanent(e, true, true);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SeamlessTravel", 29, "[AddSeamlessTravelActor] Actor Invalid");
      }
      return false;
    }
  }
  RemoveSeamlessTravelActor(e) {
    var i;
    if (e?.IsValid()) {
      if ((i = this.cvo.indexOf(e)) >= 0) {
        this.cvo.splice(i, 1);
      }
      UE.KuroStaticLibrary.SetActorPermanent(e, false, true);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SeamlessTravel", 29, "[RemoveSeamlessTravelActor] Actor Invalid");
      }
      return false;
    }
  }
  IsSeamlessTravelActor(e) {
    if (e?.IsValid()) {
      return this.cvo.indexOf(e) >= 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SeamlessTravel", 29, "[IsSeamlessTravelActor] Actor Invalid");
      }
      return false;
    }
  }
  GetSeamlessTravelRoleEntityHandle(e) {
    for (const i of this.SeamlessTravelPlayerTeamHandles) {
      if (i.Entity.GetComponent(0).GetCreatureDataId() === e) {
        return i;
      }
    }
  }
  CreatePromise() {
    this.MeshAssetLoadedPromise = new GameModePromise_1.GameModePromise();
    this.ScreenEffectStartedPromise = new GameModePromise_1.GameModePromise();
    this.ScreenEffectEndedPromise = new GameModePromise_1.GameModePromise();
    this.EnterTransitionMapPromise = new GameModePromise_1.GameModePromise();
    this.EnterDestinationMapPromise = new GameModePromise_1.GameModePromise();
    this.TransitionFloorLoadedPromise = new GameModePromise_1.GameModePromise();
    this.TransitionFloorUnloadedPromise = new GameModePromise_1.GameModePromise();
    this.KiteInitPromise = new GameModePromise_1.GameModePromise();
    this.EffectAssetLoadedPromise = new GameModePromise_1.GameModePromise();
    this.PostProcessAssetLoadedPromise = new GameModePromise_1.GameModePromise();
    this.PostProcessBlendedInPromise = new GameModePromise_1.GameModePromise();
    this.PostProcessBlendedOutPromise = new GameModePromise_1.GameModePromise();
    this.SceneEffectAssetLoadedPromise = new GameModePromise_1.GameModePromise();
    this.SceneEffectStartedPromise = new GameModePromise_1.GameModePromise();
    this.SceneEffectEndedPromise = new GameModePromise_1.GameModePromise();
  }
  ClearPromise() {
    this.MeshAssetLoadedPromise = undefined;
    this.ScreenEffectStartedPromise = undefined;
    this.ScreenEffectEndedPromise = undefined;
    this.EnterTransitionMapPromise = undefined;
    this.EnterDestinationMapPromise = undefined;
    this.TransitionFloorLoadedPromise = undefined;
    this.TransitionFloorUnloadedPromise = undefined;
    this.KiteInitPromise = undefined;
    this.EffectAssetLoadedPromise = undefined;
    this.PostProcessAssetLoadedPromise = undefined;
    this.PostProcessBlendedInPromise = undefined;
    this.PostProcessBlendedOutPromise = undefined;
    this.SceneEffectAssetLoadedPromise = undefined;
    this.SceneEffectStartedPromise = undefined;
    this.SceneEffectEndedPromise = undefined;
  }
  ClearSeamlessTravelActor() {
    for (const e of this.cvo) {
      if (e?.IsValid()) {
        UE.KuroStaticLibrary.SetActorPermanent(e, false, false);
      }
    }
    this.cvo.length = 0;
  }
  GetIsKeepingCurrentMovementMode() {
    var e;
    var i;
    return !!this.IsSeamlessTravel && !!this.SeamlessTravelKeepMovementMode?.IsActive && (e = (i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.CharacterMovement)?.MovementMode, i = i?.CustomMovementMode, e !== undefined) && i !== undefined && this.SeamlessTravelKeepMovementMode.TargetMovementMode === e && this.SeamlessTravelKeepMovementMode.TargetCustomMode === i;
  }
}
exports.SeamlessTravelModel = SeamlessTravelModel;
//# sourceMappingURL=SeamlessTravelModel.js.map