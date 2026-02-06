"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPickRoleRewardView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const TotalTopUpDefine_1 = require("../TotalTopUpDefine");
const TotalTopUpViewModel_1 = require("../TotalTopUpViewModel");
const TotalTopUpPickRoleChoicePanel_1 = require("./CharPickView/TotalTopUpPickRoleChoicePanel");
const TotalTopUpPickRoleItemPanel_1 = require("./CharPickView/TotalTopUpPickRoleItemPanel");
const TotalTopUpPickRoleRolePanel_1 = require("./CharPickView/TotalTopUpPickRoleRolePanel");
class TotalTopUpPickRoleRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.lqe = undefined;
    this.Lxg = undefined;
    this.vwc = undefined;
    this.dkg = undefined;
    this.Vgt = () => {
      this.CloseMe();
    };
    this.sOt = () => {
      this.yil?.Claim(() => {
        this.CloseMe();
      });
    };
    this.wxg = i => {
      this.yil?.SelectItem(i.Index);
      this.bl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.sOt]];
  }
  async OnBeforeStartAsync() {
    var i;
    var e;
    if (this.OpenParam instanceof TotalTopUpViewModel_1.TotalTopUpPickRoleViewModel) {
      this.yil = this.OpenParam;
      i = [];
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(this.Vgt);
      this.Lxg = new TotalTopUpPickRoleChoicePanel_1.TotalTopUpPickRoleChoicePanel(this.yil.ItemDataList);
      this.Lxg.SetSelectCallback(this.wxg);
      e = this.Lxg.CreateByActorAsync(this.GetItem(3).GetOwner());
      i.push(e);
      this.vwc = new TotalTopUpPickRoleRolePanel_1.TotalTopUpPickRoleRolePanel();
      e = this.vwc.CreateByActorAsync(this.GetItem(1).GetOwner());
      i.push(e);
      this.dkg = new TotalTopUpPickRoleItemPanel_1.TotalTopUpPickRoleItemPanel();
      e = this.dkg.CreateByActorAsync(this.GetItem(2).GetOwner());
      i.push(e);
      await Promise.all(i);
      this.Lxg.SetUiActive(true);
      this.vwc.SetUiActive(true);
      this.dkg.SetUiActive(true);
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("角色选择界面参数错误");
    }
  }
  OnStart() {
    this.Lxg?.SelectItem(this.yil?.FirstCanClaimIndex ?? 0);
  }
  bl() {
    var i;
    if (this.yil) {
      i = this.yil.CanClaim;
      this.GetItem(4).SetUIActive(!i);
      this.GetButton(5).RootUIComp.SetUIActive(i);
      this.GetItem(1).SetUIActive(this.yil.IsRole);
      this.GetItem(2).SetUIActive(!this.yil.IsRole);
      this.vwc?.Refresh(this.yil);
      this.dkg?.Refresh(this.yil);
    }
  }
}
exports.TotalTopUpPickRoleRewardView = TotalTopUpPickRoleRewardView;
//# sourceMappingURL=TotalTopUpPickRoleRewardView.js.map