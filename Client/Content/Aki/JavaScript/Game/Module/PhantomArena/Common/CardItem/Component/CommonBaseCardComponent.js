"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonBaseCardComponent = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  PhantomArenaDefine_1 = require("../../../Battle/PhantomArenaDefine"),
  CardComponentBase_1 = require("../CardComponentBase"),
  CardElementItem_1 = require("../Item/CardElementItem");
class CommonBaseCardComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments), this.Data = void 0, this.aho = void 0, this.GFo = () => {
      this.Data?.OnPointerUp?.()
    }, this.sui = s => {
      this.Data?.OnToggleStateChanged?.(s)
    }, this.A5e = () => !this.Data?.CanToggleExecuteChange || this.Data.CanToggleExecuteChange()
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [6, UE.UIItem],
      [5, UE.UIItem],
      [15, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.aho = new CardElementItem_1.CardElementItem, await this.aho.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())
  }
  OnStart() {
    var s = this.GetExtendToggle(0);
    s.OnStateChange.Add(this.sui), s.CanExecuteChange.Bind(this.A5e), s.OnPointUpCallBack.Bind(this.GFo), this.GetTexture(8).SetUIActive(!1), this.GetItem(6).SetUIActive(!1), this.GetItem(5).SetUIActive(!1), this.GetItem(15).SetUIActive(!1), this.GetItem(14).SetUIActive(!1)
  }
  Refresh(s) {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshAsync(s)
    }).Run()
  }
  async RefreshAsync(s) {
    this.Data = s, this.RefreshAttack(), this.RefreshLife(), this.RefreshCost(), this.RefreshElementIcon(), this.RefreshElementFrame(), this.RefreshCardFrame(), this.RefreshToggleState(), this.RefreshLightItem(), await this.RefreshCardFaceAsync()
  }
  RefreshAttack() {
    this.GetText(1).SetText(this.Data.Attack.toString())
  }
  RefreshLife() {
    this.GetText(3).SetText(this.Data.Life.toString())
  }
  RefreshCost() {
    this.GetText(4).SetText(this.Data.Cost.toString())
  }
  RefreshElementIcon() {
    this.aho.Refresh(this.Data.Element, !1, 0)
  }
  RefreshElementFrame() {
    this.GetItem(9).SetUIActive(0 !== this.Data.Element && !this.Data.OutlookUnlocked), this.GetItem(11).SetUIActive(0 !== this.Data.Element && this.Data.OutlookUnlocked)
  }
  RefreshCardFace() {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshCardFaceAsync()
    }).Run()
  }
  async RefreshCardFaceAsync() {
    const s = this.GetTexture(8);
    if (this.Data.ShowCardFaceTexture && this.Data.CardFaceTexturePath) {
      const s = this.GetTexture(8);
      s.SetUIActive(!1), await this.SetTextureAsync(this.Data.CardFaceTexturePath, s), s.SetUIActive(!0)
    } else s.SetUIActive(!1)
  }
  RefreshToggleState() {
    this.GetExtendToggle(0).SetToggleState(this.Data.ToggleState ?? 0)
  }
  RefreshCardFrame() {
    this.GetItem(10).SetUIActive(!this.Data.OutlookUnlocked), this.GetItem(12).SetUIActive(this.Data.OutlookUnlocked)
  }
  RefreshLightItem() {
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost(),
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.CardId),
      s = t.Cost === s ? 0 : t.Cost;
    this.GetItem(14)?.SetUIActive(0 !== s), this.GetItem(5)?.SetUIActive(s >= PhantomArenaDefine_1.COST_ONE), this.GetItem(6)?.SetUIActive(s >= PhantomArenaDefine_1.COST_THREE), this.GetItem(15)?.SetUIActive(s >= PhantomArenaDefine_1.COST_THREE)
  }
  RefreshOutlook() {
    this.RefreshElementFrame(), this.RefreshCardFrame(), this.RefreshCardFace()
  }
}
exports.CommonBaseCardComponent = CommonBaseCardComponent;
//# sourceMappingURL=CommonBaseCardComponent.js.map