"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenEffectSystem = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class ScreenEffectSystem {
  static GetInstance() {
    if (!this.Me?.IsValid()) {
      this.Me = ActorSystem_1.ActorSystem.Get(UE.BP_ScreenEffectSystem_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    }
    return this.Me;
  }
}
exports.ScreenEffectSystem = ScreenEffectSystem;
//# sourceMappingURL=ScreenEffectSystem.js.map