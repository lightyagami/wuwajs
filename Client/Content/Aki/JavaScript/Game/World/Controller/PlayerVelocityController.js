"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerVelocityController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlayerVelocityFilter_1 = require("../../Utils/Filter/EntityToLoad/PlayerVelocityFilter");
const WaitEntityToLoadTask_1 = require("../Define/WaitEntityToLoadTask");
const MAX_DELTA_TIME = 5;
const HIGH_SPEED_SQUARED = 640000;
const IMPOSTER_UPDATE_BATCH = "r.imp.UpdateBatch";
class PlayerVelocityController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.InitTickOptimize(5, 10);
    this.DEa();
    this.sCe();
    WaitEntityToLoadTask_1.WaitEntityToLoadTask.GetPlayerVelocityOverride = this.GetAvgVelocity.bind(this);
    return super.OnInit();
  }
  static DEa() {
    this.REa = UE.KismetSystemLibrary.GetConsoleVariableIntValue(IMPOSTER_UPDATE_BATCH);
  }
  static OnClear() {
    this.aCe();
    WaitEntityToLoadTask_1.WaitEntityToLoadTask.GetPlayerVelocityOverride = undefined;
    this.xOc.Cleanup();
    return super.OnClear();
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.AEa);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.AEa);
  }
  static il() {
    this.ResumeTick();
    this.av();
  }
  static nl() {
    this.PauseTick();
  }
  static av() {
    this.BKs.DeepCopy(this.xEa());
    this.PEa();
  }
  static PEa() {
    this.wEa.Set(0, 0, 0);
  }
  static OnTick(t) {
    this.BEa(t * MathUtils_1.MathUtils.MillisecondToSecond);
  }
  static xEa() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3);
    if (t) {
      return t.ActorLocationProxy;
    } else {
      return this.BKs;
    }
  }
  static BEa(t) {
    var e;
    this.bEa.Start();
    if (t <= 0) {
      if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 60, "计算玩家移动速度时检测到间隔时间异常", ["delta", t]);
      }
      this.PEa();
    } else if (t > MAX_DELTA_TIME) {
      if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 60, "计算玩家移动速度时检测到间隔时间过长", ["delta", t]);
      }
      this.av();
    } else {
      (e = this.xEa()).Subtraction(this.BKs, this.qEa);
      this.qEa.DivisionEqual(t);
      this.BKs.DeepCopy(e);
      e = MathCommon_1.MathCommon.Clamp(t * 6, 0, 1);
      this.wEa.MultiplyEqual(1 - e);
      this.qEa.MultiplyEqual(e);
      this.wEa.AdditionEqual(this.qEa);
    }
    this.GEa();
    this.bEa.Stop();
  }
  static GEa() {
    var t = this.wEa.SizeSquared();
    var e = t > HIGH_SPEED_SQUARED;
    if (e !== this.tWo) {
      this.tWo = e;
      if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 60, "高速模式切换", ["IsHighSpeed", this.tWo], ["AvgVelocity", t]);
      }
      this.OEa();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHighSpeedModeChanged, this.tWo);
    }
  }
  static OEa() {
    if (this.tWo) {
      this.kEa(Math.floor(this.REa / 2));
    } else {
      this.kEa(this.REa);
    }
  }
  static kEa(t) {
    this.NEa[0] = IMPOSTER_UPDATE_BATCH;
    this.NEa[1] = t;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, this.NEa.join(" "));
  }
  static GetAvgVelocity() {
    return this.wEa;
  }
  static IsHighSpeedMode() {
    return this.tWo;
  }
}
exports.PlayerVelocityController = PlayerVelocityController;
(_a = PlayerVelocityController).BKs = Vector_1.Vector.Create(0, 0, 0);
PlayerVelocityController.qEa = Vector_1.Vector.Create(0, 0, 0);
PlayerVelocityController.wEa = Vector_1.Vector.Create(0, 0, 0);
PlayerVelocityController.tWo = false;
PlayerVelocityController.REa = 128;
PlayerVelocityController.NEa = ["", 0];
PlayerVelocityController.bEa = Stats_1.Stat.Create("PlayerVelocityController.CalculateVelocity");
PlayerVelocityController.xOc = PlayerVelocityFilter_1.PlayerVelocityFilter.Create();
PlayerVelocityController.nye = () => {
  _a.il();
};
PlayerVelocityController.SYi = () => {
  _a.nl();
};
PlayerVelocityController.bpr = () => {
  _a.nl();
};
PlayerVelocityController.AEa = () => {
  _a.il();
}; //# sourceMappingURL=PlayerVelocityController.js.map