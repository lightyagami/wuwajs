"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockOnUtils = undefined;
class LockOnUtils {
  static CheckFriendCamp(t) {
    return t === 0 || t === 2 || t === 4;
  }
  static IsValidLockOnTarget(t) {
    var e;
    return !!t?.Valid && !!t?.IsInit && !!t?.Entity?.Active && !(e = t.Entity.GetComponent(0))?.GetRemoveState() && !!e?.GetVisible() && (!(e = t.Entity.GetComponent(205)) || !e.HasAnyTag([1008164187, -1243968098]));
  }
}
exports.LockOnUtils = LockOnUtils;
//# sourceMappingURL=LockOnUtils.js.map