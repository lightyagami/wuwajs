"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTogetherModel = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class ShipTogetherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.$Bl = false;
    this.CurrentSelectTogetherRoleId = 0;
    this.ShipTogetherRoleId = 0;
    this.XBl = e => {
      this.ShipTogetherRoleId = e;
      this.$bl();
    };
    this.YBl = () => {
      this.ShipTogetherRoleId = 0;
      this.zbl();
    };
    this.zBl = e => {
      this.$Bl = true;
      this.MY1(e);
    };
    this.JBl = e => {
      this.EY1(e);
      this.$Bl = false;
      this.ShipTogetherRoleId = 0;
    };
    this.IY1 = e => {
      var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(206);
      this.Dnu(e);
      if (e) {
        t?.AddTag(-844934933);
      } else {
        t?.RemoveTag(-844934933);
      }
    };
    this.Bnu = () => {
      var e = Protocol_1.Aki.Protocol.xZ1.create();
      Net_1.Net.Call(23797, e, () => {});
    };
  }
  get IsShipTogether() {
    return this.$Bl;
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl);
    return true;
  }
  MY1(e) {
    switch (e?.VehicleType) {
      case "Gongduola":
        this.TY1(e);
        break;
      case "CoBathingEmptyVehicle":
        this.bY1(e);
    }
  }
  EY1(e) {
    switch (e?.VehicleType) {
      case "Gongduola":
        this.RY1(e);
        break;
      case "CoBathingEmptyVehicle":
        this.LY1(e);
    }
  }
  TY1(e) {
    if (ModelManager_1.ModelManager.ExploreModel.CheckNeedChangeSkill(1009, 1)) {
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(1009, undefined, true);
    }
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1009, 1);
    var t = e?.PassengerEntity;
    t?.GetComponent(206)?.AddTag(-1296410005);
    e?.VehicleEntity?.GetComponent(242)?.AddTagForPassenger(t, 1, 1937468570);
  }
  RY1(e) {
    ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1);
    var t = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId();
    ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(t, undefined, true);
    var t = e?.PassengerEntity;
    t?.GetComponent(206)?.RemoveTag(-1296410005);
    e?.VehicleEntity?.GetComponent(242)?.RemoveTagForPassenger(t, 1, 1937468570);
  }
  bY1(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.IY1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnScreenShotDone, this.Bnu);
  }
  LY1(e) {
    Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(206)?.RemoveTag(-844934933);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.IY1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnScreenShotDone, this.Bnu);
    ModelManager_1.ModelManager.ShowerModel.ExitAndClear();
  }
  Dnu(e) {
    var t = Protocol_1.Aki.Protocol.AZ1.create();
    t.BZ1 = e ? Protocol_1.Aki.Protocol.kZ1.j4n : Protocol_1.Aki.Protocol.kZ1.Proto_Third;
    Net_1.Net.Call(24219, t, () => {});
  }
  $bl() {
    var e = ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.values().next().value;
    var t = e?.RoleId ?? 0;
    var e = e?.RoleCreatureId ?? 0;
    if (e && t && Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(230)?.VehicleType === "Gongduola") {
      ModelManager_1.ModelManager.GameAudioModel.RegisterDriveAudioEvent(t, e);
    }
  }
  zbl() {
    if (Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(230)?.VehicleType === "Gongduola") {
      ModelManager_1.ModelManager.GameAudioModel.RemoveDriveAudioEvent();
    }
  }
}
exports.ShipTogetherModel = ShipTogetherModel;
//# sourceMappingURL=ShipTogetherModel.js.map