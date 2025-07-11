"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitEntityTaskModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class WaitEntityTaskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.QY = undefined;
    this.qi_ = 10000;
    this.OnAddEntity = (t, s) => {
      this.ki_(t, s, true);
    };
    this.OnRemoveEntity = (t, s) => {
      this.ki_(t, s, false);
    };
  }
  OnInit() {
    this.QY = new Map();
    return true;
  }
  OnClear() {
    this.QY.clear();
    return true;
  }
  AddTask(t, s) {
    if (this.QY.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 72, "[WaitEntityTaskModel] AddTask 尝试用一个已经存在的任务ID添加新任务, 阻止添加", ["taskId", t], ["task", s], ["TaskMap", this.QY]);
      }
    } else {
      this.QY.set(t, s);
    }
  }
  RemoveTask(t) {
    this.QY.delete(t);
  }
  ki_(t, s, e) {
    var a = this.QY.size;
    let i = 0;
    for (const o of this.QY.values()) {
      if (e) {
        o.OnAddEntity(t, s);
      } else {
        o.OnRemoveEntity(t, s);
      }
      if (++i - a >= this.qi_) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 72, "[WaitEntityTaskModel] 可能是WaitEntityTask的Callback中又创建了WaitEntityTask，导致死循环, 请检查", ["creatureDataId", t], ["pbDataId", s], ["task", o]);
        }
        break;
      }
    }
  }
}
exports.WaitEntityTaskModel = WaitEntityTaskModel;
//# sourceMappingURL=WaitEntityTaskModel.js.map