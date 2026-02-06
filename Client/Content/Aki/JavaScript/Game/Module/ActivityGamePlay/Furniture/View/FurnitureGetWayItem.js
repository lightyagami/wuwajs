"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureGetWayItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FurnitureGetWayButtonItem_1 = require("./FurnitureGetWayButtonItem");
class FurnitureGetWayItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.XKf = undefined;
    this.Iyc = undefined;
    this.YKf = undefined;
    this.sOt = () => {
      this.Pe?.ConfirmFunction?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[7, this.sOt]];
  }
  async OnBeforeStartAsync() {
    this.XKf = new FurnitureGetWayButtonItem_1.FurnitureGetWayButtonItem();
    this.Iyc = new FurnitureGetWayButtonItem_1.FurnitureGetWayButtonItem();
    this.YKf = new FurnitureGetWayButtonItem_1.FurnitureGetWayButtonItem();
    await Promise.all([this.XKf.CreateByActorAsync(this.GetItem(4).GetOwner()), this.Iyc.CreateByActorAsync(this.GetItem(5).GetOwner()), this.YKf.CreateByActorAsync(this.GetItem(6).GetOwner())]);
  }
  Refresh(t) {
    this.Pe = t;
    this.UpdateItemsVisible();
    this.RefreshFurnitureInfo();
    this.RefreshOccupiedItem();
    this.RefreshShopItem();
    this.RefreshGiftItem();
    this.RefreshAtmosphereItem();
  }
  UpdateItemsVisible() {
    var t = this.Pe?.LockReason === 1;
    var i = this.Pe?.LockReason === 2;
    var s = this.Pe?.LockReason === 3;
    var e = this.Pe?.ConfirmFunction !== undefined;
    var h = this.Pe?.JumpFunction !== undefined;
    var r = this.Pe?.LockReasonTextId;
    var r = r !== undefined && !StringUtils_1.StringUtils.IsEmpty(r);
    this.XKf?.SetUiActive(t);
    this.Iyc?.SetUiActive(i && h && !r);
    this.YKf?.SetUiActive(s && h && !r);
    this.GetButton(7)?.RootUIComp?.SetUIActive(t && e);
    this.GetItem(8)?.SetUIActive(!t && r);
  }
  RefreshFurnitureInfo() {
    var t = this.Pe?.FurnitureConfig.IconBig ?? "";
    this.SetTextureShowUntilLoaded(t, this.GetTexture(0));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Pe?.FurnitureConfig.Name ?? "");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe?.FurnitureConfig.AttributesDescription ?? "");
  }
  RefreshOccupiedItem() {
    if (this.Pe?.LockReason === 1) {
      this.XKf?.Refresh({
        NameTextId: this.Pe.LockReasonTextId,
        NameTextParams: this.Pe.LockReasonTextParams,
        JumpFunction: this.Pe.JumpFunction
      });
    }
  }
  RefreshShopItem() {
    if (this.Pe?.LockReason === 2) {
      if (this.Pe.JumpFunction) {
        this.Iyc?.Refresh({
          JumpFunction: this.Pe.JumpFunction
        });
      } else {
        this.hvg();
      }
    }
  }
  RefreshGiftItem() {
    if (this.Pe?.LockReason === 3) {
      if (this.Pe.JumpFunction) {
        this.YKf?.Refresh({
          JumpFunction: this.Pe.JumpFunction
        });
      } else {
        this.hvg();
      }
    }
  }
  RefreshAtmosphereItem() {
    if (this.Pe?.LockReason === 4) {
      this.hvg();
    }
  }
  hvg() {
    if (this.Pe?.LockReasonTextId) {
      if (this.Pe.LockReasonTextParams) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), this.Pe.LockReasonTextId, ...this.Pe.LockReasonTextParams);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), this.Pe.LockReasonTextId);
      }
    }
  }
}
exports.FurnitureGetWayItem = FurnitureGetWayItem;
//# sourceMappingURL=FurnitureGetWayItem.js.map