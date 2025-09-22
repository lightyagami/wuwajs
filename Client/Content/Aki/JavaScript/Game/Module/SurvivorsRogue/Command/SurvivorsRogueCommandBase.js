"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandBase = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../Ui/UiManager");
const AsyncTask_1 = require("../../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../../World/Task/TaskSystem");
const SurvivorsRogueUiDefine_1 = require("../SurvivorsRogueUiDefine");
class SurvivorsRogueCommandBase {
  constructor(e) {
    this.Type = e;
    this.IncId = -1;
    this.StepSize = 1;
    this.CurrentStep = -1;
    this.ViewProxy = undefined;
    this.InForeground = false;
    this.Data = undefined;
    this.AfterDelete = false;
  }
  get IsFinished() {
    return this.CurrentStep >= this.StepSize;
  }
  get IsStarted() {
    return this.CurrentStep >= 0;
  }
  ToString() {
    return "[Command] " + this.IncId;
  }
  SetForegroundStatus(e) {
    var t;
    var i = this.InForeground;
    if (i !== e && (this.InForeground = e, this.IsStarted) && !this.IsFinished && i !== (t = this.InForeground)) {
      if (t) {
        this.Back2Fore();
      } else {
        this.Fore2Back();
      }
    }
  }
  Update(e) {
    this.Data = e;
    this.IncId = this.Data.w5n;
    this.OnUpdate();
    this.ViewProxy?.Refresh();
  }
  TryStartExecute() {
    if (!this.IsStarted) {
      if (this.InForeground) {
        this.CurrentStep = 0;
        this.OnStartExecute();
      }
    }
  }
  Execute() {
    if (!this.IsFinished) {
      if (this.InForeground) {
        this.CurrentStep++;
        if (this.IsFinished) {
          this.$ne();
        } else {
          this.OnExecute();
        }
      }
    }
  }
  BindView(e) {
    this.ViewProxy = e;
    this.OnBindView();
  }
  $ne() {
    this.OnFinish();
  }
  Delete() {
    this.OnDelete();
    if (this.CanCloseViewOnDelete()) {
      this.ViewProxy?.CloseView();
    }
    this.ViewProxy = undefined;
    this.AfterDelete = true;
  }
  RequestCommand(e, t) {
    if (this.InForeground) {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestCommandOperation(this.IncId, e, t);
    } else {
      t?.(false);
    }
  }
  OpenView(e, t) {
    const i = new SurvivorsRogueUiDefine_1.SurvivorsRogueCommandViewData(this.IncId, t);
    if (t) {
      UiManager_1.UiManager.OpenView(e, i);
    } else {
      t = new AsyncTask_1.AsyncTask("SurvivorsRogueCommandBase.Open" + e, async () => {
        if (UiManager_1.UiManager.IsViewOpen(e)) {
          await UiManager_1.UiManager.CloseViewAsync(e);
        }
        await UiManager_1.UiManager.OpenViewAsync(e, i);
        return true;
      });
      TaskSystem_1.TaskSystem.AddTask(t);
      TaskSystem_1.TaskSystem.Run();
    }
  }
  OnUpdate() {}
  Back2Fore() {}
  Fore2Back() {}
  OnStartExecute() {}
  OnExecute() {}
  OnFinish() {}
  OnDelete() {}
  OnBindView() {}
  CanCloseViewOnDelete() {
    return true;
  }
}
exports.SurvivorsRogueCommandBase = SurvivorsRogueCommandBase;
//# sourceMappingURL=SurvivorsRogueCommandBase.js.map