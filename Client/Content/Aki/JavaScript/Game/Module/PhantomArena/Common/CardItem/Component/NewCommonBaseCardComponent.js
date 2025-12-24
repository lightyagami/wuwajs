"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewCommonBaseCardComponent = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const PhantomArenaDefine_1 = require("../../../Battle/PhantomArenaDefine");
const CardComponentBase_1 = require("../CardComponentBase");
const CardElementItem_1 = require("../Item/CardElementItem");
class NewCommonBaseCardComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.aho = undefined;
    this.$km = undefined;
    this.GFo = () => {
      this.Data?.OnPointerUp?.();
    };
    this.sui = e => {
      this.Data?.OnToggleStateChanged?.(e);
    };
    this.A5e = () => !this.Data?.CanToggleExecuteChange || this.Data.CanToggleExecuteChange();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [6, UE.UIItem], [5, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.aho = new CardElementItem_1.CardElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.OnStateChange.Add(this.sui);
    e.CanExecuteChange.Bind(this.A5e);
    e.OnPointUpCallBack.Bind(this.GFo);
    this.GetTexture(11).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
  }
  Refresh(e) {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshAsync(e);
    }).Run();
  }
  async RefreshAsync(e) {
    this.Data = e;
    this.nkm();
    this.RefreshElementIcon();
    this.RefreshElementFrame();
    this.RefreshToggleState();
    this.RefreshLightItem();
    this.hPu();
    this.akm();
    this.hkm();
    await this.RefreshCardFaceAsync();
  }
  nkm() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.CardId);
    this.$km = e.Type;
  }
  mU1() {
    this.GetText(1).SetText(this.Data.Attack.toString());
  }
  Wkm() {
    this.GetText(3).SetText(this.Data.Life.toString());
  }
  RGt() {
    this.GetText(4).SetText(this.Data.Cost.toString());
  }
  RefreshElementIcon() {
    this.aho.Refresh(this.Data.Element, false, 0);
  }
  RefreshElementFrame() {
    this.GetItem(8).SetUIActive(this.Data.Element !== 0);
  }
  RefreshCardFace() {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshCardFaceAsync();
    }).Run();
  }
  async RefreshCardFaceAsync() {
    const e = this.GetTexture(11);
    if (this.Data.ShowCardFaceTexture && this.Data.CardFaceTexturePath) {
      const e = this.GetTexture(11);
      e.SetUIActive(false);
      await this.SetTextureAsync(this.Data.CardFaceTexturePath, e);
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
    }
  }
  hPu() {
    var e = this.$km === 1;
    this.GetItem(12)?.SetUIActive(e);
    if (e) {
      this.mU1();
      this.Wkm();
      this.RGt();
    }
  }
  akm() {
    var e = this.$km === 3;
    this.GetItem(14)?.SetUIActive(e);
  }
  hkm() {
    var e = this.$km === 2;
    this.GetItem(15)?.SetUIActive(e);
    if (e) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.CardId).InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_DurableMax);
      this.GetText(16)?.SetText("" + e);
    }
  }
  RefreshToggleState() {
    this.GetExtendToggle(0).SetToggleState(this.Data.ToggleState ?? 0);
  }
  RefreshLightItem() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost();
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.CardId);
    var e = t.Cost === e;
    var s = t.Type === 3;
    var e = e || s ? 0 : t.Cost;
    this.GetItem(10)?.SetUIActive(e !== 0);
    this.GetItem(5)?.SetUIActive(e >= PhantomArenaDefine_1.COST_ONE);
    this.GetItem(6)?.SetUIActive(e >= PhantomArenaDefine_1.COST_THREE);
    this.GetItem(7)?.SetUIActive(e >= PhantomArenaDefine_1.COST_THREE);
  }
  RefreshOutlook() {
    this.RefreshElementFrame();
    this.RefreshCardFace();
  }
}
exports.NewCommonBaseCardComponent = NewCommonBaseCardComponent;
//# sourceMappingURL=NewCommonBaseCardComponent.js.map