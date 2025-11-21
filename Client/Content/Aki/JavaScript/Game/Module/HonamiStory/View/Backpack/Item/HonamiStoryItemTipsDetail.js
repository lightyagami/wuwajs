"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemTipsDetail = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryWeaponTagItem_1 = require("../../Items/HonamiStoryWeaponTagItem");
class HonamiStoryItemTipsDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.It_ = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.It_ = new HonamiStoryWeaponTagItem_1.HonamiStoryWeaponTagItem();
    await this.It_.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  Refresh(t, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.GetName());
    this.GetText(2).SetText(t.GetSellPrice().toString());
    this.GetItem(8).SetUIActive(false);
    if (t.GetItemType() !== 2 && (t = t) && t.GetBuffTempIdList().length !== 0 && t.GetWeaponTag() !== 0) {
      this.It_.Refresh(t.GetWeaponTag(), false, -1);
      this.GetItem(8).SetUIActive(true);
    }
  }
  AddHotKey(t) {
    t.SetUIActive(true);
    t.SetUIParent(this.GetItem(4));
  }
  SetAutoLocation(t) {
    var e = LguiUtil_1.LguiUtil.GetAdaptiveTipsPosition(t, this.RootItem);
    var i = this.GetItem(6).Width;
    var t = t.Height > t.Width ? -t.Width / 2 : -t.Height / 2;
    e.X = e.X + i;
    e.Z = e.Z + t;
    var i = e.ToUeVectorOld();
    this.RootItem.SetUIWorldLocation(i);
  }
}
exports.HonamiStoryItemTipsDetail = HonamiStoryItemTipsDetail;
//# sourceMappingURL=HonamiStoryItemTipsDetail.js.map