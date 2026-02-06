"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorPhantomExhibitIconItem = exports.SpringManorPhantomExhibitGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const LoopScrollSmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class SpringManorPhantomExhibitGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ppt = undefined;
    this.CanToggleChange = undefined;
    this.OnToggleClick = undefined;
    this.Pe = undefined;
    this.Bke = () => {
      if (this.Pe) {
        this.OnToggleClick?.(this.Pe.PhantomId, this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex));
    this.ppt = new SpringManorPhantomExhibitIconItem();
    this.ppt.CreateThenShowByActor(this.GetItem(1).GetOwner());
    this.ppt.SetToggleInteractive(false);
    this.GetItem(3)?.SetUIActive(false);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    this.ppt.Refresh(t);
    var i = i ? 1 : 0;
    var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t.PhantomId).MonsterName ?? "";
    this.GetText(2)?.ShowTextNew(r);
    this.GetExtendToggle(0)?.SetToggleStateForce(i);
    this.GetItem(5)?.SetUIActive(t.IsSelected);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
}
exports.SpringManorPhantomExhibitGrid = SpringManorPhantomExhibitGrid;
class SpringManorPhantomExhibitIconItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.spt = 0;
  }
  OnExtendToggleStateChanged(t) {
    this.SetSelected(false, false);
  }
  OnRefresh(t, i, e) {
    this.Refresh(t);
  }
  Refresh(t) {
    this.spt = t.PhantomId;
    var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(this.spt);
    if (i && ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(i.MonsterId)) {
      i = {
        Data: t,
        Type: 3,
        ItemConfigId: t.PhantomId,
        IsQualityHidden: true
      };
      this.Apply(i);
    }
  }
}
exports.SpringManorPhantomExhibitIconItem = SpringManorPhantomExhibitIconItem;
//# sourceMappingURL=SpringManorPhantomExhibitGrid.js.map