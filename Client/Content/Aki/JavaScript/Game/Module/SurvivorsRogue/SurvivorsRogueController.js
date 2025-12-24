"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const SplashScreenTask_1 = require("../SplashScreen/SplashScreenTask");
const SurvivorsActivityDefine_1 = require("./Activity/SurvivorsActivityDefine");
class SurvivorsRogueController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20216, this.Jwd);
    Net_1.Net.Register(21834, this.Zwd);
    Net_1.Net.Register(20573, this.eLd);
    Net_1.Net.Register(15893, this.tLd);
    Net_1.Net.Register(17462, this.iLd);
    Net_1.Net.Register(24751, this.vxd);
    Net_1.Net.Register(21964, this.tim);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20216);
    Net_1.Net.UnRegister(21834);
    Net_1.Net.UnRegister(20573);
    Net_1.Net.UnRegister(15893);
    Net_1.Net.UnRegister(17462);
    Net_1.Net.UnRegister(24751);
    Net_1.Net.UnRegister(21964);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("SurvivorsTabMainView", SurvivorsRogueController.Auf, "SurvivorsRogueController.CanOpenSurvivorsTabMainView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("SurvivorsTabMainView", SurvivorsRogueController.Auf);
  }
  static tHu() {
    var e = new SplashScreenTask_1.SplashScreenTask(0, 1, () => {
      UiManager_1.UiManager.OpenView("SurvivorsRogueMainView");
    });
    ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(e);
  }
  static RequestEnterStep(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 79, "RequestEnterStep", ["StepType", e]);
    }
    var r = new Protocol_1.Aki.Protocol.AAd();
    if (e === "Prepare") {
      r.xAd = new Protocol_1.Aki.Protocol.kAd();
    } else if (e === "End") {
      r.UAd = new Protocol_1.Aki.Protocol.BAd();
    }
    Net_1.Net.Call(21153, r, e => {
      if (e && e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 29599);
      }
    });
  }
  static RequestCommandOperation(e, r, o) {
    var t = new Protocol_1.Aki.Protocol.bTd();
    t.w5n = e;
    t.iZu = r;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "[SurvivorsRogue] RequestCommandOperation", ["CommandId", e], ["IncId", r]);
    }
    Net_1.Net.Call(27779, t, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 24222);
          o?.(false);
        } else {
          o?.(true);
        }
      } else {
        o?.(false);
      }
    });
  }
  static RequestDataLock(e, r, o, t) {
    var n = new Protocol_1.Aki.Protocol.wTd();
    n.w5n = e;
    n.Y5n = o;
    n.VB1 = r;
    Net_1.Net.Call(17967, n, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 28192);
          t?.(false);
        } else {
          t?.(true);
        }
      } else {
        t?.(false);
      }
    });
  }
  static RequestEnterInst(e, r, o, t, n) {
    var a;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e);
    if (i && (a = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(r))) {
      n = {
        NId: n,
        gG_: e,
        VId: t,
        zys: o,
        Q6n: r
      };
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.jId = n;
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(i.InstId, [a.TrialRoleId]);
    }
  }
  static RequestInstSettle(r) {
    var e = new Protocol_1.Aki.Protocol._bd();
    Net_1.Net.Call(23111, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 17805);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsInstSettle, false);
        } else {
          if (r && e.KTd) {
            UiManager_1.UiManager.OpenView("SurvivorsRogueSettleExternalView", e.KTd);
            ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo = undefined;
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsInstSettle, true);
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsInstSettle, false);
      }
    });
  }
  static async RequestWeaponInfoUpdate() {
    var e = new Protocol_1.Aki.Protocol.hDd();
    var r = await Net_1.Net.CallAsync(15968, e);
    if (r) {
      e = r.IDd;
      for (const n of Object.keys(e)) {
        var o = Number.parseInt(n);
        var t = r.IDd[n];
        ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.WeaponGainMap.get(o)?.SetWeaponKillCount(t);
      }
    }
  }
  static async RequestLastFile() {
    var e = new SurvivorsActivityDefine_1.SurvivorsLevelInfo();
    var r = new Protocol_1.Aki.Protocol.QBd();
    var r = await Net_1.Net.CallAsync(24980, r);
    if (r &&= r.ekd) {
      e.LevelId = r.gG_;
      e.RoleId = r.Q6n;
      e.IsEndless = r.VId;
      e.IsSaveFile = r.gG_ !== 0;
      e.Batch = r.AEs;
      e.MaxBatch = r.QNd;
    }
    return e;
  }
  static RequestEnterInstByLevelInfo() {
    var e;
    var r = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    if (r && (e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(r.RoleId))) {
      this.RequestEnterInst(r.LevelId, r.RoleId, e.InitWeapon, r.IsEndless, r.IsSaveFile);
    }
  }
  static CheckInSurvivorsRogueInstance() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && e.InstSubType === 41;
  }
  static OpenLeaveInstanceView() {
    var e = {
      IsExternal: false,
      Batch: ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetBatch(),
      MaxBatch: ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetMaxBatch()
    };
    UiManager_1.UiManager.OpenView("SurvivorsRogueExitView", e);
  }
  static LeaveRogueInstance() {
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest().then(e => {
      if (e) {
        ModelManager_1.ModelManager.SurvivorsRogueModel.ClearGlobal();
      }
    });
  }
  static OpenRogueHelp() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig()?.HelpId;
    if (e !== undefined) {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    }
  }
  static OpenEnterInstConfirm() {
    var e;
    if (ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.NotTipsEnterInst) {
      this.RequestEnterInstByLevelInfo();
    } else {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(378)).FunctionMap.set(1, () => {});
      e.FunctionMap.set(2, () => {
        this.RequestEnterInstByLevelInfo();
      });
      e.HasToggle = true;
      e.ToggleTextKey = "SurvivorsRoleConfirmationDialog_PrompText";
      e.SetToggleFunction(e => {
        ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.NotTipsEnterInst = e;
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
  }
  static async TryOpenWeaponUnlockView() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    return !!e && !((e = e.GetAllNeedPopupWeaponId()).length <= 0) && !(await UiManager_1.UiManager.OpenViewAsync("SurvivorsWeaponUnlockView", e), 0);
  }
}
exports.SurvivorsRogueController = SurvivorsRogueController;
(_a = SurvivorsRogueController).Auf = (e, r) => {
  var o = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.KscPlayerEntity;
  return !!o && !!o.GetSkillComp()?.AttrSet_?.Attrs_;
};
SurvivorsRogueController.Jwd = e => {
  ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId = e.gG_;
  ModelManager_1.ModelManager.SurvivorsRogueModel.InitComboEnhanceCfg(e.Ktm);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SurvivorsRogue", 79, "OnSurvivorsInstGlobalDataNotify", ["CurLevelId", ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId], ["CurWaveNum", ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum]);
  }
  ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.InitGain(e.YTd, e.yDd, e.EDd);
  ModelManager_1.ModelManager.SurvivorsRogueModel.InitCommandQueue();
  var r = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue;
  r.SetForegroundIncId(e.JTd);
  r.InitCommands(e.ZTd);
};
SurvivorsRogueController.vxd = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SurvivorsRogue", 79, "OnSurvivorsVarRecordNotify", ["CurLevelId", ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId], ["CurWaveNum", ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum]);
  }
  ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.SetBehaviorTreeVar(e.i9u);
};
SurvivorsRogueController.Zwd = e => {
  var r = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData;
  for (const o of e.gIc) {
    r.AddGain(o);
  }
  for (const t of e.CIc) {
    r.UpdateGain(t);
  }
  for (const n of e.pIc) {
    r.RemoveGain(n);
  }
};
SurvivorsRogueController.eLd = e => {
  var r = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue;
  if (r) {
    r.SetForegroundIncId(e.JTd);
    for (const o of e.gIc) {
      r.AddCommand(o);
    }
    for (const t of e.CIc) {
      r.UpdateCommand(t);
    }
    for (const n of e.pIc) {
      r.RemoveCommand(n);
    }
    r.StartForegroundCommand();
  }
};
SurvivorsRogueController.tLd = e => {
  var r = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue;
  if (r) {
    r.SetForegroundIncId(e.JTd);
    r.StartForegroundCommand();
  }
};
SurvivorsRogueController.iLd = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SurvivorsRogue", 79, "OnSurvivorsStepUpdateNotify", ["kAd", e.xAd], ["_wd", e._wd], ["sJu", e.sJu], ["CurWaveNum", ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum]);
  }
  if (e.xAd) {
    ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState = 1;
  } else if (e._wd) {
    ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState = 2;
  } else if (e.UAd) {
    ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState = 3;
  }
};
SurvivorsRogueController.tim = e => {
  ModelManager_1.ModelManager.SurvivorsRogueModel.InitComboEnhanceCfg(e.Ktm);
};
SurvivorsRogueController.nye = () => {
  var e;
  if (ModelManager_1.ModelManager.SurvivorsRogueModel.NeedOpenActivityMainView) {
    _a.tHu();
  }
  if (_a.CheckInSurvivorsRogueInstance() && (e = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue)) {
    e.StartForegroundCommand();
  }
};
SurvivorsRogueController.jUc = (e, r) => {
  r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r);
  if (r && r.InstSubType === 41) {
    ControllerHolder_1.ControllerHolder.SkillButtonUiController.AddEventInterface(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData);
  } else {
    ControllerHolder_1.ControllerHolder.SkillButtonUiController.RemoveEventInterface(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData);
  }
}; //# sourceMappingURL=SurvivorsRogueController.js.map