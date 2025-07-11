"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorPreciousItemComponent = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GRAY_COLOR = "8F8F8FFF";
const NORMAL_COLOR = "FFFFFFFF";
class RoleFavorPreciousItemComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s = false) {
    super();
    this.xbt = undefined;
    this.fuo = undefined;
    this.puo = undefined;
    this.vuo = undefined;
    this.Muo = i;
    this.Rjt = s;
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UINiagara], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    if (this.Muo) {
      this.xbt = this.GetTexture(0);
      this.fuo = this.GetItem(2);
      this.puo = this.GetItem(3);
      this.vuo = this.GetItem(4);
      this.SetTextureByPath(this.Muo.Pic, this.xbt);
      this.Euo(this.Rjt);
    }
  }
  OnBeforeDestroy() {
    this.Muo = undefined;
    this.Rjt = false;
    this.xbt = undefined;
    this.fuo = undefined;
    this.puo = undefined;
    this.vuo = undefined;
  }
  Refresh(t, i = false) {
    this.Muo = t;
    this.Rjt = i;
    this.SetTextureByPath(this.Muo.Pic, this.xbt);
    this.Euo(this.Rjt);
  }
  Euo(t) {
    if (t) {
      this.xbt.SetColor(UE.Color.FromHex(GRAY_COLOR));
    } else {
      this.xbt.SetColor(UE.Color.FromHex(NORMAL_COLOR));
    }
    this.xbt.SetUIActive(!t);
    this.fuo.SetUIActive(false);
    this.puo.SetUIActive(false);
    this.vuo.SetUIActive(false);
  }
}
exports.RoleFavorPreciousItemComponent = RoleFavorPreciousItemComponent;
//# sourceMappingURL=RoleFavorPreciousItemComponent.js.map