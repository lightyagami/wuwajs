"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridPhantomSpecialSkillComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridPhantomSpecialSkillComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_VisionTag";
  }
  OnRefresh(i) {
    var t = i !== 0;
    this.SetActive(t);
    if (t) {
      let e = undefined;
      e = i === 1 ? "/Game/Aki/UI/UIResources/Common/Atlas/SP_ItemVision.SP_ItemVision" : "/Game/Aki/UI/UIResources/Common/Atlas/SP_ItemVisionB.SP_ItemVisionB";
      t = this.GetSprite(0);
      this.SetSpriteByPath(e, t, false);
    }
  }
}
exports.MediumItemGridPhantomSpecialSkillComponent = MediumItemGridPhantomSpecialSkillComponent;
//# sourceMappingURL=MediumItemGridPhantomSpecialSkillComponent.js.map