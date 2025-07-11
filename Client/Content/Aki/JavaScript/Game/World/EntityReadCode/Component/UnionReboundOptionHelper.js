"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionReboundOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbForwardFrontRebound_1 = require("./FbForwardFrontRebound");
class UnionReboundOptionHelper {
  static GetUnionReboundOptionObject(o) {
    if (o === fb_component_1.UnionReboundOption.ForwardFrontRebound) {
      return new fb_component_1.ForwardFrontRebound();
    }
  }
  static ReadUnionReboundOption(o, n) {
    if (n !== undefined && o === fb_component_1.UnionReboundOption.ForwardFrontRebound) {
      return FbForwardFrontRebound_1.FbForwardFrontRebound.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionReboundOptionHelper = UnionReboundOptionHelper;
//# sourceMappingURL=UnionReboundOptionHelper.js.map