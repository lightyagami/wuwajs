"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
class TsAnimNotifyAddCharRendering extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.RenderType = 7;
  }
  Constructor() {}
  Received_Notify(e, t) {
    e = e.GetOwner();
    return e instanceof UE.KuroRecordCharacter && (e.D_AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, e.D_GetTransform(), false, FNameUtil_1.FNameUtil.GetDynamicFName("CharRenderingComponent")).Init(this.RenderType), true);
  }
}
exports.default = TsAnimNotifyAddCharRendering;
//# sourceMappingURL=TsAnimNotifyAddCharRendering.js.map