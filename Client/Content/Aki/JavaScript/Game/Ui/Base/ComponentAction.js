"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentAction = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const List_1 = require("../../../Core/Container/List");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
var EComponentState;
var EActionCommandType;
(function (t) {
  t[t.Register = 0] = "Register";
  t[t.Creating = 1] = "Creating";
  t[t.Create = 2] = "Create";
  t[t.Starting = 3] = "Starting";
  t[t.Start = 4] = "Start";
  t[t.Showing = 5] = "Showing";
  t[t.Show = 6] = "Show";
  t[t.Hiding = 7] = "Hiding";
  t[t.Hide = 8] = "Hide";
  t[t.Destroying = 9] = "Destroying";
  t[t.Destroy = 10] = "Destroy";
})(EComponentState = EComponentState || {});
(function (t) {
  t[t.Default = 0] = "Default";
  t[t.Start = 1] = "Start";
  t[t.Show = 2] = "Show";
  t[t.Hide = 3] = "Hide";
  t[t.Destroy = 4] = "Destroy";
})(EActionCommandType = EActionCommandType || {});
class ComponentAction {
  constructor() {
    this.ComponentId = 0;
    this.C_r = EComponentState.Register;
    this.WaitToDestroy = false;
    this.DeadPromise = new CustomPromise_1.CustomPromise();
    this.g_r = new List_1.default({
      ActionCommand: EActionCommandType.Default,
      Processed: true
    });
    this.ComponentId = ++ComponentAction.f_r;
  }
  static GetIncrementId() {
    return this.f_r;
  }
  get IsRegister() {
    return this.C_r === EComponentState.Register;
  }
  get IsCreating() {
    return this.C_r === EComponentState.Creating;
  }
  get IsCreate() {
    return this.C_r === EComponentState.Create;
  }
  get IsCreateOrCreating() {
    return this.IsCreating || this.IsCreate;
  }
  get IsStarting() {
    return this.C_r === EComponentState.Starting;
  }
  get IsStart() {
    return this.C_r === EComponentState.Start;
  }
  get IsStartOrStarting() {
    return this.IsStarting || this.IsStart;
  }
  get IsShowing() {
    return this.C_r === EComponentState.Showing;
  }
  get IsShow() {
    return this.C_r === EComponentState.Show;
  }
  get IsShowOrShowing() {
    return this.IsShowing || this.IsShow;
  }
  get IsHiding() {
    return this.C_r === EComponentState.Hiding;
  }
  get IsHide() {
    return this.C_r === EComponentState.Hide;
  }
  get IsHideOrHiding() {
    return this.IsHiding || this.IsHide;
  }
  get IsDestroying() {
    return this.C_r === EComponentState.Destroying;
  }
  get IsDestroy() {
    return this.C_r === EComponentState.Destroy;
  }
  get IsDestroyOrDestroying() {
    return this.IsDestroy || this.IsDestroying;
  }
  get IsBusy() {
    return this.IsCreating || this.IsStarting || this.IsShowing || this.IsHiding || this.IsDestroying;
  }
  get IsPendingDestroy() {
    let t = this.g_r.GetHeadNextNode();
    while (t) {
      if (t.Element.ActionCommand === EActionCommandType.Destroy && !t.Element.Processed) {
        return true;
      }
      t = t.Next;
    }
    return false;
  }
  async CreateAsync() {
    if (this.IsCreateOrCreating) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "Enter CreateAsync failed, Duplicate call", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
    } else {
      if (!this.IsRegister) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "Enter CreateAsync failed", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      }
      this.C_r = EComponentState.Creating;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter CreateAsync Creating", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      if (!(await this.OnCreateAsyncImplement())) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "Creating failed", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      }
      this.C_r = EComponentState.Create;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter CreateAsync Create", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
    }
    return true;
  }
  async StartAsync() {
    var t;
    if (this.IsBusy) {
      return this.p_r(EActionCommandType.Start);
    } else {
      t = await this.v_r();
      this.M_r();
      return t;
    }
  }
  async v_r() {
    if (this.IsStartOrStarting) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "Enter StartAsyncImplement failed, Duplicate call", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
    } else {
      if (!this.IsCreate) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "Enter StartAsyncImplement failed", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      }
      this.C_r = EComponentState.Starting;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter StartAsyncImplement Starting", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      await this.OnStartAsyncImplement();
      this.C_r = EComponentState.Start;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter StartAsyncImplement Start", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
    }
    return true;
  }
  async ShowAsync() {
    var t;
    if (this.IsBusy) {
      return this.p_r(EActionCommandType.Show);
    } else {
      t = await this.E_r();
      this.M_r();
      return t;
    }
  }
  async E_r() {
    if (!this.IsShowOrShowing) {
      if (!this.IsStartOrStarting && !this.IsHideOrHiding) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "Enter ShowAsyncImplement failed", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      }
      this.C_r = EComponentState.Showing;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter ShowAsyncImplement Showing", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      await this.OnShowAsyncImplement();
      this.C_r = EComponentState.Show;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter ShowAsyncImplement Show", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      this.OnFinishShowImplement();
    }
    return true;
  }
  async HideAsync() {
    var t;
    if (this.IsBusy) {
      return this.p_r(EActionCommandType.Hide);
    } else {
      t = await this.S_r();
      this.M_r();
      return t;
    }
  }
  async S_r() {
    if (!this.IsHideOrHiding) {
      if (!this.IsStartOrStarting && !this.IsShowOrShowing) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "Enter HideAsyncImplement failed", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      }
      this.C_r = EComponentState.Hiding;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter HideAsyncImplement Hiding", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      await this.OnHideAsyncImplement();
      this.C_r = EComponentState.Hide;
      if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Enter HideAsyncImplement Hide", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
    }
    return true;
  }
  async DestroyAsync() {
    var t;
    this.WaitToDestroy = true;
    this.g_r.RemoveAllNodeWithoutHead();
    if (this.IsBusy) {
      return this.p_r(EActionCommandType.Destroy);
    } else {
      t = await this.y_r();
      this.g_r.RemoveAllNodeWithoutHead();
      return t;
    }
  }
  async CloseMeAsync() {
    return this.DestroyAsync();
  }
  async y_r() {
    if (!this.IsDestroyOrDestroying) {
      try {
        if (this.IsShowOrShowing) {
          await this.S_r();
        }
        this.WaitToDestroy = false;
        if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "Enter DestroyAsyncImplement Destroying", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        this.C_r = EComponentState.Destroying;
        await this.OnDestroyAsyncImplement();
        this.C_r = EComponentState.Destroy;
        if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "Enter DestroyAsyncImplement Destroy", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Game", 16, "Enter DestroyAsyncImplement Error", t, ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Game", 16, "Enter DestroyAsyncImplement Exception", ["error", t]);
        }
      } finally {
        if (ComponentAction.OpenLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "Enter DestroyAsyncImplement Dead", ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        if (!this.DeadPromise.IsFulfilled()) {
          this.DeadPromise.SetResult();
        }
      }
    }
    return true;
  }
  Show(t = undefined) {
    this.ShowAsync().then(t);
  }
  Hide(t = undefined) {
    this.HideAsync().then(t);
  }
  Destroy(t = undefined) {
    this.DestroyAsync().then(t);
  }
  async OnCreateAsyncImplement() {
    return Promise.resolve(true);
  }
  async OnStartAsyncImplement() {}
  async OnShowAsyncImplement() {}
  OnFinishShowImplement() {}
  async OnHideAsyncImplement() {}
  async OnDestroyAsyncImplement() {}
  static I_r(t, e) {
    return t === e || t === EActionCommandType.Show && e === EActionCommandType.Hide || t === EActionCommandType.Hide && e === EActionCommandType.Show;
  }
  T_r() {
    switch (this.C_r) {
      case EComponentState.Starting:
        return EActionCommandType.Start;
      case EComponentState.Showing:
        return EActionCommandType.Show;
      case EComponentState.Hiding:
        return EActionCommandType.Hide;
      case EComponentState.Destroying:
        return EActionCommandType.Destroy;
      default:
        return EActionCommandType.Default;
    }
  }
  AIc(t, e) {
    if (t !== e && e === EActionCommandType.Show) {
      this.HandleCacheShowActionFailIfIsPair();
    }
  }
  p_r(t) {
    var e;
    var n;
    if (ComponentAction.SwitchCheckSameTypeLogic || this.T_r() !== t) {
      if ((n = (e = this.g_r.TailNode).Element.ActionCommand) === t) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCore", 16, "[TryCacheAction] is same with tail action", ["actionType", EActionCommandType[t]], ["ComponentState", EComponentState[n]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      } else if (n === EActionCommandType.Destroy) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCore", 16, "[TryCacheAction] tailActionType is Destroy, not allow to cache any action", ["actionType", EActionCommandType[t]], ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      } else if (ComponentAction.I_r(n, t)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCore", 16, "[TryCacheAction] remove tail action which is pair with this action", ["actionType", EActionCommandType[t]], ["tailActionType", EActionCommandType[n]], ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        this.AIc(n, t);
        this.g_r.RemoveNode(e);
        return false;
      } else if (ComponentAction.SwitchCheckSameTypeLogic && this.T_r() === t) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCore", 16, "[TryCacheAction] is same with current action", ["actionType", EActionCommandType[t]], ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        return false;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "[TryCacheAction] done", ["actionType", EActionCommandType[t]], ["tailActionType", EActionCommandType[this.g_r.TailNode.Element.ActionCommand]], ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
        }
        this.g_r.AddTail({
          ActionCommand: t,
          Processed: false
        });
        return true;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[TryCacheAction] is same with current action", ["actionType", EActionCommandType[t]], ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      return false;
    }
  }
  async M_r() {
    let t = this.g_r.GetHeadNextNode();
    while (t !== undefined && !t.Element.Processed) {
      var e = t.Element.ActionCommand;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "[ExecuteCachedActions]", ["actionType", EActionCommandType[e]], ["ComponentState", EComponentState[this.C_r]], ["ComponentName", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
      switch (e) {
        case EActionCommandType.Start:
          await this.v_r();
          break;
        case EActionCommandType.Show:
          await this.E_r();
          break;
        case EActionCommandType.Hide:
          await this.S_r();
          break;
        case EActionCommandType.Destroy:
          await this.y_r();
      }
      t.Element.Processed = true;
      if ((t = t.Next) === undefined) {
        t = this.g_r.GetHeadNextNode();
      }
    }
    this.g_r.RemoveAllNodeWithoutHead();
  }
  HandleCacheShowActionFailIfIsPair() {}
  OnStartImplementCompatible() {}
  OnShowImplementCompatible() {}
  OnHideImplementCompatible() {}
  OnDestroyImplementCompatible() {}
  StartCompatible() {
    this.C_r = EComponentState.Starting;
    this.OnStartImplementCompatible();
    this.C_r = EComponentState.Start;
  }
  ShowCompatible() {
    this.C_r = EComponentState.Showing;
    this.OnShowImplementCompatible();
    this.C_r = EComponentState.Show;
  }
  HideCompatible() {
    this.C_r = EComponentState.Hiding;
    this.OnHideImplementCompatible();
    this.C_r = EComponentState.Hide;
  }
  DestroyCompatible() {
    if (this.IsShowOrShowing) {
      this.HideCompatible();
    }
    this.C_r = EComponentState.Destroying;
    this.OnDestroyImplementCompatible();
    this.C_r = EComponentState.Destroy;
    this.DeadPromise.SetResult();
  }
}
(exports.ComponentAction = ComponentAction).OpenLog = true;
ComponentAction.SwitchCheckSameTypeLogic = true;
ComponentAction.f_r = 0; //# sourceMappingURL=ComponentAction.js.map