"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHandBookItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
class WeaponHandBookItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
    this.fsd = undefined;
    this.gsd = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async WZt() {
    this.fsd = new WeaponHandBookTitleItem();
    this.AddChild(this.fsd);
    this.gsd = new WeaponHandBookLayoutItem();
    this.AddChild(this.gsd);
    var e = this.GetItem(0);
    e.SetUIActive(false);
    var t = this.GetItem(1);
    t.SetUIActive(false);
    await Promise.all([this.fsd.CreateByActorAsync(e.GetOwner()), this.gsd.CreateByActorAsync(t.GetOwner())]);
    this.gsd.OnClickCallBack = this.OnClickCallBack;
  }
  GetUsingItem(e) {
    return (e.TitleId ? this.GetItem(0) : this.GetItem(1)).GetOwner();
  }
  ClearItem() {
    this.Destroy();
  }
  Update(e, t) {
    this.fsd?.SetUiActive(false);
    this.gsd?.SetUiActive(false);
    if (e.TitleId) {
      this.fsd?.SetUiActive(true);
      this.fsd?.Update(e.TitleId);
    } else if (e.ItemData) {
      this.gsd?.SetUiActive(true);
      this.gsd?.Update(e.ItemData);
    }
  }
}
exports.WeaponHandBookItem = WeaponHandBookItem;
class WeaponHandBookTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Update(e) {
    this.GetText(0)?.SetText(e);
  }
}
class WeaponHandBookLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
    this.Tei = undefined;
    this.sGe = () => {
      var e = new WeaponHandBookWeaponItem();
      e.OnClickCallBack = this.OnClickCallBack;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.sGe);
  }
  Update(e) {
    this.Tei?.RefreshByData(e, () => {
      for (const e of this.Tei?.GetLayoutItemList() ?? []) {
        if (e.HandBookId === ModelManager_1.ModelManager.HandBookModel.CurrentSelectWeaponHandBookId) {
          e.OnSelected(true);
          break;
        }
      }
    });
  }
}
class WeaponHandBookWeaponItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.HandBookId = 0;
    this.OnClickCallBack = undefined;
    this.OnHandBookRead = (e, t) => {
      if (e === 3 && t === this.HandBookId) {
        this.SetNewVisible(false);
      }
    };
  }
  OnRefresh(e, t, i) {
    this.HandBookId = e.ItemId ?? 0;
    this.SetSelected(t);
    t = !ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(3, this.HandBookId)?.IsRead;
    t = {
      Type: 4,
      Data: this.HandBookId,
      ItemConfigId: this.HandBookId,
      IsNewVisible: t,
      BottomTextId: e.IsSkin ? ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(this.HandBookId).Name : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.HandBookId).WeaponName
    };
    this.Apply(t);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  OnSelected(e) {
    this.SetSelected(true, true);
    if (e) {
      this.OnExtendToggleStateChanged(1);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.OnClickCallBack?.(this.GetItemGridExtendToggle(), this.HandBookId);
    }
  }
}
//# sourceMappingURL=WeaponHandBookItem.js.map