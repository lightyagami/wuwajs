"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionPawnInRange = exports.LevelConditionFightWithMonster = exports.LevelConditionGetNewItem = exports.LevelConditionGetWhichRole = exports.LevelConditionHarmonyQte = exports.LevelConditionHpLowerThan = exports.LevelConditionSlotOfCurrentRole = exports.LevelConditionFunctionUnlock = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class LevelConditionFunctionUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    var i;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (t = Number(e.LimitParams.get("FunctionId"))) {
      if (o?.length) {
        i = o[0];
        return o[1] && i === t;
      } else {
        return ModelManager_1.ModelManager.FunctionModel.IsOpen(t);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的FunctionId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FunctionUnlock}的定义`);
      }
      return false;
    }
  }
}
exports.LevelConditionFunctionUnlock = LevelConditionFunctionUnlock;
class LevelConditionSlotOfCurrentRole extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (!(o = Number(e.LimitParams.get("Slot"))) || o > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的Slot参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.SlotOfCurrentRole}的定义`);
      }
      return false;
    } else {
      return !!(e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) && o === ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true).indexOf(e) + 1;
    }
  }
}
exports.LevelConditionSlotOfCurrentRole = LevelConditionSlotOfCurrentRole;
class LevelConditionHpLowerThan extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    var t;
    var i;
    var r;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (o = Number(e.LimitParams.get("Hp"))) {
      return !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && !(i = t.Entity.GetComponent(174)?.GetCurrentValue(EAttributeId.Proto_Life), r = t.Entity.GetComponent(174)?.GetCurrentValue(EAttributeId.l5n), !i) && !!r && i / r < o / CommonDefine_1.RATE_10000;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的Hp参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.HpLowerThan}的定义`);
      }
      return false;
    }
  }
}
exports.LevelConditionHpLowerThan = LevelConditionHpLowerThan;
class LevelConditionHarmonyQte extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    return !!o?.length && (e.LimitParams.size === 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]), false) : !(t = Number(e.LimitParams.get("ElementType"))) && t >= 7 ? (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的ElementType参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.HarmonyQte}的定义`), false) : (e = o[0], o = o[1], (e = e.GetComponent(92)?.RoleElementType) * 10 + (o = o.GetComponent(92)?.RoleElementType) === t || o * 10 + e === t));
  }
}
exports.LevelConditionHarmonyQte = LevelConditionHarmonyQte;
class LevelConditionGetWhichRole extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if (o = Number(e.LimitParams.get("RoleCount"))) {
      return ModelManager_1.ModelManager.RoleModel.GetRoleMap().size === o;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的RoleCount参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.GetWhichRole}的定义`);
      }
      return false;
    }
  }
}
exports.LevelConditionGetWhichRole = LevelConditionGetWhichRole;
class LevelConditionGetNewItem extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    var t = Number(e.LimitParams.get("ItemId"));
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的ItemId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.GetNewItem}的定义`);
      }
      return false;
    }
    var i = ModelManager_1.ModelManager.InventoryModel;
    if (o) {
      if (e = i.GetAttributeItemData(o[0])) {
        return t === e.GetConfigId();
      } else {
        return o[0] === t;
      }
    }
    if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem, t)) {
      return true;
    }
    var e = i.GetNewAttributeItemUniqueIdList();
    var r = new Set();
    for (const a of e) {
      var l = i.GetAttributeItemData(a);
      if (l) {
        r.add(l.GetConfigId());
      }
    }
    return r.has(t);
  }
}
exports.LevelConditionGetNewItem = LevelConditionGetNewItem;
class LevelConditionFightWithMonster extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    return !!o?.length && (e.LimitParams.size === 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]), false) : (t = e.LimitParams.get("MonsterId")) ? o[0] === t : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的MonsterId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster}的定义`), false));
  }
}
exports.LevelConditionFightWithMonster = LevelConditionFightWithMonster;
class LevelConditionPawnInRange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    return !!o?.length && !(e.LimitParams.size === 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]), 1) : (e = e.LimitParams.get("PawnId"), o = o[0], !(o = EntitySystem_1.EntitySystem.Get(o))?.Active || (t = o?.GetComponent(0))?.IsConcealed || !(t = t?.GetPbEntityInitData()?.BlueprintType) || t !== e || !o.GetComponent(1) || !Global_1.Global.BaseCharacter || !Global_1.Global.BaseCharacter.CharacterActorComponent));
  }
}
exports.LevelConditionPawnInRange = LevelConditionPawnInRange;
//# sourceMappingURL=LevelConditionInvokeCheckedByEvent.js.map