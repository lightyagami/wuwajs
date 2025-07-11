"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoverySlotItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
class VisionRecoverySlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i = true) {
    super();
    this.oMt = undefined;
    this.VHa = undefined;
    this.rMt = undefined;
    this.nMt = false;
    this.sMt = () => {
      if (this.rMt) {
        this.rMt(true, this.oMt);
      }
    };
    this.aMt = () => {
      if (this.rMt) {
        this.rMt(false, this.oMt);
      }
    };
    this.nNu = t => {
      if (this.oMt && this.oMt.GetUniqueId() === t) {
        this.sNu();
      }
    };
    this.rMt = t;
    this.nMt = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UITexture], [0, UE.UISpriteTransition], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[4, this.sMt], [5, this.aMt]];
  }
  async OnBeforeStartAsync() {
    this.VHa = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(6));
    await this.VHa.Init();
  }
  OnStart() {
    this.RefreshUi(this.oMt);
    var t = this.rMt !== undefined;
    this.GetUiSpriteTransition(0).SetEnable(t);
    this.GetItem(7).SetUIActive(false);
    this.tQt();
  }
  OnBeforeDestroy() {
    this.iQt();
  }
  tQt() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.nNu);
  }
  iQt() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.nNu);
  }
  RefreshUi(t) {
    if ((this.oMt = t) === undefined) {
      this.RefreshEmpty();
    } else {
      this.RefreshByData(t);
    }
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(true);
    this.GetTexture(2).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    this.GetButton(5).RootUIComp.SetUIActive(false);
    this.VHa.SetUiActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
  }
  RefreshByData(i) {
    const e = this.GetTexture(2);
    const t = this.GetSprite(3);
    var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(i.GetQuality());
    this.SetSpriteByPath(s, t, false, undefined, () => {
      t.SetUIActive(true);
    });
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i.GetConfigId());
    this.SetTextureByPath(s.IconMiddle, e, undefined, () => {
      e.SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
      this.GetButton(5).RootUIComp.SetUIActive(this.nMt);
      var t = i.GetFetterGroupConfig();
      if (t !== undefined) {
        this.VHa.Update(t);
      }
      this.VHa.SetUiActive(!this.nMt && t !== undefined);
    });
    var s = i.GetConfig().Rarity;
    var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(s).Cost;
    this.GetItem(7).SetUIActive(true);
    this.GetText(8).SetText(s.toString());
    this.sNu();
  }
  sNu() {
    var t = this.oMt ? ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.oMt.GetUniqueId()) : undefined;
    if (t) {
      this.GetItem(9).SetUIActive(t.GetIsLock());
      this.GetItem(10).SetUIActive(t.GetIsDeprecated());
    } else {
      this.GetItem(9).SetUIActive(false);
      this.GetItem(10).SetUIActive(false);
    }
  }
}
exports.VisionRecoverySlotItem = VisionRecoverySlotItem;
//# sourceMappingURL=VisionRecoverySlotItem.js.map