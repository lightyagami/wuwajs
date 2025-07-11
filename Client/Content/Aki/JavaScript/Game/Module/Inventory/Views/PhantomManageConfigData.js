"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InventoryDefine_1 = require("../InventoryDefine");
class PhantomManageConfigData {
  constructor(t) {
    this.E9 = Protocol_1.Aki.Protocol._xu.Proto_AutoLock;
    this.Xy = -1;
    this.Tqu = false;
    this.he = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(InventoryDefine_1.EMPTY_CONFIG_TEXT_ID);
    this.bqu = new Map();
    this.Xy = t;
    t = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const e of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).RuleList) {
      this.bqu.set(e, []);
    }
  }
  GetIndex() {
    return this.Xy;
  }
  GetIndexString() {
    var t = this.Xy + 1;
    if (t < 10) {
      return "0" + t;
    } else {
      return t.toString();
    }
  }
  GetIsOn() {
    return this.Tqu;
  }
  SetIsOn(t) {
    this.Tqu = t;
  }
  GetName() {
    return this.he;
  }
  SetName(t) {
    this.he = t;
  }
  GetType() {
    return this.E9;
  }
  GetValueListByRuleId(t) {
    return this.bqu.get(t) ?? [];
  }
  GetRuleIdMapValueList() {
    return new Map(this.bqu);
  }
  SetRuleIdMapValueList(t) {
    this.bqu.clear();
    var e = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const r of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e).RuleList) {
      this.bqu.set(r, t.get(r) ?? []);
    }
  }
  SetType(t) {
    this.E9 = t;
  }
  IsEmpty() {
    if (this.bqu.size !== 0) {
      for (const t of this.bqu.values()) {
        if (t.length !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  IsEqual(t, e) {
    if (!e || t !== this.Tqu) {
      return false;
    }
    for (const [n, i] of this.bqu) {
      var r = e.get(n);
      if (!r || r.length !== i.length || !r.every((t, e) => t === i[e])) {
        return false;
      }
    }
    return true;
  }
  Parse(t) {
    this.Reset(true, true);
    this.Tqu = t.qjn;
    this.he = t.H8n;
    this.Xy = t.c5n;
    for (const e of t.axu) {
      this.bqu.set(e.hxu, e.lxu);
    }
  }
  Integrate() {
    var t;
    var e;
    var r = [];
    for ([t, e] of this.bqu) {
      r.push({
        hxu: t,
        lxu: e
      });
    }
    return {
      c5n: this.Xy,
      qjn: this.Tqu,
      H8n: this.he,
      axu: r
    };
  }
  Reset(t, e) {
    this.Xy = t ? -1 : this.Xy;
    this.Tqu = false;
    this.he = e ? ConfigManager_1.ConfigManager.TextConfig.GetMultiText(InventoryDefine_1.EMPTY_CONFIG_TEXT_ID) : this.he;
    this.bqu.clear();
    t = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const r of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).RuleList) {
      this.bqu.set(r, []);
    }
  }
  Clone() {
    var t = new PhantomManageConfigData(this.Xy);
    t.Tqu = this.Tqu;
    t.he = this.he;
    t.E9 = this.E9;
    t.bqu = new Map(this.bqu);
    return t;
  }
}
exports.PhantomManageConfigData = PhantomManageConfigData;
//# sourceMappingURL=PhantomManageConfigData.js.map