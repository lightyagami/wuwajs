"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownTitle = exports.PhantomArenaEntranceRepeatTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase");
const TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
class PhantomArenaEntranceRepeatTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.yuu = undefined;
    this.a71 = undefined;
    this.Khu = undefined;
    this.Xhu = undefined;
    this.bs_ = undefined;
    this.ZW1 = () => {
      var e = {
        ChallengeId: 0,
        OpenView: "PhantomArenaDeckOverviewTabView",
        ActivityId: this.ActivityId
      };
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", e);
    };
    this.p5t = () => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.GetRepeatChallengeOpen(this.hyc)) {
        this.ViewModel.SetRepeatChallenge(this.hyc);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1112");
      }
    };
    this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Ewu = (e, t) => {
      return e !== t && ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(PhantomArenaDefine_1.GYM_MAX_LEVEL, this.ActivityId)[t].State !== 0;
    };
    this.f_i = (e, t) => {
      this.yuu = t;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaRepeatLastIndex, e);
      this.nOe();
    };
    this.g_i = e => e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Xhu = new ButtonItem_1.ButtonItem();
    this.Xhu.SetFunction(this.ZW1);
    await this.Xhu.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    this.bs_ = new ButtonItem_1.ButtonItem();
    this.bs_.SetFunction(this.p5t);
    await this.bs_.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    this.Khu = new CommonDropDown_1.CommonDropDown(this.GetItem(7), e => new DropDownItem(e), e => new DropDownTitle(e));
    this.Khu.SetOnCanChangeCall(this.Ewu);
    await this.Khu.Init();
  }
  OnStart() {
    this.a71 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.rOe, this.GetItem(5).GetOwner());
    ModelManager_1.ModelManager.PhantomArenaModel.SetGymRedDotChecked(PhantomArenaDefine_1.GYM_MAX_LEVEL, this.ActivityId);
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaRepeatLastIndex) ?? 0;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(PhantomArenaDefine_1.GYM_MAX_LEVEL, this.ActivityId);
    this.yuu = t[e];
    this.Khu.InitScroll(t, this.g_i, e);
    this.Khu.SetShowType(1);
    this.Khu.SetOnSelectCall(this.f_i);
  }
  OnBeforeShow() {
    this.nOe();
    this.Yhu();
    this.cy1();
  }
  nOe() {
    var e;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(this.hyc);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.ChallengeName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.NpcDesc);
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetRewardListByChallengeId(this.hyc);
      this.a71.RefreshByData(t);
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel(this.ActivityId);
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetRepeatGymExpWeekLimitByLevel(t);
      e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterExpWeek(this.ActivityId);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(6), "PhantomBattle_1117", e, t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 75, "获取挑战信息失败", ["ChallengeId", this.hyc]);
    }
  }
  Yhu() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), PhantomArenaDefine_1.POINTS_NAME_TEXT);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPointsItemId(this.ActivityId);
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e);
    this.GetText(1).SetText(e.toString());
  }
  cy1() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10090);
    this.Xhu.SetUiActive(e);
  }
  get hyc() {
    return this.yuu?.Id ?? -1;
  }
}
exports.PhantomArenaEntranceRepeatTabView = PhantomArenaEntranceRepeatTabView;
class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.cUu = () => {
      if (this.Pe?.State === 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1112");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  OnShowDropDownItemBase(e) {
    this.Pe = e;
    var t = this.Pe.IsLast ? "PhantomBattle_1115" : "PhantomBattle_1114";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
    if (e.State === 0) {
      this.GetDropDownToggle().OnUndeterminedClicked.Add(this.cUu);
      this.GetDropDownToggle().SetToggleStateForce(2);
    }
  }
}
class DropDownTitle extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  ShowTemp(e, t) {
    e = e.IsLast ? "PhantomBattle_1115" : "PhantomBattle_1114";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.DropDownTitle = DropDownTitle;
//# sourceMappingURL=PhantomArenaEntranceRepeatTabView.js.map