"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudUnitController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const HudUnitManager_1 = require("./HudUnitManager");
class HudUnitController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnClear() {
    HudUnitManager_1.HudUnitManager.Clear();
    return true;
  }
  static OnLeaveLevel() {
    HudUnitManager_1.HudUnitManager.Clear();
    return true;
  }
  static OnTick(e) {
    HudUnitManager_1.HudUnitManager.Tick(e);
  }
  static OnAfterTick(e) {
    HudUnitManager_1.HudUnitManager.AfterTick(e);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.OnInputControllerChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(17, this.iJe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.OnInputControllerChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(17, this.iJe);
  }
  static TryCreateHud(e) {
    e = HudUnitManager_1.HudUnitManager.HudUnitHandleClassMap.get(e);
    if (e) {
      HudUnitManager_1.HudUnitManager.TryNew(e);
    }
  }
  static TryDestroyHud(e) {
    e = HudUnitManager_1.HudUnitManager.HudUnitHandleClassMap.get(e);
    if (e) {
      HudUnitManager_1.HudUnitManager.Destroy(e);
    }
  }
}
exports.HudUnitController = HudUnitController;
(_a = HudUnitController).iJe = () => {
  var e = UiLayer_1.UiLayer.GetBattleViewUnit(1);
  var t = UiLayer_1.UiLayer.GetBattleViewUnit(3);
  var n = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(17);
  e.SetUIActive(n);
  t.SetUIActive(n);
  if (n) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      HudUnitManager_1.HudUnitManager.ShowHud();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 17, "WorldDone前不允许打开hud");
    }
  } else {
    HudUnitManager_1.HudUnitManager.HideHud();
  }
};
HudUnitController.OnInputControllerChange = (e, t) => {
  HudUnitManager_1.HudUnitManager.RefreshHudOnInputControllerChanged(e, t);
};
HudUnitController.OnEnterVehicle = e => {
  if (e.IsRolePassenger(true) && ModelManager_1.ModelManager.TreasureHuntModel?.IsEnableCompassTrack(e.VehicleType)) {
    _a.TryCreateHud(5);
  }
};
HudUnitController.OnLeaveVehicle = e => {
  if (e.IsRolePassenger(true) && ModelManager_1.ModelManager.TreasureHuntModel?.IsEnableCompassTrack(e.VehicleType)) {
    _a.TryDestroyHud(5);
  }
}; //# sourceMappingURL=HudUnitController.js.map