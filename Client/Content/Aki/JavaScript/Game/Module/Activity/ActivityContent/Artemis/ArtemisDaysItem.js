"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisDaysItem = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ArtemisActivityController_1 = require("./ArtemisActivityController");
class ArtemisDaysItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.hma = 0;
    this.Dxt = false;
    this.NTt = () => {};
    this.Lkf = UE.Color.FromHex("838383");
    this.wkf = UE.Color.FromHex("FFFFFF");
    this.Pkf = UE.Color.FromHex("212224");
    this.Akf = UE.Color.FromHex("838383");
    this.jYe = () => {
      if (this.Dxt) {
        this.GetExtendToggle(0)?.SetToggleState(0);
      }
      this.NTt(this.hma);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIArtText], [4, UE.UIItem], [5, UE.UIArtText]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  Refresh(t, i, s) {
    var e;
    if (t) {
      this.hma = t.Index;
      e = "0" + (t.Index + 1);
      this.GetArtText(3)?.SetText(e);
      this.GetArtText(5)?.SetText(e);
      this.UpdateState(t.State);
    }
  }
  SetClickCallback(t) {
    this.NTt = t;
  }
  UpdateState(t) {
    this.Dxt = t === 0;
    var i = !this.Dxt && this.hma === ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex;
    this.GetExtendToggle(0).bLockStateOnSelect = !this.Dxt;
    this.GetItem(4).SetUIActive(this.Dxt);
    this.Dkf(i, t ?? 0);
    this.GetExtendToggle(0)?.SetToggleState(i ? 1 : 0);
    this.LoadMaterial(t === 1);
  }
  Dkf(t, i) {
    var s = i === 2;
    var e = t && i === 1;
    this.GetArtText(3)?.SetUIActive(!e);
    this.GetArtText(5)?.SetUIActive(e);
    this.GetTexture(2).SetUIActive(s);
    let r = this.wkf;
    if (t) {
      r = this.Pkf;
    } else if (s) {
      r = this.Lkf;
    } else if (i === 0) {
      r = this.Akf;
    }
    this.GetArtText(3).SetColor(r);
    this.GetArtText(5).SetColor(r);
    if (s) {
      this.GetTexture(2).SetColor(r);
    }
  }
  LoadMaterial(t) {
    if (t) {
      if (t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("MI_GlitchAimis")) {
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.MaterialInterface, t => {
          this.GetArtText(3)?.SetCustomUIMaterial(t);
          this.GetArtText(5)?.SetCustomUIMaterial(t);
        }, 102, this.MemoryTag);
      }
    } else {
      this.GetArtText(3)?.SetCustomUIMaterial(undefined);
      this.GetArtText(5)?.SetCustomUIMaterial(undefined);
    }
  }
}
exports.ArtemisDaysItem = ArtemisDaysItem;
//# sourceMappingURL=ArtemisDaysItem.js.map