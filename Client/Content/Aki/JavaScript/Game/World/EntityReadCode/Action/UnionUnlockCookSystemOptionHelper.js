"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionUnlockCookSystemOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbUnlockCookSystemCookBook_1 = require("./FbUnlockCookSystemCookBook");
class UnionUnlockCookSystemOptionHelper {
  static GetUnionUnlockCookSystemOptionObject(o) {
    if (o === fb_action_1.UnionUnlockCookSystemOption.UnlockCookSystemCookBook) {
      return new fb_action_1.UnlockCookSystemCookBook();
    }
  }
  static ReadUnionUnlockCookSystemOption(o, t) {
    if (t !== undefined && o === fb_action_1.UnionUnlockCookSystemOption.UnlockCookSystemCookBook) {
      return FbUnlockCookSystemCookBook_1.FbUnlockCookSystemCookBook.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionUnlockCookSystemOptionHelper = UnionUnlockCookSystemOptionHelper;
//# sourceMappingURL=UnionUnlockCookSystemOptionHelper.js.map