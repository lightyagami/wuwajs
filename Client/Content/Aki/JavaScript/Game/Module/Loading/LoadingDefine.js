"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dungeonToLoadingViewMap = exports.loadingViewList = undefined;
exports.loadingViewList = ["LoadingView", "RacingBetsLoadingView", "DangoAbyssWorldLoadingView", "RoleLoadingView", "PhantomArenaCardBattleLoadingView", "Spring26LoadingView"];
exports.dungeonToLoadingViewMap = new Map([[31, {
  View: "RacingBetsLoadingView"
}], [35, {
  View: "RacingBetsLoadingView"
}], [32, {
  View: "DangoAbyssWorldLoadingView"
}], [12, {
  WorldSubType: 1,
  View: "DangoAbyssWorldLoadingView"
}], [36, {
  View: "PhantomArenaCardBattleLoadingView",
  IgnoreExitLoading: true
}], [48, {
  View: "LordGymLoadingView"
}], [12, {
  WorldSubType: 2,
  View: "Spring26LoadingView",
  IgnoreExitLoading: true
}]]); //# sourceMappingURL=LoadingDefine.js.map