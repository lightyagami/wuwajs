"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CheckKeyHoldingCondition = exports.CheckKeyInputCondition = exports.CheckBulletHitCondition = exports.CheckIsInJumpCondition = exports.CheckNotInSkillCondition = exports.CheckSkillExitNextAttrCondition = exports.CheckSkillIdFailCondition = exports.CheckSkillEnterNextAttrCondition = exports.CheckTagNotHaveCondition = exports.CheckBuffNotHaveCondition = exports.CheckTagAddCondition = exports.CheckBuffAddCondition = exports.CheckIsJumpCondition = exports.CheckEnergyCondition = exports.CheckSkillHitSuccessCondition = exports.CheckSkillIdSuccessCondition = exports.BaseCheckCondition = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  ComboTeachingDefine_1 = require("../ComboTeachingDefine");
class BaseCheckCondition {
  constructor(t, e) {
    if (this.ParamsArray = void 0, this.SuccessParamsArray = void 0, this.OriginString = "", this.Type = 0, this.IsSuccessNode = !1, this.SuccessType = -1, this.FailType = -1, this.OriginString = t, this.IsSuccessNode = e, t)
      if (e)
        for (const s of t.slice(1, -1).split("#")) {
          void 0 === this.SuccessParamsArray && (this.SuccessParamsArray = []);
          var i = s.split(",");
          this.SuccessParamsArray.push(i)
        } else this.ParamsArray = t.split("#")
  }
  GetConditionType() {
    return this.IsSuccessNode ? this.SuccessType : this.FailType
  }
  Check(t, e) {
    return this.IsSuccessNode ? this.CheckSuccess(t, e) : this.CheckFail(t, e)
  }
  CheckSuccess(t, e) {
    return !1
  }
  CheckFail(t, e) {
    return !1
  }
}
class CheckSkillIdSuccessCondition extends(exports.BaseCheckCondition = BaseCheckCondition) {
  constructor() {
    super(...arguments), this.Type = 1, this.SuccessType = 0
  }
  Check(t) {
    if (this.SuccessParamsArray)
      for (const e of this.SuccessParamsArray)
        if (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId === Number(e[0]) && ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime >= 1e3 * Number(e[1]) && !ModelManager_1.ModelManager.ComboTeachingModel.IsEmit) return !0;
    return !1
  }
}
exports.CheckSkillIdSuccessCondition = CheckSkillIdSuccessCondition;
class CheckSkillHitSuccessCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 0, this.SuccessType = 1
  }
  Check(t, e) {
    var i = e;
    if (this.SuccessParamsArray && i)
      for (const s of this.SuccessParamsArray)
        if (i.HitSkillId === Number(s[0])) return !0;
    return !1
  }
}
exports.CheckSkillHitSuccessCondition = CheckSkillHitSuccessCondition;
class CheckEnergyCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.SuccessType = 3, this.FailType = 3
  }
  CheckSuccess(t) {
    var e, i;
    return !!this.SuccessParamsArray && (e = this.SuccessParamsArray[0], i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), (i = EntitySystem_1.EntitySystem.Get(i).GetComponent(173).GetCurrentValue(CharacterAttributeTypes_1.energyAttrIds[Number(e[0])])) >= Number(e[1])) && i <= Number(e[2])
  }
  CheckFail(t) {
    var e;
    return !!this.ParamsArray && (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), (e = EntitySystem_1.EntitySystem.Get(e).GetComponent(173).GetCurrentValue(CharacterAttributeTypes_1.energyAttrIds[Number(this.ParamsArray[0])])) >= Number(this.ParamsArray[1])) && e <= Number(this.ParamsArray[2])
  }
}
exports.CheckEnergyCondition = CheckEnergyCondition;
class CheckIsJumpCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.SuccessType = 6
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    return (EntitySystem_1.EntitySystem.Get(e)?.GetComponent(178))?.IsJump ?? !1
  }
}
exports.CheckIsJumpCondition = CheckIsJumpCondition;
class CheckBuffAddCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.SuccessType = 4
  }
  Check(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(174);
      if (i)
        for (const s of this.SuccessParamsArray)
          if (0 < i.GetBuffTotalStackById(Number(s[0]))) return !0
    }
    return !1
  }
}
exports.CheckBuffAddCondition = CheckBuffAddCondition;
class CheckTagAddCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.SuccessType = 5
  }
  Check(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(205);
      if (i)
        for (const o of this.SuccessParamsArray) {
          var s = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o[0]);
          if (i.HasTag(s)) return !0
        }
    }
    return !1
  }
}
exports.CheckTagAddCondition = CheckTagAddCondition;
class CheckBuffNotHaveCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.FailType = 4, this.SuccessType = 7
  }
  CheckFail(t) {
    var e;
    return !!this.ParamsArray && (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), !(EntitySystem_1.EntitySystem.Get(e)?.GetComponent(174))?.GetBuffTotalStackById(Number(this.ParamsArray[0])))
  }
  CheckSuccess(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        e = EntitySystem_1.EntitySystem.Get(e);
      if (e) {
        var i = e?.GetComponent(174);
        if (i)
          for (const s of this.SuccessParamsArray)
            if (!i?.GetBuffTotalStackById(Number(s[0]))) return !0
      }
    }
    return !1
  }
}
exports.CheckBuffNotHaveCondition = CheckBuffNotHaveCondition;
class CheckTagNotHaveCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.FailType = 5, this.SuccessType = 8
  }
  CheckFail(t) {
    var e;
    return !!this.ParamsArray && (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), !(EntitySystem_1.EntitySystem.Get(e)?.GetComponent(205))?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.ParamsArray[0])))
  }
  CheckSuccess(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
        e = EntitySystem_1.EntitySystem.Get(e);
      if (e) {
        var i = e?.GetComponent(205);
        if (i)
          for (const s of this.SuccessParamsArray)
            if (!i.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s[0]))) return !0
      }
    }
    return !1
  }
}
exports.CheckTagNotHaveCondition = CheckTagNotHaveCondition;
class CheckSkillEnterNextAttrCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.SuccessType = 2
  }
  Check(t) {
    if (this.SuccessParamsArray)
      for (const e of this.SuccessParamsArray)
        if (ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId === Number(e[0]) && ModelManager_1.ModelManager.ComboTeachingModel.NextAttr && !ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr) return !0;
    return !1
  }
}
exports.CheckSkillEnterNextAttrCondition = CheckSkillEnterNextAttrCondition;
class CheckSkillIdFailCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 0, this.FailType = 0
  }
  Check(t) {
    return !!this.ParamsArray && 0 !== ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId && !this.OriginString.includes(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId.toString())
  }
}
exports.CheckSkillIdFailCondition = CheckSkillIdFailCondition;
class CheckSkillExitNextAttrCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.FailType = 1
  }
  Check(t) {
    return !(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId !== ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId || ModelManager_1.ModelManager.ComboTeachingModel.NextAttr || !ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr)
  }
}
exports.CheckSkillExitNextAttrCondition = CheckSkillExitNextAttrCondition;
class CheckNotInSkillCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.FailType = 2
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    return !(EntitySystem_1.EntitySystem.Get(e)?.GetComponent(205))?.HasTag(-1371021686)
  }
}
exports.CheckNotInSkillCondition = CheckNotInSkillCondition;
class CheckIsInJumpCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 1, this.FailType = 6
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(),
      e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(205),
      i = 0 < ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime,
      e = e?.HasTag(-1898186757);
    return !i && (e ?? !1)
  }
}
exports.CheckIsInJumpCondition = CheckIsInJumpCondition;
class CheckBulletHitCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 0, this.SuccessType = 9
  }
  Check(t, e) {
    var i = e;
    if (this.SuccessParamsArray && i)
      for (const s of this.SuccessParamsArray)
        if (i.BulletId === Number(s[0])) return !0;
    return !1
  }
}
exports.CheckBulletHitCondition = CheckBulletHitCondition;
class CheckKeyInputCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 0, this.FailType = 7, this.SuccessType = 10
  }
  CheckFail(t, e) {
    var i;
    return !(!this.ParamsArray || !e || 2 === e.ActionType || ((i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey)) ? this.ParamsArray[0] !== i : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), 1)))
  }
  CheckSuccess(t, e) {
    if (!e || 2 === e.ActionType) return !1;
    if (this.SuccessParamsArray) {
      if (e.ActionType !== Number(this.SuccessParamsArray[0][0])) return !1
    } else if (0 !== e.ActionType) return !1;
    var i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey);
    return i ? i === t.ActionInfo : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), !1)
  }
}
exports.CheckKeyInputCondition = CheckKeyInputCondition;
class CheckKeyHoldingCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), this.Type = 0, this.FailType = 8, this.SuccessType = 11
  }
  CheckFail(t, e) {
    var i;
    return !(!this.ParamsArray || !e) && ((i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey)) ? 2 === Number(this.ParamsArray[1]) && this.ParamsArray[0] === i && Number(this.ParamsArray[2]) <= e.HoldTime : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), !1))
  }
  CheckSuccess(t, e) {
    var i;
    return !!e && !!this.SuccessParamsArray && ((i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey)) ? i === t.ActionInfo && t.HoldTotalTime <= e.HoldTime : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), !1))
  }
}
exports.CheckKeyHoldingCondition = CheckKeyHoldingCondition;
//# sourceMappingURL=CheckCondtions.js.map