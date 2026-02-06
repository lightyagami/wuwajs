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
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [7, UE.UISprite], [6, UE.UISprite], [8, UE.UIExtendToggleSpriteTransition]];
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
    this.RefreshDetailSprite();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  Ibi() {
    this.GetRootItem().SetUIActive(true);
    var t = this.GetIndex();
    this.Sbi(t);
    this.RefreshInteractionGroup(t);
  }
  ybi() {
    this.GetButton(2).OnClickCallBack.Bind(this.pbi);
    this.GetButton(3).OnClickCallBack.Bind(this.Mbi);
  }
  SetInteractionActive(t) {
    var i = this.GetIndex();
    this.RefreshInteractionGroup(i, t);
  }
  Sbi(t) {
    let i = this.Data.OptionsNameList[t];
    if (this.Sac()) {
      i = MenuDefine_1.CUSTOM_TEXT_ID;
    }
    this.GetText(1).ShowTextNew(i);
    this.GetSprite(7).SetUIActive(this.Data.IsRecommendIndex(t));
  }
  RefreshInteractionGroup(t, i = true) {
    if (i) {
      this.GetButton(3).SetSelfInteractive(this.Sac() || t !== this.Data.OptionsNameList.length - 1);
      this.GetButton(2).SetSelfInteractive(this.Sac() || t !== 0);
    } else {
      this.GetButton(3).SetSelfInteractive(false);
      this.GetButton(2).SetSelfInteractive(false);
    }
  }
  vbi(t) {
    var i = this.GetIndex();
    let e = Math.floor(i + t);
    if (this.Sac()) {
      e = t > 0 ? 0 : this.Data.OptionsNameList.length - 1;
    }
    this.FireSaveMenuChange(this.Data.OptionsValueList[e]);
  }
  Sac() {
    return this.Data.FunctionId === GameSettingsDefine_1.EFunction.IMAGEQUALITY && ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom;
  }
  GetIndex() {
    var t = ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(this.Data.FunctionId);
    var i = this.Data.OptionsValueList;
    let e = i.indexOf(t);
    if (e < 0) {
      t = this.Data.OptionsDefault;
      if ((i = i.indexOf(t)) < 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Menu", 64, "默认值不存在于可选值列表中，请策划策划策划检查配置", ["functionId", this.Data.FunctionId], ["Default Value", t]);
      }
      e = i;
    }
    return e;
  }
  OnSetDetailVisible(t) {
    this.GetItem(4)?.SetUIActive(t);
    if (this.Data && this.Data.CanClickWhenDisable && !this.Data.GetEnable()) {
      t = t ? UE.Color.FromHex(MenuDefine_1.DETAIL_SPRITE_VISIBLE_COLOR_SRGB) : UE.Color.FromHex("FFFFFFFF");
      this.GetSprite(6).SetColor(t);
      this.GetUiExtendToggleSpriteTransition(8).TransitionState.UnDetermineUnHoverState.Color = t;
      this.GetUiExtendToggleSpriteTransition(8).TransitionState.UnDetermineHoverState.Color = t;
      this.GetUiExtendToggleSpriteTransition(8).TransitionState.UnDeterminePressedState.Color = t;
    }
  }
  sxi() {
    var t;
    var i;
    if (this.Data && this.Data.HasDetailText()) {
      t = this.GetText(5);
      i = this.Data.GetDetailTextId();
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
    }
  }
  cHa() {
    if (this.Data) {
      this.GetSprite(6)?.SetUIActive(this.Data.HasDetailText());
    }
  }
  async RefreshDetailSprite() {
    var t;
    if (this.Data) {
      t = this.Data.CanClickWhenDisable ? MenuDefine_1.DETAIL_SPRITE_PATH : MenuDefine_1.LOCK_SPRITE_PATH;
      await Promise.all([this.SetExtendToggleSpriteTransitionByPath(t, this.GetUiExtendToggleSpriteTransition(8), 6), this.SetExtendToggleSpriteTransitionByPath(t, this.GetUiExtendToggleSpriteTransition(8), 7), this.SetExtendToggleSpriteTransitionByPath(t, this.GetUiExtendToggleSpriteTransition(8), 8)]);
    }
  }
}
exports.MenuScrollSettingSwitchItem = MenuScrollSettingSwitchItem;
//# sourceMappingURL=MenuScrollSettingSwitchItem.js.map