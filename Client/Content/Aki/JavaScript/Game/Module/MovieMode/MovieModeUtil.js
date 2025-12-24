"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieModeUtil = undefined;
class MovieModeUtil {
  static ApplyAspectOffsetToUi(t, e, s) {
    if (s && e) {
      e = s.Offset;
      s = s.IsWidthBlend;
      e = this.VKe(t.OriginalOffset, s, e, t.OffsetWidthDirection, t.OffsetHeightDirection);
      if (s) {
        t.UiItem.SetAnchorOffsetX(e);
      } else {
        t.UiItem.SetAnchorOffsetY(e);
      }
    } else {
      t.UiItem.SetAnchorOffsetX(t.OriginalOffset.X);
      t.UiItem.SetAnchorOffsetY(t.OriginalOffset.Y);
    }
  }
  static VKe(t, e, s, i, o) {
    return (e ? t.X : t.Y) + (e ? i * s : o * s);
  }
}
exports.MovieModeUtil = MovieModeUtil;
//# sourceMappingURL=MovieModeUtil.js.map