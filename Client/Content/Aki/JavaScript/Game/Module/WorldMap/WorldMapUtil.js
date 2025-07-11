"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapUtil = undefined;
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const UiLayer_1 = require("../../Ui/UiLayer");
class WorldMapUtil {
  static GetViewportSize() {
    if (ObjectUtils_1.ObjectUtils.IsValid(UiLayer_1.UiLayer.UiRootItem)) {
      return Vector2D_1.Vector2D.Create(UiLayer_1.UiLayer.UiRootItem.GetWidth(), UiLayer_1.UiLayer.UiRootItem.GetHeight());
    } else {
      return Vector2D_1.Vector2D.Create();
    }
  }
  static GetViewportSizeByPool() {
    if (ObjectUtils_1.ObjectUtils.IsValid(UiLayer_1.UiLayer.UiRootItem)) {
      return Vector2D_1.Vector2D.Create(UiLayer_1.UiLayer.UiRootItem.GetWidth(), UiLayer_1.UiLayer.UiRootItem.GetHeight());
    } else {
      return Vector2D_1.Vector2D.Create();
    }
  }
}
exports.WorldMapUtil = WorldMapUtil;
//# sourceMappingURL=WorldMapUtil.js.map