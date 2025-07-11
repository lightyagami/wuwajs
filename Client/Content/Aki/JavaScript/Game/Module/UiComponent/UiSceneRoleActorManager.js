"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSceneRoleActorManager = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
class UiSceneRoleActorManager {
  static CreateUiSceneRoleActor(e) {
    this.DKe++;
    var t = ActorSystem_1.ActorSystem.Get(UE.TsUiSceneRoleActor_C.StaticClass(), new UE.TransformDouble(), undefined);
    t.Init(this.DKe, e);
    this.Dxo.set(this.DKe, t);
    return t;
  }
  static DestroyUiSceneRoleActor(e) {
    var t = this.Dxo.get(e);
    return !t || (t.Destroy(), this.Dxo.delete(e));
  }
  static ClearAllUiSceneRoleActor() {
    for (const e of this.Dxo.values()) {
      e.Destroy();
    }
    this.Dxo.clear();
  }
}
(exports.UiSceneRoleActorManager = UiSceneRoleActorManager).DKe = 0;
UiSceneRoleActorManager.Dxo = new Map(); //# sourceMappingURL=UiSceneRoleActorManager.js.map