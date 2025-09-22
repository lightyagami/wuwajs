"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTabMainTabItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SurvivorsRogueUiDefine_1 = require("../SurvivorsRogueUiDefine");
class SurvivorsTabMainTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.mOd = 0;
    this.fOd = -1;
    this.Bke = e => {
      if (e === 1) {
        switch (this.mOd) {
          case 2:
            this.SelectedCallBack?.(this.GridIndex);
            break;
          case 0:
            this.SetForceSwitch(0);
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsCombat_WeaponNoUsed");
            break;
          case 1:
            this.SetForceSwitch(0);
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsWeaponAttribute_WaveUnlockTips", this.fOd);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(1).SetToggleState(0);
  }
  RefreshTabState(e) {
    this.mOd = e;
    this.GetItem(4)?.SetUIActive(e === 1);
    this.GetItem(6)?.SetUIActive(e === 2);
    this.GetItem(0)?.SetUIActive(e === 0);
  }
  RefreshLevel(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, e);
  }
  RefreshUnlockWave(e) {
    this.fOd = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "SurvivorsWeaponAttribute_WaveUnlockButton", e);
  }
  SetTextById(e) {
    this.GetText(3)?.ShowTextNew(e);
  }
  RefreshInfo(e, t) {
    this.RefreshLevel(t);
    this.SetTextureByPath(e, this.GetTexture(2));
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.SurvivorsTabMainTabItem = SurvivorsTabMainTabItem;
//# sourceMappingURL=SurvivorsTabMainTabItem.js.map