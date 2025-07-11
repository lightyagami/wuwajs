"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudUnitHandleManager = undefined;
const AimHandle_1 = require("./HudUnitHandle/AimHandle");
const CameraAimHandle_1 = require("./HudUnitHandle/CameraAimHandle");
const FlyRaceStrengthHandle_1 = require("./HudUnitHandle/FlyRaceStrengthHandle");
const FollowShootAimHandle_1 = require("./HudUnitHandle/FollowShootAimHandle");
const FollowShootAutoAimHandle_1 = require("./HudUnitHandle/FollowShootAutoAimHandle");
const LockCursorHandle_1 = require("./HudUnitHandle/LockCursorHandle");
const LockExecutionHandle_1 = require("./HudUnitHandle/LockExecutionHandle");
const LockPredictedHandle_1 = require("./HudUnitHandle/LockPredictedHandle");
const LuPaAimHandle_1 = require("./HudUnitHandle/LuPaAimHandle");
const ManipulateAimHandle_1 = require("./HudUnitHandle/ManipulateAimHandle");
const ManipulateCursorHandle_1 = require("./HudUnitHandle/ManipulateCursorHandle");
const MigrationStrengthHandle_1 = require("./HudUnitHandle/MigrationStrengthHandle");
const MonsterCursorHandle_1 = require("./HudUnitHandle/MonsterCursorHandle");
const RoleSideEnergyHandle_1 = require("./HudUnitHandle/RoleSideEnergyHandle");
const SlowTimeHandle_1 = require("./HudUnitHandle/SlowTimeHandle");
const StrengthHandle_1 = require("./HudUnitHandle/StrengthHandle");
const TreasureCompassHandle_1 = require("./HudUnitHandle/TreasureCompassHandle");
const HudUnitManager_1 = require("./HudUnitManager");
class HudUnitHandleManager {
  static Init() {
    HudUnitManager_1.HudUnitManager.HudUnitHandleClassArray = [LockCursorHandle_1.LockCursorHandle, StrengthHandle_1.StrengthHandle, AimHandle_1.AimHandle, MonsterCursorHandle_1.MonsterCursorHandle, ManipulateCursorHandle_1.ManipulateCursorHandle, ManipulateAimHandle_1.ManipulateAimHandle, LockExecutionHandle_1.LockExecutionHandle, CameraAimHandle_1.CameraAimHandle, LockPredictedHandle_1.LockPredictedHandle, RoleSideEnergyHandle_1.RoleSideEnergyHandle, SlowTimeHandle_1.SlowTimeHandle];
    HudUnitManager_1.HudUnitManager.HudUnitHandleClassMap = new Map([[0, MigrationStrengthHandle_1.MigrationStrengthHandle], [1, FollowShootAimHandle_1.FollowShootAimHandle], [2, FollowShootAutoAimHandle_1.FollowShootAutoAimHandle], [3, FollowShootAutoAimHandle_1.FollowShootAutoAimHandle], [4, TreasureCompassHandle_1.TreasureCompassHandle], [5, FlyRaceStrengthHandle_1.FlyRaceStrengthHandle], [6, LuPaAimHandle_1.LuPaAimHandle]]);
  }
}
exports.HudUnitHandleManager = HudUnitHandleManager;
//# sourceMappingURL=HudUnitHandleManager.js.map