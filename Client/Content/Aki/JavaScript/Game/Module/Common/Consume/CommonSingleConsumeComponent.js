"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSingleConsumeComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiComponentUtil_1 = require("../../Util/UiComponentUtil");
const ButtonItem_1 = require("../Button/ButtonItem");
const ConsumeItem_1 = require("./ConsumeItem");
const ConsumeItemUtil_1 = require("./ConsumeItemUtil");
class CommonSingleConsumeComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.StrengthItem = undefined;
    this.ConsumeItem = undefined;
    this.EnoughMoney = true;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.ConsumeItem = new ConsumeItem_1.ConsumeItem(this.GetItem(4));
  }
  OnBeforeDestroy() {
    this.StrengthItem.Destroy();
    this.StrengthItem = undefined;
  }
  UpdateComponent(e, t, n) {
    this.SetMaxState(false);
    let i = undefined;
    if (n) {
      i = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(n[0], n[1]);
    }
    this.ConsumeItem.UpdateItem(i);
    var n = this.GetText(1);
    var o = this.GetTexture(0);
    var s = this.GetText(3);
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e);
    this.EnoughMoney = UiComponentUtil_1.UiComponentUtil.SetMoneyState(n, s, t, r);
    var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    this.SetTextureByPath(n.Icon, o);
  }
  UpdateComponentOnlyConsume(e) {
    this.SetMaxState(false);
    this.GetItem(6).SetUIActive(false);
    let t = undefined;
    if (e) {
      t = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(e[0], e[1]);
    }
    this.ConsumeItem.UpdateItem(t);
  }
  SetMaxState(e) {
    this.GetItem(6).SetUIActive(!e);
    this.GetItem(7).SetUIActive(!e);
    this.StrengthItem.SetEnableClick(!e);
    if (e) {
      this.StrengthItem.SetLocalText("ReachMaxLevelStage");
    } else {
      this.StrengthItem.SetLocalText("WeaponResonanceText");
    }
  }
  SetStrengthFunction(e) {
    this.StrengthItem.SetFunction(e);
  }
  SetStrengthItemLocalText(e, ...t) {
    this.StrengthItem.SetLocalText(e, t);
  }
  SetConsumeFunction(e) {
    this.ConsumeItem.SetButtonFunction(e);
  }
  GetEnoughMoney() {
    return this.EnoughMoney;
  }
}
exports.CommonSingleConsumeComponent = CommonSingleConsumeComponent;
//# sourceMappingURL=CommonSingleConsumeComponent.js.map