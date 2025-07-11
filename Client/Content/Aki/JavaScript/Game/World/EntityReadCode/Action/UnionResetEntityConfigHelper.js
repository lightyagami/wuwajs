"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionResetEntityConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbJigsawItemEntity_1 = require("./FbJigsawItemEntity");
const FbResetTeleControlEntity_1 = require("./FbResetTeleControlEntity");
class UnionResetEntityConfigHelper {
  static GetUnionResetEntityConfigObject(t) {
    switch (t) {
      case fb_action_1.UnionResetEntityConfig.JigsawItemEntity:
        return new fb_action_1.JigsawItemEntity();
      case fb_action_1.UnionResetEntityConfig.ResetTeleControlEntity:
        return new fb_action_1.ResetTeleControlEntity();
      default:
        return;
    }
  }
  static ReadUnionResetEntityConfig(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_action_1.UnionResetEntityConfig.JigsawItemEntity:
          return FbJigsawItemEntity_1.FbJigsawItemEntity.Create(e);
        case fb_action_1.UnionResetEntityConfig.ResetTeleControlEntity:
          return FbResetTeleControlEntity_1.FbResetTeleControlEntity.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionResetEntityConfigHelper = UnionResetEntityConfigHelper;
//# sourceMappingURL=UnionResetEntityConfigHelper.js.map