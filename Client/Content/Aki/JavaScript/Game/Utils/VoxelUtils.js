"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoxelUtils = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
class VoxelUtils {
  static GetVoxelInfo(e, t, r, s) {
    return UE.KuroVoxelSystem.D_GetVoxelInfoAtPos(e, t, s, r);
  }
  static TryGetVoxelInfo(e, t, r, s, o) {
    return !!UE.KuroVoxelSystem.D_TryGetVoxelInfoAtPos(e, t, r, o, s) || !!o && (0, puerts_1.$unref)(o) === 0;
  }
}
exports.VoxelUtils = VoxelUtils;
//# sourceMappingURL=VoxelUtils.js.map