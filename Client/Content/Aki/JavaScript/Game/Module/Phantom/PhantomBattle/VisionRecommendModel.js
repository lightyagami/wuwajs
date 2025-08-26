"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecommendModel = exports.VisionSelectRecommendData = exports.AttrRecommendInfo = exports.VisionAttrRecommendInfo = exports.VisionFetterRecommendInfo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomBattleDefine_1 = require("./PhantomBattleDefine");
const VisionFetterDescItem_1 = require("./View/VisionFetterDescItem");
class VisionFetterRecommendInfo {
  constructor() {
    this.HHa = 0;
    this.$wu = 0;
    this.bo_ = 0;
    this.Wwu = 0;
    this.Qwu = [];
  }
  GetRecommendFetterGroupId() {
    return this.HHa;
  }
  GetSpecialFetterSubGroupId() {
    return this.$wu;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var e = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return e.toFixed(1) + "%";
    }
  }
  GetFetterCountList() {
    return this.Qwu;
  }
  GetFetterType() {
    return this.Wwu;
  }
  Phrase(e) {
    this.Kwu(e);
    this.bo_ = e.PGs;
    this.Wwu = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.HHa).FetterType;
  }
  Kwu(e) {
    this.Qwu = [];
    e = e.Gwu;
    if (e.length !== 2 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 75, "推荐的套装羁绊数量异常，请确认配置与统计");
    }
    let t = undefined;
    let r = undefined;
    for (const s of e) {
      var o = s.rL_;
      var n = s.Fwu;
      var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(o);
      if (i.FetterType === 1) {
        t = o;
      } else {
        r = o;
      }
      var i = i.FetterMap.get(n);
      if (i) {
        this.Qwu.push({
          GroupId: o,
          Count: n,
          FetterId: i
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 75, "推荐的套装没有对应的羁绊效果", ["Group", o], ["Count", n]);
      }
    }
    this.HHa = t ?? e[0]?.rL_ ?? 0;
    this.$wu = t ? r ?? 0 : 0;
  }
}
exports.VisionFetterRecommendInfo = VisionFetterRecommendInfo;
class VisionAttrRecommendInfo {
  constructor() {
    this.Lo_ = new Array();
    this.Ao_ = new Array();
  }
  GetMainAttrRecommendInfo() {
    return this.Lo_;
  }
  GetSubAttrRecommendInfo() {
    return this.Ao_;
  }
}
exports.VisionAttrRecommendInfo = VisionAttrRecommendInfo;
class AttrRecommendInfo {
  constructor() {
    this.gXo = 0;
    this.bo_ = 0;
    this.xo_ = 0;
  }
  GetAttrId() {
    return this.gXo;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var e = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return e.toFixed(1) + "%";
    }
  }
  GetAddType() {
    return this.xo_;
  }
  Phrase(e) {
    this.gXo = e.oL_;
    this.bo_ = e.PGs;
    this.xo_ = e.nL_;
  }
}
exports.AttrRecommendInfo = AttrRecommendInfo;
class VisionSelectRecommendData {
  constructor() {
    this.AttrId = 0;
    this.AddType = 0;
  }
}
exports.VisionSelectRecommendData = VisionSelectRecommendData;
class VisionRecommendModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ro_ = new Map();
    this.Po_ = new Map();
    this.CurrentSelectMainAttrArray = new Array();
    this.CurrentSelectSubAttrArray = new Array();
    this.Xwu = (e, t, r, o, n) => {
      e = e.GetFetterGroupId() === o;
      t = t.GetFetterGroupId() === o;
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Ywu = (e, t) => t.GetQuality() - e.GetQuality();
    this.zwu = (e, t, r) => {
      e = e.GetIfHaveRecommendMainProp(r);
      t = t.GetIfHaveRecommendMainProp(r);
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Jwu = (e, t, r) => {
      e = e.GetIfHaveRecommendSubProp(r);
      t = t.GetIfHaveRecommendSubProp(r);
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Zwu = (e, t) => t.GetPhantomLevel() - e.GetPhantomLevel();
    this.jRt = (e, t, r, o, n, i) => {
      e = n.includes(e.GetUniqueId());
      n = n.includes(t.GetUniqueId());
      if (e && !n) {
        return -1;
      } else if (n && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.CLu = (e, t) => t.GetConfigId() - e.GetConfigId();
    this.eNu = (e, t, r) => {
      e = e.GetFetterGroupId();
      if (e === t) {
        return 2;
      } else if (e === r) {
        return 1;
      } else {
        return 0;
      }
    };
    this.tNu = (e, t, r, o, n, i) => {
      e = this.eNu(e, o, i);
      return this.eNu(t, o, i) - e;
    };
    this.UU1 = (e, t) => {
      e = e.GetCost();
      return t.GetCost() - e;
    };
    this.vLu = [this.Xwu, this.Ywu, this.zwu, this.Jwu, this.Zwu, this.jRt, this.CLu];
    this.yLu = [this.tNu, this.UU1, this.Ywu, this.zwu, this.Jwu, this.Zwu, this.jRt, this.CLu];
  }
  OnRoleRecommendData(e, t) {
    if (t && t.hL_) {
      var r = new Array();
      for (const n of t.hL_) {
        var o = new VisionFetterRecommendInfo();
        o.Phrase(n);
        r.push(o);
      }
      this.Ro_.set(e, r);
    }
  }
  OnRoleRecommendAttrData(e, t) {
    if (t && t.lL_) {
      if (!this.Po_.get(e)) {
        const i = new Map();
        this.Po_.set(e, i);
      }
      const i = this.Po_.get(e);
      if (i) {
        for (const s of t.lL_) {
          var r = new VisionAttrRecommendInfo();
          for (const a of s.sL_) {
            var o = new AttrRecommendInfo();
            o.Phrase(a);
            r.GetMainAttrRecommendInfo().push(o);
          }
          for (const h of s.aL_) {
            var n = new AttrRecommendInfo();
            n.Phrase(h);
            r.GetSubAttrRecommendInfo().push(n);
          }
          i.set(s.N2s, r);
        }
      }
    }
  }
  GetRoleFetterRecommendInfo(e) {
    return this.Ro_.get(e);
  }
  GetRoleCostAttrRecommendInfo(e, t) {
    e = this.Po_.get(e);
    if (e) {
      return e.get(t);
    }
  }
  CheckVisionOneKeyEquipRedDot(r) {
    var o;
    var n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
    if (n && !n.IsTrialRole()) {
      let e = false;
      let t = 0;
      for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(r).GetIncrIdList()) {
        if (s === 0) {
          e = true;
        } else if (o = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s)) {
          t += o.GetCost();
        }
      }
      if (e) {
        var i = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost() - t;
        var n = this.Bo_(r);
        if (n) {
          for (const a of n) {
            if (a.GetEquipRoleId() !== r && a.GetCost() <= i) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  GetRecommendEquipUniqueIdList(e, t) {
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var o = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecommendRuleLevel();
    let n = PhantomBattleDefine_1.costListRecommendLowLevel;
    if (o <= r) {
      n = PhantomBattleDefine_1.costListRecommendHighLevel;
    }
    var o = t.GetRecommendFetterGroupId();
    var r = t.GetSpecialFetterSubGroupId();
    var i = [0, 0, 0, 0, 0];
    if (t.GetFetterType() === 1) {
      this.MLu(e, o, r, n, i);
    } else {
      this.ELu(e, o, n, i);
    }
    return i;
  }
  MLu(e, r, o, n, i) {
    var s = this.Bo_(e);
    if (s) {
      this.TLu(s, this.yLu, e, r, o);
      let t = 0;
      var a = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      var h = i.length;
      for (let e = 0; e < h && !(t >= a); e++) {
        var c = n[e];
        var f = this.bLu(i) ? [r] : [];
        if ((c = this.qo_(i, c, s, false, f)) !== 0) {
          t += ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(c).GetCost();
          i[e] = c;
        }
      }
    }
    return i;
  }
  bLu(e) {
    var t;
    var r;
    var o;
    var n = new Map();
    for (const s of e) {
      if (!(s <= 0)) {
        t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s).GetFetterGroupId();
        n.set(t, (n.get(t) ?? 0) + 1);
      }
    }
    for ([r, o] of n) {
      if (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(r).FetterType === 1) {
        var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupMaxCountById(r);
        if (o >= i) {
          return true;
        }
      }
    }
    return false;
  }
  ELu(e, r, o, n) {
    var i = this.Bo_(e);
    if (i) {
      this.TLu(i, this.vLu, e, r);
      var s = n.length;
      let t = 0;
      var a = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      for (let e = 0; e < s && !(t >= a); e++) {
        var h = o[e];
        var h = this.qo_(n, h, i, true, []);
        if (h !== 0) {
          t += ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(h).GetCost();
          n[e] = h;
        }
      }
    }
    return n;
  }
  qo_(t, r, o, n, i) {
    const s = new Array();
    t.forEach(e => {
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
      if (e) {
        s.push(e.GetMonsterId());
      }
    });
    var a = o.length;
    let h = 0;
    var c = new Array();
    for (let e = 0; e < a; e++) {
      var f = o[e];
      if (!t.includes(f?.GetUniqueId()) && !(n ? f.GetCost() !== r : f.GetCost() > r) && !i.includes(f.GetFetterGroupId())) {
        var u = f.GetMonsterId();
        if (!s.includes(u)) {
          h = f.GetUniqueId();
          break;
        }
        c.push(f.GetUniqueId());
      }
    }
    return h = h === 0 && c.length > 0 ? c[0] : h;
  }
  Bo_(e) {
    var t;
    var r = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (r.length !== 0) {
      const o = new Array();
      for (const n of r) {
        if (!ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(n.GetUniqueId())) {
          t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(n.GetUniqueId());
          o.push(t);
        }
      }
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList().forEach(e => {
        e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
        if (e) {
          o.push(e);
        }
      });
      return o;
    }
  }
  TLu(e, n, i, s, a) {
    const h = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(i).GetIncrIdList();
    e.sort((e, t) => {
      for (const o of n) {
        var r = o(e, t, i, s, h, a);
        if (r !== 0) {
          return r;
        }
      }
      return 0;
    });
  }
  GetFetterDescByRecommendInfo(e) {
    var t = new Array();
    for (const o of e.GetFetterCountList()) {
      var r = new VisionFetterDescItem_1.VisionFetterDescData();
      r.Key = o.Count;
      r.Value = o.FetterId;
      t.push(r);
    }
    return t;
  }
}
exports.VisionRecommendModel = VisionRecommendModel;
//# sourceMappingURL=VisionRecommendModel.js.map