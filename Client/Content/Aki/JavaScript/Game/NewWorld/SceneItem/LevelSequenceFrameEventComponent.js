"use strict";

var LevelSequenceFrameEventComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, o) {
  var r;
  var i = arguments.length;
  var s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSequenceFrameEventComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
let LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent_1 = class LevelSequenceFrameEventComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Wpo = 0;
    this.wDe = 0;
    this.iRl = new Map();
    this.rRl = undefined;
    this.oRl = new Map();
    this.nRl = new Map();
    this.aZu = new Array();
    this.OnSequencePaused = () => {
      for (const e of this.aZu) {
        this.sRl(e.Key);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelPlay", 26, "[SceneItemReference][EventComp] 补做遗漏的帧事件", ["key", e.Key], ["id", this.wDe]);
        }
      }
      this.aZu = [];
    };
  }
  OnInitData(e) {
    var t;
    var n;
    var o = e.GetParam(LevelSequenceFrameEventComponent_1)[0];
    this.Lo = o;
    this.Wpo = e.CreatureDataId;
    this.wDe = e.PbDataId;
    var o = [...this.Lo.ForwardSections].sort((e, t) => e.FrameId - t.FrameId);
    var e = [...this.Lo.BackWardSections].sort((e, t) => t.FrameId - e.FrameId);
    for ([t, n] of [[o, this.oRl], [e, this.nRl]]) {
      for (const r of t) {
        if (r.Type === "EventMark") {
          if (this.iRl.has(r.Key)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 26, "[SceneItemReference][EventComp] 场景引用实体帧事件组件key重复");
            }
          } else {
            this.iRl.set(r.Key, r);
          }
        } else if (r.Type === "Mark") {
          if (n.has(r.Key)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 26, "[SceneItemReference][EventComp] 场景引用实体帧事件组件key重复");
            }
          } else {
            n.set(r.Key, t.indexOf(r));
          }
        }
      }
    }
    return true;
  }
  OnClear() {
    this.Lo = undefined;
    this.iRl.clear();
    return true;
  }
  ExecuteEvent(e) {
    var t;
    var n = this.iRl.get(e);
    if (n) {
      if (!(t = this.aZu.pop()) || t.Key !== e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 26, "[SceneItemReference][EventComp] 帧事件执行顺序有错误", ["key", e], ["id", this.wDe]);
        }
      }
      if (n.ActionList) {
        (t = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)).ClientExecuteActions = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 26, "[SceneItemReference][EventComp] 执行帧事件", ["key", e], ["id", this.wDe]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(n.ActionList, t);
        this.sRl(e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 26, "[SceneItemReference][EventComp] 找不到key", ["key", e], ["id", this.wDe]);
    }
  }
  OnSequencePlayToMark(e, n, t) {
    var o = this.rRl;
    this.rRl = e;
    if (!t && o && o !== this.rRl) {
      var r = this.oRl.get(o) < this.oRl.get(this.rRl);
      var i = r ? this.oRl : this.nRl;
      var s = r ? this.Lo.ForwardSections : [...this.Lo.BackWardSections].reverse();
      let t = undefined;
      this.aZu = [];
      for (let e = i.get(this.rRl) - 1; e > i.get(o); e--) {
        if (s[e].Type !== "Mark") {
          if (r ? n > s[e].FrameId : n < s[e].FrameId) {
            t = s[e];
            break;
          }
          this.aZu.push(s[e]);
        }
      }
      if (t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 26, "[SceneItemReference][EventComp] 补帧", ["id", this.wDe], ["mark", e], ["frame", n], ["isForwards", r], ["request key", t?.Key]);
        }
        this.sRl(t.Key);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 26, "[SceneItemReference][EventComp] 切换状态，准备执行帧事件：", ["id", this.wDe], ["list", this.aZu]);
      }
    }
  }
  sRl(e) {
    var t = Protocol_1.Aki.Protocol.Tp_.create();
    t.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
    t.F4n = this.Wpo;
    t.Z4n = e;
    Net_1.Net.Call(19086, t, e => {});
  }
};
LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(165)], LevelSequenceFrameEventComponent);
exports.LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent; //# sourceMappingURL=LevelSequenceFrameEventComponent.js.map