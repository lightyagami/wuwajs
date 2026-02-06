"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckBuff = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t = UE.KismetStringLibrary.Conv_StringToInt(e.LimitParams.get("PbDataId"));
    var a = UE.KismetStringLibrary.Conv_StringToInt(e.LimitParams.get("IsPlayer"));
    var e = Number(UE.KismetStringLibrary.Conv_StringToInt64(e.LimitParams.get("BuffId")));
    if (a) {
      a = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      const l = EntitySystem_1.EntitySystem.Get(a)?.GetComponent(185);
      return !!l?.GetBuffTotalStackById(e);
    }
    const l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity?.GetComponent(185);
    return !!l?.GetBuffTotalStackById(e);
  }
}
exports.LevelConditionCheckBuff = LevelConditionCheckBuff;
//# sourceMappingURL=LevelConditionCheckBuff.js.map