"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckJigsawInfo = undefined;
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckJigsawInfo extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    if (!e) {
      return false;
    }
    var r = e;
    let a = false;
    switch (r.JigsawCondition.Type) {
      case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemPlaceIndex:
        a = this._ra(r.JigsawCondition);
        break;
      case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemMove:
        a = this.ura(r.JigsawCondition);
    }
    if (r.JigsawCondition.Compare === "Eq") {
      return a;
    } else {
      return !a;
    }
  }
  _ra(e) {
    var r;
    var a = e.FoundationEntityId;
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a)?.Entity?.GetComponent(146);
    return !!a && (r = e.ItemEntityId, !!(r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r)?.Entity?.GetComponent(147))) && !!a.GetAllItemOnBase().includes(r) && (a = a.GetPutItemIndex(r), r = e.PlaceIndex, a.Col === r.ColumnIndex) && a.Row === r.RowIndex;
  }
  ura(e) {
    var e = e.ItemEntityId;
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    return !!e?.Entity?.GetComponent(164) && !!(e = e?.Entity?.GetComponent(137)) && e.IsMoving;
  }
}
exports.LevelConditionCheckJigsawInfo = LevelConditionCheckJigsawInfo;
//# sourceMappingURL=LevelConditionsCheckJigsawInfo.js.map