"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAwakePosOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAwakeWithTransformVar_1 = require("./FbAwakeWithTransformVar");
class UnionAwakePosOptionHelper {
  static GetUnionAwakePosOptionObject(e) {
    if (e === fb_action_1.UnionAwakePosOption.AwakeWithTransformVar) {
      return new fb_action_1.AwakeWithTransformVar();
    }
  }
  static ReadUnionAwakePosOption(e, o) {
    if (o !== undefined && e === fb_action_1.UnionAwakePosOption.AwakeWithTransformVar) {
      return FbAwakeWithTransformVar_1.FbAwakeWithTransformVar.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionAwakePosOptionHelper = UnionAwakePosOptionHelper;
//# sourceMappingURL=UnionAwakePosOptionHelper.js.map