"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridVisionSlotComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
const UNLOCK_AND_HAVE_PROP_INDEX = 0;
const UNLOCK_AND_NO_PROP_INDEX = 1;
const PREVIEW_UNLOCK_INDEX = 2;
const LOCK_INDEX = 3;
const STATE_COUNT = 4;
const STATE_SLOT_COUNT = 3;
class MediumItemGridVisionSlotComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.Nwt = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemVisionStateA";
  }
  OnActivate() {
    this.Nwt = [[this.GetSprite(0), this.GetSprite(1), this.GetSprite(2), this.GetSprite(3)], [this.GetSprite(4), this.GetSprite(5), this.GetSprite(6), this.GetSprite(7)], [this.GetSprite(8), this.GetSprite(9), this.GetSprite(10), this.GetSprite(11)]];
  }
  OnDeactivate() {
    this.Nwt.length = 0;
  }
  OnRefresh(e) {
    if (e) {
      for (let _ = 0; _ < STATE_SLOT_COUNT; _++) {
        var t = e[_];
        this.Owt(_, t);
      }
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
  Owt(_, e) {
    var t = this.Nwt[_];
    if (t && !(t.length < STATE_COUNT)) {
      if (e === undefined) {
        for (const N of t) {
          N.SetUIActive(false);
        }
      } else {
        switch (e) {
          case 0:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(false);
            t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(false);
            t[PREVIEW_UNLOCK_INDEX].SetUIActive(false);
            t[LOCK_INDEX].SetUIActive(true);
            break;
          case 2:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(false);
            t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(false);
            t[PREVIEW_UNLOCK_INDEX].SetUIActive(true);
            t[LOCK_INDEX].SetUIActive(false);
            break;
          case 1:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(false);
            t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(true);
            t[PREVIEW_UNLOCK_INDEX].SetUIActive(false);
            t[LOCK_INDEX].SetUIActive(false);
            break;
          case 3:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(true);
            t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(false);
            t[PREVIEW_UNLOCK_INDEX].SetUIActive(false);
            t[LOCK_INDEX].SetUIActive(false);
        }
      }
    }
  }
}
exports.MediumItemGridVisionSlotComponent = MediumItemGridVisionSlotComponent;
//# sourceMappingURL=MediumItemGridVisionSlotComponent.js.map