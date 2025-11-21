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
    this.E9 = Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock;
    this.Xy = -1;
    this.Xqu = false;
    this.he = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(InventoryDefine_1.EMPTY_CONFIG_TEXT_ID);
    this.Yqu = new Map();
    this.qdd = -1;
    this.Xy = t;
    t = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const e of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).RuleList) {
      this.Yqu.set(e, []);
    }
  }
  SetDisplayIndex(t) {
    this.qdd = t;
  }
  GetDisplayIndex() {
    return this.qdd;
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
    return this.Xqu;
  }
  SetIsOn(t) {
    this.Xqu = t;
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
    return this.Yqu.get(t) ?? [];
  }
  GetRuleIdMapValueList() {
    return new Map(this.Yqu);
  }
  SetRuleIdMapValueList(t) {
    this.Yqu.clear();
    var e = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const r of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e).RuleList) {
      this.Yqu.set(r, t.get(r) ?? []);
    }
  }
  SetType(t) {
    this.E9 = t;
  }
  IsEmpty() {
    if (this.Yqu.size !== 0) {
      for (const t of this.Yqu.values()) {
        if (t.length !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  IsEqual(t, e) {
    if (!e || t !== this.Xqu) {
      return false;
    }
    for (const [i, n] of this.Yqu) {
      var r = e.get(i);
      if (!r || r.length !== n.length || !r.every((t, e) => t === n[e])) {
        return false;
      }
    }
    return true;
  }
  Parse(t) {
    this.Reset(true, true);
    this.Xqu = t.qjn;
    this.he = t.H8n;
    this.Xy = t.c5n;
    for (const e of t.Dxu) {
      this.Yqu.set(e.Bxu, e.kxu);
    }
  }
  Integrate() {
    var t;
    var e;
    var r = [];
    for ([t, e] of this.Yqu) {
      r.push({
        Bxu: t,
        kxu: e
      });
    }
    return {
      c5n: this.Xy,
      qjn: this.Xqu,
      H8n: this.he,
      Dxu: r
    };
  }
  Reset(t, e) {
    this.Xy = t ? -1 : this.Xy;
    this.Xqu = false;
    this.he = e ? ConfigManager_1.ConfigManager.TextConfig.GetMultiText(InventoryDefine_1.EMPTY_CONFIG_TEXT_ID) : this.he;
    this.Yqu.clear();
    t = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const r of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).RuleList) {
      this.Yqu.set(r, []);
    }
  }
  Clone() {
    var t = new PhantomManageConfigData(this.Xy);
    t.Xqu = this.Xqu;
    t.he = this.he;
    t.E9 = this.E9;
    t.Yqu = new Map(this.Yqu);
    return t;
  }
}
exports.PhantomManageConfigData = PhantomManageConfigData;
//# sourceMappingURL=PhantomManageConfigData.js.map