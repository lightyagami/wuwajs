"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionFanInteractOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFanInteractByFKey_1 = require("./FbFanInteractByFKey");
const FbFanInteractByHit_1 = require("./FbFanInteractByHit");
class UnionFanInteractOptionHelper {
  static GetUnionFanInteractOptionObject(t) {
    switch (t) {
      case fb_component_1.UnionFanInteractOption.FanInteractByFKey:
        return new fb_component_1.FanInteractByFKey();
      case fb_component_1.UnionFanInteractOption.FanInteractByHit:
        return new fb_component_1.FanInteractByHit();
      default:
        return;
    }
  }
  static ReadUnionFanInteractOption(t, n) {
    if (n !== undefined) {
      switch (t) {
        case fb_component_1.UnionFanInteractOption.FanInteractByFKey:
          return FbFanInteractByFKey_1.FbFanInteractByFKey.Create(n);
        case fb_component_1.UnionFanInteractOption.FanInteractByHit:
          return FbFanInteractByHit_1.FbFanInteractByHit.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionFanInteractOptionHelper = UnionFanInteractOptionHelper;
//# sourceMappingURL=UnionFanInteractOptionHelper.js.map