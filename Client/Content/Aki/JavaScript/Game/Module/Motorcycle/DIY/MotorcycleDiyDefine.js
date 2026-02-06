"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOTORCYCLE_DIY_DECORATION_PART = exports.MOTORCYCLE_DIY_STICKER_PART = exports.MOTORCYCLE_DIY_IMPORT_VIEW_CAMERA_CONFIG_ID = exports.MOTORCYCLE_DIY_ROOT_VIEW_CAMERA_CONFIG_ID = exports.MOTORCYCLE_DIY_TAB_VIEW_CAMERA_CONFIG_ID = exports.MotorcycleDiyStickerDecoItemData = exports.MotorcycleDiyFrameItemData = exports.MotorcycleDiyOutlookBoxItemData = undefined;
class MotorcycleDiyOutlookBoxItemData {
  constructor(t, o, s) {
    this.OutlookType = 0;
    this.ItemId = 0;
    this.JumpIndex = -1;
    this.OutlookType = t;
    this.ItemId = o;
    this.JumpIndex = s;
  }
}
exports.MotorcycleDiyOutlookBoxItemData = MotorcycleDiyOutlookBoxItemData;
class MotorcycleDiyFrameItemData {
  constructor() {
    this.ItemId = 0;
    this.QualityId = 0;
    this.SortIndex = 0;
    this.IsDefault = false;
  }
}
exports.MotorcycleDiyFrameItemData = MotorcycleDiyFrameItemData;
class MotorcycleDiyStickerDecoItemData {
  constructor() {
    this.Part = 0;
    this.ItemId = 0;
    this.QualityId = 0;
    this.SortIndex = 0;
    this.IsSticker = false;
  }
}
exports.MotorcycleDiyStickerDecoItemData = MotorcycleDiyStickerDecoItemData;
exports.MOTORCYCLE_DIY_TAB_VIEW_CAMERA_CONFIG_ID = "摩托车自定义界面";
exports.MOTORCYCLE_DIY_ROOT_VIEW_CAMERA_CONFIG_ID = "摩托车贴纸界面";
exports.MOTORCYCLE_DIY_IMPORT_VIEW_CAMERA_CONFIG_ID = "摩托车预设界面";
exports.MOTORCYCLE_DIY_STICKER_PART = [1, 2, 3];
exports.MOTORCYCLE_DIY_DECORATION_PART = [1]; //# sourceMappingURL=MotorcycleDiyDefine.js.map