"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRaceCardItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchRaceCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.oIu = undefined;
    this.IsFixedRace = undefined;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchRaceRedDot) ?? new Set();
      if (this.oIu.IsUnLock && !e.has(this.oIu.Id)) {
        e.add(this.oIu.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchRaceRedDot, e);
      }
      this.GetItem(8).SetUIActive(false);
      if (this.IsFixedRace?.(this.oIu.Id)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FarmCannotBeModified");
        this.SetToggleState(true);
      } else if (this.oIu.IsUnLock) {
        if (this.OnToggleCallBack) {
          this.OnToggleCallBack(this.oIu.Id);
        }
      } else {
        this.SetToggleState(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIItem]];
    this.BtnBindInfo = [[9, this.kqe]];
  }
  Refresh(e, t, i) {
    this.oIu = e;
    this.SetTextureByPath(e.Icon, this.GetTexture(3));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.GetRaceName());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.GetDesc());
    this.GetText(5).bBestFit = false;
    var r = this.IsFixedRace(e.Id);
    var o = !e.IsUnLock;
    this.GetItem(1).SetUIActive(r);
    this.GetItem(6).SetUIActive(!r && o);
    this.GetItem(10).SetUIActive(false);
    if (r) {
      this.SetToggleState(true);
    }
    this.GetItem(8).SetUIActive(false);
    if (o) {
      r = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.ConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), r);
    } else if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchRaceRedDot) ?? new Set()).has(e.Id)) {
      this.GetItem(8).SetUIActive(true);
    }
  }
  GetKey(e, t) {
    return e.Id;
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(9).SetToggleState(e);
  }
  SetEquippedPanelVisible(e) {
    this.GetItem(10)?.SetUIActive(e);
  }
}
exports.FloroRanchRaceCardItem = FloroRanchRaceCardItem;
//# sourceMappingURL=FloroRanchRaceCardItem.js.map