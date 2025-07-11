"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundDetectTabItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const NewSoundDetectItem_1 = require("./NewSoundDetectItem");
class NewSoundDetectTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.n8e = undefined;
    this.Yai = t => {
      t = t === 1;
      this.GetVerticalLayout(0)?.RootUIComp.SetUIActive(t);
      this.Pe.IsVisible = t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.n8e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), () => new NewSoundDetectItem_1.NewSoundDetectItem());
    this.GetExtendToggle(2)?.OnStateChange.Add(this.Yai);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    this.n8e?.RefreshByData(this.Pe.DungeonList);
    var s = t.IsVisible ? 1 : 0;
    this.GetExtendToggle(2)?.SetToggleState(s);
    this.Yai(s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TabTextId);
    if (t.IconPath) {
      this.SetSpriteByPath(t.IconPath, this.GetSprite(4), false);
    }
    this.GetSprite(4)?.SetUIActive(t.IconPath !== undefined && !StringUtils_1.StringUtils.IsBlank(t.IconPath));
    this.GetItem(5)?.SetUIActive(t.IconPath !== undefined && !StringUtils_1.StringUtils.IsBlank(t.IconPath));
    this.GetItem(6)?.SetUIActive(t.IconPath === undefined || StringUtils_1.StringUtils.IsBlank(t.IconPath));
  }
}
exports.NewSoundDetectTabItem = NewSoundDetectTabItem;
//# sourceMappingURL=NewSoundDetectTabItem.js.map