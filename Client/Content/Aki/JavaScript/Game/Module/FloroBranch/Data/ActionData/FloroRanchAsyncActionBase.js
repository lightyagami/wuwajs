"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchAsyncActionBase = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
class FloroRanchAsyncActionBase {
  constructor() {
    this.ActionState = 0;
    this.NAu = undefined;
    this.ActionId = 0;
    this.ActionId = ++FloroRanchAsyncActionBase.f_r;
  }
  async ExecuteAction() {
    try {
      this.ActionState = 1;
      await this.OnExecute();
      this.ActionState = 3;
    } catch (o) {
      if (o instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("FloroRanchGamePlay", 58, "FloroRanchAction Execute异常", o, ["error", o.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchAction Execute异常", ["error", o]);
      }
    }
  }
  async OnExecute() {}
  Pause() {
    if (this.ActionState === 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " action is already paused");
      }
    } else if (this.NAu !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " PausePromise is already defined");
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " Pause", ["ActionId", this.ActionId]);
      }
      this.OnPause();
      this.ActionState = 2;
      this.NAu = new CustomPromise_1.CustomPromise();
    }
  }
  OnPause() {}
  async WaitIfPause() {
    if (this.NAu !== undefined) {
      await this.NAu.Promise;
    }
  }
  IsPause() {
    return this.ActionState === 2;
  }
  IsExit() {
    return this.ActionState === 4;
  }
  Resume() {
    if (this.ActionState !== 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " action is not paused", ["ActionId", this.ActionId]);
      }
    } else if (this.NAu === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " PausePromise is undefined");
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " Resume", ["ActionId", this.ActionId]);
      }
      this.OnResume();
      this.ActionState = 1;
      this.NAu.SetResult(undefined);
      this.NAu = undefined;
    }
  }
  OnResume() {}
  Exit() {
    this.ActionState = 4;
    if (this.NAu !== undefined) {
      this.NAu.SetResult(undefined);
      this.NAu = undefined;
    }
  }
}
(exports.FloroRanchAsyncActionBase = FloroRanchAsyncActionBase).f_r = 0;
//# sourceMappingURL=FloroRanchAsyncActionBase.js.map