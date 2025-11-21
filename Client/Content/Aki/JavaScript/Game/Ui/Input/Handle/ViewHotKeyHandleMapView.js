"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleMapView = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../../Module/HonamiStory/HonamiStoryUtil");
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleMapView extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  SpecialConditionCheck() {
    return !ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower() && !ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss() && !HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryMainDungeon();
  }
}
exports.ViewHotKeyHandleMapView = ViewHotKeyHandleMapView;
//# sourceMappingURL=ViewHotKeyHandleMapView.js.map