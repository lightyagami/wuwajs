"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandSwallowInvoker = exports.CommandInvoker = exports.GameCommandFactory = undefined;
const Queue_1 = require("../../../Core/Container/Queue");
class GameCommandWithValidators {
  constructor() {
    this.Validators = new Set();
  }
  AddValidator(e) {
    this.Validators.add(e);
  }
  RemoveValidator(e) {
    this.Validators?.delete(e);
  }
}
class GameCommandWithReceivers extends GameCommandWithValidators {
  constructor(...e) {
    super();
    this.Params = undefined;
    this.Receivers = new Set();
    this.Params = e;
  }
  AddReceiver(e) {
    this.Receivers.add(e);
  }
  RemoveReceiver(e) {
    this.Receivers.delete(e);
  }
}
class GameCommandBarely extends GameCommandWithValidators {
  constructor(e, t, ...o) {
    super();
    this.Execute = undefined;
    this.Undo = undefined;
    this.Params = undefined;
    this.Execute = e;
    this.Undo = t;
    this.Params = o;
  }
}
class GameCommandFactory {
  static CreateGameCommandWithReceivers(...e) {
    return new GameCommandWithReceivers(...e);
  }
  static CreateGameCommandBarely(e, t, ...o) {
    return new GameCommandBarely(e, t, ...o);
  }
}
exports.GameCommandFactory = GameCommandFactory;
class CommandInvoker {
  constructor() {
    this._kc = new Queue_1.Queue();
  }
  SubmitCommand(e, t) {
    this._kc.Push(e);
    if (t) {
      this.ExecuteAllCommand();
    }
  }
  ExecuteAllCommand() {
    var o = [];
    for (let e = 0, t = this._kc.Size; e < t; ++e) {
      var a = this._kc.Get(e);
      if (a) {
        let e = true;
        if (a.Validators) {
          for (const s of a.Validators) {
            if (!s.Validate()) {
              o.push(a);
              e = false;
              break;
            }
          }
        }
        if (!e) {
          break;
        }
        if (a && a.Params && (a.Execute && a.Execute(...a.Params), a.Receivers)) {
          for (const r of a.Receivers) {
            r.ReceiveExecute(...a.Params);
          }
        }
      }
    }
    this._kc.Clear();
    for (const e of o) {
      this._kc.Push(e);
    }
  }
  ClearAllCommand() {
    this._kc.Clear();
  }
  Undo() {}
}
class CommandSwallowInvoker extends (exports.CommandInvoker = CommandInvoker) {
  SubmitCommand(e, t) {}
  ExecuteAllCommand() {}
  Undo() {}
}
exports.CommandSwallowInvoker = CommandSwallowInvoker;
//# sourceMappingURL=GameCommand.js.map