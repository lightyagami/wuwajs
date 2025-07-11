"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTargetEntityHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbPlayerEntity_1 = require("./FbPlayerEntity");
const FbSelfEntity_1 = require("./FbSelfEntity");
const FbTargetEntity_1 = require("./FbTargetEntity");
const FbTriggeredEntity_1 = require("./FbTriggeredEntity");
class UnionTargetEntityHelper {
  static GetUnionTargetEntityObject(t) {
    switch (t) {
      case fb_condition_1.UnionTargetEntity.PlayerEntity:
        return new fb_condition_1.PlayerEntity();
      case fb_condition_1.UnionTargetEntity.SelfEntity:
        return new fb_condition_1.SelfEntity();
      case fb_condition_1.UnionTargetEntity.TargetEntity:
        return new fb_condition_1.TargetEntity();
      case fb_condition_1.UnionTargetEntity.TriggeredEntity:
        return new fb_condition_1.TriggeredEntity();
      default:
        return;
    }
  }
  static ReadUnionTargetEntity(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_condition_1.UnionTargetEntity.PlayerEntity:
          return FbPlayerEntity_1.FbPlayerEntity.Create(e);
        case fb_condition_1.UnionTargetEntity.SelfEntity:
          return FbSelfEntity_1.FbSelfEntity.Create(e);
        case fb_condition_1.UnionTargetEntity.TargetEntity:
          return FbTargetEntity_1.FbTargetEntity.Create(e);
        case fb_condition_1.UnionTargetEntity.TriggeredEntity:
          return FbTriggeredEntity_1.FbTriggeredEntity.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionTargetEntityHelper = UnionTargetEntityHelper;
//# sourceMappingURL=UnionTargetEntityHelper.js.map