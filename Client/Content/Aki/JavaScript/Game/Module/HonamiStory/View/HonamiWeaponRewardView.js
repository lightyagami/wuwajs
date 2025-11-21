"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiWeaponRewardView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const QuestRewardItemList_1 = require("../../GeneralLogicTree/View/QuestRewardItemList");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class HonamiWeaponRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.sOe = undefined;
    this.dSt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.dSt]];
  }
  OnStart() {
    var e = this.OpenParam;
    if (e) {
      this.$Tt = e;
      this.sOe = new QuestRewardItemList_1.QuestRewardItemList(this.GetItem(3).GetOwner());
      if (this.GYt()) {
        this.mGe();
      }
      if (this.NYt()) {
        this.OYt();
      }
      if (this.bYt()) {
        this.qYt();
      }
      e = e.GetRewardInfo().AudioId;
      ItemRewardController_1.ItemRewardController.PlayAudio(e);
    }
  }
  OnAfterDestroy() {
    this.$Tt = undefined;
  }
  OnBeforeDestroyImplement() {
    this.$Tt.GetRewardInfo().OnCloseCallback?.();
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  GYt() {
    var e = this.$Tt.GetRewardInfo().Title;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(2).SetUIActive(e);
    return e;
  }
  mGe() {
    var e;
    var t = this.$Tt.GetRewardInfo().Title;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  NYt() {
    var e = this.$Tt.GetRewardInfo().ContinueText;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetText(4).SetUIActive(e);
    return e;
  }
  OYt() {
    var e;
    var t = this.$Tt.GetRewardInfo().ContinueText;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = this.GetText(4);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  bYt() {
    var e = this.$Tt.GetRewardInfo().IsItemVisible;
    var t = this.$Tt.GetItemList();
    var e = e && t !== undefined && t?.length > 0;
    if (this.sOe.GetActive() !== e) {
      this.sOe.SetActive(e);
    }
    return e;
  }
  qYt() {
    this.sOe.Refresh(this.$Tt.GetItemList());
  }
}
exports.HonamiWeaponRewardView = HonamiWeaponRewardView;
//# sourceMappingURL=HonamiWeaponRewardView.js.map