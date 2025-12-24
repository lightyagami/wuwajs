"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockOnUtils = undefined;
const ActorUtils_1 = require("../../../../../Utils/ActorUtils");
const SCENE_ITEM_ACTOR_KEY = "Center";
class LockOnUtils {
  static CheckFriendCamp(r) {
    return r === 0 || r === 2 || r === 4;
  }
  static IsValidLockOnTarget(r, e = undefined, t = undefined) {
    if (!r?.Valid || !r?.IsInit) {
      return false;
    }
    if (!r?.Entity?.Active) {
      return false;
    }
    var i = r.Entity.GetComponent(0);
    if (i?.GetRemoveState()) {
      return false;
    }
    if (!i?.GetVisible()) {
      return false;
    }
    var o = r.Entity.GetComponent(215);
    if (o) {
      var s = t ? t.GameplayTags.Num() : 0;
      if (s > 0) {
        for (let r = 0; r < s; ++r) {
          var a = t.GameplayTags.Get(r);
          if (o.HasTag(a.TagId)) {
            return false;
          }
        }
      } else if (o.HasAnyTag([1008164187, -1243968098])) {
        return false;
      }
      var n = e ? e.GameplayTags.Num() : 0;
      if (n > 0) {
        let t = false;
        for (let r = 0; r < n; ++r) {
          var c = e.GameplayTags.Get(r);
          if (o.HasTag(c.TagId)) {
            t = true;
            break;
          }
        }
        return t;
      }
    }
    return true;
  }
  static GetLockOnTargetLocation(r) {
    let t = undefined;
    var e;
    var i;
    if (r?.IsValid()) {
      e = ActorUtils_1.ActorUtils.GetEntityByActor(r, false);
      t = e ? (i = e.Entity?.GetComponent(212), (t = (i &&= i.GetInteractionMainActor()) && (i = i.GetActorByKey(SCENE_ITEM_ACTOR_KEY)) ? i.D_K2_GetActorLocation() : t) || e.Entity.GetComponent(1).ActorLocation) : r.D_K2_GetActorLocation();
    }
    return t;
  }
}
exports.LockOnUtils = LockOnUtils;
//# sourceMappingURL=LockOnUtils.js.map