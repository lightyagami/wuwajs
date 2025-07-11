"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityShipTowerController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityShipTowerData_1 = require("./ActivityShipTowerData");
const ActivitySubViewShipTower_1 = require("./ActivitySubViewShipTower");
class ActivityShipTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.J7_ = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(this.Data?.Id);
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowingTower2";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewShipTower_1.ActivitySubViewShipTower();
  }
  OnCreateActivityData(e) {
    this.Data = new ActivityShipTowerData_1.ActivityShipTowerData();
    return this.Data;
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenActivityViewShipTower, this.J7_);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenActivityViewShipTower, this.J7_);
  }
  static RefreshActivityRedDot() {
    ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_SlashAndTowerLevelPlay).forEach(e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
    });
  }
}
exports.ActivityShipTowerController = ActivityShipTowerController;
//# sourceMappingURL=ActivityShipTowerController.js.map