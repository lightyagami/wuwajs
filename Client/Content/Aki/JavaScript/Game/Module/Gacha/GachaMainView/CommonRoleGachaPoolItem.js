"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonRoleGachaPoolItem = undefined;
const UE = require("ue");
const GachaPoolItem_1 = require("./GachaPoolItem");
const RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class CommonRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments);
    this.ijt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.ijt = [];
    var e = [];
    for (const s of [1, 2, 3]) {
      var o = this.GetItem(s);
      if (!o) {
        break;
      }
      var t = new RoleDescribeComponent_1.RoleDescribeComponent();
      e.push(t.CreateThenShowByActorAsync(o.GetOwner()));
      this.ijt.push(t);
    }
    await Promise.all(e);
  }
  Refresh() {
    if (this.GachaViewInfo) {
      var o = this.GachaViewInfo.ShowIdList;
      for (let e = 0; e < o.length && e < this.ijt.length; e++) {
        this.ijt[e].Update(o[e]);
      }
      this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(4));
    }
  }
}
exports.CommonRoleGachaPoolItem = CommonRoleGachaPoolItem;
//# sourceMappingURL=CommonRoleGachaPoolItem.js.map