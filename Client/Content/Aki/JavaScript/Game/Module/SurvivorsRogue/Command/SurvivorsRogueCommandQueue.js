"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandQueue = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const SurvivorsRogueCommandFactory_1 = require("./SurvivorsRogueCommandFactory");
class SurvivorsRogueCommandQueue {
  constructor() {
    this.sg = [];
    this.xwd = new Map();
    this.ForegroundCommandIncId = -1;
  }
  get ForegroundCommand() {
    return this.xwd.get(this.ForegroundCommandIncId);
  }
  InitCommands(o) {
    this.sg.length = 0;
    this.xwd.clear();
    for (const r of o) {
      this.AddCommand(r);
    }
    this.PrintCommands();
  }
  Clear() {
    this.sg.length = 0;
    this.xwd.clear();
  }
  PrintCommands() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 指令队列打印开始");
    }
    for (let o = 0; o < this.sg.length; o++) {
      var r = this.sg[o];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 指令", ["Index", o], ["IncId", r.IncId], ["Data", r.ToString()]);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 指令队列打印结束");
    }
  }
  AddCommand(o) {
    var r;
    var s = SurvivorsRogueCommandFactory_1.SurvivorsRogueCommandFactory.Create(o);
    if (s && (s.Update(o), r = s.IncId === this.ForegroundCommandIncId, s.SetForegroundStatus(r), this.sg.push(s), this.xwd.set(o.w5n, s), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 新增指令", ["Index", this.sg.length - 1], ["IncId", s.IncId], ["Data", s.ToString()]);
    }
  }
  UpdateCommand(o) {
    var r = this.xwd.get(o.w5n);
    if (r && (r.Update(o), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "[SurvivorsRogue] 更新指令", ["IncId", r.IncId], ["Data", r.ToString()]);
    }
  }
  RemoveCommand(r) {
    var o = this.xwd.get(r);
    if (o && (o.Delete(), (o = this.sg.findIndex(o => o.IncId === r)) !== -1 && this.sg.splice(o, 1), this.xwd.delete(r), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 删除指令", ["Index", o], ["IncId", r]);
    }
  }
  SetForegroundIncId(o) {
    this.ForegroundCommandIncId = o;
    this.sg.forEach(o => {
      var r = o.IncId === this.ForegroundCommandIncId;
      o.SetForegroundStatus(r);
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 前台指令变更", ["ForegroundIncId", o]);
    }
  }
  StartForegroundCommand() {
    this.ForegroundCommand?.TryStartExecute();
  }
  GetCommandByIncId(o) {
    return this.xwd.get(o);
  }
  GetCommands() {
    return this.sg;
  }
}
exports.SurvivorsRogueCommandQueue = SurvivorsRogueCommandQueue;
//# sourceMappingURL=SurvivorsRogueCommandQueue.js.map