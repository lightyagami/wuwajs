"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingSwitchItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const MenuDefine_1 = require("../MenuDefine");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSwitchItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments);
    this.pbi = () => {
      if (!this.GetItemClickLimit(this.GetButton(2))) {
        this.vbi(-1);
      }
    };
    this.Mbi = () => {
      if (!this.GetItemClickLimit(this.GetButton(3))) {
        this.vbi(1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UISprite]];
  }
  OnStart() {
    this.GetButton(3).SetCanClickWhenDisable(true);
    this.GetButton(2).SetCanClickWhenDisable(true);
    this.ybi();
  }
  OnClear() {
    this.Data &&= undefined;
    this.GetButton(2).OnClickCallBack.Unbind();
    this.GetButton(3).OnClickCallBack.Unbind();
  }
  Update(t) {
    this.Data = t;
    this.mGe();
    this.Ibi();
    this.sxi();
    this.cHa();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  Ibi() {
    this.GetRootItem().SetUIActive(true);
    var t = this.vah();
    this.Sbi(t);
    this.RefreshInteractionGroup(t);
  }
  ybi() {
    this.GetButton(2).OnClickCallBack.Bind(this.pbi);
    this.GetButton(3).OnClickCallBack.Bind(this.Mbi);
  }
  SetInteractionActive(t) {
    var e = this.vah();
    this.RefreshInteractionGroup(e, t);
  }
  Sbi(t) {
    let e = this.Data.OptionsNameList[t];
    if (this.Sac()) {
      e = MenuDefine_1.CUSTOM_TEXT_ID;
    }
    this.GetText(1).ShowTextNew(e);
    this.GetSprite(7).SetUIActive(this.Data.IsRecommendIndex(t));
  }
  RefreshInteractionGroup(t, e = true) {
    if (e) {
      this.GetButton(3).SetSelfInteractive(this.Sac() || t !== this.Data.OptionsNameList.length - 1);
      this.GetButton(2).SetSelfInteractive(this.Sac() || t !== 0);
    } else {
      this.GetButton(3).SetSelfInteractive(false);
      this.GetButton(2).SetSelfInteractive(false);
    }
  }
  vbi(t) {
    var e = this.vah();
    let i = Math.floor(e + t);
    if (this.Sac()) {
      i = t > 0 ? 0 : this.Data.OptionsNameList.length - 1;
    }
    this.FireSaveMenuChange(this.Data.OptionsValueList[i]);
  }
  Sac() {
    return this.Data.FunctionId === GameSettingsDefine_1.EFunction.IMAGEQUALITY && ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom;
  }
  vah() {
    var t = MenuController_1.MenuController.GetTargetConfig(this.Data.FunctionId);
    var e = this.Data.OptionsValueList;
    let i = e.indexOf(t);
    if (i < 0) {
      t = this.Data.OptionsDefault;
      if ((e = e.indexOf(t)) < 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Menu", 64, "默认值不存在于可选值列表中，请策划策划策划检查配置", ["functionId", this.Data.FunctionId], ["Default Value", t]);
      }
      i = e;
    }
    return i;
  }
  OnSetDetailVisible(t) {
    this.GetItem(4)?.SetUIActive(t);
  }
  sxi() {
    var t;
    var e;
    if (this.Data && this.Data.HasDetailText()) {
      t = this.GetText(5);
      e = this.Data.GetDetailTextId();
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
    }
  }
  cHa() {
    if (this.Data) {
      this.GetSprite(6)?.SetUIActive(this.Data.HasDetailText());
    }
  }
}
exports.MenuScrollSettingSwitchItem = MenuScrollSettingSwitchItem;
//# sourceMappingURL=MenuScrollSettingSwitchItem.js.map