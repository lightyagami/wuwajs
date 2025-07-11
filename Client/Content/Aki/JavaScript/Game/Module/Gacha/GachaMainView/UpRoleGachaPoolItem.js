"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpRoleGachaPoolItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GachaPoolItem_1 = require("./GachaPoolItem");
const RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class UpRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments);
    this.mWt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [2, UE.UITexture], [1, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    this.mWt = new RoleDescribeComponent_1.RoleDescribeComponent();
    await this.mWt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  Refresh() {
    if (this.GachaViewInfo) {
      var t = this.GachaViewInfo.ShowIdList[0];
      this.mWt.Update(t, this.GachaType !== 6);
      const i = this.GetTexture(0);
      this.SetTextureByPath(this.GachaViewInfo.ContentTexturePath, i, undefined, () => {
        i.SetSizeFromTexture();
      });
      this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(3));
      const s = this.GetTexture(2);
      this.SetTextureByPath(this.GachaViewInfo.ContentTextureBgPath, s, undefined, () => {
        s.SetSizeFromTexture();
      });
      t = !StringUtils_1.StringUtils.IsBlank(this.GachaViewInfo.EffectPath);
      this.GetItem(4).SetUIActive(t);
      if (t && (this.SetNiagaraSystemByPath(this.GachaViewInfo.EffectPath, this.GetUiNiagara(5), undefined), this.GachaViewInfo.EffectLocation)) {
        this.GetItem(4).SetAnchorOffsetX(this.GachaViewInfo.EffectLocation.X);
        this.GetItem(4).SetAnchorOffsetY(this.GachaViewInfo.EffectLocation.Y);
      }
    }
  }
  SetDescUiActive(t) {
    this.mWt.SetUiActive(t);
  }
}
exports.UpRoleGachaPoolItem = UpRoleGachaPoolItem;
//# sourceMappingURL=UpRoleGachaPoolItem.js.map