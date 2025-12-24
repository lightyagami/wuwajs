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
    this.cCf = new Map();
    this.dCf = new Map();
    this.mCf = new Map();
    this.fCf = [];
    this.xTt = t;
    for (var [i, o] of this.cCf = e) {
      this.dCf.set(i, []);
      o.SetUIActive(false);
    }
  }
  RefreshByData(t) {
    if (this.CheckDataListValid(t)) {
      this.gCf();
      this.ypt = Array.from(t);
      this.CCf();
      this.RefreshDirectly();
    }
  }
  RefreshDirectly() {
    if (this.fCf.length !== this.ypt.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RefreshDirectly] Display items length is not equal to data list length", ["displayItemsLength", this.fCf.length], ["dataListLength", this.ypt.length]);
      }
    } else {
      for (let t = 0; t < this.ypt.length; t++) {
        var e = this.ypt[t];
        var i = this.fCf[t];
        var o = this.mCf.get(i);
        if (o) {
          o.Refresh(e.Data);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RefreshDirectly] Proxy not found for display item", ["index", t], ["item", i]);
        }
      }
    }
  }
  CCf() {
    for (let e = 0; e < this.ypt.length; e++) {
      var i = this.ypt[e];
      var o = i.GetTemplateIndex();
      let t = this.pCf(o);
      if (!t) {
        if (!(t = this.vCf(o))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [AllocateDisplayItems] Failed to create item by template index", ["templateIndex", o]);
          }
          continue;
        }
        i = i.CreateProxy();
        this.mCf.set(t, i);
        i.CreateByActor(t.GetOwner());
      }
      i = this.mCf.get(t);
      if (i) {
        t.SetUIActive(true);
        t.SetHierarchyIndex(e);
        i.GridIndex = e;
        this.fCf.push(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [AllocateDisplayItems] Proxy not found in proxy items", ["item", t], ["templateIndex", o]);
      }
    }
  }
  pCf(t) {
    t = this.dCf.get(t);
    if (t) {
      return t.pop();
    }
  }
  vCf(t) {
    t = this.cCf.get(t);
    if (t) {
      return LguiUtil_1.LguiUtil.CopyItem(t, this.xTt);
    }
  }
  gCf() {
    if (this.fCf.length !== 0) {
      for (let t = 0; t < this.fCf.length; t++) {
        this.yCf(t);
      }
      this.fCf.length = 0;
    }
  }
  yCf(t) {
    var e;
    var i;
    var o;
    var n;
    if (t < 0 || t >= this.fCf.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [RecycleItemByIndex] Display index out of range", ["displayIndex", t], ["displayItemsLength", this.fCf.length]);
      }
    } else if (e = this.fCf[t]) {
      if (i = this.mCf.get(e)) {
        o = this.ypt[t].GetTemplateIndex();
        if (n = this.dCf.get(o)) {
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
      if (!this.cCf.has(i)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateComponent", 43, "[MultiTemplateComponent] [CheckDataListValid] Template index not found in template items", ["dataIndex", t], ["templateIndex", i]);
        }
        return false;
      }
    }
    return true;
  }
  GetDisplayItems() {
    return this.fCf;
  }
  GetItemByDisplayIndex(t) {
    return this.fCf[t];
  }
  GetProxyByDisplayIndex(t) {
    t = this.fCf[t];
    if (t) {
      return this.mCf.get(t);
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