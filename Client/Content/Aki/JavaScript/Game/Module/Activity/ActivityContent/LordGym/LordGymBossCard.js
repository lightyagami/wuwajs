"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymBossCard = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CircleAttachView_1 = require("../../../AutoAttach/CircleAttachView");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LordGymBossCardItem_1 = require("./LordGymBossCardItem");
const SHOW_GAP = 4;
class LordGymBossCard extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Iye = undefined;
    this.tPe = undefined;
    this.ohd = undefined;
    this.nhd = undefined;
    this.shd = () => {
      this.nhd?.SetUIActive(false);
      this.ohd?.SetUIActive(false);
    };
    this.HOe = () => new LordGymPageDot();
    this.uvt = (t, s, i) => {
      t = new LordGymBossCardItem_1.LordGymBossCardItem(t);
      t.BindOnSelected(this.ahd);
      return t;
    };
    this.ahd = t => {
      this.tPe?.SelectGridProxy(t, true);
      this.nhd?.SetUIActive(true);
      this.ohd?.SetUIActive(true);
    };
    this.rHt = () => {
      this.Iye?.MoveToNextItem(-1);
    };
    this.nHt = () => {
      this.Iye?.MoveToNextItem(1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIGridLayout]];
    this.BtnBindInfo = [[4, this.rHt], [5, this.nHt]];
  }
  OnStart() {
    this.ohd = this.GetButton(4).RootUIComp;
    this.nhd = this.GetButton(5).RootUIComp;
    this.Iye = new CircleAttachView_1.CircleAttachView(this.GetItem(0).GetOwner());
    this.Iye.CreateItems(this.GetItem(1).GetOwner(), SHOW_GAP, this.uvt);
    this.Iye.SetDragBeginCallback(this.shd);
    this.Iye.SetPageLimitState(true);
    this.Iye.SetMoveMultiFactor(50);
    this.tPe = new GenericLayout_1.GenericLayout(this.GetGridLayout(8), this.HOe);
  }
  Refresh(t) {
    if (this.Iye && this.tPe) {
      this.GetItem(2).SetUIActive(t.length > 1);
      this.Iye.ReloadView(t.length, t);
      if (t.length > 1) {
        this.Iye.EnableDragEvent();
        const s = this.tPe.GetSelectedGridIndex();
        this.tPe.RefreshByData(t, () => {
          this.tPe?.SelectGridProxy(s < 0 ? 0 : s, true);
        });
      } else {
        this.Iye.DisableDragEvent();
      }
      this.GetItem(1)?.SetUIActive(false);
    }
  }
}
exports.LordGymBossCard = LordGymBossCard;
class LordGymPageDot extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  Refresh(t, s, i) {
    this.GetExtendToggle(0)?.SetToggleStateForce(s ? 1 : 0);
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleStateForce(0);
  }
}
//# sourceMappingURL=LordGymBossCard.js.map