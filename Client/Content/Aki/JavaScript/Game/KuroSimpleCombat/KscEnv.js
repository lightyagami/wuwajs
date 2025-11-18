"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscEnv = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
class KscEnv {
  static get KscWorld() {
    return this.OAd;
  }
  static get KscWorldHandle() {
    return this.ljd;
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
        this.OAd = KscEnv.KscSubsystem?.GetKSCWorld();
      } else {
        KscEnv.KscSubsystem?.CreateWorld();
        KscUtil_1.KscUtil.SetKscWorldHandle(++this.ljd);
        this.OAd = KscEnv.KscSubsystem?.GetKSCWorld();
        KscEnv.R8d();
      }
      this.Mve();
      if (this.P0d) {
        this.KscWorld?.SetWorldAttr(1, this.P0d);
        this.P0d = undefined;
      }
      if (this.NXd) {
        this.KscWorld?.SetObstacleSegments(this.NXd);
        this.NXd = undefined;
      }
    }
  }
  static R8d() {
    var s;
    var e;
    var t;
    if (KscEnv.OAd) {
      if (s = ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId) {
        if (e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(s)) {
          if (e.BoundsPath) {
            if ((t = ResourceSystem_1.ResourceSystem.Load(e.BoundsPath, UE.KSC_DA_WorldBounds))?.IsValid) {
              KscEnv.OAd.SetWorldBounds(t);
            } else {
              KscLog_1.KscLog.Error("Load", 20, KscEnv.OAd, "加载不到对应的DA", ["Path", e.BoundsPath], ["LevelId", s]);
              KscEnv.OAd.SetWorldBounds(undefined);
            }
          } else {
            KscLog_1.KscLog.Info("Load", 20, KscEnv.OAd, "BoundsPath 为空", ["LevelId", s]);
            KscEnv.OAd.SetWorldBounds(undefined);
          }
        } else {
          KscLog_1.KscLog.Error("Load", 20, KscEnv.OAd, "找不到对应的关卡配置", ["LevelId", s]);
          KscEnv.OAd.SetWorldBounds(undefined);
        }
      } else {
        KscLog_1.KscLog.Info("Load", 20, KscEnv.OAd, "不在幸存者关卡内", ["LevelId", s]);
        KscEnv.OAd.SetWorldBounds(undefined);
      }
    } else {
      KscLog_1.KscLog.Info("Load", 20, KscEnv.OAd, "KscWorld 为空");
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
      KscUtil_1.KscUtil.SetKscWorldHandle(++this.ljd);
      this.OAd = undefined;
    }
  }
  static mYi() {
    (0, puerts_1.releaseManualReleaseDelegate)(KscEnv.BatchRemove);
    (0, puerts_1.releaseManualReleaseDelegate)(KscEnv.LandFireSpawn);
  }
  static CacheWorldKillZ(s) {
    KscEnv.P0d = s;
  }
  static CacheObstacleSegments(s) {
    KscEnv.NXd = s;
  }
}
(exports.KscEnv = KscEnv).Started = false;
KscEnv.P0d = undefined;
KscEnv.NXd = undefined;
KscEnv.OAd = undefined;
KscEnv.ljd = 0;
KscEnv.BatchRemove = s => {
  ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.BatchRemove(s);
};
KscEnv.LandFireSpawn = s => {
  ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.LandFireSpawn(s);
}; //# sourceMappingURL=KscEnv.js.map