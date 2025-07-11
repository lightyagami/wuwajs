"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGameplayTipGrid = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SceneGameplayTipGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickPreviewCall = undefined;
    this.uFo = undefined;
    this.a_i = false;
    this.h_i = [];
    this.aFo = () => {
      this.OnClickPreviewCall?.();
    };
  }
  Initialize(i) {
    this.CreateThenShowByActor(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, ue_1.UIItem], [2, ue_1.UIItem], [0, ue_1.UIText], [3, ue_1.UIButtonComponent], [4, ue_1.UIItem]];
    this.BtnBindInfo = [[3, this.aFo]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.h_i.length = 0;
    this.OnClickPreviewCall = undefined;
  }
  Refresh(i, t, e = false, s = false, r = false) {
    this.uFo = i;
    if (e) {
      this.cFo(t);
    } else {
      this.qEi(t);
    }
    this.GetItem(4)?.SetUIActive(r);
    this.Yli(s);
  }
  SetBtnPreviewVisible(i) {
    this.GetButton(3).RootUIComp.SetUIActive(i);
  }
  Yli(e = false) {
    this.a_i = !!this.uFo && this.uFo.size > 0;
    let s = 0;
    if (this.a_i) {
      var r = this.GetItem(2).GetOwner();
      var h = this.GetItem(1);
      let t = 0;
      for (const l of this.uFo) {
        let i = this.h_i[t];
        if (!i) {
          (i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, h));
          this.h_i.push(i);
        }
        i.RefreshByConfigId(l[0], l[1], undefined, e);
        i.SetActive(true);
        t++;
      }
      s = this.uFo.size;
    }
    for (let i = s; i < this.h_i.length; ++i) {
      this.h_i[i].SetActive(false);
    }
  }
  qEi(i) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), i);
  }
  cFo(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i);
  }
}
exports.SceneGameplayTipGrid = SceneGameplayTipGrid;
//# sourceMappingURL=SceneGameplayTipGrid.js.map