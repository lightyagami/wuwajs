"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerSoarMonitorController = exports.ENABLE_SLOW_STREAMING_ENTITY_FILTER = exports.SLOW_STREAMING_HEIGHT_THRESHOULD = undefined;
const UE = require("ue");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const PlayerSoarMonitorFilter_1 = require("../../Utils/Filter/EntityToLoad/PlayerSoarMonitorFilter");
exports.SLOW_STREAMING_HEIGHT_THRESHOULD = 1500;
const SLOW_STREAMING_HEIGHT_THRESHOULD_CVAR = "wp.Runtime.SoraGridBlackListHeight";
exports.ENABLE_SLOW_STREAMING_ENTITY_FILTER = true;
class PlayerSoarMonitorController extends ControllerBase_1.ControllerBase {
  static set IsPlayerSoar(e) {
    if (this.OJl !== e) {
      this.OJl = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerSoarChanged, e);
    }
  }
  static get IsPlayerSoar() {
    return this.OJl;
  }
  static get EnableSlowStreaming() {
    return this.kJl;
  }
  static OnInit() {
    this.InitTickOptimize(60, -1);
    this.DEa();
    return super.OnInit();
  }
  static DEa() {
    this.HeightThreshould = UE.KismetSystemLibrary.GetConsoleVariableIntValue(SLOW_STREAMING_HEIGHT_THRESHOULD_CVAR);
    if (this.HeightThreshould <= 0) {
      this.HeightThreshould = exports.SLOW_STREAMING_HEIGHT_THRESHOULD;
    }
  }
  static OnTick(e) {
    this.GA_();
    this.GJl();
  }
  static OnClear() {
    this.POc.Cleanup();
    return super.OnClear();
  }
  static GA_() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(176);
      this.IsPlayerSoar = !!e && e.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar;
    } else {
      this.IsPlayerSoar = false;
    }
  }
  static GJl() {
    var e = this.IsPlayerSoar && this.FJl();
    if (this.kJl !== e) {
      this.kJl = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SlowStreamingBySoar, this.kJl);
    }
  }
  static FJl() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!e && !!(e = e.Entity.GetComponent(179)) && !!(e.GetHeightAboveGround(this.HeightThreshould + 1) > this.HeightThreshould);
  }
}
(exports.PlayerSoarMonitorController = PlayerSoarMonitorController).OJl = false;
PlayerSoarMonitorController.kJl = false;
PlayerSoarMonitorController.POc = PlayerSoarMonitorFilter_1.PlayerSoarMonitorFilter.Create(); //# sourceMappingURL=PlayerSoarMonitorController.js.map