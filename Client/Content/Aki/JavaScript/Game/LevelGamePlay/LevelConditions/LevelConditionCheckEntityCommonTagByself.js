"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntityCommonTagBySelf = exports.ConditionExParamsCheckEntityCommonTagBySelf = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelConditionCenter_1 = require("./LevelConditionCenter");
class ConditionExParamsCheckEntityCommonTagBySelf extends LevelGeneralBase_1.LevelConditionExParams {
  constructor() {
    super(...arguments);
    this.TagIds = undefined;
  }
}
exports.ConditionExParamsCheckEntityCommonTagBySelf = ConditionExParamsCheckEntityCommonTagBySelf;
class LevelConditionCheckEntityCommonTagBySelf extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t) {
    let n = LevelConditionCenter_1.LevelConditionCenter.GetConditionExParams(e.Id);
    if (!n) {
      if (!e.LimitParams) {
        return false;
      }
      var o = e.LimitParams.get("EntityCommonTag");
      if (!o) {
        return false;
      }
      o = o.split("-");
      (n = new ConditionExParamsCheckEntityCommonTagBySelf()).TagIds = new Array();
      for (const a of o) {
        var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
        if (r === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 17, "不存在Tag,请检查条件配置", ["tag", a], ["条件Id", e.Id]);
          }
        } else {
          n.TagIds.push(r);
        }
      }
      LevelConditionCenter_1.LevelConditionCenter.SetConditionExParams(e.Id, n);
    }
    if (n.TagIds && n.TagIds.length > 0) {
      if (!UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
        return false;
      }
      o = t;
      t = EntitySystem_1.EntitySystem.Get(o.GetEntityId());
      if (!t) {
        return false;
      }
      var i = t.GetComponent(197);
      if (!i) {
        return false;
      }
      for (const s of n.TagIds) {
        if (!i.HasTag(s)) {
          return false;
        }
      }
    }
    return true;
  }
}
exports.LevelConditionCheckEntityCommonTagBySelf = LevelConditionCheckEntityCommonTagBySelf;
//# sourceMappingURL=LevelConditionCheckEntityCommonTagByself.js.map