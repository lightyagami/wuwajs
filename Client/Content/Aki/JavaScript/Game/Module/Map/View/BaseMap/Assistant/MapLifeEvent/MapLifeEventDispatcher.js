"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapLifeEventDispatcher = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const MapSceneGameplayUnlock_1 = require("./MapSceneGameplayUnlock");
class MapLifeEventDispatcher {
  constructor(e) {
    this.ZRi = undefined;
    this.eUi = undefined;
    this.ZRi = e;
    this.eUi = new Map([[0, new MapSceneGameplayUnlock_1.MapSceneGameplayUnlock(this.ZRi)]]);
  }
  async OnWorldMapBeforeStartAsync() {
    var e;
    var a;
    var o = [];
    for ([e, a] of this.eUi) {
      if (ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)?.State) {
        o.push(a.OnWorldMapBeforeStartAsync());
      }
    }
    await Promise.all(o);
  }
  OnWorldMapBeforeShow() {
    for (var [e, a] of this.eUi) {
      if (ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)?.State) {
        a.OnWorldMapBeforeShow();
      }
    }
  }
  OnWorldMapAfterShow() {
    for (var [e, a] of this.eUi) {
      if (ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)?.State) {
        a.OnWorldMapAfterShow();
      }
    }
  }
  OnWorldBeforeDestroy() {}
}
exports.MapLifeEventDispatcher = MapLifeEventDispatcher;
//# sourceMappingURL=MapLifeEventDispatcher.js.map