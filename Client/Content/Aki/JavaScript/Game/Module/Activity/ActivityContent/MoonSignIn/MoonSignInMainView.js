"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInMainView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MoonSignInController_1 = require("./MoonSignInController");
class MoonSignInMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.crd = undefined;
    this.SPe = undefined;
    this._Zl = () => {
      this.drd();
    };
    this.mrd = () => {
      var i = MoonSignInController_1.MoonSignInController.GetData();
      if (i) {
        if (i.GetCurrentItemCount() > 0) {
          MoonSignInController_1.MoonSignInController.MoonPhaseRandomRequest(i.Id);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MoonSignInItemCountNotEnough");
        }
      }
    };
    this.frd = () => {
      this.GetItem(7).SetUIActive(true);
      this.GetButton(13)?.RootUIComp.SetUIActive(true);
    };
    this.OSd = () => {
      this.GetItem(7).SetUIActive(false);
      this.GetButton(13)?.RootUIComp.SetUIActive(false);
    };
    this.grd = () => {
      this.Crd(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this._Zl], [4, this.mrd], [2, this.frd], [13, this.OSd]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    var t = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.lqe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = MoonSignInController_1.MoonSignInController.GetData()?.UseItemId;
    if (t) {
      i.push(this.lqe.SetCurrencyItemList([t]));
    }
    this.lqe.SetCurrencyItemVisible(true);
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.crd = new MoonSignInIllustrated();
    i.push(this.crd.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.crd.OnClickSwitchWishBtnCallBack = this.grd;
    await Promise.all(i);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    this.SPe?.BindSequenceCloseEvent(i => {
      if (i === "TjStart") {
        this.GetItem(6).SetUIActive(false);
      }
      if (i === "TjHideView") {
        this.crd?.SetUiActive(false);
      }
    });
    this.GetButton(13).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    if ((MoonSignInController_1.MoonSignInController.GetData()?.GetCurrentItemCount() ?? 0) > 0) {
      this.Crd();
    } else {
      this.drd();
    }
  }
  OnBeforeShow() {
    this.mGe();
    this.BNe();
  }
  mGe() {
    this.GetItem(7).SetUIActive(false);
    var i = MoonSignInController_1.MoonSignInController.GetData()?.CurrentMoonId;
    if (i) {
      if (i = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(i)) {
        this.GetItem(9).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.MoonName);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.BuffDes);
      }
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  BNe() {
    this.GetItem(10).SetUIActive((MoonSignInController_1.MoonSignInController.GetData()?.GetCurrentItemCount() ?? 0) >= 1);
  }
  Crd(i = false) {
    this.GetItem(6).SetUIActive(true);
    this.SPe?.PlayLevelSequenceByName("TjHideView");
    if (i) {
      this.SPe?.PlayLevelSequenceByName("WishShowView", true);
    }
    this.BNe();
  }
  drd() {
    this.crd?.SetUiActive(true);
    this.crd?.RefreshPhaseView();
    this.SPe?.PlayLevelSequenceByName("TjStart", true);
    this.SPe?.PlayLevelSequenceByName("WishHideView");
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
}
exports.MoonSignInMainView = MoonSignInMainView;
class MoonSignInIllustrated extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickSwitchWishBtnCallBack = undefined;
    this.prd = new Map();
    this.vrd = () => {
      this.OnClickSwitchWishBtnCallBack?.();
    };
    this.YDo = () => {
      UiManager_1.UiManager.OpenView("MoonSignInRewardView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIItem]];
    this.BtnBindInfo = [[12, this.vrd], [10, this.YDo]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let i = 1; i <= 10; i++) {
      var e = new MoonSignInPhase();
      t.push(e.CreateThenShowByActorAsync(this.GetItem(i - 1).GetOwner()));
      this.prd.set(i, e);
    }
    await Promise.all(t);
    for (let i = 1; i <= 10; i++) {
      this.prd.get(i)?.RefreshItem(i);
    }
  }
  RefreshPhaseView() {
    for (let i = 1; i <= 10; i++) {
      this.prd.get(i)?.RefreshItemLockState();
    }
    var i = MoonSignInController_1.MoonSignInController.GetData();
    if (i) {
      this.GetText(11).SetText(i.GetMoonPhaseProgress());
      this.GetItem(13).SetUIActive(i.GetCanGetMoonGrandReward());
    }
  }
}
class MoonSignInPhase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yrd = 0;
    this.kqe = () => {
      var i = {
        MoonId: this.yrd
      };
      UiManager_1.UiManager.OpenView("MoonSignInDetailView", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.kqe);
  }
  RefreshItem(i) {
    var t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(i);
    if (t && (this.yrd = i, this.SetTextureShowUntilLoaded(t.Texture, this.GetTexture(1)), this.SetTextureShowUntilLoaded(t.Texture, this.GetTexture(2)), i = MoonSignInController_1.MoonSignInController.GetData())) {
      t = i.CheckPhaseLock(this.yrd);
      this.GetExtendToggle(0).SetToggleState(t ? 2 : 0);
    }
  }
  RefreshItemLockState() {
    var i;
    if (this.yrd && (i = MoonSignInController_1.MoonSignInController.GetData())) {
      i = i.CheckPhaseLock(this.yrd);
      this.GetExtendToggle(0).SetToggleState(i ? 2 : 0);
    }
  }
}
//# sourceMappingURL=MoonSignInMainView.js.map