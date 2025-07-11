"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayCircleAttachItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const InfoDisplayController_1 = require("../InfoDisplayController");
const FRONT_HIERACHY = 3;
const ANIMAL_SCALE = 0.8;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
class InfoDisplayCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.rai = "";
    this.nai = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture]];
    this.BtnBindInfo = [[0, () => {
      this.jbe();
    }]];
  }
  OnRefreshItem(t) {
    this.rai = t;
    this.Aqe();
    this.GetRootItem().SetHierarchyIndex(0);
  }
  OnMoveItem() {
    var t;
    var e = this.GetCurrentMovePercentage();
    var i = this.RootItem.RelativeScale3D;
    let s = 0;
    if (e >= LEFT_RANGE && e <= RIGHT_RANGE) {
      if (e >= LEFT_RANGE && e <= MIDDLE_RANGE) {
        s = e - LEFT_RANGE;
        t = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, s * 10);
        t = new UE.Vector(t, t, t);
        this.RootItem.SetUIItemScale(t);
      } else {
        s = e - MIDDLE_RANGE;
        t = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, s * 10);
        e = new UE.Vector(t, t, t);
        this.RootItem.SetUIItemScale(e);
      }
      this.GetRootItem().SetHierarchyIndex(FRONT_HIERACHY);
    } else if (i.X !== this.nai.X) {
      this.RootItem.SetUIItemScale(this.nai);
    }
  }
  Aqe() {
    if (this.rai !== "") {
      this.SetTextureByPath(this.rai, this.GetTexture(1));
    }
  }
  OnSelect() {}
  OnUnSelect() {}
  jbe() {
    var t = this.GetCurrentMovePercentage();
    if (t >= LEFT_RANGE && t <= RIGHT_RANGE) {
      ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(this.rai);
      InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView();
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClickDisplayItem, this);
    }
  }
}
exports.InfoDisplayCircleAttachItem = InfoDisplayCircleAttachItem;
//# sourceMappingURL=InfoDisplayCircleAttachItem.js.map