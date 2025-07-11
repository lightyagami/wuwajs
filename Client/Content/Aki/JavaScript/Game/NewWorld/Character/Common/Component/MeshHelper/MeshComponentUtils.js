"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshComponentUtils = undefined;
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
class MeshComponentUtils {
  static RelativeAttachComponent(t, e, i = FNameUtil_1.FNameUtil.EMPTY) {
    t.K2_AttachToComponent(e, i, 0, 0, 0, true);
  }
  static RelativeAttachComponentOnSafe(t, e, i = FNameUtil_1.FNameUtil.EMPTY) {
    return e !== t.GetAttachParent() && (MeshComponentUtils.RelativeAttachComponent(t, e, i), true);
  }
  static HideBone(t, e, i) {
    e = FNameUtil_1.FNameUtil.GetDynamicFName(e);
    if (FNameUtil_1.FNameUtil.IsEmpty(t.GetParentBone(e))) {
      t.SetHiddenInGame(i);
    } else if (t.IsBoneHiddenByName(e) !== i) {
      if (i) {
        t.HideBoneByName(e, 0);
      } else {
        t.UnHideBoneByName(e);
      }
    }
  }
}
exports.MeshComponentUtils = MeshComponentUtils;
//# sourceMappingURL=MeshComponentUtils.js.map