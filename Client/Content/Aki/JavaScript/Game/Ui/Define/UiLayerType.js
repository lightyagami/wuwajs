"use strict";

var ELayerType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOBILE_SWITCH_ALLOW_VIEW_TYPE = exports.MULTIPLE_VIEW_TYPE = exports.BLOCKCLICK_TYPE = exports.UIBLUR_TYPE = exports.IGNORE_MASK_TYPE = exports.NORMAL_PLOT_CONTAINER_TYPE = exports.PLOT_CONTAINER_TYPE = exports.NORMAL_CONTAINER_TYPE = exports.BATTLE_VIEW_UNIT_COUNT = exports.TIP_LAYER_UNIT_COUNT = exports.LayerTypeEnumValues = exports.ELayerType = undefined;
(function (e) {
  e[e.HUD = 1] = "HUD";
  e[e.Normal = 2] = "Normal";
  e[e.Plot = 4] = "Plot";
  e[e.ScreenEffect = 8] = "ScreenEffect";
  e[e.NormalMask = 16] = "NormalMask";
  e[e.BattleFloat = 32] = "BattleFloat";
  e[e.Pop = 64] = "Pop";
  e[e.Float = 128] = "Float";
  e[e.Guide = 256] = "Guide";
  e[e.Loading = 512] = "Loading";
  e[e.NetWork = 1024] = "NetWork";
  e[e.CG = 2048] = "CG";
  e[e.Mask = 4096] = "Mask";
  e[e.WaterMask = 8192] = "WaterMask";
  e[e.Pool = 16384] = "Pool";
  e[e.Debug = 32768] = "Debug";
})(ELayerType = exports.ELayerType ||= {});
exports.LayerTypeEnumValues = Object.values(ELayerType).filter(e => typeof e == "number");
exports.TIP_LAYER_UNIT_COUNT = 3;
exports.BATTLE_VIEW_UNIT_COUNT = 3;
exports.NORMAL_CONTAINER_TYPE = ELayerType.Normal | ELayerType.CG;
exports.PLOT_CONTAINER_TYPE = ELayerType.Plot;
exports.NORMAL_PLOT_CONTAINER_TYPE = exports.NORMAL_CONTAINER_TYPE | exports.PLOT_CONTAINER_TYPE;
exports.IGNORE_MASK_TYPE = ELayerType.Float | ELayerType.Guide;
exports.UIBLUR_TYPE = ELayerType.Normal | ELayerType.Plot | ELayerType.Pop;
exports.BLOCKCLICK_TYPE = ELayerType.Normal | ELayerType.Plot | ELayerType.Pop;
exports.MULTIPLE_VIEW_TYPE = ELayerType.Float;
exports.MOBILE_SWITCH_ALLOW_VIEW_TYPE = ELayerType.NetWork | ELayerType.CG; //# sourceMappingURL=UiLayerType.js.map