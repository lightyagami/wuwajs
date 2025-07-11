"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridBuffIconComponent = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridBuffIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemType";
  }
  OnRefresh(t) {
    if (t === undefined) {
      this.SetActive(false);
    } else {
      let e = undefined;
      var r = ModelManager_1.ModelManager.MediumItemGridModel;
      switch (t) {
        case 0:
          break;
        case 1:
          e = r.AttackBuffSpritePath;
          break;
        case 2:
          e = r.DefenseBuffSpritePath;
          break;
        case 3:
          e = r.RestoreHealthBuffSpritePath;
          break;
        case 4:
          e = r.RechargeBuffSpritePath;
          break;
        case 5:
          e = r.ResurrectionBuffSpritePath;
          break;
        case 6:
          e = r.ExploreBuffSpritePath;
      }
      if (e) {
        t = this.GetSprite(0);
        this.SetSpriteByPath(e, t, false);
        this.SetActive(true);
      } else {
        this.SetActive(false);
      }
    }
  }
}
exports.MediumItemGridBuffIconComponent = MediumItemGridBuffIconComponent;
//# sourceMappingURL=MediumItemGridBuffIconComponent.js.map