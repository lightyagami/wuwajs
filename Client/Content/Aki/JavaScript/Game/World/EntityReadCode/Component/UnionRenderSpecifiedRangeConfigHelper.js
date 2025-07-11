"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionRenderSpecifiedRangeConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbRenderBookPage_1 = require("./FbRenderBookPage");
const FbRenderFlowerBridge_1 = require("./FbRenderFlowerBridge");
const FbRenderFogBarrier_1 = require("./FbRenderFogBarrier");
class UnionRenderSpecifiedRangeConfigHelper {
  static GetUnionRenderSpecifiedRangeConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderBookPage:
        return new fb_component_1.RenderBookPage();
      case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFlowerBridge:
        return new fb_component_1.RenderFlowerBridge();
      case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFogBarrier:
        return new fb_component_1.RenderFogBarrier();
      default:
        return;
    }
  }
  static ReadUnionRenderSpecifiedRangeConfig(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderBookPage:
          return FbRenderBookPage_1.FbRenderBookPage.Create(n);
        case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFlowerBridge:
          return FbRenderFlowerBridge_1.FbRenderFlowerBridge.Create(n);
        case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFogBarrier:
          return FbRenderFogBarrier_1.FbRenderFogBarrier.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionRenderSpecifiedRangeConfigHelper = UnionRenderSpecifiedRangeConfigHelper;
//# sourceMappingURL=UnionRenderSpecifiedRangeConfigHelper.js.map