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
    Net_1.Net.Register(25375, this.bbd);
    Net_1.Net.Register(26690, this.Rbd);
    Net_1.Net.Register(17023, this.wbd);
    Net_1.Net.Register(22312, this.Lbd);
    Net_1.Net.Register(29076, this.Pbd);
    Net_1.Net.Register(29883, this.bAd);
    Net_1.Net.Register(28629, this.x9d);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25375);
    Net_1.Net.UnRegister(26690);
    Net_1.Net.UnRegister(17023);
    Net_1.Net.UnRegister(22312);
    Net_1.Net.UnRegister(29076);
    Net_1.Net.UnRegister(29883);
    Net_1.Net.UnRegister(28629);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
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
    var o = new Protocol_1.Aki.Protocol.rLd();
    if (e === "Prepare") {
      o.nLd = new Protocol_1.Aki.Protocol.aLd();
    } else if (e === "End") {
      o.sLd = new Protocol_1.Aki.Protocol.hLd();
    }
    Net_1.Net.Call(24938, o, e => {
      if (e && e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 21584);
      }
    });
  }
  static RequestCommandOperation(e, o, r) {
    var t = new Protocol_1.Aki.Protocol.ZMd();
    t.w5n = e;
    t.iZu = o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "[SurvivorsRogue] RequestCommandOperation", ["CommandId", e], ["IncId", o]);
    }
    Net_1.Net.Call(20681, t, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 21645);
          r?.(false);
        } else {
          r?.(true);
        }
      } else {
        r?.(false);
      }
    });
  }
  static RequestDataLock(e, o, r, t) {
    var n = new Protocol_1.Aki.Protocol.tEd();
    n.w5n = e;
    n.Y5n = r;
    n.VB1 = o;
    Net_1.Net.Call(19532, n, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 21533);
          t?.(false);
        } else {
          t?.(true);
        }
      } else {
        t?.(false);
      }
    });
  }
  static RequestEnterInst(e, o, r, t, n) {
    var a;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e);
    if (i && (a = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(o))) {
      n = {
        fMd: n,
        gG_: e,
        gMd: t,
        zys: r,
        Q6n: o
      };
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.CMd = n;
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(i.InstId, [a.TrialRoleId]);
    }
  }
  static RequestInstSettle(o) {
    var e = new Protocol_1.Aki.Protocol.OEd();
    Net_1.Net.Call(22097, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 24299);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsInstSettle, false);
        } else {
          if (o && e.SEd) {
            UiManager_1.UiManager.OpenView("SurvivorsRogueSettleExternalView", e.SEd);
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
    var e = new Protocol_1.Aki.Protocol.MLd();
    var o = await Net_1.Net.CallAsync(22578, e);
    if (o) {
      e = o.jLd;
      for (const n of Object.keys(e)) {
        var r = Number.parseInt(n);
        var t = o.jLd[n];
        ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.WeaponGainMap.get(r)?.SetWeaponKillCount(t);
      }
    }
  }
  static async RequestLastFile() {
    var e = new SurvivorsActivityDefine_1.SurvivorsLevelInfo();
    var o = new Protocol_1.Aki.Protocol.ZDd();
    var o = await Net_1.Net.CallAsync(29015, o);
    if (o &&= o.sUd) {
      e.LevelId = o.gG_;
      e.RoleId = o.Q6n;
      e.IsEndless = o.gMd;
      e.IsSaveFile = o.gG_ !== 0;
      e.Batch = o.AEs;
      e.MaxBatch = o.yqd;
    }
    return e;
  }
  static RequestEnterInstByLevelInfo() {
    var e;
    var o = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    if (o && (e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(o.RoleId))) {
      this.RequestEnterInst(o.LevelId, o.RoleId, e.InitWeapon, o.IsEndless, o.IsSaveFile);
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
(_a = SurvivorsRogueController).bbd = e => {
  ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId = e.gG_;
  ModelManager_1.ModelManager.SurvivorsRogueModel.InitComboEnhanceCfg(e.R9d);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SurvivorsRogue", 79, "OnSurvivorsInstGlobalDataNotify", ["CurLevelId", ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId], ["CurWaveNum", ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum]);
  }
  ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.InitGain(e.EEd, e.GLd, e.VLd);
  ModelManager_1.ModelManager.SurvivorsRogueModel.InitCommandQueue();
  var o = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue;
  o.SetForegroundIncId(e.TEd);
  o.InitCommands(e.bEd);
};
SurvivorsRogueController.bAd = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SurvivorsRogue", 79, "OnSurvivorsVarRecordNotify", ["CurLevelId", ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId], ["CurWaveNum", ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum]);
  }
  ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.SetBehaviorTreeVar(e.i9u);
};
SurvivorsRogueController.Rbd = e => {
  var o = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData;
  for (const r of e.gIc) {
    o.AddGain(r);
  }
  for (const t of e.CIc) {
    o.UpdateGain(t);
  }
  for (const n of e.pIc) {
    o.RemoveGain(n);
  }
};
SurvivorsRogueController.wbd = e => {
  var o = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue;
  if (o) {
    o.SetForegroundIncId(e.TEd);
    for (const r of e.gIc) {
      o.AddCommand(r);
    }
    for (const t of e.CIc) {
      o.UpdateCommand(t);
    }
    for (const n of e.pIc) {
      o.RemoveCommand(n);
    }
    o.StartForegroundCommand();
  }
};
SurvivorsRogueController.Lbd = e => {
  var o = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue;
  if (o) {
    o.SetForegroundIncId(e.TEd);
    o.StartForegroundCommand();
  }
};
SurvivorsRogueController.Pbd = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("SurvivorsRogue", 79, "OnSurvivorsStepUpdateNotify", ["aLd", e.nLd], ["GTd", e.GTd], ["sJu", e.sJu], ["CurWaveNum", ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum]);
  }
  if (e.nLd) {
    ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState = 1;
  } else if (e.GTd) {
    ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState = 2;
  } else if (e.sLd) {
    ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState = 3;
  }
};
SurvivorsRogueController.x9d = e => {
  ModelManager_1.ModelManager.SurvivorsRogueModel.InitComboEnhanceCfg(e.R9d);
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
SurvivorsRogueController.jUc = (e, o) => {
  o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o);
  if (o && o.InstSubType === 41) {
    ControllerHolder_1.ControllerHolder.SkillButtonUiController.AddEventInterface(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData);
  } else {
    ControllerHolder_1.ControllerHolder.SkillButtonUiController.RemoveEventInterface(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData);
  }
}; //# sourceMappingURL=SurvivorsRogueController.js.map