"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBase = exports.RedDotData = undefined;
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const StringBuilder_1 = require("../../Core/Utils/StringBuilder");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const RedDotSystem_1 = require("./RedDotSystem");
class RedDotData {
  constructor() {
    this.Tar = 0;
    this.Lar = new Set();
  }
  get State() {
    return RedDotData.StateByGm && this.Tar > 0;
  }
  get StateCount() {
    return this.Tar;
  }
  set StateCount(t) {
    this.Tar = t < 0 ? 0 : t;
  }
  GetUiItemSet() {
    return this.Lar;
  }
  ClearUiItem() {
    this.Lar.clear();
  }
  SetUiItem(t) {
    this.Lar.add(t);
  }
  DeleteUiItem(t) {
    this.Lar.delete(t);
  }
  TryChangeState(t) {
    return t !== this.State && (this.StateCount += t ? 1 : -1, this.UpdateRedDotUIActive(), true);
  }
  UpdateRedDotUIActive() {
    this.SetUIItemActive(this.State);
  }
  SetUIItemActive(t) {
    for (const e of this.Lar) {
      if (e.IsValid()) {
        e.SetUIActive(t);
      }
    }
  }
  OnChildrenStateChange(t) {
    var e = this.State;
    this.StateCount += t ? 1 : -1;
    return e !== this.State && (this.UpdateRedDotUIActive(), true);
  }
}
(exports.RedDotData = RedDotData).StateByGm = true;
class RedDotBase {
  constructor() {
    this.Name = undefined;
    this.dce = true;
    this.NQ = new Map();
    this.Dar = undefined;
    this.fbo = undefined;
    this.Rar = () => {
      this.Uar(true);
    };
    this.Aar = () => {
      this.Uar(false);
    };
    this.Par = (...t) => {
      let e = 0;
      if (t && typeof t[0] == "number" && this.IsAllEventParamAsUId()) {
        e = t[0];
        this.xar(e);
        this.Arl(e);
      } else if (this.IsMultiple()) {
        this.NQ.forEach((t, e) => {
          this.Arl(e);
        });
      } else {
        this.xar(e);
        this.Arl(e);
      }
    };
    this.war = (t = 0) => {
      this.fbo?.Start();
      var e = this.OnCheck(t);
      var i = this.ANo(t);
      if (i) {
        if (i.TryChangeState(e)) {
          if (this.Dar) {
            this.Dar(i.State, t);
          }
          this.bar(e, t);
        }
        this.fbo?.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RedDot", 16, "Check失败，红点数据未绑定到事件上！", ["Name", this.Name], ["uId", t]);
      }
    };
  }
  get Gar() {
    return ModelManager_1.ModelManager.RedDotModel.GetRedDotTree(this.Name);
  }
  qar() {
    for (const t of this.Nar()) {
      EventSystem_1.EventSystem.Add(t, this.Par);
    }
  }
  SetRedDotActiveByGm(t) {
    this.Uar(t);
  }
  Oar(t) {
    if (this.dce = t) {
      this.qar();
    } else {
      var e;
      for (const s of this.Nar()) {
        EventSystem_1.EventSystem.Remove(s, this.Par);
      }
      for ([, e] of this.NQ) {
        e.SetUIItemActive(false);
      }
    }
    var i;
    for ([i] of this.Gar.ChildMap) {
      i.Oar(t);
    }
  }
  kar(t) {
    if (this.Gar.Parent !== undefined && !this.Gar.Parent.Element.dce && t) {
      return false;
    }
    return true;
  }
  Uar(t) {
    if (t !== this.dce && this.kar(t) && (this.Oar(t), t && this.Far(), this.Gar.Parent !== undefined)) {
      this.Gar.Parent.Element.Har(this, t);
    }
  }
  Init(t) {
    this.Name = t;
    this.qar();
    var e = this.GetActiveEvents();
    if (e) {
      for (const i of e) {
        EventSystem_1.EventSystem.Add(i, this.Rar);
      }
    }
    e = this.GetDisActiveEvents();
    if (e) {
      for (const s of e) {
        EventSystem_1.EventSystem.Add(s, this.Aar);
      }
    }
    this.fbo = Stats_1.Stat.CreateNoFlameGraph("RedDot" + t);
  }
  Arl(t = 0) {
    RedDotSystem_1.RedDotSystem.PushToEventQueue(this.war, t, this.Name);
  }
  Har(t, e) {
    for (var [i, s] of t.NQ) {
      i = this.NQ.get(i);
      if (i) {
        if (e) {
          i.StateCount += s.StateCount;
        } else {
          i.StateCount -= s.StateCount;
        }
        i.UpdateRedDotUIActive();
      }
    }
    if (this.Gar.Parent !== undefined) {
      this.Gar.Parent.Element.Har(t, e);
    }
  }
  Far() {
    for (var [t, e] of this.NQ) {
      var i = this.OnCheck(t);
      e.StateCount = i ? 1 : 0;
      if (i) {
        e.SetUIItemActive(true);
        this.bar(i, t);
      }
    }
    var s;
    for ([s] of this.Gar.ChildMap) {
      s.Far();
    }
  }
  bar(t, e = 0) {
    var i;
    var s = this.Gar.Parent?.Element;
    if (s && (e = s.IsMultiple() ? e : 0, s.xar(e), (i = s.ANo(e)).OnChildrenStateChange(t))) {
      if (s.Dar) {
        s.Dar(i.State, e);
      }
      s.bar(t, e);
    }
  }
  ANo(t) {
    return this.NQ.get(t);
  }
  xar(t = 0) {
    let e = this.NQ.get(t);
    if (!e) {
      e = new RedDotData();
      this.NQ.set(t, e);
      this.war(t);
    }
    return e;
  }
  Nar() {
    return this.OnGetEvents() ?? [];
  }
  BindUi(t = 0, e, i) {
    this.xar(t);
    this.ANo(t).SetUiItem(e);
    this.Dar = i;
    this.UpdateState(t);
  }
  UnBindGivenUi(t = 0, e) {
    t = this.ANo(t);
    if (t) {
      t.DeleteUiItem(e);
    }
  }
  UnBindUi() {
    this.NQ.forEach(t => {
      t.ClearUiItem();
    });
    this.Dar = undefined;
  }
  UnBindGivenUiAndDeleteData(t = 0, e) {
    var i = this.ANo(t);
    if (i !== undefined && !(i.DeleteUiItem(e), i.GetUiItemSet().size > 0)) {
      RedDotSystem_1.RedDotSystem.PopRedDotEventData(t, this.Name);
      this.NQ.delete(t);
    }
  }
  UnBindUiAndClearData() {
    this.UnBindUi();
    for (const t of this.NQ.keys()) {
      RedDotSystem_1.RedDotSystem.PopRedDotEventData(t, this.Name);
    }
    this.NQ.clear();
  }
  UpdateState(t = 0) {
    var e = this.ANo(t);
    e.UpdateRedDotUIActive();
    if (this.Dar) {
      this.Dar(e.State, t);
    }
  }
  IsRedDotActive() {
    for (const t of this.NQ.values()) {
      if (t.State) {
        return true;
      }
    }
    return false;
  }
  GetParentName() {
    return this.OnGetParentName();
  }
  OnGetEvents() {}
  GetActiveEvents() {}
  GetDisActiveEvents() {}
  OnCheck(t = 0) {
    return false;
  }
  IsMultiple() {
    return false;
  }
  OnGetParentName() {}
  IsAllEventParamAsUId() {
    return true;
  }
  ToRedDotString() {
    var t;
    var e;
    var i = new StringBuilder_1.StringBuilder();
    var s = new StringBuilder_1.StringBuilder();
    var r = new StringBuilder_1.StringBuilder();
    for ([t, e] of this.NQ) {
      r.Clear();
      for (const n of e.GetUiItemSet()) {
        r.Append(n.GetDisplayName() + ", ");
      }
      s.Append(`{uid:${t}, stateCount:${e.StateCount} uiItem:[${r.ToString()}] }`);
    }
    var h;
    var o = new StringBuilder_1.StringBuilder();
    for ([h] of this.Gar.ChildMap) {
      o.Append(h.Name + ", ");
    }
    i.Append(`[红点:${this.Name} 父红点:${this.Gar.Parent?.Element.Name} 子红点:{${o.ToString()}}  数据:{ ${s.ToString()} }]
`);
    return i.ToString();
  }
  PrintStateDebugString() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RedDot", 69, "=======子红点状态打印开始=======：", ["Name", this.Name]);
    }
    for (var [t, e] of this.NQ) {
      var i = e.GetUiItemSet();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RedDot", 69, "红点状态数据：", ["Uid", t], ["State", e.State], ["StateCount", e.StateCount], ["UiItemSize", i.size]);
      }
      for (const s of i) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RedDot", 69, "受控制的UI对象", ["UiItem", s.GetDisplayName()]);
        }
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RedDot", 69, "=======子红点状态打印结束=======：", ["Name", this.Name]);
    }
  }
  UpdateAllRedDotData() {
    this.NQ.forEach((t, e) => {
      this.Arl(e);
    });
  }
}
exports.RedDotBase = RedDotBase;
//# sourceMappingURL=RedDotBase.js.map