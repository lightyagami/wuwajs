"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelUpgradeView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ComposeDefine_1 = require("../Compose/ComposeDefine");
const CommonManager_1 = require("./CommonManager");
class StarItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
    this.BtnBindInfo = [];
  }
  SetState(e) {
    if (e) {
      this.GetSprite(0).SetUIActive(true);
    } else {
      this.GetSprite(0).SetUIActive(false);
    }
  }
}
class LevelRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, i) {
    e = {
      Data: e,
      Type: 4,
      ItemConfigId: e.RewardId,
      BottomText: e.Count > 0 ? "" + e.Count : "",
      IsReceivedVisible: e.IsGet
    };
    this.Apply(e);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    var e = this.Data;
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.RewardId);
  }
}
class LevelUpgradeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NGt = undefined;
    this.OGt = undefined;
    this.UOt = true;
    this.$be = undefined;
    this.kGt = (e, t, i) => {
      var n = new StarItem();
      n.CreateThenShowByActor(t.GetOwner());
      n.SetState(e);
      return {
        Key: i,
        Value: n
      };
    };
    this.FGt = () => {
      return new LevelRewardItem();
    };
    this.VGt = () => {
      if (this.OGt.length !== 0) {
        this.Cl();
      }
    };
    this.YHt = e => {
      if (e === "WorldMapView") {
        this.CloseMe();
      }
    };
    this.hu_ = () => {
      this.CloseMe();
      if (UiManager_1.UiManager.IsViewOpen("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
    };
    this.eTt = () => {
      if (this.GetButton(4).GetSelfInteractive()) {
        CommonManager_1.CommonManager.SendLevelRewardRequest();
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ComposeUpgrade");
      }
    };
    this.XGt = () => {
      CommonManager_1.CommonManager.SetSelectedLevel(CommonManager_1.CommonManager.GetSelectedLevel() - 1);
      this.bl();
    };
    this.$Gt = () => {
      CommonManager_1.CommonManager.SetSelectedLevel(CommonManager_1.CommonManager.GetSelectedLevel() + 1);
      this.bl();
    };
    this.YP = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UITexture], [11, UE.UIHorizontalLayout], [10, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.eTt], [5, this.XGt], [6, this.$Gt], [14, this.YP], [15, this.YP]];
  }
  OnBeforeDestroy() {
    if (this.NGt) {
      this.NGt.ClearChildren();
      this.NGt = undefined;
    }
    this.$be.ClearChildren();
  }
  OnBeforeShow() {
    this.M3e();
    this.ChildPopView?.PopItem?.SetTexBgVisible(false);
  }
  OnStart() {
    this.NGt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.FGt);
    this.OGt = new Array();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "ComposeUpgradeButtonText");
    this.$be = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(11), this.kGt);
    this.GetButton(4).SetCanClickWhenDisable(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchViewType, 1);
    this.UOt &&= false;
    CommonManager_1.CommonManager.SetSelectedLevel(CommonManager_1.CommonManager.GetCurrentRewardLevel());
    RedDotController_1.RedDotController.BindRedDot("ComposeReagentProduction", this.GetItem(13));
    this.bl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpgradeComposeLevel, this.VGt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.YHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchComposeType, this.hu_);
  }
  OnRemoveEventListener() {
    if (!this.UOt) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpgradeComposeLevel, this.VGt);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.YHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchComposeType, this.hu_);
  }
  Cl() {
    CommonManager_1.CommonManager.SetSelectedLevel(CommonManager_1.CommonManager.GetCurrentRewardLevel());
    this.bl();
  }
  bl() {
    this.qIi();
    this.P5e();
    this.nOe();
    this.pmt();
    this.jGt();
    this.WGt();
    this.M3e();
    this.KGt();
    this.QGt();
    this.sqe();
    this.rVs();
  }
  qIi() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(ComposeDefine_1.COMPOSE_TYPE_TEXTURE_PATH_KEY);
    this.SetTextureByPath(e, this.GetTexture(9));
  }
  P5e() {
    var e = CommonManager_1.CommonManager.GetComposeLevelByLevel(CommonManager_1.CommonManager.GetSelectedLevel());
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(e.Name);
    this.GetText(0).SetText(e);
  }
  nOe() {
    var e = CommonManager_1.CommonManager.GetComposeLevelByLevel(CommonManager_1.CommonManager.GetSelectedLevel());
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(e.AttributesDescription);
    this.GetText(1).SetText(e);
  }
  pmt() {
    var e = CommonManager_1.CommonManager.GetComposeMaxLevel();
    var t = new Array(e);
    for (let e = 0; e < CommonManager_1.CommonManager.GetSelectedLevel(); e++) {
      t[e] = true;
    }
    this.$be.RebuildLayoutByDataNew(t);
  }
  jGt() {
    var e = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
    let t = "";
    t = CommonManager_1.CommonManager.GetSelectedLevel() === CommonManager_1.CommonManager.GetComposeMaxLevel() ? "MAX" : e + "/" + CommonManager_1.CommonManager.GetSumExpByLevel(CommonManager_1.CommonManager.GetSelectedLevel());
    this.GetText(2).SetText(t);
  }
  WGt() {
    var e = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
    var t = CommonManager_1.CommonManager.GetSumExpByLevel(CommonManager_1.CommonManager.GetSelectedLevel());
    var e = (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) > 1 ? 1 : e;
    this.GetSprite(3).SetFillAmount(e);
  }
  M3e() {
    var e = CommonManager_1.CommonManager.GetComposeMaxLevel();
    var t = CommonManager_1.CommonManager.GetCurrentRewardLevel();
    var i = CommonManager_1.CommonManager.GetSelectedLevel();
    var n = this.GetButton(4).GetOwner();
    n.GetUIItem().SetUIActive(true);
    if (e <= t || e <= i || i < t) {
      n.GetUIItem().SetUIActive(false);
    } else {
      i = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
      n = CommonManager_1.CommonManager.GetSumExpByLevel(CommonManager_1.CommonManager.GetSelectedLevel());
      this.GetButton(4).SetSelfInteractive(n <= i && t < e);
    }
  }
  KGt() {
    this.OGt.length = 0;
    var e = CommonManager_1.CommonManager.GetDropIdByLevel(CommonManager_1.CommonManager.GetSelectedLevel());
    if (e === -1) {
      this.GetItem(8).SetUIActive(false);
    } else {
      this.GetItem(8).SetUIActive(true);
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
      if (e) {
        for (const t of e.DropPreview) {
          this.OGt.push({
            RewardId: t[0],
            Count: t[1],
            IsGet: CommonManager_1.CommonManager.GetSelectedLevel() < CommonManager_1.CommonManager.GetCurrentRewardLevel()
          });
        }
      }
      this.NGt.RefreshByData(this.OGt);
    }
  }
  QGt() {
    this.GetButton(5).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(CommonManager_1.CommonManager.GetSelectedLevel() !== 1);
    this.GetButton(6).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(CommonManager_1.CommonManager.GetSelectedLevel() !== CommonManager_1.CommonManager.GetComposeMaxLevel());
  }
  sqe() {
    this.GetItem(10).SetUIActive(CommonManager_1.CommonManager.GetSelectedLevel() !== CommonManager_1.CommonManager.GetComposeMaxLevel());
  }
  rVs() {
    if (CommonManager_1.CommonManager.GetCurrentRewardLevel() === CommonManager_1.CommonManager.GetSelectedLevel()) {
      RedDotController_1.RedDotController.BindRedDot("ComposeReagentProduction", this.GetItem(13));
    } else {
      RedDotController_1.RedDotController.UnBindGivenUi("ComposeReagentProduction", this.GetItem(13));
      this.GetItem(13)?.SetUIActive(false);
    }
  }
}
exports.LevelUpgradeView = LevelUpgradeView;
//# sourceMappingURL=LevelUpgradeView.js.map