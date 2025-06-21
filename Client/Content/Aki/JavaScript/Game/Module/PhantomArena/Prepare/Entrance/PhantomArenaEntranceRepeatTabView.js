"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DropDownTitle = exports.PhantomArenaEntranceRepeatTabView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown"),
  DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase"),
  TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
class PhantomArenaEntranceRepeatTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments), this.Hnu = void 0, this.bj1 = void 0, this.Uou = void 0, this.Dou = void 0, this.bs_ = void 0, this.gW1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", {
        ChallengeId: 0,
        OpenView: "PhantomArenaDeckOverviewTabView"
      })
    }, this.p5t = () => {
      ModelManager_1.ModelManager.PhantomArenaModel.GetRepeatChallengeOpen(this.hyc) ? this.ViewModel.SetRepeatChallenge(this.hyc) : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1112")
    }, this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.Adu = (e, t) => {
      return e !== t && 0 !== ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(PhantomArenaDefine_1.GYM_MAX_LEVEL)[t].State
    }, this.f_i = (e, t) => {
      this.Hnu = t, LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaRepeatLastIndex, e), this.nOe()
    }, this.g_i = e => e
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.Dou = new ButtonItem_1.ButtonItem, this.Dou.SetFunction(this.gW1), await this.Dou.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.bs_ = new ButtonItem_1.ButtonItem, this.bs_.SetFunction(this.p5t), await this.bs_.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.Uou = new CommonDropDown_1.CommonDropDown(this.GetItem(7), e => new DropDownItem(e), e => new DropDownTitle(e)), this.Uou.SetOnCanChangeCall(this.Adu), await this.Uou.Init()
  }
  OnStart() {
    this.bj1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.rOe, this.GetItem(5).GetOwner()), ModelManager_1.ModelManager.PhantomArenaModel.SetGymRedDotChecked(PhantomArenaDefine_1.GYM_MAX_LEVEL);
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaRepeatLastIndex) ?? 0,
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(PhantomArenaDefine_1.GYM_MAX_LEVEL);
    this.Hnu = t[e], this.Uou.InitScroll(t, this.g_i, e), this.Uou.SetShowType(1), this.Uou.SetOnSelectCall(this.f_i)
  }
  OnBeforeShow() {
    this.nOe(), this.Bou(), this.Nv1()
  }
  nOe() {
    var e, t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(this.hyc);
    t ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.ChallengeName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.NpcDesc), t = ModelManager_1.ModelManager.PhantomArenaModel.GetRewardListByChallengeId(this.hyc), this.bj1.RefreshByData(t), t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel(), t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetRepeatGymExpWeekLimitByLevel(t), e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterExpWeek(), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(6), "PhantomBattle_1117", e, t)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取挑战信息失败", ["ChallengeId", this.hyc])
  }
  Bou() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), PhantomArenaDefine_1.POINTS_NAME_TEXT);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPointsItemId(),
      e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e);
    this.GetText(1).SetText(e.toString())
  }
  Nv1() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10090);
    this.Dou.SetUiActive(e)
  }
  get hyc() {
    return this.Hnu?.Id ?? -1
  }
}
exports.PhantomArenaEntranceRepeatTabView = PhantomArenaEntranceRepeatTabView;
class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.gmu = () => {
      0 === this.Pe?.State && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1112")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText]
    ]
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0)
  }
  OnShowDropDownItemBase(e) {
    this.Pe = e;
    var t = this.Pe.IsLast ? "PhantomBattle_1115" : "PhantomBattle_1114";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t), 0 === e.State && (this.GetDropDownToggle().OnUndeterminedClicked.Add(this.gmu), this.GetDropDownToggle().SetToggleStateForce(2))
  }
}
class DropDownTitle extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  ShowTemp(e, t) {
    e = e.IsLast ? "PhantomBattle_1115" : "PhantomBattle_1114";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e)
  }
}
exports.DropDownTitle = DropDownTitle;
//# sourceMappingURL=PhantomArenaEntranceRepeatTabView.js.map