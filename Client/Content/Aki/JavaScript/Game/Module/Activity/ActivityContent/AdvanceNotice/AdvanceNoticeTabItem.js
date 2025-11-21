"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeTabItem = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class AdvanceNoticeTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.Bke = t => {
      if (t === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.RefreshTransition = () => {
      var t = this.GetUiExtendToggleSpriteTransition(3);
      if (t) {
        t.SetAllStateSprite(this.GetSprite(0).GetSprite());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIExtendToggleSpriteTransition], [4, UE.UISprite], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetTabToggle().SetToggleState(0, false);
    this.GetItem(2).SetUIActive(false);
  }
  OnRefresh(t, e, s) {
    this.UpdateTabIcon(t.Data.GetIcon());
    this.UpdateTitle(t.Data.GetTabItemTitleData().TextId);
  }
  OnUpdateTabIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), false, undefined, this.RefreshTransition);
  }
  UpdateTitle(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t);
  }
  OnSetToggleState(t, e) {
    this.GetTabToggle().SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.AdvanceNoticeTabItem = AdvanceNoticeTabItem;
//# sourceMappingURL=AdvanceNoticeTabItem.js.map