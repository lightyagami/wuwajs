"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ScreenEffectSystem_1 = require("../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
class TsAnimNotifyCameraEffect extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.EffectData = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    if (this.EffectData) {
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(this.EffectData);
    }
    return true;
  }
  GetNotifyName() {
    return "镜头特效";
  }
}
exports.default = TsAnimNotifyCameraEffect;
//# sourceMappingURL=TsAnimNotifyCameraEffect.js.map