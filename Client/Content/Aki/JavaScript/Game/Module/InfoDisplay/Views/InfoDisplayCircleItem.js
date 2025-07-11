"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayCircleItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem");
const InfoDisplayController_1 = require("../InfoDisplayController");
const FRONT_HIERACHY = 3;
const ANIMAL_SCALE = 0.8;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
class InfoDisplayCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.rai = "";
    this.nai = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture]];
    this.BtnBindInfo = [[0, () => {
      this.jbe();
    }]];
  }
  RefreshItem() {
    this.rai = this.Pe[this.GetShowItemIndex()];
    this.Aqe();
    this.GetRootItem().SetHierarchyIndex(0);
  }
  OnMoveItem(t) {
    var e;
    var i = this.GetAttachItem().ExhibitionView.GetWidth();
    var s = this.GetRootItem();
    var i = (s.GetAnchorOffsetX() + i / 2) / i;
    var r = s.RelativeScale3D;
    let h = 0;
    if (i >= LEFT_RANGE && i <= RIGHT_RANGE) {
      if (i >= LEFT_RANGE && i <= MIDDLE_RANGE) {
        h = i - LEFT_RANGE;
        e = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, h * 10);
        e = new UE.Vector(e, e, e);
        s.SetUIItemScale(e);
      } else {
        h = i - MIDDLE_RANGE;
        e = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, h * 10);
        i = new UE.Vector(e, e, e);
        s.SetUIItemScale(i);
      }
      this.GetRootItem().SetHierarchyIndex(FRONT_HIERACHY);
    } else if (r.X !== this.nai.X) {
      s.SetUIItemScale(this.nai);
    }
  }
  SetData(t) {
    this.Pe = t;
  }
  Aqe() {
    if (this.rai !== "") {
      this.SetTextureByPath(this.rai, this.GetTexture(1));
    }
  }
  jbe() {
    var t = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth();
    var t = (this.GetRootItem().GetAnchorOffsetX() + t / 2) / t;
    if (t >= LEFT_RANGE && t <= RIGHT_RANGE) {
      ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(this.rai);
      InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView();
    }
  }
}
exports.InfoDisplayCircleItem = InfoDisplayCircleItem;
//# sourceMappingURL=InfoDisplayCircleItem.js.map