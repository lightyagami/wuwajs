"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecommendModel = exports.VisionMainSelectPhantomData = exports.VisionSelectRecommendData = exports.MainPhantomRecommendInfo = exports.AttrRecommendInfo = exports.VisionMainPhantomInfo = exports.VisionAttrRecommendInfo = exports.VisionFetterRecommendInfo = undefined;
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
    var t = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return t.toFixed(1) + "%";
    }
  }
  GetFetterCountList() {
    return this.Qwu;
  }
  GetFetterType() {
    return this.Wwu;
  }
  Phrase(t) {
    this.Kwu(t);
    this.bo_ = t.PGs;
    this.Wwu = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.HHa).FetterType;
  }
  Kwu(t) {
    this.Qwu = [];
    t = t.Gwu;
    if (t.length !== 2 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 75, "推荐的套装羁绊数量异常，请确认配置与统计");
    }
    let e = undefined;
    let r = undefined;
    for (const s of t) {
      var n = s.rL_;
      var o = s.Fwu;
      var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(n);
      if (i.FetterType === 1) {
        e = n;
      } else {
        r = n;
      }
      var i = i.FetterMap.get(o);
      if (i) {
        this.Qwu.push({
          GroupId: n,
          Count: o,
          FetterId: i
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 75, "推荐的套装没有对应的羁绊效果", ["Group", n], ["Count", o]);
      }
    }
    this.HHa = e ?? t[0]?.rL_ ?? 0;
    this.$wu = e ? r ?? 0 : 0;
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
class VisionMainPhantomInfo {
  constructor() {
    this.srm = new Array();
  }
  GetMainPhantomInfo() {
    return this.srm;
  }
}
exports.VisionMainPhantomInfo = VisionMainPhantomInfo;
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
    var t = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return t.toFixed(1) + "%";
    }
  }
  GetAddType() {
    return this.xo_;
  }
  Phrase(t) {
    this.gXo = t.oL_;
    this.bo_ = t.PGs;
    this.xo_ = t.nL_;
  }
}
exports.AttrRecommendInfo = AttrRecommendInfo;
class MainPhantomRecommendInfo {
  constructor() {
    this.bo_ = 0;
    this.u8i = 0;
    this.HHa = 0;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var t = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return t.toFixed(1) + "%";
    }
  }
  GetMonsterId() {
    return this.u8i;
  }
  GetFetterGroupId() {
    return this.HHa;
  }
  Phrase(t) {
    this.bo_ = t.PGs;
    this.u8i = t.TIs;
    this.HHa = t.Kws;
  }
}
exports.MainPhantomRecommendInfo = MainPhantomRecommendInfo;
class VisionSelectRecommendData {
  constructor() {
    this.AttrId = 0;
    this.AddType = 0;
  }
}
exports.VisionSelectRecommendData = VisionSelectRecommendData;
class VisionMainSelectPhantomData {
  constructor() {
    this.MonsterId = 0;
    this.FetterGroupId = 0;
  }
}
exports.VisionMainSelectPhantomData = VisionMainSelectPhantomData;
class VisionRecommendModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ro_ = new Map();
    this.Po_ = new Map();
    this.arm = new Map();
    this.CurrentSelectMainAttrArray = new Array();
    this.CurrentSelectSubAttrArray = new Array();
    this.CurrentMainPhantom = undefined;
    this.Xwu = (t, e, r, n, o) => {
      t = t.GetFetterGroupId() === n;
      e = e.GetFetterGroupId() === n;
      if (t && !e) {
        return -1;
      } else if (e && !t) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Ywu = (t, e) => e.GetQuality() - t.GetQuality();
    this.zwu = (t, e, r) => {
      t = t.GetIfHaveRecommendMainProp(r);
      e = e.GetIfHaveRecommendMainProp(r);
      if (t && !e) {
        return -1;
      } else if (e && !t) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Jwu = (t, e, r) => {
      t = t.GetIfHaveRecommendSubProp(r);
      e = e.GetIfHaveRecommendSubProp(r);
      if (t && !e) {
        return -1;
      } else if (e && !t) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Zwu = (t, e) => e.GetPhantomLevel() - t.GetPhantomLevel();
    this.jRt = (t, e, r, n, o, i) => {
      t = o.includes(t.GetUniqueId());
      o = o.includes(e.GetUniqueId());
      if (t && !o) {
        return -1;
      } else if (o && !t) {
        return 1;
      } else {
        return 0;
      }
    };
    this.CLu = (t, e) => e.GetConfigId() - t.GetConfigId();
    this.VFu = (t, e, r) => {
      t = t.GetFetterGroupId();
      if (t === e) {
        return 2;
      } else if (t === r) {
        return 1;
      } else {
        return 0;
      }
    };
    this.jFu = (t, e, r, n, o, i) => {
      t = this.VFu(t, n, i);
      return this.VFu(e, n, i) - t;
    };
    this.UU1 = (t, e) => {
      t = t.GetCost();
      return e.GetCost() - t;
    };
    this.vLu = [this.Xwu, this.Ywu, this.zwu, this.Jwu, this.Zwu, this.jRt, this.CLu];
    this.yLu = [this.jFu, this.UU1, this.Ywu, this.zwu, this.Jwu, this.Zwu, this.jRt, this.CLu];
  }
  OnRoleRecommendData(t, e) {
    if (e && e.hL_) {
      var r = new Array();
      for (const o of e.hL_) {
        var n = new VisionFetterRecommendInfo();
        n.Phrase(o);
        r.push(n);
      }
      this.Ro_.set(t, r);
    }
  }
  OnRoleRecommendAttrData(t, e) {
    if (e && e.lL_) {
      if (!this.Po_.get(t)) {
        const i = new Map();
        this.Po_.set(t, i);
      }
      const i = this.Po_.get(t);
      if (i) {
        for (const s of e.lL_) {
          var r = new VisionAttrRecommendInfo();
          for (const a of s.sL_) {
            var n = new AttrRecommendInfo();
            n.Phrase(a);
            r.GetMainAttrRecommendInfo().push(n);
          }
          for (const h of s.aL_) {
            var o = new AttrRecommendInfo();
            o.Phrase(h);
            r.GetSubAttrRecommendInfo().push(o);
          }
          i.set(s.N2s, r);
        }
      }
    }
  }
  OnRoleMainPhantomRecommendData(t, e) {
    if (e && e.Zim) {
      var r = new VisionMainPhantomInfo();
      for (const o of e.Zim) {
        var n = new MainPhantomRecommendInfo();
        n.Phrase(o);
        r.GetMainPhantomInfo().push(n);
      }
      this.arm.set(t, r);
      this.SortRoleMainPhantomRecommendByUsage(t);
    }
  }
  SortRoleMainPhantomRecommendByUsage(t) {
    t = this.arm.get(t);
    if (t) {
      t.GetMainPhantomInfo().sort((t, e) => e.GetUsage() - t.GetUsage());
    }
  }
  GetRoleFetterRecommendInfo(t) {
    return this.Ro_.get(t);
  }
  GetRoleCostAttrRecommendInfo(t, e) {
    t = this.Po_.get(t);
    if (t) {
      return t.get(e);
    }
  }
  GetRoleMainPhantomRecommendInfo(t) {
    return this.arm.get(t);
  }
  CheckVisionOneKeyEquipRedDot(r) {
    var n;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
    if (o && !o.IsTrialRole()) {
      let t = false;
      let e = 0;
      for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(r).GetIncrIdList()) {
        if (s === 0) {
          t = true;
        } else if (n = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s)) {
          e += n.GetCost();
        }
      }
      if (t) {
        var i = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost() - e;
        var o = this.Bo_(r);
        if (o) {
          for (const a of o) {
            if (a.GetEquipRoleId() !== r && a.GetCost() <= i) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  GetRecommendEquipUniqueIdList(t, e) {
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecommendRuleLevel();
    let o = PhantomBattleDefine_1.costListRecommendLowLevel;
    if (n <= r) {
      o = PhantomBattleDefine_1.costListRecommendHighLevel;
    }
    var n = e.GetRecommendFetterGroupId();
    var r = e.GetSpecialFetterSubGroupId();
    var i = [0, 0, 0, 0, 0];
    if (e.GetFetterType() === 1) {
      this.MLu(t, n, r, o, i);
    } else {
      this.ELu(t, n, o, i);
    }
    return i;
  }
  MLu(t, r, n, o, i) {
    var s = this.Bo_(t);
    if (s) {
      this.TLu(s, this.yLu, t, r, n);
      let e = 0;
      var a = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      var h = i.length;
      for (let t = 0; t < h && !(e >= a); t++) {
        var m = o[t];
        var c = this.bLu(i) ? [r] : [];
        if ((m = this.qo_(i, m, s, false, c)) !== 0) {
          e += ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(m).GetCost();
          i[t] = m;
        }
      }
    }
    return i;
  }
  bLu(t) {
    var e;
    var r;
    var n;
    var o = new Map();
    for (const s of t) {
      if (!(s <= 0)) {
        e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s).GetFetterGroupId();
        o.set(e, (o.get(e) ?? 0) + 1);
      }
    }
    for ([r, n] of o) {
      if (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(r).FetterType === 1) {
        var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupMaxCountById(r);
        if (n >= i) {
          return true;
        }
      }
    }
    return false;
  }
  ELu(t, r, n, o) {
    var i = this.Bo_(t);
    if (i) {
      this.TLu(i, this.vLu, t, r);
      var s = o.length;
      let e = 0;
      var a = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      for (let t = 0; t < s && !(e >= a); t++) {
        var h = n[t];
        var h = this.qo_(o, h, i, true, []);
        if (h !== 0) {
          e += ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(h).GetCost();
          o[t] = h;
        }
      }
    }
    return o;
  }
  qo_(e, r, n, o, i) {
    const s = new Array();
    e.forEach(t => {
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
      if (t) {
        s.push(t.GetMonsterId());
      }
    });
    var a = n.length;
    let h = 0;
    var m = new Array();
    for (let t = 0; t < a; t++) {
      var c = n[t];
      if (!e.includes(c?.GetUniqueId()) && !(o ? c.GetCost() !== r : c.GetCost() > r) && !i.includes(c.GetFetterGroupId())) {
        var f = c.GetMonsterId();
        if (!s.includes(f)) {
          h = c.GetUniqueId();
          break;
        }
        m.push(c.GetUniqueId());
      }
    }
    return h = h === 0 && m.length > 0 ? m[0] : h;
  }
  Bo_(t) {
    var e;
    var r = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (r.length !== 0) {
      const n = new Array();
      for (const o of r) {
        if (!ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(o.GetUniqueId())) {
          e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(o.GetUniqueId());
          n.push(e);
        }
      }
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t).GetIncrIdList().forEach(t => {
        t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
        if (t) {
          n.push(t);
        }
      });
      return n;
    }
  }
  TLu(t, o, i, s, a) {
    const h = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(i).GetIncrIdList();
    t.sort((t, e) => {
      for (const n of o) {
        var r = n(t, e, i, s, h, a);
        if (r !== 0) {
          return r;
        }
      }
      return 0;
    });
  }
  GetFetterDescByRecommendInfo(t) {
    var e = new Array();
    for (const n of t.GetFetterCountList()) {
      var r = new VisionFetterDescItem_1.VisionFetterDescData();
      r.Key = n.Count;
      r.Value = n.FetterId;
      e.push(r);
    }
    return e;
  }
}
exports.VisionRecommendModel = VisionRecommendModel;
//# sourceMappingURL=VisionRecommendModel.js.map