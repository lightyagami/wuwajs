"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsInteractionUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("../../LevelGamePlay/LevelGeneralContextUtil");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiConfig_1 = require("../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const FlowController_1 = require("../Plot/Flow/FlowController");
class TsInteractionUtils {
  static GetInteractionConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(9, e);
  }
  static HandleInteractionOptionFromVision(e, t, n) {
    var i;
    var r;
    if (e.OptionType === 0 && (r = e.Type) && r.Actions && r.Actions.length === 1 && r.Actions[0].Name === "Collect" && (i = EntitySystem_1.EntitySystem.GetComponent(n, 0))) {
      t.HandleInteractRequest();
      r = e.InstanceId - 1;
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(t.CreatureData.GetCreatureDataId(), r, e => {
        t?.HandleInteractResponse(e.Q4n, e.UIs);
      }, i.GetCreatureDataId());
    }
  }
  static HandleInteractionOptionNew(t, n) {
    if (this.q_i) {
      if (n.OnInteractActionEnd) {
        n.OnInteractActionEnd();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "当前正在等待交互协议返回，无法继续发送交互请求");
      }
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DynamicInteractServerResponse, t.Guid);
      if (t.OptionType !== 3) {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(68)?.CollectSampleAndSend(true);
      }
      switch (t.DelayRemove ? 3 : t.OptionType) {
        case 0:
          this.q_i = true;
          n.HandleInteractRequest();
          var e = t.InstanceId - 1;
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityInteractOption(n.CreatureData.GetCreatureDataId(), e, e => {
            this.q_i = false;
            n?.HandleInteractResponse(e.Q4n, e.UIs);
          });
          break;
        case 1:
          this.q_i = true;
          n.HandleInteractRequest();
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityDynamicInteractOption(n.CreatureData.GetCreatureDataId(), t.Guid, e => {
            this.q_i = false;
            n?.HandleInteractResponse(e.Q4n, e.UIs);
            if (t) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DynamicInteractServerResponse, t.Guid);
            }
          });
          break;
        case 2:
          this.q_i = true;
          n.HandleInteractRequest();
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityRandomInteractOption(n.CreatureData.GetCreatureDataId(), t.RandomOptionIndex, e => {
            this.q_i = false;
            n?.HandleInteractResponse(e.Q4n, e.UIs);
          });
          break;
        case 3:
          if (t.Type.Type === "Flow") {
            var e = t.Type;
            var i = LevelGeneralContextDefine_1.EntityContext.Create(n.EntityId);
            if (e) {
              FlowController_1.FlowController.StartFlow(e.Flow.FlowListName, e.Flow.FlowId, e.Flow.StateId, i);
            }
            if (n?.OnInteractActionEnd) {
              n.OnInteractActionEnd();
            }
          } else if (t.Type.Type === "Actions") {
            n?.HandleInteractClientAction();
            let e = t.Context;
            e = e ? LevelGeneralContextDefine_1.GeneralContext.Copy(e) : LevelGeneralContextDefine_1.EntityContext.Create(n.EntityId);
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Type.Actions, e, e => {
              if (n?.OnInteractActionEnd) {
                n.OnInteractActionEnd();
              }
              n?.FinishInteractClientAction();
            });
          }
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Interaction", 18, "未定义的交互选项类型", ["optionType", t.OptionType]);
          }
      }
    }
  }
  static IsInteractHintViewOpened() {
    return TsInteractionUtils.G_i;
  }
  static get IsInteractWaitOpenViewName() {
    return this.WaitOpenViewName !== undefined;
  }
  static async OpenInteractHintView() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试打开交互界面");
    }
    if (this.IsInteractHintViewOpened()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试打开交互界面时，交互界面已经打开，直接做刷新");
      }
      this.UpdateInteractHintView();
      return true;
    }
    if (UiManager_1.UiManager.IsViewOpen("InteractionHintView") || UiManager_1.UiManager.IsViewCreating("InteractionHintView")) {
      return true;
    }
    if (this.WaitOpenViewName) {
      if (UiManager_1.UiManager.IsViewShow(this.WaitOpenViewName)) {
        this.N_i();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试打开交互界面时，交互在等待打开其他界面，直接返回", ["WaitOpenViewName", this.WaitOpenViewName]);
      }
      return false;
    }
    TsInteractionUtils.G_i = true;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试打开交互界面，开始打开交互界面");
    }
    var e = await UiManager_1.UiManager.OpenViewAsync("InteractionHintView");
    TsInteractionUtils.G_i = e !== undefined;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试打开交互界面，完成打开交互界面", ["bSuccess", TsInteractionUtils.G_i]);
    }
    return TsInteractionUtils.G_i;
  }
  static CloseInteractHintView() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试关闭交互界面");
    }
    if (this.IsInteractHintViewOpened()) {
      if (UiManager_1.UiManager.IsViewDestroying("InteractionHintView")) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试关闭交互界面时，交互界面已经在关闭中");
        }
      } else {
        UiManager_1.UiManager.CloseViewAsync("InteractionHintView").then(() => {
          TsInteractionUtils.G_i = false;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试关闭交互界面完成");
          }
        }, () => {});
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "[InteractionDebug]尝试关闭交互界面时，检测到交互界面没有打开");
    }
  }
  static RegisterWaitOpenViewName(e) {
    if (e) {
      if (this.WaitOpenViewName !== e && UiConfig_1.UiConfig.TryGetViewInfo(e)?.Type === UiLayerType_1.ELayerType.Normal) {
        if (!this.WaitOpenViewName) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnViewDone, this.O_i);
        }
        this.WaitOpenViewName = e;
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        TimerSystem_1.TimerSystem.Delay(() => {
          if (this.WaitOpenViewName === e) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Interaction", 36, "等待界面打开超时");
            }
            this.N_i();
          }
        }, 10000);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Interaction", 36, "等待打开的界面为 Undefined");
    }
  }
  static Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    this.q_i = false;
  }
  static Clear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    this.ClearCurrentOpenViewName();
  }
  static RegisterOpenViewName(e) {
    if (!this.k_i) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    }
    this.k_i = e;
  }
  static ClearCurrentOpenViewName() {
    if (this.k_i) {
      this.k_i = undefined;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    }
  }
  static GetCurrentOpenViewName() {
    return this.k_i;
  }
  static IsInteractionOpenView() {
    return this.k_i !== undefined;
  }
  static N_i() {
    this.WaitOpenViewName = undefined;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnViewDone, TsInteractionUtils.O_i);
  }
  static UpdateInteractHintView() {
    if (!TsInteractionUtils.q_i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InteractionViewUpdate);
    }
  }
  static HandleEntityInteractByServerNotify(r, a, e) {
    WaitEntityTask_1.WaitEntityTask.Create("TsInteractionUtils.HandleEntityInteractByServerNotify", a, t => {
      if (t) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
        if (t) {
          t = t.Entity.GetComponent(198);
          if (t) {
            t = t.GetInteractController();
            if (t) {
              var n = t.GetOptionByIndex(e);
              if (n) {
                if (n.Type.Type !== "Actions") {
                  if (Log_1.Log.CheckWarn()) {
                    Log_1.Log.Warn("Interaction", 36, "[基础交互选项继续执行]实体当前交互不是行为");
                  }
                } else {
                  var i = n.Type;
                  let e = n.Context;
                  if ((e = e ? LevelGeneralContextDefine_1.GeneralContext.Copy(e) : LevelGeneralContextDefine_1.EntityContext.Create(t.EntityId)) instanceof LevelGeneralContextDefine_1.EntityContext) {
                    n = ModelManager_1.ModelManager.InteractionModel;
                    t = e.EntityId;
                    const a = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(t);
                    n.SetInteractTarget(t);
                    n.SetInterctCreatureDataId(a);
                  }
                  ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(i.Actions, e, r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
                }
              } else if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Interaction", 36, "[基础交互选项继续执行]实体当前交互选项为空");
              }
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Interaction", 36, "[基础交互选项继续执行]实体交互控制器为空");
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Interaction", 36, "[基础交互选项继续执行]实体交互组件为空");
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Interaction", 36, "[基础交互选项继续执行]查找不到对应实体");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Interaction", 36, "[基础交互选项继续执行]等待实体超时");
      }
    }, LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static HandleEntityDynamicInteractByServerNotify(e, t) {
    var n;
    var i;
    var r;
    var a = LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(e?.cvs);
    if (a) {
      if (t = (n = ModelManager_1.ModelManager.InteractionModel).GetDynamicConfig(t)) {
        if (t.Type.Type !== "Actions") {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Interaction", 36, "[动态交互选项继续执行]动态交互选项不是行为");
          }
        } else {
          if (a instanceof LevelGeneralContextDefine_1.EntityContext) {
            i = a.EntityId;
            r = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(i);
            n.SetInteractTarget(i);
            n.SetInterctCreatureDataId(r);
          }
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t.Type.Actions, a, e.W5n, e.w5n, e.K5n, e.mvs, e.sS_);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Interaction", 36, "[动态交互选项继续执行]动态交互选项为空");
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Interaction", 36, "[动态交互选项继续执行]上下文缺失");
    }
  }
}
exports.TsInteractionUtils = TsInteractionUtils;
(_a = TsInteractionUtils).k_i = undefined;
TsInteractionUtils.q_i = false;
TsInteractionUtils.G_i = false;
TsInteractionUtils.WaitOpenViewName = undefined;
TsInteractionUtils.IsWaitForInteractOpenViewDone = false;
TsInteractionUtils.O_i = (e, t) => {
  if (e === TsInteractionUtils.WaitOpenViewName) {
    TsInteractionUtils.N_i();
  }
};
TsInteractionUtils.$Ge = e => {
  if (e === TsInteractionUtils.k_i) {
    _a.k_i = undefined;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, _a.$Ge);
  }
};
TsInteractionUtils.hMe = () => {
  if (_a.WaitOpenViewName) {
    _a.O_i(_a.WaitOpenViewName, undefined);
  }
  if (_a.k_i) {
    _a.$Ge(_a.k_i);
  }
}; //# sourceMappingURL=TsInteractionUtils.js.map