"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionNpcStandbyShowOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbNpcStandbyShowFinitely_1 = require("./FbNpcStandbyShowFinitely");
const FbNpcStandbyShowLooply_1 = require("./FbNpcStandbyShowLooply");
const FbNpcStandbySit_1 = require("./FbNpcStandbySit");
class UnionNpcStandbyShowOptionHelper {
  static GetUnionNpcStandbyShowOptionObject(n) {
    switch (n) {
      case fb_component_1.UnionNpcStandbyShowOption.NpcStandbyShowFinitely:
        return new fb_component_1.NpcStandbyShowFinitely();
      case fb_component_1.UnionNpcStandbyShowOption.NpcStandbyShowLooply:
        return new fb_component_1.NpcStandbyShowLooply();
      case fb_component_1.UnionNpcStandbyShowOption.NpcStandbySit:
        return new fb_component_1.NpcStandbySit();
      default:
        return;
    }
  }
  static ReadUnionNpcStandbyShowOption(n, t) {
    if (t !== undefined) {
      switch (n) {
        case fb_component_1.UnionNpcStandbyShowOption.NpcStandbyShowFinitely:
          return FbNpcStandbyShowFinitely_1.FbNpcStandbyShowFinitely.Create(t);
        case fb_component_1.UnionNpcStandbyShowOption.NpcStandbyShowLooply:
          return FbNpcStandbyShowLooply_1.FbNpcStandbyShowLooply.Create(t);
        case fb_component_1.UnionNpcStandbyShowOption.NpcStandbySit:
          return FbNpcStandbySit_1.FbNpcStandbySit.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionNpcStandbyShowOptionHelper = UnionNpcStandbyShowOptionHelper;
//# sourceMappingURL=UnionNpcStandbyShowOptionHelper.js.map