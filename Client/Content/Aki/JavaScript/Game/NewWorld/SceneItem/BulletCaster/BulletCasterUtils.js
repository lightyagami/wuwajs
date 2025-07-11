"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterUtils = undefined;
class BulletCasterUtils {
  static SetTimerHandleTimeDilation(e, t) {
    if (e.Valid()) {
      if (t === 0) {
        if (!e.IsPause()) {
          e.Pause();
        }
      } else if (t > 0) {
        if (e.IsPause()) {
          e.Resume();
        }
        e.ChangeDilation(t);
      }
    }
  }
}
exports.BulletCasterUtils = BulletCasterUtils;
//# sourceMappingURL=BulletCasterUtils.js.map