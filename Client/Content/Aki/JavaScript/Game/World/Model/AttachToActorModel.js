"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachToActorModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GlobalData_1 = require("../../GlobalData");
const AttachActorDefine_1 = require("../Define/AttachActorDefine");
class AttachToActorModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ShowLog = true;
    this.ubn = new Map();
    this.cbn = new Map();
    this.tkn = 0;
  }
  OnInit() {
    this.ShowLog = GlobalData_1.GlobalData.IsPlayInEditor;
    return true;
  }
  AddEntityActor(t, e, o, r, a) {
    let c = this.ubn.get(t);
    if (!c) {
      c = new AttachActorDefine_1.AttachActorEntry();
      this.ubn.set(t, c);
    }
    var A = ++this.tkn;
    if (c.AddAttachActorItem(A, t, e, o, r, a)) {
      if (this.ShowLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 3, "AttachActor: 添加Attach数据", ["AttachId", A], ["ActorName", e.GetName()], ["EntityId", t], ["ParentActorName", o.GetName()], ["Reason", r]);
      }
      this.cbn.set(e, t);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: 重复AttachActor", ["EntityId", t], ["AttachId", A], ["ActorName", e.GetName()], ["Reason", r]);
      }
      return false;
    }
  }
  RemoveEntityActor(t, e, o) {
    var r;
    var a = this.ubn.get(t);
    return !!a && (this.ShowLog && (r = a.GetAttachActorItem(e)) && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 3, "AttachActor: 删除Attach数据", ["AttachId", r.Id], ["ActorName", r.Name], ["EntityId", r.EntityId], ["ParentActorName", r.ParentActorName], ["AttachReason", r.Reason], ["Reason", o]), !!a.RemoveAttachActorItem(e)) && (a.Size() || this.ubn.delete(t), this.cbn.delete(e), true);
  }
  GetEntityIdByActor(t) {
    return this.cbn.get(t) ?? 0;
  }
  GetAttachActorEntry(t) {
    return this.ubn.get(t);
  }
  GetAttachActorItem(t, e) {
    t = this.ubn.get(t);
    if (t) {
      return t.GetAttachActorItem(e);
    }
  }
  ClearActorsByEntity(t) {
    t = this.ubn.get(t);
    if (t) {
      for (const e of t.GetAttachActorItems()) {
        if (e.Actor?.IsValid()) {
          this.cbn.delete(e.Actor);
        }
        if (this.ShowLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 3, "AttachActor: 删除Attach数据", ["AttachId", e.Id], ["ActorName", e.Name], ["EntityId", e.EntityId], ["ParentActorName", e.ParentActorName], ["AttachReason", e.Reason]);
        }
      }
      t.Clear();
    }
  }
  ClearEntityActor(t) {
    for (var [, e] of this.ubn) {
      if (this.ShowLog) {
        for (const o of e.GetAttachActorItems()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Entity", 3, "AttachActor: 删除Attach数据", ["AttachId", o.Id], ["ActorName", o.Name], ["EntityId", o.EntityId], ["ParentActorName", o.ParentActorName], ["AttachReason", o.Reason], ["Reason", t]);
          }
        }
      }
      e.Clear();
    }
    this.ubn.clear();
    this.cbn.clear();
  }
  OnLeaveLevel() {
    this.ClearEntityActor("AttachToActorModel.OnLeaveLevel");
    return true;
  }
}
exports.AttachToActorModel = AttachToActorModel;
//# sourceMappingURL=AttachToActorModel.js.map