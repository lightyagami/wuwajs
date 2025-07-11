"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoxelUtils = undefined;
const UE = require("ue");
class VoxelUtils {
  static GetVoxelInfo(e, t, s, o) {
    return UE.KuroVoxelSystem.D_GetVoxelInfoAtPos(e, t, o, s);
  }
  static TryGetVoxelInfo(e, t, s, o, r) {
    return UE.KuroVoxelSystem.D_TryGetVoxelInfoAtPos(e, t, s, r, o);
  }
}
exports.VoxelUtils = VoxelUtils;
//# sourceMappingURL=VoxelUtils.js.map