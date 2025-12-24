"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreachView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
const StarItem_1 = require("../View/StarItem");
const RoleViewViewModel_1 = require("../View/ViewData/RoleViewViewModel");
const CostItemGridComponent_1 = require("./CostItemGridComponent");
const RoleBreachSuccessViewData_1 = require("./RoleBreachSuccessViewData");
class RoleBreachView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.AttributeLayout = undefined;
    this.StarLayout = undefined;
    this.lqe = undefined;
    this.b1o = undefined;
    this.q1o = undefined;
    this.yil = undefined;
    this.pef = undefined;
    this.CloseClick = () => {
      UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(3);
      UiManager_1.UiManager.CloseView("RoleLevelUpView");
      this.CloseMe();
    };
    this.LevelUpClick = () => {
      var e;
      var t = () => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
        RoleController_1.RoleController.SendPbOverRoleRequest(e.GetRoleId());
      };
      if (this.q1o === 0 || this.q1o === 1) {
        e = {
          SelectedItemList: this.Rgm(),
          ClickConfirm: t,
          BelongView: "RoleBreachView"
        };
        UiManager_1.UiManager.OpenView("SynthesisTipsInfoView", e, (e, t) => {
          if (e) {
            this.AddChildViewById(t);
          }
        });
      } else {
        t();
      }
    };
    this.LevelUpLockTipClick = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(175);
      const t = ModelManager_1.ModelManager.QuestNewModel.GetCurWorldLevelBreakQuest();
      if (t < 0) {
        e.InteractionMap.set(1, false);
      } else {
        e.FunctionMap.set(2, () => {
          UiManager_1.UiManager.OpenView("QuestView", t);
        });
        e.InteractionMap.set(1, true);
      }
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.G1o = () => new AttributeItem_1.AttributeItem();
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.GEm = () => {
      var e;
      if (ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData().GetRoleIsMaxLevel()) {
        this.CloseMe();
        UiManager_1.UiManager.CloseView("RoleBreachSuccessView");
      } else {
        (e = new RoleViewViewModel_1.RoleViewViewModel(this.dFe, false)).FadeInCurveId = this.yil.FadeInCurveId;
        e.NeedHideOnViewPlayingCloseSequence = this.yil.NeedHideOnViewPlayingCloseSequence;
        this.yil.NeedHideOnViewPlayingCloseSequence = false;
        this.CloseMe();
        RoleController_1.RoleController.CloseAndOpenRoleViewByViewModel("RoleBreachSuccessView", "RoleLevelUpView", e);
      }
    };
    this.N1o = (e, t) => {
      this.GetItem(3).SetUIActive(false);
      this.b1o.GetRootItem().SetUIActive(false);
      this.lqe.GetRootItem().SetUIActive(false);
      UiRoleUtils_1.UiRoleUtils.PlayRoleBreachFinishEffect(this.yil.TsUiSceneRoleActor);
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachSuccessDelayTime();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        RoleController_1.RoleController.PlayRoleMontage(3);
        this.O1o();
      }, i);
      i = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e)?.GetRoleSkinId();
      if (i) {
        if ((t = ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(i)?.BreakUpEventList[t]) && (AudioSystem_1.AudioSystem.PostEvent(t), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Audio", 42, "[Game.RoleBreachView] PostEvent", ["Event", t], ["skinId", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Game.RoleBreachView] 没有皮肤ID", ["roleId", e]);
      }
    };
    this.qdi = () => {
      this.FTt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIHorizontalLayout], [6, UE.UIVerticalLayout], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e) {
      this.yil = e;
      this.dFe = this.yil.RoleId;
      this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.vke);
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
      await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
      this.lqe.SetCloseCallBack(this.CloseClick);
      this.b1o = new CostItemGridComponent_1.CostItemGridComponent(this.GetItem(8), this.LevelUpClick, this.LevelUpLockTipClick, this.Info?.Name);
      this.b1o.SetMaxItemActive(false);
      this.b1o.SetButtonItemLocalText("RoleBreakup");
      this.AttributeLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.G1o);
      await this.yil.InitRoleActor();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 88, "进入突破界面未传参");
    }
  }
  wgm() {
    var e;
    if (this.q1o === 2) {
      this.b1o.SetButtonItemLocalText("RoleBreakup");
      this.b1o?.SetButtonItemInteractive(true);
    } else if (this.q1o === 0 || this.q1o === 1) {
      if (e = ModelManager_1.ModelManager.ComposePopupModel.CheckOpenResult(this.Rgm())) {
        this.b1o.SetButtonItemLocalTextNew("AutoSynthesis_MaterialReplenishBtn_Text");
      } else {
        this.b1o.SetButtonItemLocalTextNew("AutoSynthesis_MaterialMissingBtn_Text");
      }
      this.b1o?.SetButtonItemInteractive(e);
    }
  }
  OnBeforeShow() {
    this.FTt();
  }
  async OnPlayingStartSequenceAsync() {
    if (this.yil?.NeedShowOnViewPlayingStartSequence) {
      this.yil.ShowActor();
    }
    return Promise.resolve();
  }
  async OnPlayingCloseSequenceAsync() {
    if (this.yil?.NeedHideOnViewPlayingCloseSequence) {
      this.yil.HideActor();
    }
    return Promise.resolve();
  }
  OnHandleLoadScene() {
    this.yil.HandleLoadScene(() => {
      RoleController_1.RoleController.PlayRoleMontage(3, false, true);
    });
  }
  OnHandleReleaseScene() {
    this.yil.HandleReleaseScene();
  }
  Rgm() {
    return this.pef ?? [];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleBreakUp, this.N1o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleBreakUp, this.N1o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  FTt() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData();
    var t = e.GetBreachLevel();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "RoleBreakUpLevel", t + 1);
    var i = e.GetBreachConfig(t + 1);
    this.GetText(0).SetText(i.MaxLevel.toString());
    let r = 0;
    var o = [];
    var s = i.BreachConsume;
    if (s) {
      for (var [n, a] of s) {
        if (n === ItemDefines_1.EItemId.Gold) {
          r = a;
        } else {
          n = {
            ItemId: n,
            IncId: 0,
            SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n),
            Count: a
          };
          o.push(n);
        }
      }
    }
    this.pef = o.map(e => ({
      ...e
    }));
    if (r > 0) {
      this.pef.push({
        ItemId: ItemDefines_1.EItemId.Gold,
        IncId: 0,
        Count: r,
        SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold)
      });
    }
    this.q1o = ModelManager_1.ModelManager.RoleModel.GetRoleBreachState(this.dFe);
    if (this.q1o === 4) {
      s = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i.ConditionId);
      this.b1o.SetButtonItemActive(false);
      this.b1o.SetLockItemActive(true);
      this.b1o.SetLockLocalText(s);
    } else {
      this.b1o.SetButtonItemActive(true);
      this.b1o.SetLockItemActive(false);
    }
    this.b1o.Update(o, ItemDefines_1.EItemId.Gold, r);
    this.jxt(t, e.GetMaxBreachLevel());
    this.k1o();
    this.wgm();
  }
  k1o() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay3");
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData();
    var i = t.GetLevel();
    var r = t.GetBreachLevel();
    var o = t.GetMaxBreachLevel();
    var s = [];
    for (const h of e) {
      var n = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(this.dFe, h, i, r);
      let e = 0;
      if (r < o && (a = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(this.dFe, i, r, i, r + 1, h)) > 0) {
        e = n + a;
      }
      var a = {
        Id: h,
        IsRatio: false,
        CurValue: n,
        BgActive: false,
        ShowNext: e > n,
        NextValue: e,
        UseAnotherName: true
      };
      s.push(a);
    }
    this.AttributeLayout.RefreshByData(s);
  }
  jxt(t, i) {
    var r = new Array(i);
    for (let e = 0; e < i; ++e) {
      var o = {
        StarOnActive: e < t,
        StarOffActive: e > t,
        StarNextActive: e === t,
        StarLoopActive: e === t,
        PlayLoopSequence: e === t,
        PlayActivateSequence: false
      };
      r[e] = o;
    }
    this.StarLayout.RefreshByData(r);
  }
  O1o() {
    var e = new RoleBreachSuccessViewData_1.RoleBreachSuccessViewData(this.dFe, this.GEm);
    UiManager_1.UiManager.OpenView("RoleBreachSuccessView", e);
  }
}
exports.RoleBreachView = RoleBreachView;
//# sourceMappingURL=RoleBreachView.js.map