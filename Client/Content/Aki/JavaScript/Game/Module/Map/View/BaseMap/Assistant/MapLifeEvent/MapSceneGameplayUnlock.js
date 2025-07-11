"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapSceneGameplayUnlock = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapLifeEventListener_1 = require("./MapLifeEventListener");
class MapSceneGameplayUnlock extends MapLifeEventListener_1.MapLifeEventListener {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
  }
  OnWorldMapBeforeShow() {
    this.Pe = ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(0).Data;
    var e = [];
    var r = this.TargetExpressionMap.GetMarkItemsByType(19);
    var t = this.TargetExpressionMap.GetMarkItemsByType(10);
    if (r) {
      e.push(...r.values());
    }
    if (t) {
      e.push(...t.values());
    }
    e.forEach(e => {
      if (e && e.MarkConfig) {
        e.IsCanShowView = false;
        e.ViewUpdateAsync(GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation());
      }
    });
  }
  OnWorldMapAfterShow() {
    this.TargetExpressionMap.HandleSceneGamePlayMarkItemOpen(19, this.Pe.RelativeType, this.Pe.RelativeSubType);
    this.TargetExpressionMap.HandleSceneGamePlayMarkItemOpen(10, this.Pe.RelativeType, this.Pe.RelativeSubType);
    ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(0).State = false;
  }
}
exports.MapSceneGameplayUnlock = MapSceneGameplayUnlock;
//# sourceMappingURL=MapSceneGameplayUnlock.js.map