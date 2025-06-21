"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShipTogetherModel = void 0;
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ShipTogetherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.$Bl = !1, this.CurrentSelectTogetherRoleId = 0, this.ShipTogetherRoleId = 0, this.XBl = e => {
      this.ShipTogetherRoleId = e, this.$bl()
    }, this.YBl = () => {
      this.ShipTogetherRoleId = 0, this.zbl()
    }, this.zBl = e => {
      this.$Bl = !0, this.fX1(e)
    }, this.JBl = e => {
      this.gX1(e), this.$Bl = !1, this.ShipTogetherRoleId = 0
    }, this.CX1 = e => {
      var t = (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())?.GetComponent(205);
      this.Wtu(e), e ? t?.AddTag(-844934933) : t?.RemoveTag(-844934933)
    }, this.Qtu = () => {
      var e = Protocol_1.Aki.Protocol.mJ1.create();
      Net_1.Net.Call(24881, e, () => {})
    }
  }
  get IsShipTogether() {
    return this.$Bl
  }
  OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl), !0
  }
  OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl), !0
  }
  fX1(e) {
    switch (e?.VehicleType) {
      case "Gongduola":
        this.pX1(e);
        break;
      case "CoBathingEmptyVehicle":
        this.vX1(e)
    }
  }
  gX1(e) {
    switch (e?.VehicleType) {
      case "Gongduola":
        this.yX1(e);
        break;
      case "CoBathingEmptyVehicle":
        this.SX1(e)
    }
  }
  pX1(e) {
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1009, 1) || ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(1009, void 0, !0);
    var t = e?.PassengerEntity;
    (t?.GetComponent(205))?.AddTag(-1296410005), ((e?.VehicleEntity)?.GetComponent(241))?.AddTagForPassenger(t, 1, 1937468570)
  }
  yX1(e) {
    ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1);
    var t = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId(),
      t = (ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(t, void 0, !0), e?.PassengerEntity);
    (t?.GetComponent(205))?.RemoveTag(-1296410005), ((e?.VehicleEntity)?.GetComponent(241))?.RemoveTagForPassenger(t, 1, 1937468570)
  }
  vX1(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.CX1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnScreenShotDone, this.Qtu)
  }
  SX1(e) {
    ((Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity)?.GetComponent(205))?.RemoveTag(-844934933), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.CX1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnScreenShotDone, this.Qtu), ModelManager_1.ModelManager.ShowerModel.ExitAndClear()
  }
  Wtu(e) {
    var t = Protocol_1.Aki.Protocol.cJ1.create();
    t.CJ1 = e ? Protocol_1.Aki.Protocol.pJ1.j4n : Protocol_1.Aki.Protocol.pJ1.Proto_Third, Net_1.Net.Call(19543, t, () => {})
  }
  $bl() {
    var e = ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.values().next().value,
      t = e?.RoleId ?? 0,
      e = e?.RoleCreatureId ?? 0;
    e && t && "Gongduola" === Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(229)?.VehicleType && ModelManager_1.ModelManager.GameAudioModel.RegisterDriveAudioEvent(t, e)
  }
  zbl() {
    "Gongduola" === Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(229)?.VehicleType && ModelManager_1.ModelManager.GameAudioModel.RemoveDriveAudioEvent()
  }
}
exports.ShipTogetherModel = ShipTogetherModel;
//# sourceMappingURL=ShipTogetherModel.js.map