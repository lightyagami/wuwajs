"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingExclusiveTypeTabItem = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingExclusiveTypeTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.Bke = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(0).SetToggleState(0);
  }
  OnRefresh(e, t, s) {
    this.UpdateTabIcon(e.Data?.GetIcon() ?? "");
    var i = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Data?.GetTitleData()?.TextId ?? "");
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  OnUpdateTabIcon(e) {
    this.SetTextureByPath(e, this.GetTexture(1), undefined);
  }
  OnSetToggleState(e, t) {
    var s = this.GetExtendToggle(0);
    if (s) {
      s.SetToggleState(e, t);
    }
  }
}
exports.KeySettingExclusiveTypeTabItem = KeySettingExclusiveTypeTabItem;
//# sourceMappingURL=KeySettingExclusiveTypeTabItem.js.map