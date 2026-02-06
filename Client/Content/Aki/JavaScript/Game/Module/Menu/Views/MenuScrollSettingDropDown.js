"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingDropDown = undefined;
const UE = require("ue");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DropDownLogicCreator_1 = require("../DropDownLogic.ts/DropDownLogicCreator");
const MenuDefine_1 = require("../MenuDefine");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingDropDown extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments);
    this.hbi = undefined;
    this.lbi = undefined;
    this.g8e = e => this.lbi.GetDataTextId(e, this.Data);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIExtendToggleSpriteTransition]];
  }
  async OnBeforeStartAsync() {
    this.hbi = new CommonDropDown_1.CommonDropDown(this.GetItem(1), e => new OneTextDropDownItem_1.OneTextDropDownItem(e), e => new OneTextTitleItem_1.OneTextTitleItem(e));
    await this.hbi.Init();
    this.hbi.SetOnSelectCall((e, t) => {
      this.lbi.TriggerSelectChange(t, this.Data);
    });
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.hbi.Destroy();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  _bi() {
    this.lbi = DropDownLogicCreator_1.DropDownLogicCreator.GetDropDownLogic(this.Data.FunctionId);
    var e = this.lbi.GetDropDownDataList();
    var t = this.lbi.GetDefaultIndex(this.Data);
    this.hbi.InitScroll(e, this.g8e, t);
  }
  Update(e) {
    this.Data = e;
    this.mGe();
    this._bi();
    this.sxi();
    this.cHa();
    this.RefreshDetailSprite();
  }
  async ClearAsync() {
    var e = [];
    for (const t of this.hbi.GetDropDownItemList()) {
      e.push(t.DestroyAsync());
    }
    await Promise.all(e);
  }
  SetInteractionActive(e) {}
  OnSetDetailVisible(e) {
    this.GetItem(2)?.SetUIActive(e);
    if (this.Data && this.Data.CanClickWhenDisable && !this.Data.GetEnable()) {
      e = e ? UE.Color.FromHex(MenuDefine_1.DETAIL_SPRITE_VISIBLE_COLOR_SRGB) : UE.Color.FromHex("FFFFFFFF");
      this.GetSprite(4).SetColor(e);
      this.GetUiExtendToggleSpriteTransition(5).TransitionState.UnDetermineUnHoverState.Color = e;
      this.GetUiExtendToggleSpriteTransition(5).TransitionState.UnDetermineHoverState.Color = e;
      this.GetUiExtendToggleSpriteTransition(5).TransitionState.UnDeterminePressedState.Color = e;
    }
  }
  sxi() {
    var e;
    var t;
    if (this.Data && this.Data.HasDetailText()) {
      e = this.GetText(3);
      t = this.Data.GetDetailTextId();
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  cHa() {
    if (this.Data) {
      this.GetSprite(4)?.SetUIActive(this.Data.HasDetailText());
    }
  }
  async RefreshDetailSprite() {
    var e;
    if (this.Data) {
      e = this.Data.CanClickWhenDisable ? MenuDefine_1.DETAIL_SPRITE_PATH : MenuDefine_1.LOCK_SPRITE_PATH;
      await Promise.all([this.SetExtendToggleSpriteTransitionByPath(e, this.GetUiExtendToggleSpriteTransition(5), 6), this.SetExtendToggleSpriteTransitionByPath(e, this.GetUiExtendToggleSpriteTransition(5), 7), this.SetExtendToggleSpriteTransitionByPath(e, this.GetUiExtendToggleSpriteTransition(5), 8)]);
    }
  }
}
exports.MenuScrollSettingDropDown = MenuScrollSettingDropDown;
//# sourceMappingURL=MenuScrollSettingDropDown.js.map