"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureScrollItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FurnitureScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnItemSelectedDelegate = undefined;
    this.OnItemUnSelectedDelegate = undefined;
    this.CanToggleChangedDelegate = undefined;
    this.OnPointUpCallBackDelegate = undefined;
    this.OnPointerEnterDelegate = undefined;
    this.Yai = t => {
      if (t === 1) {
        this.OnItemSelectedDelegate?.(this.GridIndex);
      } else {
        this.OnItemUnSelectedDelegate?.(this.GridIndex);
      }
    };
    this.MUt = () => !this.CanToggleChangedDelegate || this.CanToggleChangedDelegate(this.GridIndex);
    this.fKc = () => {
      this.OnPointUpCallBackDelegate?.(this.GridIndex);
    };
    this.z2g = () => {
      this.OnPointerEnterDelegate?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Yai]];
  }
  OnStart() {
    var t = this.GetExtendToggle(0);
    t.CanExecuteChange.Bind(this.MUt);
    t.OnPointUpCallBack.Bind(this.fKc);
    t.OnPointEnterCallBack.Bind(this.z2g);
  }
  Refresh(t, s, i) {
    this.Pe = t;
    this.RefreshItemToggle(true);
    this.RefreshCheckItem();
    this.RefreshFurnitureIcon();
    this.RefreshCount();
    this.RefreshAtmosphere();
    this.RefreshLock();
    this.RefreshBan();
    this.RefreshRoleIcon();
    this.RefreshRedDot();
    this.RefreshQuality();
  }
  RefreshItemToggle(t = false) {
    var s = this.Pe?.IsSelected ?? false ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(s, false, false, t);
  }
  RefreshCheckItem() {
    var t = this.Pe?.IsCheck ?? false;
    this.GetItem(4).SetUIActive(t);
  }
  RefreshFurnitureIcon() {
    var t = this.Pe?.FurnitureConfig;
    this.SetTextureByPath(t?.Icon ?? "", this.GetTexture(2));
  }
  RefreshCount() {
    var t = this.Pe?.IsLock ?? false;
    var s = this.Pe?.LeftCount ?? 0;
    var i = this.Pe?.FurnitureConfig?.LimitCount ?? 0;
    this.GetItem(6).SetUIActive(!t && i > 0);
    if (!t) {
      this.GetText(7).SetText(s + "/" + i);
    }
  }
  RefreshBan() {
    var t = this.Pe?.FurnitureConfig?.LimitCount ?? 0;
    var s = this.Pe?.LeftCount ?? 0;
    var i = this.Pe?.IsLock ?? false;
    var h = this.Pe?.IsSelected ?? false;
    this.GetItem(3).SetUIActive(!i && !h && t > 0 && s <= 0);
  }
  RefreshRoleIcon() {
    var t = this.Pe?.FurnitureConfig;
    var s = t?.SourceType === 2;
    this.GetItem(12).SetUIActive(s);
    if (s) {
      this.SetTextureShowUntilLoaded(t?.RoleIconPath ?? "", this.GetTexture(5));
    }
  }
  RefreshAtmosphere() {
    var t = this.Pe?.FurnitureConfig;
    this.GetText(9).SetText(t?.Atmosphere.toString() ?? "");
  }
  RefreshLock() {
    this.GetItem(10).SetUIActive(this.Pe?.IsLock ?? false);
  }
  RefreshRedDot() {
    this.GetItem(11).SetUIActive(this.Pe?.RedDotShowState ?? false);
  }
  RefreshQuality() {
    var t = this.Pe?.FurnitureConfig?.QualityId ?? 0;
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureQualityConfig(t);
    var t = UE.Color.FromHex(t?.ScrollItemColor ?? "");
    this.GetSprite(1).SetColor(t);
  }
}
exports.FurnitureScrollItem = FurnitureScrollItem;
//# sourceMappingURL=FurnitureScrollItem.js.map