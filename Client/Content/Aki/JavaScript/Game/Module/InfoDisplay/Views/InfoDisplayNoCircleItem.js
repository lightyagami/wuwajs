"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayNoCircleItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem");
const InfoDisplayController_1 = require("../InfoDisplayController");
const FRONT_HIERACHY = 1;
const ANIMAL_SCALE = 0.8;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
class InfoDisplayNoCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
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
    if (this.rai) {
      this.Aqe();
      this.GetRootItem().SetHierarchyIndex(0);
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
  OnMoveItem(t) {
    var i;
    var e = this.GetRootItem();
    var s = this.GetAttachItem().ExhibitionView.GetWidth();
    var s = (e.GetAnchorOffsetX() + s / 2) / s;
    var r = e.RelativeScale3D;
    let h = 0;
    if (s >= LEFT_RANGE && s <= RIGHT_RANGE) {
      if (s >= LEFT_RANGE && s <= MIDDLE_RANGE) {
        h = s - LEFT_RANGE;
        i = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, h * 10);
        i = new UE.Vector(i, i, i);
        e.SetUIItemScale(i);
      } else {
        h = s - MIDDLE_RANGE;
        i = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, h * 10);
        s = new UE.Vector(i, i, i);
        e.SetUIItemScale(s);
      }
      this.GetRootItem().SetHierarchyIndex(FRONT_HIERACHY);
    } else if (r.X !== this.nai.X) {
      e.SetUIItemScale(this.nai);
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
exports.InfoDisplayNoCircleItem = InfoDisplayNoCircleItem;
//# sourceMappingURL=InfoDisplayNoCircleItem.js.map