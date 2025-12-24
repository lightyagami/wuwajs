"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationAttributeController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
class FormationAttributeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.ConfigList = FormationPropertyAll_1.configFormationPropertyAll.GetConfigList();
    Net_1.Net.Register(18896, FormationAttributeController.FormationAttrNotify);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  static OnTick(t) {
    if (this.ConfigList) {
      for (const e of this.ConfigList.values()) {
        this.OBe(e.Id);
      }
    }
  }
  static OnClear() {
    this.kBe();
    Net_1.Net.UnRegister(18896);
    return true;
  }
  static OnFormationAttrChanged(t) {
    var e;
    var r;
    var i = this.Model?.GetData(t);
    if (i && (e = Protocol_1.Aki.Protocol.t1s.create(), r = Protocol_1.Aki.Protocol.q4s.create(), e.M6n = [r], e.S6n = i.Timestamp, r.E6n = t, r.y6n = i.Value, r.I6n = i.Max, r.T6n = i.BaseMax, r.L6n = i.Speed, Net_1.Net.Call(27079, e, () => {}), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 19, "发送队伍属性变化push", ["clientTime", i.Timestamp], ["data", JSON.stringify(r)]);
    }
  }
  static SetValue(t, e) {
    var r;
    if (this.WBe(t) && (r = this.GetValue(t), this.Model.SetValue(t, e), this.OBe(t), this.GetValue(t) !== r)) {
      this.OnFormationAttrChanged(t);
    }
  }
  static AddValue(t, e) {
    if (this.WBe(t)) {
      this.SetValue(t, this.Model.GetValue(t) + e);
    }
  }
  static GetValue(t) {
    var e = this.KBe.get(t);
    if (e !== undefined) {
      return e;
    } else {
      return this.Model.GetValue(t);
    }
  }
  static GetMax(t) {
    return this.Model.GetMax(t);
  }
  static AddMaxModifier(t, e, r, i) {
    let o = this.MaxModifiers.get(e);
    if (!o) {
      this.MaxModifiers.set(e, o = new Map());
    }
    o.set(t, {
      Percent: r,
      Offset: i
    });
    this.RefreshMax(e);
  }
  static RemoveMaxModifier(t, e) {
    var r = this.MaxModifiers.get(e);
    if (r) {
      r.delete(t);
      if (r.size === 0) {
        this.MaxModifiers.delete(e);
      }
      this.RefreshMax(e);
    }
  }
  static GetBaseMax(t) {
    return this.Model.GetBaseMax(t);
  }
  static GetSpeed(t) {
    return this.Model.GetSpeed(t);
  }
  static GetRatio(t) {
    return this.GetValue(t) / this.GetMax(t) * CharacterAttributeTypes_1.PER_TEN_THOUSAND;
  }
  static AddSpeedModifier(t, e, r, i, o = 100) {
    let a = this.SpeedModifiers.get(e);
    if (!a) {
      this.SpeedModifiers.set(e, a = new Map());
    }
    a.set(t, {
      Type: r,
      Value: i,
      Priority: o
    });
    this.RefreshSpeed(e);
  }
  static RemoveSpeedModifier(t, e) {
    var r = this.SpeedModifiers.get(e);
    if (r) {
      r.delete(t);
      if (r.size === 0) {
        this.SpeedModifiers.delete(e);
      }
      this.RefreshSpeed(e);
    }
  }
  static AddBoundsLocker(t, e, r) {
    return this.Model?.AddBoundsLocker(t, e, r) ?? -1;
  }
  static RemoveBoundsLocker(t, e) {
    return this.Model?.RemoveBoundsLocker(t, e) ?? false;
  }
  static AddPauseLock(t) {
    this.PauseLocks.add(t);
    this.RefreshAllSpeed();
  }
  static RemovePauseLock(t) {
    this.PauseLocks.delete(t);
    this.RefreshAllSpeed();
  }
  static IsPaused() {
    return this.PauseLocks.size > 0;
  }
  static WBe(t) {
    return t === 1 || t === 8 || t === 14;
  }
  static QBe(r) {
    let t = this.XBe.get(r);
    if (!t) {
      t = () => {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(215);
        var e = this.Model.GetConfig(r);
        if (e && t) {
          if (t.HasAnyTag(e.ForbidIncreaseTags)) {
            this.AddSpeedModifier("TagForbidIncrease", r, 1, -Infinity);
          } else {
            this.RemoveSpeedModifier("TagForbidIncrease", r);
          }
          if (t.HasAnyTag(e.ForbidDecreaseTags)) {
            this.AddSpeedModifier("TagForbidDecrease", r, 2, -Infinity);
          } else {
            this.RemoveSpeedModifier("TagForbidDecrease", r);
          }
        }
      };
      this.XBe.set(r, t);
    }
    return t;
  }
  static get Model() {
    return ModelManager_1.ModelManager.FormationAttributeModel;
  }
  static OnSetMax(t, e, r) {
    if (e !== r) {
      var i = this.$Be.get(t);
      if (i) {
        for (const o of i.values()) {
          o(t, e, r);
        }
      }
    }
  }
  static RefreshAllSpeed() {
    if (this.ConfigList) {
      for (const t of this.ConfigList.values()) {
        this.RefreshSpeed(t.Id);
      }
    }
  }
  static RefreshSpeed(t) {
    var i = this.SpeedModifiers.get(t);
    let o = this.Model.GetBaseRate(t);
    let a = o;
    var e = this.Model.GetSpeed(t);
    if (FormationAttributeController.IsPaused()) {
      a = 0;
    } else if (i) {
      let t = 0;
      let e = 0;
      let r = 0;
      for (const s of i.values()) {
        switch (s.Type) {
          case 0:
            if (s.Priority >= r) {
              r = s.Priority;
              o = s.Value;
            }
            break;
          case 1:
            t += s.Value;
            break;
          case 2:
            e += s.Value;
        }
      }
      i = Math.max(1 + (o > 0 ? t : e) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 0);
      a = o * i;
    }
    if (a !== e) {
      this.Model.SetSpeed(t, a);
      this.OnFormationAttrChanged(t);
    }
  }
  static RefreshMax(t) {
    var r = this.MaxModifiers.get(t);
    var i = this.Model.GetBaseMax(t);
    let o = i;
    var e = this.Model.GetMax(t);
    if (r) {
      let t = 0;
      let e = 0;
      for (const a of r.values()) {
        t += a.Offset;
        e += a.Percent;
      }
      o = i + t + i * e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    }
    if (e !== o) {
      this.Model.SetMax(t, o);
      this.OBe(t);
      this.OnSetMax(t, o, e);
      this.OnFormationAttrChanged(t);
    }
  }
  static OBe(e) {
    var r = this.Model.GetValue(e);
    let i = this.KBe.get(e);
    if (i === undefined) {
      this.KBe.set(e, i = r);
    }
    if (r !== i) {
      this.KBe.set(e, r);
      var t = this.YBe.get(e);
      if (t) {
        for (const n of t.values()) {
          try {
            n(e, r, i);
          } catch (t) {
            var o = [["attrId", e], ["newValue", r], ["oldValue", i]];
            if (t instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("Event", 19, "队伍属性回调异常", t, ...o);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 19, "队伍属性回调异常", ...o);
            }
          }
        }
      }
      t = this.JBe.get(e);
      if (t) {
        var a = this.GetRatio(e);
        for (const h of t) {
          var s = a >= h.Min && a <= h.Max;
          if (s !== h.InInterval) {
            h.InInterval = s;
            try {
              h.Func(e, s, a);
            } catch (t) {
              s = [["attrId", e], ["inInterval", s], ["ratio", a]];
              if (t instanceof Error) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.ErrorWithStack("Event", 19, "队伍属性回调异常", t, ...s);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Event", 19, "队伍属性回调异常", ...s);
              }
            }
          }
        }
      }
    }
  }
  static kBe() {
    this.YBe.clear();
    this.JBe.clear();
    this.$Be.clear();
  }
  static AddValueListener(t, e, r) {
    let i = this.YBe.get(t);
    if (!i) {
      this.YBe.set(t, i = new Set());
    }
    i.add(e);
  }
  static RemoveValueListener(t, e) {
    var r = this.YBe.get(t);
    if (r && (r.delete(e), r.size === 0)) {
      this.YBe.delete(t);
    }
  }
  static AddThresholdListener(e, r, i, o, t) {
    if (i < o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Formation", 19, "尝试添加的阈值监听器上限小于下限", ["attrId", e], ["区间上限", i], ["区间下限", o]);
      }
    } else {
      let t = this.JBe.get(e);
      if (!t) {
        this.JBe.set(e, t = []);
      }
      if (!t.some(t => t.Func === r)) {
        e = this.GetRatio(e);
        t.push({
          Func: r,
          Max: i,
          Min: o,
          InInterval: o <= e && e <= i
        });
      }
    }
  }
  static RemoveThresholdListener(t, e) {
    var r;
    var t = this.JBe.get(t);
    if (t && (r = t.findIndex(t => t.Func === e)) !== undefined && r >= 0) {
      t.splice(r, 1);
    }
  }
  static AddMaxListener(t, e, r) {
    let i = this.$Be.get(t);
    if (!i) {
      this.$Be.set(t, i = new Set());
    }
    i.add(e);
  }
  static RemoveMaxListener(t, e) {
    this.$Be.get(t)?.delete(e);
  }
}
exports.FormationAttributeController = FormationAttributeController;
(_a = FormationAttributeController).ConfigList = undefined;
FormationAttributeController.FormationAttrNotify = t => {
  var r = MathUtils_1.MathUtils.LongToNumber(t.S6n ?? 0);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 19, "收到队伍属性变化通知", ["serverTime", r], ["notify", JSON.stringify(t.M6n)]);
  }
  for (const n of t.M6n) {
    var i = n.E6n ?? 0;
    var o = _a.Model.GetMax(n.E6n ?? 0);
    var a = n.I6n ?? 0;
    var s = n.T6n ?? 0;
    let t = n.y6n ?? 0;
    let e = n.L6n ?? 0;
    if (_a.WBe(i)) {
      t = _a.GetValue(i) ?? 0;
      e = _a.GetSpeed(i) ?? 0;
    }
    _a.Model.SetData(i, a, s, t, e, r);
    _a.OnSetMax(i, a, o);
  }
};
FormationAttributeController.SpeedModifiers = new Map();
FormationAttributeController.MaxModifiers = new Map();
FormationAttributeController.PauseLocks = new Set();
FormationAttributeController.XBe = new Map();
FormationAttributeController.xie = (t, e) => {
  if (_a.ConfigList) {
    for (const n of _a.ConfigList.values()) {
      var r = n.Id;
      var i = t.Entity.CheckGetComponent(215);
      if (i) {
        var o = _a.Model.GetConfig(r);
        for (const h of o?.ForbidIncreaseTags) {
          var a = _a.QBe(r);
          if (!i.HasTagAddOrRemoveListener(h, a)) {
            i.AddTagAddOrRemoveListener(h, a);
          }
        }
        for (const l of o?.ForbidDecreaseTags) {
          var s = _a.QBe(r);
          if (!i.HasTagAddOrRemoveListener(l, s)) {
            i.AddTagAddOrRemoveListener(l, s);
          }
        }
      }
      _a.QBe(r)();
    }
  }
};
FormationAttributeController.KBe = new Map();
FormationAttributeController.YBe = new Map();
FormationAttributeController.JBe = new Map();
FormationAttributeController.$Be = new Map(); //# sourceMappingURL=FormationAttributeController.js.map