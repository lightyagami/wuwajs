"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeThumbItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class AdvanceNoticeThumbItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnItemToggleClickDelegate = undefined;
    this.CanItemToggleChangeDelegate = undefined;
    this.SV1 = () => {
      if (this.Pe) {
        this.OnItemToggleClickDelegate?.(this.Pe, this.GridIndex);
      }
    };
    this.dym = () => !!this.Pe && (this.CanItemToggleChangeDelegate?.(this.Pe, this.GridIndex) ?? true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.SV1]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.dym);
  }
  Refresh(t, i, s) {
    this.Pe = t;
    this.SetTextureByPath(t.BgTexturePath, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.NameTextId);
    this.GetItem(3).SetUIActive(t.ShowLine);
    this.RefreshToggleState(t.IsSelected);
  }
  RefreshToggleState(t) {
    this.GetSprite(4).SetUIActive(t);
    this.GetSprite(5).SetUIActive(t);
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
  }
}
exports.AdvanceNoticeThumbItem = AdvanceNoticeThumbItem;
//# sourceMappingURL=AdvanceNoticeThumbItem.js.map