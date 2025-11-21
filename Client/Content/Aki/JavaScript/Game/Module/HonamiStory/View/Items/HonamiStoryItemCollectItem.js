"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemCollectItemView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class HonamiStoryItemCollectItemView extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.Lim = undefined;
    this.OnClickToggleBack = undefined;
    this.CanToggleChange = undefined;
    this.kqe = () => {
      this.OnClickToggleBack?.(this.GridIndex, this.fGt);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex));
    this.Lim = new SmallItemGrid_1.SmallItemGrid();
    this.Lim.Initialize(this.GetItem(1).GetOwner());
  }
  Refresh(t, i, s) {
    this.fGt = t;
    this.GetExtendToggle(0).SetEnable(this.fGt.State === 0);
    this.GetSprite(4).SetUIActive(this.fGt.State === 1);
    var e = {
      Type: 4,
      Data: t,
      ItemConfigId: t.Id
    };
    this.Lim.Apply(e);
    var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItem(t.Id);
    this.Lim.SetIconByPath(e.IconSmall);
    this.Lim.SetQuality(t.Id);
    this.Lim.SetLockBlackVisible(t.State === 0);
    if (this.fGt.State !== 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.fGt.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.fGt.Desc);
    } else {
      this.GetText(2).SetText("???");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.fGt.GetConfig.Access);
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, false);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
}
exports.HonamiStoryItemCollectItemView = HonamiStoryItemCollectItemView;
//# sourceMappingURL=HonamiStoryItemCollectItem.js.map