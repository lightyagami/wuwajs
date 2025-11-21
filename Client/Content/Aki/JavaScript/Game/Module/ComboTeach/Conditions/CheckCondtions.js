"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckKeyHoldingCondition = exports.CheckKeyInputCondition = exports.CheckBulletHitCondition = exports.CheckIsInJumpCondition = exports.CheckNotInSkillCondition = exports.CheckSkillExitNextAttrCondition = exports.CheckSkillIdFailCondition = exports.CheckSkillEnterNextAttrCondition = exports.CheckTagNotHaveCondition = exports.CheckBuffNotHaveCondition = exports.CheckTagAddCondition = exports.CheckBuffAddCondition = exports.CheckIsJumpCondition = exports.CheckEnergyCondition = exports.CheckSkillHitSuccessCondition = exports.CheckSkillIdSuccessCondition = exports.BaseCheckCondition = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const ComboTeachingDefine_1 = require("../ComboTeachingDefine");
class BaseCheckCondition {
  constructor(t, e) {
    this.ParamsArray = undefined;
    this.SuccessParamsArray = undefined;
    this.OriginString = "";
    this.Type = 0;
    this.IsSuccessNode = false;
    this.SuccessType = -1;
    this.FailType = -1;
    this.OriginString = t;
    this.IsSuccessNode = e;
    if (t) {
      if (e) {
        for (const s of t.slice(1, -1).split("#")) {
          if (this.SuccessParamsArray === undefined) {
            this.SuccessParamsArray = [];
          }
          var i = s.split(",");
          this.SuccessParamsArray.push(i);
        }
      } else {
        this.ParamsArray = t.split("#");
      }
    }
  }
  GetConditionType() {
    if (this.IsSuccessNode) {
      return this.SuccessType;
    } else {
      return this.FailType;
    }
  }
  Check(t, e) {
    if (this.IsSuccessNode) {
      return this.CheckSuccess(t, e);
    } else {
      return this.CheckFail(t, e);
    }
  }
  CheckSuccess(t, e) {
    return false;
  }
  CheckFail(t, e) {
    return false;
  }
}
class CheckSkillIdSuccessCondition extends (exports.BaseCheckCondition = BaseCheckCondition) {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.SuccessType = 0;
  }
  Check(t) {
    if (this.SuccessParamsArray) {
      for (const e of this.SuccessParamsArray) {
        if (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId === Number(e[0]) && ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime >= Number(e[1]) * 1000 && !ModelManager_1.ModelManager.ComboTeachingModel.IsEmit) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.CheckSkillIdSuccessCondition = CheckSkillIdSuccessCondition;
class CheckSkillHitSuccessCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.SuccessType = 1;
  }
  Check(t, e) {
    var i = e;
    if (this.SuccessParamsArray && i) {
      for (const s of this.SuccessParamsArray) {
        if (i.HitSkillId === Number(s[0])) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.CheckSkillHitSuccessCondition = CheckSkillHitSuccessCondition;
class CheckEnergyCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.SuccessType = 3;
    this.FailType = 3;
  }
  CheckSuccess(t) {
    var e;
    var i;
    return !!this.SuccessParamsArray && (e = this.SuccessParamsArray[0], i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), (i = EntitySystem_1.EntitySystem.Get(i).GetComponent(177).GetCurrentValue(CharacterAttributeTypes_1.energyAttrIds[Number(e[0])])) >= Number(e[1])) && i <= Number(e[2]);
  }
  CheckFail(t) {
    var e;
    return !!this.ParamsArray && (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), (e = EntitySystem_1.EntitySystem.Get(e).GetComponent(177).GetCurrentValue(CharacterAttributeTypes_1.energyAttrIds[Number(this.ParamsArray[0])])) >= Number(this.ParamsArray[1])) && e <= Number(this.ParamsArray[2]);
  }
}
exports.CheckEnergyCondition = CheckEnergyCondition;
class CheckIsJumpCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.SuccessType = 6;
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    return EntitySystem_1.EntitySystem.Get(e)?.GetComponent(182)?.IsJump ?? false;
  }
}
exports.CheckIsJumpCondition = CheckIsJumpCondition;
class CheckBuffAddCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.SuccessType = 4;
  }
  Check(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      var i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(178);
      if (i) {
        for (const s of this.SuccessParamsArray) {
          if (i.GetBuffTotalStackById(Number(s[0])) > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
exports.CheckBuffAddCondition = CheckBuffAddCondition;
class CheckTagAddCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.SuccessType = 5;
  }
  Check(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      var i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(209);
      if (i) {
        for (const o of this.SuccessParamsArray) {
          var s = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o[0]);
          if (i.HasTag(s)) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
exports.CheckTagAddCondition = CheckTagAddCondition;
class CheckBuffNotHaveCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.FailType = 4;
    this.SuccessType = 7;
  }
  CheckFail(t) {
    var e;
    return !!this.ParamsArray && (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), !EntitySystem_1.EntitySystem.Get(e)?.GetComponent(178)?.GetBuffTotalStackById(Number(this.ParamsArray[0])));
  }
  CheckSuccess(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      var e = EntitySystem_1.EntitySystem.Get(e);
      if (e) {
        var i = e?.GetComponent(178);
        if (i) {
          for (const s of this.SuccessParamsArray) {
            if (!i?.GetBuffTotalStackById(Number(s[0]))) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
exports.CheckBuffNotHaveCondition = CheckBuffNotHaveCondition;
class CheckTagNotHaveCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.FailType = 5;
    this.SuccessType = 8;
  }
  CheckFail(t) {
    var e;
    return !!this.ParamsArray && (e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), !EntitySystem_1.EntitySystem.Get(e)?.GetComponent(209)?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.ParamsArray[0])));
  }
  CheckSuccess(t) {
    if (this.SuccessParamsArray) {
      var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      var e = EntitySystem_1.EntitySystem.Get(e);
      if (e) {
        var i = e?.GetComponent(209);
        if (i) {
          for (const s of this.SuccessParamsArray) {
            if (!i.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s[0]))) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
exports.CheckTagNotHaveCondition = CheckTagNotHaveCondition;
class CheckSkillEnterNextAttrCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.SuccessType = 2;
  }
  Check(t) {
    if (this.SuccessParamsArray) {
      for (const e of this.SuccessParamsArray) {
        if (ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId === Number(e[0]) && ModelManager_1.ModelManager.ComboTeachingModel.NextAttr && !ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.CheckSkillEnterNextAttrCondition = CheckSkillEnterNextAttrCondition;
class CheckSkillIdFailCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.FailType = 0;
  }
  Check(t) {
    return !!this.ParamsArray && ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId !== 0 && !this.OriginString.includes(ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId.toString());
  }
}
exports.CheckSkillIdFailCondition = CheckSkillIdFailCondition;
class CheckSkillExitNextAttrCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.FailType = 1;
  }
  Check(t) {
    return ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId === ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId && !ModelManager_1.ModelManager.ComboTeachingModel.NextAttr && !!ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr;
  }
}
exports.CheckSkillExitNextAttrCondition = CheckSkillExitNextAttrCondition;
class CheckNotInSkillCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.FailType = 2;
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    return !EntitySystem_1.EntitySystem.Get(e)?.GetComponent(209)?.HasTag(-1371021686);
  }
}
exports.CheckNotInSkillCondition = CheckNotInSkillCondition;
class CheckIsInJumpCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 1;
    this.FailType = 6;
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    var e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(209);
    var i = ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime > 0;
    var e = e?.HasTag(-1898186757);
    return !i && (e ?? false);
  }
}
exports.CheckIsInJumpCondition = CheckIsInJumpCondition;
class CheckBulletHitCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.SuccessType = 9;
  }
  Check(t, e) {
    var i = e;
    if (this.SuccessParamsArray && i) {
      for (const s of this.SuccessParamsArray) {
        if (i.BulletId === Number(s[0])) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.CheckBulletHitCondition = CheckBulletHitCondition;
class CheckKeyInputCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.FailType = 7;
    this.SuccessType = 10;
  }
  CheckFail(t, e) {
    var i;
    return !!this.ParamsArray && !!e && e.ActionType !== 2 && !((i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey)) ? this.ParamsArray[0] !== i : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), 1));
  }
  CheckSuccess(t, e) {
    if (!e || e.ActionType === 2) {
      return false;
    }
    if (this.SuccessParamsArray) {
      if (e.ActionType !== Number(this.SuccessParamsArray[0][0])) {
        return false;
      }
    } else if (e.ActionType !== 0) {
      return false;
    }
    var i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey);
    if (i) {
      return i === t.ActionInfo;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]);
      }
      return false;
    }
  }
}
exports.CheckKeyInputCondition = CheckKeyInputCondition;
class CheckKeyHoldingCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.FailType = 8;
    this.SuccessType = 11;
  }
  CheckFail(t, e) {
    var i;
    return !!this.ParamsArray && !!e && ((i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey)) ? Number(this.ParamsArray[1]) === 2 && this.ParamsArray[0] === i && Number(this.ParamsArray[2]) <= e.HoldTime : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), false));
  }
  CheckSuccess(t, e) {
    var i;
    return !!e && ((i = ComboTeachingDefine_1.inputActionMap.get(e.ActionKey)) ? i === t.ActionInfo && t.HoldTotalTime <= e.HoldTime : (Log_1.Log.CheckError() && Log_1.Log.Error("ComboTeaching", 77, "未找到按键条件", ["ActionKey", e.ActionKey]), false));
  }
}
exports.CheckKeyHoldingCondition = CheckKeyHoldingCondition;
//# sourceMappingURL=CheckCondtions.js.map