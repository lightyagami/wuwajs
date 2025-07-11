"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionRefreshContentHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAllRefreshContent_1 = require("./FbAllRefreshContent");
const FbRandomEntityRefreshContent_1 = require("./FbRandomEntityRefreshContent");
class UnionRefreshContentHelper {
  static GetUnionRefreshContentObject(e) {
    switch (e) {
      case fb_component_1.UnionRefreshContent.AllRefreshContent:
        return new fb_component_1.AllRefreshContent();
      case fb_component_1.UnionRefreshContent.RandomEntityRefreshContent:
        return new fb_component_1.RandomEntityRefreshContent();
      default:
        return;
    }
  }
  static ReadUnionRefreshContent(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionRefreshContent.AllRefreshContent:
          return FbAllRefreshContent_1.FbAllRefreshContent.Create(n);
        case fb_component_1.UnionRefreshContent.RandomEntityRefreshContent:
          return FbRandomEntityRefreshContent_1.FbRandomEntityRefreshContent.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionRefreshContentHelper = UnionRefreshContentHelper;
//# sourceMappingURL=UnionRefreshContentHelper.js.map