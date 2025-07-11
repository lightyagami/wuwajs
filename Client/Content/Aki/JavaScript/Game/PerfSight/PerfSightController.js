"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerfSightController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const PerfSight_1 = require("../../Core/PerfSight/PerfSight");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const BOSS_TYPE = 2;
class PerfSightController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (PerfSight_1.PerfSight.IsEnable) {
      var e = UE.KuroLauncherLibrary.GetAppVersion();
      var e = e + "_" + LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion, e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 54, "当前母包_热更版本号", ["version", e]);
      }
      if (Info_1.Info.IsPcOrGamepadPlatform()) {
        PerfSight_1.PerfSight.SetPcAppVersion(e);
      } else {
        if (!Info_1.Info.IsMobilePlatform()) {
          return true;
        }
        PerfSight_1.PerfSight.SetVersionIden(e);
      }
      cpp_1.FKuroPerfSightHelper.EnableTimedReport();
      PerfSight_1.PerfSight.MarkLevelLoad("BeforeLogin");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 54, "MarkLevelLoad BeforeLogin");
      }
      PerfSightController.sCe();
    }
    return true;
  }
  static OnClear() {
    if (PerfSight_1.PerfSight.IsEnable) {
      PerfSight_1.PerfSight.MarkLevelFin();
      PerfSightController.aCe();
      PerfSightController.tca();
      PerfSightController.Swa();
    }
    return super.OnClear();
  }
  static Swa() {
    if (this.oWe.size > 0) {
      for (const e of this.oWe) {
        this.Ewa(e, false);
      }
      this.oWe.clear();
    }
  }
  static ica() {
    PerfSightController.tca();
    if (PerfSightController.rca) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Performance", 54, "PerfSightController.PositionTimer,请检查");
      }
    } else {
      PerfSightController.rca = TimerSystem_1.RealTimeTimerSystem.Forever(PerfSightController.oca, CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  static tca() {
    if (PerfSightController.rca) {
      TimerSystem_1.RealTimeTimerSystem.Remove(PerfSightController.rca);
      PerfSightController.rca = undefined;
    }
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, PerfSightController.Wvi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, PerfSightController.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAggroAdd, this.lWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAggroRemoved, this.cWe);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, PerfSightController.Wvi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, PerfSightController.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAggroAdd, this.lWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAggroRemoved, this.cWe);
  }
  static StartPersistentOrDungeon() {
    var e;
    PerfSight_1.PerfSight.MarkLevelFin();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Performance", 54, "MarkLevelFin");
    }
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      e = "Dungeon_" + ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 54, "开始录制MarkLevelLoad", ["tagName", e]);
      }
      PerfSight_1.PerfSight.MarkLevelLoad(e);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 54, "开始录制MarkLevelLoad Persistent");
      }
      PerfSight_1.PerfSight.MarkLevelLoad("Persistent");
    }
  }
  static MarkLevelLoadCompleted() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Performance", 54, "MarkLevelLoadCompleted");
    }
    PerfSight_1.PerfSight.MarkLevelLoadCompleted();
  }
  static Ewa(e, r) {
    var t;
    var o = EntitySystem_1.EntitySystem.Get(e);
    if ((o &&= o.GetComponent(3)?.CreatureData) && (t = o.GetBaseInfo()) && t.Category.MonsterMatchType >= BOSS_TYPE) {
      if (r) {
        cpp_1.FKuroPerfSightHelper.BeginExtTag(`Battle_${o.GetModelConfig().描述}_${o.GetPbDataId()}`);
        this.oWe.add(e);
      } else {
        cpp_1.FKuroPerfSightHelper.EndExtTag(`Battle_${o.GetModelConfig().描述}_${o.GetPbDataId()}`);
        this.oWe.delete(e);
      }
    }
  }
  static OnTick(e) {
    if (PerfSight_1.PerfSight.IsEnable) {
      PerfSightController.MJ.Start();
      cpp_1.FKuroPerfSightHelper.PostFrame(e);
      PerfSightController.MJ.Stop();
    }
  }
}
exports.PerfSightController = PerfSightController;
(_a = PerfSightController).IsTickEvenPausedInternal = true;
PerfSightController.rca = undefined;
PerfSightController.IsEnable = true;
PerfSightController.oWe = new Set();
PerfSightController.MJ = Stats_1.Stat.Create("PerfSightController.PostFrame");
PerfSightController.oca = () => {
  var e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
  if (e) {
    cpp_1.FKuroPerfSightHelper.PostValueFloat3("PositionAnalysis", "position", e.X, e.Y, e.Z);
  }
};
PerfSightController.Wvi = () => {
  var e = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
  PerfSight_1.PerfSight.SetUserId(e);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Performance", 54, "SetUserId", ["playerId", e]);
  }
  PerfSightController.ica();
};
PerfSightController.Zpe = e => {
  if (e) {
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Battle");
  } else {
    cpp_1.FKuroPerfSightHelper.EndExtTag("Battle");
    _a.Swa();
  }
};
PerfSightController.lWe = e => {
  for (const r of e) {
    _a.Ewa(r, true);
  }
};
PerfSightController.cWe = e => {
  for (const r of e) {
    _a.Ewa(r, false);
  }
}; //# sourceMappingURL=PerfSightController.js.map