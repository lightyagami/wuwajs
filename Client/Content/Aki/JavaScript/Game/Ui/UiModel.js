"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModel = undefined;
const Stack_1 = require("../../Core/Container/Stack");
const UiLayerType_1 = require("./Define/UiLayerType");
class UiModel {
  static GetTopView(e) {
    switch (e) {
      case UiLayerType_1.ELayerType.Normal:
        return UiModel.NormalStack.Peek();
      case UiLayerType_1.ELayerType.Pop:
        if (UiModel.PopList.length > 0) {
          return UiModel.PopList[UiModel.PopList.length - 1];
        } else {
          return undefined;
        }
      case UiLayerType_1.ELayerType.HUD:
        return Array.from(UiModel.HudMap.values())[UiModel.HudMap.size - 1];
      case UiLayerType_1.ELayerType.Plot:
        return UiModel.PlotNormalStack.Peek();
      case UiLayerType_1.ELayerType.NetWork:
        if (UiModel.NetWorkList.length > 0) {
          return UiModel.NetWorkList[UiModel.NetWorkList.length - 1];
        } else {
          return undefined;
        }
      case UiLayerType_1.ELayerType.Loading:
        if (UiModel.LoadingMap.size > 0) {
          return Array.from(UiModel.LoadingMap.values())[UiModel.LoadingMap.size - 1];
        } else {
          return undefined;
        }
      case UiLayerType_1.ELayerType.Guide:
        if (UiModel.GuideList.length > 0) {
          return UiModel.GuideList[UiModel.GuideList.length - 1];
        } else {
          return undefined;
        }
      default:
        return;
    }
  }
  static AddNpcIconViewUnit(e) {
    if (!this.tgr.has(e)) {
      this.tgr.add(e);
    }
  }
  static RemoveNpcIconViewUnit(e) {
    if (this.tgr.has(e)) {
      this.tgr.delete(e);
    }
  }
  static SetNpcIconViewListShowState(i) {
    this.tgr.forEach(e => {
      e.GetRootItem().SetUIActive(i);
    });
  }
}
(exports.UiModel = UiModel).HudMap = new Map();
UiModel.NormalStack = new Stack_1.Stack();
UiModel.PlotNormalStack = new Stack_1.Stack();
UiModel.PopList = [];
UiModel.FloatQueueMap = new Map();
UiModel.ShowViewMap = new Map();
UiModel.HideViewMap = new Map();
UiModel.GuideList = [];
UiModel.LoadingMap = new Map();
UiModel.DebugMap = new Map();
UiModel.NetWorkList = [];
UiModel.tgr = new Set();
UiModel.ResetToViewWhiteSet = new Set(["ReviveView"]);
UiModel.IsInMainView = false;
UiModel.InNormalQueue = false;
UiModel.SeamlessStackWhileList = new Set(["BattleView"]);
UiModel.MainViewName = "BattleView";
UiModel.CanShowPlotViewWhiteList = new Set(["BattleView", "CommonGameMainView", "DangoAbyssWorldView", "PhantomArenaBattleDetailsView", "HonamiStoryTechnologyView"]); //# sourceMappingURL=UiModel.js.map