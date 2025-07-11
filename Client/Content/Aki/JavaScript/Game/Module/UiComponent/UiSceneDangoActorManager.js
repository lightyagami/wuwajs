"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSceneDangoActorManager = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
class UiSceneDangoActorManager {
  static CreateUiSceneDangoActor(t) {
    this.DKe++;
    var e = ActorSystem_1.ActorSystem.Get(UE.TsUiSceneDangoActor_C.StaticClass(), new UE.TransformDouble(), undefined);
    e.Init(this.DKe, t);
    this.Lpc.set(this.DKe, e);
    return e;
  }
  static DestroyUiSceneDangoActor(t) {
    var e = this.Lpc.get(t);
    return !e || (e.Destroy(), this.Lpc.delete(t));
  }
  static SetAllActorVisible(t) {
    for (const e of this.Lpc.values()) {
      e.Model.CheckGetComponent(0)?.SetVisible(t);
    }
  }
  static ClearAllUiSceneDangoActor() {
    for (const t of this.Lpc.values()) {
      t.Destroy();
    }
    this.Lpc.clear();
  }
}
(exports.UiSceneDangoActorManager = UiSceneDangoActorManager).DKe = 0;
UiSceneDangoActorManager.Lpc = new Map(); //# sourceMappingURL=UiSceneDangoActorManager.js.map