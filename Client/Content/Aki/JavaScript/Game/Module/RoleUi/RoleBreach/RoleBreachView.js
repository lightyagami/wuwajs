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
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
const StarItem_1 = require("../View/StarItem");
const CostItemGridComponent_1 = require("./CostItemGridComponent");
class RoleBreachView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.AttributeLayout = undefined;
    this.StarLayout = undefined;
    this.lqe = undefined;
    this.b1o = undefined;
    this.q1o = undefined;
    this.dVi = undefined;
    this.CloseClick = () => {
      UiManager_1.UiManager.CloseView("RoleLevelUpView");
      this.CloseMe();
    };
    this.LevelUpClick = () => {
      var e;
      if (this.q1o === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMaterial");
      } else if (this.q1o === 1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMoney");
      } else {
        e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
        RoleController_1.RoleController.SendPbOverRoleRequest(e.GetRoleId());
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
    this.OnRoleBreachQuitSequenceFinish = () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(e.GetRoleId(), this.Info.Name);
    };
    this.G1o = () => new AttributeItem_1.AttributeItem();
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.N1o = (e, t) => {
      this.GetItem(3).SetUIActive(false);
      this.b1o.GetRootItem().SetUIActive(false);
      this.lqe.GetRootItem().SetUIActive(false);
      UiRoleUtils_1.UiRoleUtils.PlayRoleBreachFinishEffect(this.dVi);
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
  OnStart() {
    this.dFe = this.OpenParam;
    this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.vke);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
    this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
    this.lqe.SetCloseCallBack(this.CloseClick);
    this.b1o = new CostItemGridComponent_1.CostItemGridComponent(this.GetItem(8), this.LevelUpClick, this.LevelUpLockTipClick);
    this.b1o.SetMaxItemActive(false);
    this.b1o.SetButtonItemLocalText("RoleBreakup");
    this.AttributeLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.G1o);
    this.UiViewSequence.AddSequenceFinishEvent("Quit", this.OnRoleBreachQuitSequenceFinish);
    RoleController_1.RoleController.PlayRoleMontage(12);
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      e.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    }
    RoleController_1.RoleController.PlayRoleMontage(3, false, true);
  }
  OnBeforeShow() {
    this.FTt();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleBreakUp, this.N1o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleBreakUp, this.N1o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnHandleReleaseScene() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 58, "RoleBreachView HandleReleaseScene 隐藏模型");
    }
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  FTt() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData();
    var t = e.GetBreachLevel();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "RoleBreakUpLevel", t + 1);
    var i = e.GetBreachConfig(t + 1);
    this.GetText(0).SetText(i.MaxLevel.toString());
    let r = 0;
    var o = [];
    var n = i.BreachConsume;
    if (n) {
      for (var [a, s] of n) {
        if (a === ItemDefines_1.EItemId.Gold) {
          r = s;
        } else {
          a = {
            ItemId: a,
            IncId: 0,
            SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(a),
            Count: s
          };
          o.push(a);
        }
      }
    }
    this.q1o = ModelManager_1.ModelManager.RoleModel.GetRoleBreachState(this.dFe);
    if (this.q1o === 4) {
      n = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i.ConditionId);
      this.b1o.SetButtonItemActive(false);
      this.b1o.SetLockItemActive(true);
      this.b1o.SetLockLocalText(n);
    } else {
      this.b1o.SetButtonItemActive(true);
      this.b1o.SetLockItemActive(false);
    }
    this.b1o.Update(o, ItemDefines_1.EItemId.Gold, r);
    i = ModelManager_1.ModelManager.RoleModel.RoleBreachResponseData.GetUnLockSkillId();
    this.GetItem(1).SetUIActive(i !== 0);
    if (i !== 0) {
      n = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i);
      this.SetTextureByPath(n.Icon, this.GetTexture(2));
    }
    this.jxt(t, e.GetMaxBreachLevel());
    this.k1o();
  }
  k1o() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay3");
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData();
    var i = t.GetLevel();
    var r = t.GetBreachLevel();
    var o = t.GetMaxBreachLevel();
    var n = [];
    for (const l of e) {
      var a = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(this.dFe, l, i, r);
      let e = 0;
      if (r < o && (s = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(this.dFe, i, r, i, r + 1, l)) > 0) {
        e = a + s;
      }
      var s = {
        Id: l,
        IsRatio: false,
        CurValue: a,
        BgActive: false,
        ShowNext: e > a,
        NextValue: e,
        UseAnotherName: true
      };
      n.push(s);
    }
    this.AttributeLayout.RefreshByData(n);
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
    UiManager_1.UiManager.OpenView("RoleBreachSuccessView", this.dFe);
  }
}
exports.RoleBreachView = RoleBreachView;
//# sourceMappingURL=RoleBreachView.js.map