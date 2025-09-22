"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscEnv = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
class KscEnv {
  static get KscWorld() {
    return this.lLd;
  }
  static get KscWorldHandle() {
    return this.Z3d;
  }
  static get KscSubsystem() {
    var s = UE.KuroSimpleCombatSubsystem.StaticClass();
    return UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(GlobalData_1.GlobalData.GameInstance, s);
  }
  static Start() {
    if (!this.Started) {
      this.Started = true;
      KscLog_1.KscLog.Info("Common", 84, this.KscWorld, "KscEnv启动");
      if (KscEnv.KscSubsystem?.GetKSCWorld()) {
        this.lLd = KscEnv.KscSubsystem?.GetKSCWorld();
      } else {
        KscEnv.KscSubsystem?.CreateWorld();
        KscUtil_1.KscUtil.SetKscWorldHandle(++this.Z3d);
        this.lLd = KscEnv.KscSubsystem?.GetKSCWorld();
        KscEnv.CNd();
      }
      this.Mve();
      if (this.bfd) {
        this.KscWorld?.SetWorldAttr(1, this.bfd);
        this.bfd = undefined;
      }
      if (this.E8d) {
        this.KscWorld?.SetObstacleSegments(this.E8d);
        this.E8d = undefined;
      }
    }
  }
  static CNd() {
    var s;
    var t;
    var e;
    if (KscEnv.lLd) {
      if (s = ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId) {
        if (t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(s)) {
          if (t.BoundsPath) {
            if ((e = ResourceSystem_1.ResourceSystem.Load(t.BoundsPath, UE.KSC_DA_WorldBounds))?.IsValid) {
              KscEnv.lLd.SetWorldBounds(e);
            } else {
              KscLog_1.KscLog.Error("Load", 20, KscEnv.lLd, "加载不到对应的DA", ["Path", t.BoundsPath], ["LevelId", s]);
              KscEnv.lLd.SetWorldBounds(undefined);
            }
          } else {
            KscLog_1.KscLog.Info("Load", 20, KscEnv.lLd, "BoundsPath 为空", ["LevelId", s]);
            KscEnv.lLd.SetWorldBounds(undefined);
          }
        } else {
          KscLog_1.KscLog.Error("Load", 20, KscEnv.lLd, "找不到对应的关卡配置", ["LevelId", s]);
          KscEnv.lLd.SetWorldBounds(undefined);
        }
      } else {
        KscLog_1.KscLog.Info("Load", 20, KscEnv.lLd, "不在幸存者关卡内", ["LevelId", s]);
        KscEnv.lLd.SetWorldBounds(undefined);
      }
    } else {
      KscLog_1.KscLog.Info("Load", 20, KscEnv.lLd, "KscWorld 为空");
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
      KscUtil_1.KscUtil.SetKscWorldHandle(++this.Z3d);
      this.lLd = undefined;
    }
  }
  static mYi() {
    (0, puerts_1.releaseManualReleaseDelegate)(KscEnv.BatchRemove);
    (0, puerts_1.releaseManualReleaseDelegate)(KscEnv.LandFireSpawn);
  }
  static CacheWorldKillZ(s) {
    KscEnv.bfd = s;
  }
  static CacheObstacleSegments(s) {
    KscEnv.E8d = s;
  }
}
(exports.KscEnv = KscEnv).Started = false;
KscEnv.bfd = undefined;
KscEnv.E8d = undefined;
KscEnv.lLd = undefined;
KscEnv.Z3d = 0;
KscEnv.BatchRemove = s => {
  ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.BatchRemove(s);
};
KscEnv.LandFireSpawn = s => {
  ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.LandFireSpawn(s);
}; //# sourceMappingURL=KscEnv.js.map