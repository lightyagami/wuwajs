"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleEntityChildView = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const BattleChildView_1 = require("./BattleChildView");
class BattleEntityChildView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.GYe = new Map();
    this.NYe = [];
    this.i$e = [];
    this.OYe = [];
  }
  Reset() {
    this.Deactivate(this.Jh);
    super.Reset();
  }
  Reactivate(t) {
    if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
      if (this.IsValid()) {
        if (this.GetEntityId() !== t.Id) {
          this.Deactivate(this.GetEntity());
          this.Activate(t);
        }
      } else {
        this.Activate(t);
      }
    }
  }
  Activate(t) {
    if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
      this.Jh = t;
      this.OnActivate();
      this.AddEntityEvents(t);
    }
  }
  Deactivate(t) {
    if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
      if (ObjectSystem_1.ObjectSystem.IsValid(this.Jh)) {
        if (this.GetEntityId() !== t.Id) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "在休眠时，休眠实体不是当前实体");
          }
        } else {
          this.RemoveEntityEvents(t);
          this.OnDeactivate();
          this.Jh = undefined;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "在休眠时，当前实体不存在，请先调用Activate");
      }
    }
  }
  OnActivate() {}
  OnDeactivate() {}
  AddEntityEvents(t) {}
  RemoveEntityEvents(t) {
    this.kYe(t);
    this.FYe();
    this.VYe();
    this.HYe();
  }
  GetEntity() {
    return this.Jh;
  }
  GetEntityId() {
    return this.Jh?.Id;
  }
  IsValid() {
    return ObjectSystem_1.ObjectSystem.IsValid(this.Jh);
  }
  ListenForAttributeChanged(t, e, i) {
    t = t.GetComponent(173);
    if (t) {
      t.AddListener(e, i);
      this.GYe.set(e, i);
    }
  }
  RemoveListenAttributeChanged(t, e, i) {
    t = t.GetComponent(173);
    if (t) {
      t.RemoveListener(e, i);
      this.GYe.delete(e);
    }
  }
  kYe(t) {
    var e = t.GetComponent(173);
    if (e) {
      for (var [i, s] of this.GYe) {
        e.RemoveListener(i, s);
      }
    }
  }
  ListenForTagCountChanged(e, i, s) {
    e = e.GetComponent(205);
    if (e) {
      let t = undefined;
      if (typeof i == "number") {
        t = i;
      } else if (typeof i == "string") {
        t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
      }
      i = e.ListenForTagAnyCountChanged(t, s);
      this.NYe.push(i);
    }
  }
  FYe() {
    if (this.NYe) {
      for (const t of this.NYe) {
        t.EndTask();
      }
      this.NYe.length = 0;
    }
  }
  ListenForTagSignificantChanged(t, e, i) {
    var t = t.GetComponent(205);
    if (t) {
      t = t.ListenForTagAddOrRemove(e, i);
      this.i$e.push(t);
    }
  }
  ListenForTagAddNewOrRemovedWithTag(t, e, i, s) {
    t = t.ListenForTagAddOrRemove(e, i, s);
    this.i$e.push(t);
  }
  VYe() {
    if (this.i$e) {
      for (const t of this.i$e) {
        t.EndTask();
      }
      this.i$e.length = 0;
    }
  }
  HYe() {
    if (this.OYe) {
      for (const t of this.OYe) {
        t.EndTask();
      }
      this.OYe.length = 0;
    }
  }
}
exports.BattleEntityChildView = BattleEntityChildView;
//# sourceMappingURL=BattleEntityChildView.js.map