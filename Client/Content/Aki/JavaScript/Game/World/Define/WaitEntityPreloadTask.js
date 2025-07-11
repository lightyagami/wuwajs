"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitEntityPreloadTask = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WAIT_TIME = 60000;
class WaitEntityPreloadTask {
  constructor(t, i) {
    this.vJ = undefined;
    this.Gvr = undefined;
    this.Nvr = 0;
    this.Ovr = undefined;
    this.kvr = new Map();
    this.Fvr = new Map();
    this.YKo = new Map();
    this.Vvr = undefined;
    this.Hvr = i => {
      if (!(this.Nvr & 8)) {
        var e = i.Entity.GetComponent(0);
        var s = e.GetCreatureDataId();
        var e = e.GetPbDataId();
        var i = i.Id;
        let t = false;
        if (this.kvr.has(s)) {
          t = true;
          this.kvr.delete(s);
        }
        if (this.Fvr.has(e)) {
          t = true;
          this.Fvr.delete(e);
        }
        if (this.YKo.has(i)) {
          t = true;
          this.YKo.delete(i);
        }
        if (!!t && !this.t6) {
          this.Bto();
        }
      }
    };
    this.zpe = (t, i) => {
      if (!(this.Nvr & 8)) {
        if (i.Id === this.vJ.Id) {
          this.Nvr |= 4;
          this.Bto();
        } else {
          var e = i.Entity.GetComponent(0);
          var s = e.GetCreatureDataId();
          var e = e.GetPbDataId();
          var i = i.Id;
          let t = false;
          if (this.kvr.has(s)) {
            t = true;
            this.kvr.delete(s);
            if (!ModelManager_1.ModelManager.CreatureModel.LeavingLevel) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "实体需要等待的实体被删了", ["CreatureDataId", this.Ovr?.GetCreatureDataId()], ["被删的实体CreatureDataId", s], ["依赖的实体列表", this.Vvr]);
              }
            }
          }
          if (this.Fvr.has(e)) {
            t = true;
            this.Fvr.delete(e);
            if (!ModelManager_1.ModelManager.CreatureModel.LeavingLevel) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "实体需要等待的实体被删了", ["CreatureDataId", this.Ovr?.GetCreatureDataId()], ["被删的实体PbDataId", e], ["依赖的实体列表", this.Vvr]);
              }
            }
          }
          if (this.YKo.has(i)) {
            t = true;
            this.YKo.delete(i);
            if (!ModelManager_1.ModelManager.CreatureModel.LeavingLevel) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "实体需要等待的实体被删了", ["CreatureDataId", this.Ovr?.GetCreatureDataId()], ["被删的实体EntityId", i], ["依赖的实体列表", this.Vvr]);
              }
            }
          }
          if (t) {
            this.Nvr |= 1;
            if (!this.t6) {
              this.Bto();
            }
          }
        }
      }
    };
    this.vJ = t;
    this.Gvr = i;
  }
  Init() {
    this.Ovr = this.vJ.Entity.GetComponent(0);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PreloadEntityFinished, this.Hvr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    TimerSystem_1.TimerSystem.Delay(() => {
      if (!!this.vJ?.Valid && !(this.Nvr & 8)) {
        this.Nvr |= 2;
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "等待实体超时", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["依赖的实体", this.Vvr], ["没有预加载的实体", this.jvr()]);
        }
        this.Bto();
      }
    }, WAIT_TIME);
    this.Wvr();
    if (!this.t6) {
      this.Bto();
    }
  }
  get t6() {
    return this.YKo.size + this.Fvr.size + this.kvr.size;
  }
  Clear() {
    this.vJ = undefined;
    this.kvr.clear();
    this.Fvr.clear();
    this.YKo.clear();
    this.Vvr = undefined;
    this.Gvr = undefined;
  }
  Wvr() {
    for (var [t] of this.kvr) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
      if (i?.Valid && (i.Entity.GetComponent(0).GetPreloadFinished() || i?.IsInit)) {
        this.kvr.delete(t);
      }
    }
    for (var [e] of this.Fvr) {
      var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
      if (s?.Valid && (s.Entity.GetComponent(0).GetPreloadFinished() || s?.IsInit)) {
        this.Fvr.delete(e);
      }
    }
    for (var [h] of this.YKo) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(h);
      if (r?.Valid && (r.Entity.GetComponent(0).GetPreloadFinished() || r?.IsInit)) {
        this.YKo.delete(h);
      }
    }
  }
  Bto() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PreloadEntityFinished, this.Hvr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    this.Nvr |= 8;
    this.Gvr(this.Nvr);
    this.Clear();
  }
  jvr() {
    let t = "";
    if (this.kvr.size) {
      for (var [i] of this.kvr) {
        t += `CreatureDataId:${i},`;
      }
    }
    if (this.Fvr.size) {
      for (var [e] of this.Fvr) {
        t += `PbDataId:${e},`;
      }
    }
    if (this.YKo.size) {
      for (var [s] of this.YKo) {
        t += `EntityId:${s},`;
      }
    }
    return t;
  }
  static Create(t, i) {
    t = new WaitEntityPreloadTask(t, i);
    t.Init();
    return t;
  }
}
exports.WaitEntityPreloadTask = WaitEntityPreloadTask;
//# sourceMappingURL=WaitEntityPreloadTask.js.map