"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiTemplateComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const LguiUtil_1 = require("../LguiUtil");
class MultiTemplateComponent {
  constructor(t, e) {
    this.xTt = undefined;
    this.ypt = [];
    this.Kvf = new Map();
    this.Xvf = new Map();
    this.Yvf = new Map();
    this.zvf = [];
    this.xTt = t;
    for (var [i, o] of this.Kvf = e) {
      this.Xvf.set(i, []);
      o.SetUIActive(false);
    }
  }
  RefreshByData(t) {
    if (this.CheckDataListValid(t)) {
      this.Jvf();
      this.ypt = Array.from(t);
      this.Zvf();
      this.RefreshDirectly();
    }
  }
  RefreshDirectly() {
    if (this.zvf.length !== this.ypt.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RefreshDirectly] Display items length is not equal to data list length", ["displayItemsLength", this.zvf.length], ["dataListLength", this.ypt.length]);
      }
    } else {
      for (let t = 0; t < this.ypt.length; t++) {
        var e = this.ypt[t];
        var i = this.zvf[t];
        var o = this.Yvf.get(i);
        if (o) {
          o.Refresh(e.Data);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RefreshDirectly] Proxy not found for display item", ["index", t], ["item", i]);
        }
      }
    }
  }
  Zvf() {
    for (let e = 0; e < this.ypt.length; e++) {
      var i = this.ypt[e];
      var o = i.GetTemplateIndex();
      let t = this.eyf(o);
      if (!t) {
        if (!(t = this.tyf(o))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [AllocateDisplayItems] Failed to create item by template index", ["templateIndex", o]);
          }
          continue;
        }
        i = i.CreateProxy();
        this.Yvf.set(t, i);
        i.CreateByActor(t.GetOwner());
      }
      i = this.Yvf.get(t);
      if (i) {
        t.SetUIActive(true);
        t.SetHierarchyIndex(e);
        i.GridIndex = e;
        this.zvf.push(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [AllocateDisplayItems] Proxy not found in proxy items", ["item", t], ["templateIndex", o]);
      }
    }
  }
  eyf(t) {
    t = this.Xvf.get(t);
    if (t) {
      return t.pop();
    }
  }
  tyf(t) {
    t = this.Kvf.get(t);
    if (t) {
      return LguiUtil_1.LguiUtil.CopyItem(t, this.xTt);
    }
  }
  Jvf() {
    if (this.zvf.length !== 0) {
      for (let t = 0; t < this.zvf.length; t++) {
        this.iyf(t);
      }
      this.zvf.length = 0;
    }
  }
  iyf(t) {
    var e;
    var i;
    var o;
    var n;
    if (t < 0 || t >= this.zvf.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RecycleItemByIndex] Display index out of range", ["displayIndex", t], ["displayItemsLength", this.zvf.length]);
      }
    } else if (e = this.zvf[t]) {
      if (i = this.Yvf.get(e)) {
        o = this.ypt[t].GetTemplateIndex();
        if (n = this.Xvf.get(o)) {
          e.SetUIActive(false);
          n.push(e);
          i.Clear();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RecycleItemByIndex] Template index not found in pool items", ["templateIndex", o]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RecycleItemByIndex] Proxy not found in proxy items", ["displayIndex", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RecycleItemByIndex] Item not found in display items", ["displayIndex", t]);
    }
  }
  CheckDataListValid(e) {
    for (let t = 0; t < e.length; t++) {
      var i = e[t].GetTemplateIndex();
      if (!this.Kvf.has(i)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [CheckDataListValid] Template index not found in template items", ["dataIndex", t], ["templateIndex", i]);
        }
        return false;
      }
    }
    return true;
  }
  GetDisplayItems() {
    return this.zvf;
  }
  GetItemByDisplayIndex(t) {
    return this.zvf[t];
  }
  GetProxyByDisplayIndex(t) {
    t = this.zvf[t];
    if (t) {
      return this.Yvf.get(t);
    }
  }
  GetTemplateIndexByDisplayIndex(t) {
    if (t < 0 || t >= this.ypt.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [GetTemplateIndexByDisplayIndex] Display index out of range", ["displayIndex", t], ["dataListLength", this.ypt.length]);
      }
      return -1;
    } else {
      return this.ypt[t].GetTemplateIndex();
    }
  }
}
exports.MultiTemplateComponent = MultiTemplateComponent;
//# sourceMappingURL=MultiTemplateComponent.js.map