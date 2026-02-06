"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleRecordItem = exports.EncircleResultView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const RewardItemList_1 = require("../../../../ItemReward/View/RewardItemList");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityCorniceMeetingSettleView_1 = require("../../CorniceMeeting/ActivityCorniceMeetingSettleView");
const EncirclePlayLevelController_1 = require("../EncirclePlayLevelController");
const SUCCESS_OUTLINE_COLOR = "C48B29FF";
const FAIL_OUTLINE_COLOR = "B33100FF";
const FAIL_TEXT_COLOR = "F08086FF";
const SUCCESS_TEXT_COLOR = "f2efd5";
class EncircleResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonMap = undefined;
    this.sOe = undefined;
    this.$bg = undefined;
    this.$Tt = undefined;
    this.nbf = () => {
      UiManager_1.UiManager.CloseView("EncircleResultView");
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ResetEncircle();
    };
    this.sbf = () => {
      UiManager_1.UiManager.CloseView("EncircleResultView");
      UiManager_1.UiManager.CloseView("EncirclePlayView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.$Tt = this.OpenParam;
    this.ButtonMap = new Map();
    var e = [];
    e.push(this.ZFe());
    var i = this.GetItem(3);
    this.sOe = new RewardItemList_1.RewardItemList();
    this.$bg = new EncircleRecordItem();
    e.push(this.$bg.CreateThenShowByResourceIdAsync("UiItem_ResultRecordEncircle", i));
    e.push(this.sOe.CreateThenShowByResourceIdAsync("Uiitem_TipsItem", i));
    await Promise.all(e);
  }
  OnBeforeShow() {
    this.RefreshTitle();
    this.KGt();
    this.Dyn();
  }
  Dyn() {
    if (this.$Tt) {
      this.$bg?.Refresh(this.$Tt.GetRewardInfo());
    }
  }
  KGt() {
    if (this.$Tt && this.sOe) {
      if (this.$Tt.GetRewardInfo().IsSuccess && this.$Tt.GetRewardInfo().CommonItems) {
        this.sOe.SetUiActive(true);
        this.sOe.Refresh(this.$Tt.GetRewardInfo().CommonItems);
      } else {
        this.sOe.SetUiActive(false);
      }
    }
  }
  RefreshTitle() {
    var e;
    var i;
    var t;
    if (this.$Tt !== undefined) {
      e = this.GetText(1);
      i = this.GetTexture(2);
      t = e.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
      if (this.$It()) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "CorniceMeetingSettleSuccess");
        e.outlineColor = UE.Color.FromHex(SUCCESS_OUTLINE_COLOR);
        i.SetColor(UE.Color.FromHex("8C754D7F"));
        t.SetOutlineColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR));
        e.SetColor(UE.Color.FromHex(SUCCESS_TEXT_COLOR));
        this.PlaySequence("Success");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "GenericPromptTypes_4_GeneralText");
        i.SetColor(UE.Color.FromHex("6e363f"));
        e.SetColor(UE.Color.FromHex(FAIL_TEXT_COLOR));
        e.outlineColor = UE.Color.FromHex(FAIL_OUTLINE_COLOR);
        t.SetOutlineColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
        this.PlaySequence("Fail");
      }
    }
  }
  $It() {
    return !!this.$Tt && this.$Tt.GetRewardInfo().IsSuccess;
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(false);
    var e = [];
    var i = this.i3e(this.GetItem(5), 0, this.sbf);
    e.push(i);
    if (!this.$It()) {
      i = this.i3e(this.GetItem(5), 1, this.nbf);
      e.push(i);
    }
    await Promise.all(e);
    var i = this.ButtonMap?.get(0);
    var e = this.ButtonMap?.get(1);
    i?.SetBtnText("Leave");
    e?.SetBtnText("ChallengeAgain");
  }
  async i3e(e, i, t) {
    var s = this.GetItem(5);
    var r = this.GetItem(4);
    var s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r);
    var r = new ActivityCorniceMeetingSettleView_1.ActivityCorniceMeetingButton();
    this.ButtonMap.set(i, r);
    await r.InitializeAsync(s, t);
    r.SetActive(true);
  }
}
exports.EncircleResultView = EncircleResultView;
const RECORD_TEXT_ID = "Encircle_FewestSteps";
const CURRENT_TEXT_ID = "Encircle_CurrentSteps";
class EncircleRecordItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {}
  Refresh(e) {
    this.GetItem(0)?.SetUIActive(false);
    let i = CURRENT_TEXT_ID;
    if (e.IsSuccess && e.Score && (!e.RecordScore || e.Score < e.RecordScore)) {
      this.GetItem(0)?.SetUIActive(true);
      i = RECORD_TEXT_ID;
    }
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), i, e.Score);
  }
}
exports.EncircleRecordItem = EncircleRecordItem;
//# sourceMappingURL=EncircleResultView.js.map