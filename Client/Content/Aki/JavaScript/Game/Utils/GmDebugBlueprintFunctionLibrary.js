"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterDebugUtil_1 = require("../NewWorld/Character/CharacterDebugUtil");
class GmDebugBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static TsRunGm(e) {
    ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.RunGm(e);
  }
  static TsGetGmIsOpen() {
    return ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.GetGmIsOpen();
  }
  static TsGmGetEntityActorByChildActor(e) {
    return ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmGetEntityActorByChildActor(e);
  }
  static TsGmGetEntityPbDataIdByChildActor(e) {
    return ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmGetEntityPbDataIdByChildActor(e);
  }
  static TsGmShowEntityViewByPbDataId(e) {
    ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmShowEntityViewByPbDataId(e);
  }
  static TsGmGetIsGameCommandServiceRunning() {
    return ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmGetIsGameCommandServiceRunning();
  }
  static TsGmStartGameCommandService(e) {
    ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmStartGameCommandService(e);
  }
  static TsGmStopGameCommandService() {
    ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmStopGameCommandService();
  }
  static OpenWbpDebugWin() {
    var e = ResourceSystem_1.ResourceSystem.Load("/Game/NotInFinalPackage/DebugWin/WBP_DebugWin.WBP_DebugWin_C", UE.Class);
    UE.UMGManager.CreateWidget(GlobalData_1.GlobalData.World.GetWorld(), e).AddToViewport();
  }
  static TsCheatInputRequest(e) {
    ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.CheatInputRequest(e);
  }
  static TsGetAoeDestroyEnemyActivated() {
    return ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.GetAoeDestroyEnemyActivated();
  }
  static TsSetAoeDestroyEnemyActivated(e) {
    ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.SetAoeDestroyEnemyActivated(e);
  }
  static TsGetAoeDestroyEnemyRange() {
    return ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.GetAoeDestroyEnemyRange();
  }
  static TsSetAoeDestroyEnemyRange(e) {
    ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.SetAoeDestroyEnemyRange(e);
  }
  static TsGmLoadFightDt(e) {
    CharacterDebugUtil_1.CharacterDebugUtil.LoadFightDtDebug(e);
  }
  static TsTestLifePoint(e, t, a, r, n, o) {
    ModelManager_1.ModelManager.LifePointModel.AnimParam.MaxTime = e;
    ModelManager_1.ModelManager.LifePointModel.AnimParam.AccelerationRes = t;
    ModelManager_1.ModelManager.LifePointModel.AnimParam.MinInterval = a;
    ModelManager_1.ModelManager.LifePointModel.AnimParam.GridMinRate = r;
    ModelManager_1.ModelManager.LifePointModel.AnimParam.GridMaxRate = n;
    ModelManager_1.ModelManager.LifePointModel.AnimParam.GridAccelerationTime = o;
  }
  static InitLevelRangeDebugData() {
    ControllerHolder_1.ControllerHolder.LevelRangeDebugDrawController.InitData();
  }
  static GetLevelRangeDebugMode() {
    return ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawMode;
  }
  static GetLevelRangeDebugData(e, t, a, r, n) {
    e = ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawDataMap?.get(e);
    if (e && ((0, puerts_1.$set)(t, e.Enable), t = e.LinearColor)) {
      (0, puerts_1.$set)(a, t.R);
      (0, puerts_1.$set)(r, t.G);
      (0, puerts_1.$set)(n, t.B);
    }
  }
  static SetLevelRangeDebugMode(e) {
    ControllerHolder_1.ControllerHolder.LevelRangeDebugDrawController.SetDrawMode(e);
  }
  static SetLevelRangeDebugData(e, t, a, r, n) {
    ControllerHolder_1.ControllerHolder.LevelRangeDebugDrawController.SetDrawData(e, t, a, r, n);
  }
}
exports.default = GmDebugBlueprintFunctionLibrary;
//# sourceMappingURL=GmDebugBlueprintFunctionLibrary.js.map