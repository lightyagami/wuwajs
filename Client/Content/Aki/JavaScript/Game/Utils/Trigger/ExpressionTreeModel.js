"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionTreeModel = exports.builtinFuncMap = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const DAMAGE_EXPRESSION_CACHE = 100;
const builtinFunc = {
  EntityTagContainer: (e, t) => {
    var a = t?.GetComponent(217);
    if (a) {
      return a.TagContainer;
    }
    e.ErrorMsg?.push("获取实体TagContainer失败 实体ID" + t?.Id);
  },
  HasAnyTag: (e, t, a) => t && a ? t.HasAnyTag(a) : (e.ErrorMsg?.push("HasAnyTag函数执行失败: tagContainerA为空"), false),
  HasAllTag: (e, t, a) => t && a ? t.HasAllTag(a) : (e.ErrorMsg?.push("HasAllTag函数执行失败: tagContainerA为空"), false),
  ExecDamage: (e, t) => {
    if (e.ContextType === 0) {
      e.DamageParam.DamageDataId = t;
      var a = e.Victim.ExecuteBulletDamage(e.BulletEntityId, e.DamageParam, e.ContextId);
      e.ToughResult += a;
    } else if (e.ContextType === 1) {
      e.DamageParam.DamageDataId = BigInt(t);
      e.Victim.ExecuteBuffDamage(e.DamageParam, e.Payload, e.ContextId);
    } else if (e.ContextType === 2) {
      e.DamageParam.DamageDataId = BigInt(t);
      e.Victim.ExecuteBuffShareDamage(e.DamageParam, e.Payload, e.ExtraRate, e.ContextId);
    } else {
      if (e.ContextType !== 3) {
        return false;
      }
      e.DamageCb(t);
    }
    return true;
  },
  NotHasAnyTag: (e, t, a) => t && a ? t.NotHasAnyTag(a) : (e.ErrorMsg?.push("NotHasAnyTag函数执行失败: tagContainerA为空"), false),
  NotHasAllTag: (e, t, a) => t && a ? t.NotHasAllTag(a) : (e.ErrorMsg?.push("NotHasAllTag函数执行失败: tagContainerA为空"), false)
};
exports.builtinFuncMap = new Map(Object.entries(builtinFunc));
class ExpressionTreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LXc = new Map();
  }
  OnClear() {
    this.LXc.clear();
    return true;
  }
  Add(e, t) {
    this.LXc.set(e, t);
    if (this.LXc.size > DAMAGE_EXPRESSION_CACHE && (e = this.LXc.keys().next().value) !== undefined) {
      this.LXc.delete(e);
    }
  }
  Get(e) {
    return this.LXc.get(e);
  }
}
exports.ExpressionTreeModel = ExpressionTreeModel;
//# sourceMappingURL=ExpressionTreeModel.js.map