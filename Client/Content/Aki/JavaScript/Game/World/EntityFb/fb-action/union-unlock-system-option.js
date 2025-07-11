"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionUnlockSystemOption = exports.unionToUnionUnlockSystemOption = exports.UnionUnlockSystemOption = undefined;
const un_lock_cook_system_item_js_1 = require("../fb-action/un-lock-cook-system-item.js");
const un_lock_dango_collect_system_item_js_1 = require("../fb-action/un-lock-dango-collect-system-item.js");
const unlock_achievement_system_item_js_1 = require("../fb-action/unlock-achievement-system-item.js");
const unlock_atlas_system_item_js_1 = require("../fb-action/unlock-atlas-system-item.js");
const unlock_photo_memory_collect_system_item_js_1 = require("../fb-action/unlock-photo-memory-collect-system-item.js");
var UnionUnlockSystemOption;
function unionToUnionUnlockSystemOption(e, t) {
  switch (UnionUnlockSystemOption[e]) {
    case "NONE":
      return;
    case "UnlockAchievementSystemItem":
      return t(new unlock_achievement_system_item_js_1.UnlockAchievementSystemItem());
    case "UnlockAtlasSystemItem":
      return t(new unlock_atlas_system_item_js_1.UnlockAtlasSystemItem());
    case "UnLockCookSystemItem":
      return t(new un_lock_cook_system_item_js_1.UnLockCookSystemItem());
    case "UnLockDangoCollectSystemItem":
      return t(new un_lock_dango_collect_system_item_js_1.UnLockDangoCollectSystemItem());
    case "UnlockPhotoMemoryCollectSystemItem":
      return t(new unlock_photo_memory_collect_system_item_js_1.UnlockPhotoMemoryCollectSystemItem());
    default:
      return;
  }
}
function unionListToUnionUnlockSystemOption(e, t, o) {
  switch (UnionUnlockSystemOption[e]) {
    case "NONE":
      return;
    case "UnlockAchievementSystemItem":
      return t(o, new unlock_achievement_system_item_js_1.UnlockAchievementSystemItem());
    case "UnlockAtlasSystemItem":
      return t(o, new unlock_atlas_system_item_js_1.UnlockAtlasSystemItem());
    case "UnLockCookSystemItem":
      return t(o, new un_lock_cook_system_item_js_1.UnLockCookSystemItem());
    case "UnLockDangoCollectSystemItem":
      return t(o, new un_lock_dango_collect_system_item_js_1.UnLockDangoCollectSystemItem());
    case "UnlockPhotoMemoryCollectSystemItem":
      return t(o, new unlock_photo_memory_collect_system_item_js_1.UnlockPhotoMemoryCollectSystemItem());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.UnlockAchievementSystemItem = 1] = "UnlockAchievementSystemItem";
  e[e.UnlockAtlasSystemItem = 2] = "UnlockAtlasSystemItem";
  e[e.UnLockCookSystemItem = 3] = "UnLockCookSystemItem";
  e[e.UnLockDangoCollectSystemItem = 4] = "UnLockDangoCollectSystemItem";
  e[e.UnlockPhotoMemoryCollectSystemItem = 5] = "UnlockPhotoMemoryCollectSystemItem";
})(UnionUnlockSystemOption = exports.UnionUnlockSystemOption ||= {});
exports.unionToUnionUnlockSystemOption = unionToUnionUnlockSystemOption;
exports.unionListToUnionUnlockSystemOption = unionListToUnionUnlockSystemOption; //# sourceMappingURL=union-unlock-system-option.js.map