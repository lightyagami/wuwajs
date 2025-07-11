"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionUnlockSystemOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbUnlockAchievementSystemItem_1 = require("./FbUnlockAchievementSystemItem");
const FbUnlockAtlasSystemItem_1 = require("./FbUnlockAtlasSystemItem");
const FbUnLockCookSystemItem_1 = require("./FbUnLockCookSystemItem");
const FbUnLockDangoCollectSystemItem_1 = require("./FbUnLockDangoCollectSystemItem");
const FbUnlockPhotoMemoryCollectSystemItem_1 = require("./FbUnlockPhotoMemoryCollectSystemItem");
class UnionUnlockSystemOptionHelper {
  static GetUnionUnlockSystemOptionObject(e) {
    switch (e) {
      case fb_action_1.UnionUnlockSystemOption.UnlockAchievementSystemItem:
        return new fb_action_1.UnlockAchievementSystemItem();
      case fb_action_1.UnionUnlockSystemOption.UnlockAtlasSystemItem:
        return new fb_action_1.UnlockAtlasSystemItem();
      case fb_action_1.UnionUnlockSystemOption.UnLockCookSystemItem:
        return new fb_action_1.UnLockCookSystemItem();
      case fb_action_1.UnionUnlockSystemOption.UnLockDangoCollectSystemItem:
        return new fb_action_1.UnLockDangoCollectSystemItem();
      case fb_action_1.UnionUnlockSystemOption.UnlockPhotoMemoryCollectSystemItem:
        return new fb_action_1.UnlockPhotoMemoryCollectSystemItem();
      default:
        return;
    }
  }
  static ReadUnionUnlockSystemOption(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionUnlockSystemOption.UnlockAchievementSystemItem:
          return FbUnlockAchievementSystemItem_1.FbUnlockAchievementSystemItem.Create(t);
        case fb_action_1.UnionUnlockSystemOption.UnlockAtlasSystemItem:
          return FbUnlockAtlasSystemItem_1.FbUnlockAtlasSystemItem.Create(t);
        case fb_action_1.UnionUnlockSystemOption.UnLockCookSystemItem:
          return FbUnLockCookSystemItem_1.FbUnLockCookSystemItem.Create(t);
        case fb_action_1.UnionUnlockSystemOption.UnLockDangoCollectSystemItem:
          return FbUnLockDangoCollectSystemItem_1.FbUnLockDangoCollectSystemItem.Create(t);
        case fb_action_1.UnionUnlockSystemOption.UnlockPhotoMemoryCollectSystemItem:
          return FbUnlockPhotoMemoryCollectSystemItem_1.FbUnlockPhotoMemoryCollectSystemItem.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionUnlockSystemOptionHelper = UnionUnlockSystemOptionHelper;
//# sourceMappingURL=UnionUnlockSystemOptionHelper.js.map