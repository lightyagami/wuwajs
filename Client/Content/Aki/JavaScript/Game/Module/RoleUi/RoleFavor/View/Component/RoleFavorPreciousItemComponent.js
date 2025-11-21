"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorPreciousItemComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const RoleFavorViewComponentBase_1 = require("./RoleFavorViewComponentBase");
const GRAY_COLOR = "8F8F8FFF";
const NORMAL_COLOR = "FFFFFFFF";
class RoleFavorPreciousItemComponent extends RoleFavorViewComponentBase_1.RoleFavorViewComponentBase {
  constructor() {
    super(...arguments);
    this.Muo = undefined;
    this.xbt = undefined;
    this.fuo = undefined;
    this.puo = undefined;
    this.vuo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UINiagara], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnBeforeDestroy() {
    this.Muo = undefined;
    this.xbt = undefined;
    this.fuo = undefined;
    this.puo = undefined;
    this.vuo = undefined;
  }
  OnSetData(t) {
    if (t.FavorContentType !== 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 78, "不支持的好感度类型", ["favorTabType", t.FavorContentType]);
      }
    } else {
      this.Muo = t.ConfigData;
    }
  }
  OnRefreshView() {
    if (this.Muo) {
      this.xbt = this.GetTexture(0);
      this.fuo = this.GetItem(2);
      this.puo = this.GetItem(3);
      this.vuo = this.GetItem(4);
      this.SetTextureByPath(this.Muo.Pic, this.xbt);
    }
  }
  SetLockState(t) {
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