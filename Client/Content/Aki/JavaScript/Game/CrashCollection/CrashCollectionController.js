"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrashCollectionController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const FormationDataController_1 = require("../Module/Abilities/FormationDataController");
class CrashCollectionController extends ControllerBase_1.ControllerBase {
  static BPa() {
    if (Stats_1.Stat.Enable) {
      if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
        return this.bPa;
      } else {
        return this.qPa;
      }
    }
  }
  static GPa() {
    if (Stats_1.Stat.Enable) {
      if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsInFight) {
        return this.OPa;
      } else {
        return this.kPa;
      }
    }
  }
  static NPa() {
    if (Stats_1.Stat.Enable) {
      if (ModelManager_1.ModelManager.PlotModel?.IsInPlot) {
        return this.FPa;
      } else {
        return this.VPa;
      }
    }
  }
  static HPa() {
    if (Stats_1.Stat.Enable) {
      if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsInPlot) {
        return this.jPa;
      } else {
        return this.WPa;
      }
    }
  }
  static cDa(e) {
    if (Stats_1.Stat.Enable) {
      return Stats_1.Stat.CreateNoFlameGraph("Level: " + e);
    }
  }
  static ZFa() {
    if (Stats_1.Stat.Enable) {
      if (ResourceSystem_1.ResourceSystem.GetLoadMode() === 2) {
        return this.e3a;
      } else {
        return this.t3a;
      }
    }
  }
  static OnInit() {
    this.sCe();
    cpp_1.FKuroCrashCollectionController.Initialize(GlobalData_1.GlobalData.World, new UE.FName("ActorLocation"), new UE.FName("ActorRotation"), new UE.FName("CameraLocation"), new UE.FName("CameraRotation"), new UE.FName("World"));
    return super.OnInit();
  }
  static OnClear() {
    this.aCe();
    return super.OnClear();
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TodTimeChange, this.hCe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectSuccess, this.gSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddNewQuest, this.Xoo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetImageQualityWithValue, this.cCe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetRayTracingWithValue, this.q01);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetDLSSFGWithValue, this.G01);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TodTimeChange, this.hCe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectSuccess, this.gSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddNewQuest, this.Xoo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetImageQualityWithValue, this.cCe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetRayTracingWithValue, this.q01);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetDLSSFGWithValue, this.G01);
  }
  static OnTick(e) {
    this.lCe();
  }
  static lCe() {
    this.MJ.Start();
    var e = this.BPa();
    var t = this.GPa();
    var r = this.NPa();
    var o = this.HPa();
    var a = this.ZFa();
    e?.Start();
    t?.Start();
    r?.Start();
    o?.Start();
    a?.Start();
    a?.Stop();
    o?.Stop();
    r?.Stop();
    t?.Stop();
    e?.Stop();
    this.MJ.Stop();
  }
  static SCe() {
    this.yCe.Start();
    var e = ModelManager_1.ModelManager.TimeOfDayModel;
    if (e) {
      e = e.GameTime.HourMinuteString;
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.ICe, e);
    }
    this.yCe.Stop();
  }
  static eEl() {
    this.DCe.Start();
    cpp_1.FCrashSightProxy.SetCustomDataByFName(this.RCe, this.tEl.join(", "));
    this.DCe.Stop();
  }
  static xGn() {
    this.PGn.Start();
    var e = ModelManager_1.ModelManager.LoginModel.GetReconnectHost();
    var t = ModelManager_1.ModelManager.LoginModel.GetReconnectPort();
    cpp_1.FCrashSightProxy.SetCustomDataByFName(this.BGn, e + ":" + t);
    this.PGn.Stop();
  }
  static RecordHttpInfo(e) {
    this.wGn.Start();
    cpp_1.FCrashSightProxy.SetCustomDataByFName(this.bGn, e);
    this.wGn.Stop();
  }
}
exports.CrashCollectionController = CrashCollectionController;
(_a = CrashCollectionController).MJ = Stats_1.Stat.Create("CrashCollectionController.GatherCrashInfo");
CrashCollectionController.TCe = Stats_1.Stat.Create("CrashCollectionController.GatherQualityLevel");
CrashCollectionController.DCe = Stats_1.Stat.Create("CrashCollectionController.GatherQuestInfo");
CrashCollectionController.yCe = Stats_1.Stat.Create("CrashCollectionController.GatherTODInfo");
CrashCollectionController.PGn = Stats_1.Stat.Create("CrashCollectionController.GatherGateWayInfo");
CrashCollectionController.wGn = Stats_1.Stat.Create("CrashCollectionController.RecordHttpInfo");
CrashCollectionController.ICe = FNameUtil_1.FNameUtil.GetDynamicFName("TODTime");
CrashCollectionController.LCe = FNameUtil_1.FNameUtil.GetDynamicFName("QualityLevel");
CrashCollectionController.F01 = "RayTracing";
CrashCollectionController.N01 = "DlssFG";
CrashCollectionController.RCe = FNameUtil_1.FNameUtil.GetDynamicFName("QuestIds");
CrashCollectionController.BGn = FNameUtil_1.FNameUtil.GetDynamicFName("GateWay");
CrashCollectionController.bGn = FNameUtil_1.FNameUtil.GetDynamicFName("HttpInfo");
CrashCollectionController.bPa = Stats_1.Stat.Create("Origin IsFight: True");
CrashCollectionController.qPa = Stats_1.Stat.Create("Origin IsFight: False");
CrashCollectionController.FPa = Stats_1.Stat.Create("Origin IsCutscene: True");
CrashCollectionController.VPa = Stats_1.Stat.Create("Origin IsCutscene: False");
CrashCollectionController.OPa = Stats_1.Stat.Create("GameBudget IsFight: True");
CrashCollectionController.kPa = Stats_1.Stat.Create("GameBudget IsFight: False");
CrashCollectionController.jPa = Stats_1.Stat.Create("GameBudget IsCutscene: True");
CrashCollectionController.WPa = Stats_1.Stat.Create("GameBudget IsCutscene: False");
CrashCollectionController.e3a = Stats_1.Stat.Create("LoadModel: InGame");
CrashCollectionController.t3a = Stats_1.Stat.Create("LoadModel: InLoading");
CrashCollectionController.hCe = () => {
  _a.SCe();
};
CrashCollectionController.cCe = e => {
  _a.TCe.Start();
  var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel;
  if (e !== t && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 36, "CrashSight GatherQualityLevel");
  }
  var t = _a.cDa(t);
  t?.Start();
  cpp_1.FCrashSightProxy.SetCustomDataByFName(_a.LCe, e.toString());
  t?.Stop();
  _a.TCe.Stop();
};
CrashCollectionController.q01 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 36, "CrashSight GatherRayTracing");
  }
  cpp_1.FCrashSightProxy.SetCustomData(_a.F01, e.toString());
};
CrashCollectionController.G01 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 36, "CrashSight GatherDlssFg");
  }
  cpp_1.FCrashSightProxy.SetCustomData(_a.N01, e.toString());
};
CrashCollectionController.tEl = new Array();
CrashCollectionController.Xoo = e => {
  if (e.Type === 1 && e.IsProgressing && !_a.tEl.includes(e.Id)) {
    _a.tEl.push(e.Id);
    _a.eEl();
  }
};
CrashCollectionController.xie = (e, t) => {
  var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3);
  if (r) {
    cpp_1.FKuroCrashCollectionController.UpdateMainCharacter(r.Actor);
  } else {
    cpp_1.FKuroCrashCollectionController.UpdateMainCharacter(undefined);
  }
};
CrashCollectionController.DSe = (e, t) => {
  var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
  if (r && r.Type === 1) {
    if (t === Protocol_1.Aki.Protocol.hTs.nvs) {
      if (!_a.tEl.includes(e)) {
        _a.tEl.push(e);
        _a.eEl();
      }
    } else if ((r = _a.tEl.indexOf(e)) > -1) {
      _a.tEl.splice(r, 1);
      _a.eEl();
    }
  }
};
CrashCollectionController.gSe = () => {
  _a.xGn();
}; //# sourceMappingURL=CrashCollectionController.js.map