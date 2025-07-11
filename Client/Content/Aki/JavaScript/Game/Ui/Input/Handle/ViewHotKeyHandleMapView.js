"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleMapView = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleMapView extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  SpecialConditionCheck() {
    return !ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower() && !ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss();
  }
}
exports.ViewHotKeyHandleMapView = ViewHotKeyHandleMapView;
//# sourceMappingURL=ViewHotKeyHandleMapView.js.map