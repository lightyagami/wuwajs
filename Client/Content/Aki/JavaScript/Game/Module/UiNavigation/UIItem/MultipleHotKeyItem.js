"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultipleHotKeyItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const HotKeyItem_1 = require("./HotKeyItem");
const HotKeyTypeCreator_1 = require("./HotKeyType/HotKeyTypeCreator");
class MultipleHotKeyItem extends HotKeyItem_1.HotKeyItem {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.Bqo = 0;
    this.bqo = [];
    this.wqo = (e, t, o) => {
      return {
        Key: e,
        Value: HotKeyTypeCreator_1.HotKeyTypeCreator.CreateHotKeyType(t.GetOwner(), e, true)
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(0), this.wqo, this.GetItem(1));
    this.Bqo = this.OpenParam;
    await this.qqo();
  }
  OnClear() {
    for (const e of this.bqo) {
      e.Clear();
    }
  }
  async qqo() {
    var e = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyViewConfig(this.Bqo);
    if (e) {
      if (e.FunctionButtonArray.length <= 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "快捷键界面配置错误, 快捷键类型的数量为0");
      }
      this.eGe.RebuildLayoutByDataNew(e.FunctionButtonArray);
      this.bqo = await Promise.all(this.eGe.GetLayoutItemList());
    }
  }
  GetHotKeyComponentArray() {
    var e = [];
    for (const t of this.bqo) {
      e.push(...t.GetHotKeyComponents());
    }
    return e;
  }
}
exports.MultipleHotKeyItem = MultipleHotKeyItem;
//# sourceMappingURL=MultipleHotKeyItem.js.map