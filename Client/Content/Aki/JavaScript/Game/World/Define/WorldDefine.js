"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificVolumeDatalayer2 = exports.SpecificVolumeDatalayer1 = exports.allBaseDataLayers = exports.secondHLODGridNames = exports.firstHLODGridNames = exports.lowMemoryDeviceExcludeGridNames = exports.voxelGridName = exports.dataLayerRuntimeHLOD = undefined;
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
exports.dataLayerRuntimeHLOD = ["DataLayerRuntime_GenerateHLOD", "DataLayerRuntime_GenerateHLOD_Middle", "DataLayerRuntime_GenerateHLOD_Small"];
exports.voxelGridName = FNameUtil_1.FNameUtil.GetDynamicFName("Grid_VoxelPartition");
exports.lowMemoryDeviceExcludeGridNames = [FNameUtil_1.FNameUtil.GetDynamicFName("Grid_PVS"), FNameUtil_1.FNameUtil.GetDynamicFName("Grid_GPUNPC")];
exports.firstHLODGridNames = [FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_200m_300m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_300m_500m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_500m_1000m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD0_500m_1500m")];
exports.secondHLODGridNames = [FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_400m_800m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_600m_1200m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_800m_2500m"), FNameUtil_1.FNameUtil.GetDynamicFName("HLOD1_800m_4000m")];
exports.allBaseDataLayers = [FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25FC01"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25FC02"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25FD01"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25FD02"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25FD03"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25NYC01"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25NYC02"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25PYC01"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25PYC02"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25ZT03"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25ZT02"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_25ZT01"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_26SLZ01"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_26SLZ02"), FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_26CL04")];
exports.SpecificVolumeDatalayer1 = FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_26SLZ01");
exports.SpecificVolumeDatalayer2 = FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_DLTask_26SLZ02"); //# sourceMappingURL=WorldDefine.js.map