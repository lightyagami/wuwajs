"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTeleportDungeon = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const SeamlessTravelDefine_1 = require("../../Module/SeamlessTravel/SeamlessTravelDefine");
const TeleportTransitionHelper_1 = require("../../Module/Teleport/TeleportTransitionHelper");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTeleportDungeon extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.EDe = () => {
      this.FinishExecute(true);
    };
  }
  ExecuteInGm(e, r, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InstanceDungeon", 36, "[LevelEventTeleportDungeon]ExecuteInGm");
    }
    this.FinishExecute(true);
  }
  ExecuteNew(e, r) {
    if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText("TeleportDungeon被GM屏蔽，跳过执行");
      this.FinishExecute(true);
    } else if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) {
      this.FinishExecute(false);
    } else {
      const o = e;
      if (o) {
        e = o.DungeonId;
        if (e) {
          if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(e)) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
            this.FinishExecute(false);
          } else if (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
            this.FinishExecute(true);
          } else {
            var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
            var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
            if (e && e.InstType) {
              if (o.IsNeedSecondaryConfirmation) {
                (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(164)).FunctionMap.set(2, () => {
                  var e = o.DungeonId;
                  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e;
                });
                e.FunctionMap.set(1, () => {
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
                  this.EDe();
                });
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
              } else if (o.TransitionOption?.Type === IAction_1.ETeleportTransitionType.Seamless && o.TransitionOption.KeepMovementStates?.includes("Kite")) {
                const r = new SeamlessTravelDefine_1.SeamlessTravelContext();
                r.ParseConfig(TeleportTransitionHelper_1.TeleportTransitionHelper.ParseTeleportTransitionOptionToPb(o.TransitionOption));
                ControllerHolder_1.ControllerHolder.SeamlessTravelController.EnableSeamlessTravel(r, true).then(e => {
                  this.$Re(o);
                });
              } else {
                this.$Re(o);
              }
            } else {
              this.FinishExecute(false);
            }
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("InstanceDungeon", 5, "跳转副本行为错误，副本Id配置错误");
          }
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    }
  }
  $Re(e) {
    var r = e.DungeonId;
    var o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o);
    var n = this.XRe(e);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption = n;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = r;
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r);
    var n = n.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
    o.InstType;
    Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
    if (n) {
      this.EDe();
    } else {
      this.YRe(e.IsRegroup, r, e.LocationEntityId);
    }
  }
  YRe(e, r, o) {
    if (e) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterInstanceDungeon, this.EDe);
      ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(r, false, false);
    } else {
      this.EDe();
    }
  }
  OnReset() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.EnterInstanceDungeon, this.EDe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterInstanceDungeon, this.EDe);
    }
  }
  XRe(e) {
    var e = e.TransitionOption;
    var r = TeleportTransitionHelper_1.TeleportTransitionHelper.ParseTeleportTransitionOptionToPb(e);
    if (e?.Type === IAction_1.ETeleportTransitionType.PlayMp4 && e.IsFadeInScreenAfterTeleport) {
      ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, undefined, 1);
    }
    return r;
  }
}
exports.LevelEventTeleportDungeon = LevelEventTeleportDungeon;
//# sourceMappingURL=LevelEventTeleportDungeon.js.map