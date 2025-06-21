"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.allHLODGridNames = exports.lowMemoryDeviceExcludeGridNames = exports.voxelGridName = exports.dataLayerRuntimeHLOD = void 0;
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
exports.dataLayerRuntimeHLOD = ["DataLayerRuntime_GenerateHLOD", "DataLayerRuntime_GenerateHLOD_Middle", "DataLayerRuntime_GenerateHLOD_Small"], exports.voxelGridName = FNameUtil_1.FNameUtil.GetDynamicFName("Grid_VoxelPartition"), exports.lowMemoryDeviceExcludeGridNames = [FNameUtil_1.FNameUtil.GetDynamicFName("Grid_PVS"), FNameUtil_1.FNameUtil.GetDynamicFName("Grid_GPUNPC")], exports.allHLODGridNames = [FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_200m_300m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_300m_500m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_400m_800m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_500m_1000m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_500m_1500m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_600m_1200m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_800m_2500m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_800m_4000m")];
//# sourceMappingURL=WorldDefine.js.map