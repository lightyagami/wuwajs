"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeItemData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDataBase_1 = require("./ItemDataBase");
const ATTRIBUTE_ITEM_DEFAULT_COUNT = 1;
class AttributeItemData extends ItemDataBase_1.ItemDataBase {
  constructor(t, e, r, a) {
    super(t, ATTRIBUTE_ITEM_DEFAULT_COUNT, a);
    this.UniqueId = e;
    this.Smi = r;
  }
  GetUniqueId() {
    return this.UniqueId;
  }
  SetFunctionValue(t) {
    this.Smi = t;
    this.OnSetFunctionValue(t);
  }
  OnSetFunctionValue(t) {}
  IsFunctionValue(t) {
    return (this.Smi & 1 << t) > 0;
  }
  GetIsLock() {
    return this.IsFunctionValue(0);
  }
  GetIsDeprecated() {
    return this.IsFunctionValue(1);
  }
  GetFunctionValueType() {
    return this.Smi;
  }
  GetDefaultDownText() {
    return "";
  }
  GetUseCountLimit() {
    return 1;
  }
  HasRedDot() {
    var t = this.GetUniqueId();
    return ModelManager_1.ModelManager.InventoryModel.IsAttributeItemHasRedDot(t);
  }
  IsValid() {
    return true;
  }
}
exports.AttributeItemData = AttributeItemData;
//# sourceMappingURL=AttributeItemData.js.map