"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonBaseCardComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const PhantomArenaDefine_1 = require("../../../Battle/PhantomArenaDefine");
const CardComponentBase_1 = require("../CardComponentBase");
const CardElementItem_1 = require("../Item/CardElementItem");
class CommonBaseCardComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.aho = undefined;
    this.GFo = () => {
      this.Data?.OnPointerUp?.();
    };
    this.sui = s => {
      this.Data?.OnToggleStateChanged?.(s);
    };
    this.A5e = () => !this.Data?.CanToggleExecuteChange || this.Data.CanToggleExecuteChange();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [6, UE.UIItem], [5, UE.UIItem], [15, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.aho = new CardElementItem_1.CardElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
  }
  OnStart() {
    var s = this.GetExtendToggle(0);
    s.OnStateChange.Add(this.sui);
    s.CanExecuteChange.Bind(this.A5e);
    s.OnPointUpCallBack.Bind(this.GFo);
    this.GetTexture(8).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  Refresh(s) {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshAsync(s);
    }).Run();
  }
  async RefreshAsync(s) {
    this.Data = s;
    this.RefreshAttack();
    this.RefreshLife();
    this.RefreshCost();
    this.RefreshElementIcon();
    this.RefreshElementFrame();
    this.RefreshCardFrame();
    this.RefreshToggleState();
    this.RefreshLightItem();
    await this.RefreshCardFaceAsync();
  }
  RefreshAttack() {
    this.GetText(1).SetText(this.Data.Attack.toString());
  }
  RefreshLife() {
    this.GetText(3).SetText(this.Data.Life.toString());
  }
  RefreshCost() {
    this.GetText(4).SetText(this.Data.Cost.toString());
  }
  RefreshElementIcon() {
    this.aho.Refresh(this.Data.Element, false, 0);
  }
  RefreshElementFrame() {
    this.GetItem(9).SetUIActive(this.Data.Element !== 0 && !this.Data.OutlookUnlocked);
    this.GetItem(11).SetUIActive(this.Data.Element !== 0 && this.Data.OutlookUnlocked);
  }
  RefreshCardFace() {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshCardFaceAsync();
    }).Run();
  }
  async RefreshCardFaceAsync() {
    const s = this.GetTexture(8);
    if (this.Data.ShowCardFaceTexture && this.Data.CardFaceTexturePath) {
      const s = this.GetTexture(8);
      s.SetUIActive(false);
      await this.SetTextureAsync(this.Data.CardFaceTexturePath, s);
      s.SetUIActive(true);
    } else {
      s.SetUIActive(false);
    }
  }
  RefreshToggleState() {
    this.GetExtendToggle(0).SetToggleState(this.Data.ToggleState ?? 0);
  }
  RefreshCardFrame() {
    this.GetItem(10).SetUIActive(!this.Data.OutlookUnlocked);
    this.GetItem(12).SetUIActive(this.Data.OutlookUnlocked);
  }
  RefreshLightItem() {
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost();
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.CardId);
    var s = t.Cost === s ? 0 : t.Cost;
    this.GetItem(14)?.SetUIActive(s !== 0);
    this.GetItem(5)?.SetUIActive(s >= PhantomArenaDefine_1.COST_ONE);
    this.GetItem(6)?.SetUIActive(s >= PhantomArenaDefine_1.COST_THREE);
    this.GetItem(15)?.SetUIActive(s >= PhantomArenaDefine_1.COST_THREE);
  }
  RefreshOutlook() {
    this.RefreshElementFrame();
    this.RefreshCardFrame();
    this.RefreshCardFace();
  }
}
exports.CommonBaseCardComponent = CommonBaseCardComponent;
//# sourceMappingURL=CommonBaseCardComponent.js.map