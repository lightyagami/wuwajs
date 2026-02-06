"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineSlotItemData = exports.VisionRefineSlotItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
class VisionRefineSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.Wkg = undefined;
    this.Qkg = undefined;
    this.rMt = undefined;
    this.OnGetMainPropItemIdCallback = undefined;
    this.OnIsShouldElementItemDownCallback = undefined;
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.sMt = () => {
      if (this.rMt) {
        this.rMt(true, this.GridIndex);
      }
    };
    this.aMt = () => {
      if (this.rMt) {
        this.rMt(false, this.GridIndex);
      }
    };
    this.rMt = i;
  }
  Refresh(i, t, s) {
    if (i.ItemData === undefined) {
      this.RefreshEmpty();
    } else {
      this.RefreshByData(i.ItemData, i.IsConfirm, i.Cost);
    }
  }
  Clear() {}
  OnSelected(i) {}
  OnDeselected(i) {}
  GetKey(i, t) {
    return i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UITexture], [0, UE.UISpriteTransition], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [12, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[4, this.sMt], [5, this.aMt]];
  }
  async OnBeforeStartAsync() {
    this.Wkg = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(6));
    this.Qkg = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(12));
    await this.Wkg.Init();
    await this.Qkg.Init();
  }
  OnStart() {
    var i = this.rMt !== undefined;
    this.GetUiSpriteTransition(0).SetEnable(i);
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(true);
    this.GetItem(7).SetUIActive(false);
    this.GetTexture(2).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    this.GetButton(5).RootUIComp.SetUIActive(false);
    this.Wkg.SetUiActive(false);
    this.Qkg.SetUiActive(false);
    this.GetItem(9)?.SetUIActive(false);
    this.GetItem(10)?.SetUIActive(false);
    this.GetItem(11)?.SetUIActive(false);
  }
  RefreshByData(s, e, h) {
    const o = this.GetTexture(2);
    const i = this.GetSprite(3);
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(s.GetQuality());
    this.SetSpriteByPath(t, i, false, undefined, () => {
      i.SetUIActive(true);
    });
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s.GetConfigId());
    this.SetTextureByPath(t.IconMiddle, o, undefined, () => {
      o.SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
      this.GetButton(5).RootUIComp.SetUIActive(!e);
      var i;
      var t = s.GetFetterGroupConfig();
      if (t !== undefined) {
        this.Wkg.Update(t);
        this.Wkg.SetUiActive(e);
      }
      if (this.OnIsShouldElementItemDownCallback && this.OnIsShouldElementItemDownCallback() && t) {
        this.Qkg.Update(t);
        this.Qkg.SetUiActive(true);
        this.GetItem(7).SetUIActive(false);
      } else {
        this.Qkg?.SetUiActive(false);
        this.GetItem(7).SetUIActive(true);
        this.GetText(8).SetText(h.toString());
      }
      if (this.OnGetMainPropItemIdCallback === undefined || (t = this.OnGetMainPropItemIdCallback()) === undefined) {
        this.GetItem(11)?.SetUIActive(false);
      } else if ((i = s?.GetUniqueId()) !== undefined && (i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i)) !== undefined) {
        this.GetItem(11)?.SetUIActive(t === i.GetPhantomFirstMainProp().Yws);
      }
      if (this.OnIsShouldElementItemDownCallback && this.OnIsShouldElementItemDownCallback()) {
        this.GetItem(9)?.SetUIActive(s.GetIsLock());
        this.GetItem(10)?.SetUIActive(s.GetIsDeprecated());
      } else {
        this.GetItem(9)?.SetUIActive(false);
        this.GetItem(10)?.SetUIActive(false);
      }
    });
  }
  SetBtnInteractive(i) {
    var t = this.GetButton(4);
    t.SetSelectionState(0);
    t.SetSelfInteractive(i);
  }
}
exports.VisionRefineSlotItem = VisionRefineSlotItem;
class VisionRefineSlotItemData {
  constructor() {
    this.ItemData = undefined;
    this.IsConfirm = false;
    this.Cost = 0;
  }
}
exports.VisionRefineSlotItemData = VisionRefineSlotItemData;
//# sourceMappingURL=VisionRefineSlotItem.js.map