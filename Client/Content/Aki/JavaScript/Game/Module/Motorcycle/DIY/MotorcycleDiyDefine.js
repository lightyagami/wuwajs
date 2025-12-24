"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerItemData = exports.FrameItemData = exports.MotorcycleDiyPartBoxItemData = exports.MOTORCYCLE_DIY_IMPORT_VIEW_CAMERA_CONFIG_ID = exports.MOTORCYCLE_DIY_ROOT_VIEW_CAMERA_CONFIG_ID = exports.MOTORCYCLE_DIY_TAB_VIEW_CAMERA_CONFIG_ID = undefined;
exports.MOTORCYCLE_DIY_TAB_VIEW_CAMERA_CONFIG_ID = "摩托车自定义界面";
exports.MOTORCYCLE_DIY_ROOT_VIEW_CAMERA_CONFIG_ID = "摩托车贴纸界面";
exports.MOTORCYCLE_DIY_IMPORT_VIEW_CAMERA_CONFIG_ID = "摩托车预设界面";
class MotorcycleDiyPartBoxItemData {
  constructor(t, s, e) {
    this.PartType = 0;
    this.PartId = 0;
    this.Index = -1;
    this.PartType = t;
    this.PartId = s;
    this.Index = e;
  }
}
exports.MotorcycleDiyPartBoxItemData = MotorcycleDiyPartBoxItemData;
class FrameItemData {
  constructor(t, s) {
    this.FrameId = -1;
    this.IsUnLock = false;
    this.FrameId = t;
    this.IsUnLock = s;
  }
}
exports.FrameItemData = FrameItemData;
class MotorcycleDiyStickerItemData {
  constructor(t, s) {
    this.StickerPart = 0;
    this.StickerId = 0;
    this.StickerPart = t;
    this.StickerId = s;
  }
}
exports.MotorcycleDiyStickerItemData = MotorcycleDiyStickerItemData;
//# sourceMappingURL=MotorcycleDiyDefine.js.map