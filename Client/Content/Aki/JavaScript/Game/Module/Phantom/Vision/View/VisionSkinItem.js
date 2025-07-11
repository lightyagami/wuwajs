"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionSkinItem = undefined;
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class VisionSkinItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Nji = undefined;
    this.W5e = undefined;
    this.ETt = -1;
    this.RFe = () => {
      this.Nji?.(this.ETt, this.GetItemGridExtendToggle());
      this.SetNewFlagVisible(false);
      ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin, this.ETt);
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin);
    };
    this.A5e = () => !this.W5e || this.W5e(this.ETt);
  }
  OnRefresh(e, i, t) {
    this.ETt = e;
    var o = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin, e);
    var a = !!ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e).ParentMonsterId && !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(e);
    this.Apply({
      Type: 3,
      Data: e,
      ItemConfigId: e,
      IsLockVisibleBlack: a,
      IsNewVisible: o,
      IsQualityHidden: true
    });
    var e = this.GetItemGridExtendToggle().ToggleState;
    if (e !== 0) {
      this.SetSelected(false, true);
    }
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.RFe);
    this.GetItemGridExtendToggle()?.CanExecuteChange.Bind(this.A5e);
  }
  OnSelected(e) {
    if (this.GetItemGridExtendToggle().ToggleState !== 1) {
      this.SetSelected(true, true);
    }
  }
  SetClickToggleEvent(e) {
    this.Nji = e;
  }
  BindCanToggleExecuteChange(e) {
    this.W5e = e;
  }
}
exports.VisionSkinItem = VisionSkinItem;
//# sourceMappingURL=VisionSkinItem.js.map