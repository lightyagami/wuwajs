"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleFactory = undefined;
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
const ViewHotKeyHandleFunctionMenu_1 = require("./ViewHotKeyHandleFunctionMenu");
const ViewHotKeyHandleMapView_1 = require("./ViewHotKeyHandleMapView");
const ViewHotKeyHandleRoleRootView_1 = require("./ViewHotKeyHandleRoleRootView");
const ViewHotKeyHandleRoulette_1 = require("./ViewHotKeyHandleRoulette");
const ViewHotKeyHandleTrapDefenseRoulette_1 = require("./ViewHotKeyHandleTrapDefenseRoulette");
class ViewHotKeyHandleFactory {
  static CreateViewHotKeyHandle(e, t) {
    return new (this.CJa.get(t) ?? ViewHotKeyHandle_1.ViewHotKeyHandle)(e);
  }
}
(exports.ViewHotKeyHandleFactory = ViewHotKeyHandleFactory).CJa = new Map([["ViewHotKeyHandle", ViewHotKeyHandle_1.ViewHotKeyHandle], ["ViewHotKeyHandleRoulette", ViewHotKeyHandleRoulette_1.ViewHotKeyHandleRoulette], ["ViewHotKeyHandleFunctionMenu", ViewHotKeyHandleFunctionMenu_1.ViewHotKeyHandleFunctionMenu], ["ViewHotKeyHandleMapView", ViewHotKeyHandleMapView_1.ViewHotKeyHandleMapView], ["ViewHotKeyHandleRoleRootView", ViewHotKeyHandleRoleRootView_1.ViewHotKeyHandleRoleRootView], ["ViewHotKeyHandleTrapDefenseRoulette", ViewHotKeyHandleTrapDefenseRoulette_1.ViewHotKeyHandleTrapDefenseRoulette]]);
//# sourceMappingURL=ViewHotKeyHandleDefine.js.map