"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventTeleportDungeon = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  SeamlessTravelDefine_1 = require("../../Module/SeamlessTravel/SeamlessTravelDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTeleportDungeon extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.EDe = () => {
      this.FinishExecute(!0)
    }
  }
  ExecuteInGm(e, r, o) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("InstanceDungeon", 36, "[LevelEventTeleportDungeon]ExecuteInGm"), this.FinishExecute(!0)
  }
  ExecuteNew(e, r) {
    if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()) ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText("TeleportDungeon被GM屏蔽，跳过执行"), this.FinishExecute(!0);
    else if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) this.FinishExecute(!1);
    else {
      const o = e;
      if (o) {
        e = o.DungeonId;
        if (e)
          if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(e)) ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip"), this.FinishExecute(!1);
          else if (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) this.FinishExecute(!0);
        else {
          var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
            e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
          if (e && e.InstType)
            if (o.IsNeedSecondaryConfirmation)(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(164)).FunctionMap.set(2, () => {
              var e = o.DungeonId;
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e
            }), e.FunctionMap.set(1, () => {
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(), this.EDe()
            }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
            else {
              if (o.TransitionOption?.Type === IAction_1.ETeleportTransitionType.Seamless && o.TransitionOption.KeepMovementStates?.includes("Kite")) {
                const r = new SeamlessTravelDefine_1.SeamlessTravelContext;
                r.ParseConfig(ControllerHolder_1.ControllerHolder.TeleportController.ParseTeleportTransitionOptionToPb(o.TransitionOption)), ControllerHolder_1.ControllerHolder.SeamlessTravelController.EnableSeamlessTravel(r, !0)
              }
              this.$Re(o)
            }
          else this.FinishExecute(!1)
        } else Log_1.Log.CheckError() && Log_1.Log.Error("InstanceDungeon", 5, "跳转副本行为错误，副本Id配置错误"), this.FinishExecute(!1)
      } else this.FinishExecute(!1)
    }
  }
  $Re(e) {
    var r = e.DungeonId,
      o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
      o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o),
      n = this.XRe(e),
      n = (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption = n, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = r, ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r)),
      n = n.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
    o.InstType, Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance, n ? this.EDe() : this.YRe(e.IsRegroup, r, e.LocationEntityId)
  }
  YRe(e, r, o) {
    e ? (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterInstanceDungeon, this.EDe), ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(r, !1, !1)) : this.EDe()
  }
  OnReset() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.EnterInstanceDungeon, this.EDe) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterInstanceDungeon, this.EDe)
  }
  XRe(e) {
    var e = e.TransitionOption,
      r = ControllerHolder_1.ControllerHolder.TeleportController.ParseTeleportTransitionOptionToPb(e);
    return e?.Type === IAction_1.ETeleportTransitionType.PlayMp4 && e.IsFadeInScreenAfterTeleport && ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, void 0, 1), r
  }
}
exports.LevelEventTeleportDungeon = LevelEventTeleportDungeon;
//# sourceMappingURL=LevelEventTeleportDungeon.js.map