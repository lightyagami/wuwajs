"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
class TsAnimNotifyStateAddCharRendering extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.RenderType = 7;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    return e instanceof UE.KuroRecordCharacter && (e.D_AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, e.D_GetTransform(), false, FNameUtil_1.FNameUtil.GetDynamicFName("CharRenderingComponent")).Init(this.RenderType), true);
  }
}
exports.default = TsAnimNotifyStateAddCharRendering;
//# sourceMappingURL=TsAnimNotifyStateAddCharRendering.js.map