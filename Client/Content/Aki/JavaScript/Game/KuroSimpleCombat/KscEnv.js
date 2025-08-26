"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscEnv = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
class KscEnv {
  static get KscWorld() {
    return this.ldd;
  }
  static get KscWorldHandle() {
    return this.Pfd;
  }
  static get KscSubsystem() {
    var s = UE.KuroSimpleCombatSubsystem.StaticClass();
    return UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(GlobalData_1.GlobalData.GameInstance, s);
  }
  static Start() {
    if (!this.Started) {
      this.Started = true;
      KscLog_1.KscLog.Info("Common", 84, this.KscWorld, "KscEnv启动");
      if (!KscEnv.KscSubsystem?.GetKSCWorld()) {
        KscEnv.KscSubsystem?.CreateWorld();
        KscUtil_1.KscUtil.SetKscWorldHandle(++this.Pfd);
      }
      this.ldd = KscEnv.KscSubsystem?.GetKSCWorld();
      this.Mve();
      if (this.h_d) {
        this.KscWorld?.SetWorldAttr(1, this.h_d);
        this.h_d = undefined;
      }
      if (this.mgd) {
        this.KscWorld?.SetObstacleSegments(this.mgd);
        this.mgd = undefined;
      }
    }
  }
  static Mve() {
    this.KscWorld?.AssignBatchRemoveDelegate((0, puerts_1.toManualReleaseDelegate)(KscEnv.BatchRemove));
    this.KscWorld?.AssignLandFireSpawnDelegate((0, puerts_1.toManualReleaseDelegate)(KscEnv.LandFireSpawn));
  }
  static Stop() {
    if (this.Started) {
      this.Started = false;
      KscLog_1.KscLog.Info("Common", 84, this.KscWorld, "KscEnv停止");
      KscEnv.mYi();
      KscEnv.KscSubsystem?.DestroyWorld();
      KscUtil_1.KscUtil.SetKscWorldHandle(++this.Pfd);
      this.ldd = undefined;
    }
  }
  static mYi() {
    (0, puerts_1.releaseManualReleaseDelegate)(KscEnv.BatchRemove);
    (0, puerts_1.releaseManualReleaseDelegate)(KscEnv.LandFireSpawn);
  }
  static CacheWorldKillZ(s) {
    KscEnv.h_d = s;
  }
  static CacheObstacleSegments(s) {
    KscEnv.mgd = s;
  }
}
(exports.KscEnv = KscEnv).Started = false;
KscEnv.h_d = undefined;
KscEnv.mgd = undefined;
KscEnv.ldd = undefined;
KscEnv.Pfd = 0;
KscEnv.BatchRemove = s => {
  ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.BatchRemove(s);
};
KscEnv.LandFireSpawn = s => {
  ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.LandFireSpawn(s);
}; //# sourceMappingURL=KscEnv.js.map