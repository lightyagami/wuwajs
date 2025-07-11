"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardGrandItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class RewardGrandItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Xkt = 0;
    this.nqe = () => {
      if (this.Pe) {
        if (this.Pe.IsFinished) {
          this.Pe.ReceiveDelegate?.(this.Pe.TaskId);
        } else {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Xkt);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[2, this.nqe]];
  }
  Refresh(i) {
    this.Pe = i;
    i = this.Pe.RewardList;
    if (i.length !== 0) {
      this.Xkt = i[0][0].ItemId;
      this.SetItemIcon(this.GetTexture(4), this.Xkt);
      i = i[0][1];
      this.GetText(0).SetText("x" + i);
      this.GetSprite(3).SetFillAmount(MathUtils_1.MathUtils.Clamp(this.Pe.Current / this.Pe.Target, 0, 1));
      let t = "Moonfiesta_BigRewardState1";
      if (this.Pe.IsTaken) {
        t = "Moonfiesta_BigRewardState3";
      } else if (this.Pe.IsFinished) {
        t = "Moonfiesta_BigRewardState2";
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, this.Pe.Target);
      this.GetItem(5).SetUIActive(this.Pe.IsTaken);
      this.GetItem(6).SetUIActive(this.Pe.IsFinished);
      this.GetItem(7).SetUIActive(this.Pe.IsFinished);
    }
  }
}
exports.RewardGrandItem = RewardGrandItem;
//# sourceMappingURL=RewardGrandItem.js.map