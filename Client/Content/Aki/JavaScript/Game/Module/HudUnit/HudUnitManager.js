"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudUnitManager = undefined;
class HudUnitManager {
  static New(t) {
    var s = new t();
    s.Initialize();
    var t = t.name;
    this.Hni.set(t, s);
  }
  static TryNew(t) {
    if (!this.Get(t)) {
      this.New(t);
    }
  }
  static Destroy(t) {
    this.Get(t)?.Destroy();
    t = t.name;
    this.Hni.delete(t);
  }
  static ShowHud() {
    if (!this.QGa) {
      for (const t of this.HudUnitHandleClassArray) {
        this.New(t);
      }
      this.QGa = true;
    }
    for (const s of this.Hni.values()) {
      s.OnShowHud();
    }
  }
  static HideHud() {
    for (const t of this.Hni.values()) {
      t.OnHideHud();
    }
  }
  static Get(t) {
    t = t.name;
    return this.Hni.get(t);
  }
  static Clear() {
    for (const t of this.Hni.values()) {
      t.Destroy();
    }
    this.Hni.clear();
    this.QGa = false;
  }
  static RefreshHudOnInputControllerChanged(t, s) {
    for (const i of this.Hni.values()) {
      i.OnInputControllerChanged(t, s);
    }
  }
  static Tick(t) {
    for (const s of this.Hni.values()) {
      s.Tick(t);
    }
    this.TickCount++;
  }
  static AfterTick(t) {
    for (const s of this.Hni.values()) {
      s.AfterTick(t);
    }
  }
}
(exports.HudUnitManager = HudUnitManager).HudUnitHandleClassArray = new Array();
HudUnitManager.HudUnitHandleClassMap = new Map();
HudUnitManager.Hni = new Map();
HudUnitManager.QGa = false;
HudUnitManager.TickCount = 0; //# sourceMappingURL=HudUnitManager.js.map