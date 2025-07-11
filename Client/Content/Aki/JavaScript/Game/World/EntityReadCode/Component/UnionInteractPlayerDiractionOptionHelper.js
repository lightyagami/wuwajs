"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionInteractPlayerDiractionOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbInteractPlayerDiractionToLeisure_1 = require("./FbInteractPlayerDiractionToLeisure");
const FbInteractPlayerDiractionToNpc_1 = require("./FbInteractPlayerDiractionToNpc");
class UnionInteractPlayerDiractionOptionHelper {
  static GetUnionInteractPlayerDiractionOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionInteractPlayerDiractionOption.InteractPlayerDiractionToLeisure:
        return new fb_component_1.InteractPlayerDiractionToLeisure();
      case fb_component_1.UnionInteractPlayerDiractionOption.InteractPlayerDiractionToNpc:
        return new fb_component_1.InteractPlayerDiractionToNpc();
      default:
        return;
    }
  }
  static ReadUnionInteractPlayerDiractionOption(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionInteractPlayerDiractionOption.InteractPlayerDiractionToLeisure:
          return FbInteractPlayerDiractionToLeisure_1.FbInteractPlayerDiractionToLeisure.Create(t);
        case fb_component_1.UnionInteractPlayerDiractionOption.InteractPlayerDiractionToNpc:
          return FbInteractPlayerDiractionToNpc_1.FbInteractPlayerDiractionToNpc.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionInteractPlayerDiractionOptionHelper = UnionInteractPlayerDiractionOptionHelper;
//# sourceMappingURL=UnionInteractPlayerDiractionOptionHelper.js.map