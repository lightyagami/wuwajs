"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponBreachView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const CostItemGridComponent_1 = require("../../RoleUi/RoleBreach/CostItemGridComponent");
const StarItem_1 = require("../../RoleUi/View/StarItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponController_1 = require("../WeaponController");
class WeaponBreachView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.AttributeLayout = undefined;
    this.b1o = undefined;
    this.StarLayout = undefined;
    this.ROo = 0;
    this.UOo = undefined;
    this.DOo = 0;
    this.N2i = undefined;
    this.O2i = undefined;
    this.dmo = undefined;
    this.AOo = () => {
      if (this.ROo === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponBreachNoEnoughMaterialText");
      } else if (this.ROo === 1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponBreachNoEnoughMoneyText");
      } else {
        this.N2i = UiSceneManager_1.UiSceneManager.GetWeaponObserver();
        this.O2i = UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver();
        this.dmo = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        const i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo)?.GetRoleId() ?? 0;
        WeaponController_1.WeaponController.SendPbWeaponBreachRequest(this.DOo, e => {
          var t = this.N2i.Model;
          UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(t, "WeaponBreachEffect");
          WeaponController_1.WeaponController.PlayWeaponRenderingMaterial("WeaponBreachMaterialController", this.N2i, this.O2i);
          var t = ConfigManager_1.ConfigManager.RoleConfig.GetWeaponBreachDaDelayTime();
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.N2i?.Model?.CheckGetComponent(23)?.RefreshWeaponBreachDa(e, i);
            this.O2i?.Model?.CheckGetComponent(23)?.RefreshWeaponBreachDa(e, i);
            this.dmo?.Model?.CheckGetComponent(17)?.RefreshWeaponDa();
          }, t);
        });
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
    this.qdi = () => {
      this.FTt();
    };
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.G1o = () => new AttributeItem_1.AttributeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnStart() {
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.vke);
    this.b1o = new CostItemGridComponent_1.CostItemGridComponent(this.GetItem(4), this.AOo, this.LevelUpLockTipClick);
    this.b1o.SetMaxItemActive(false);
    this.b1o.SetButtonItemLocalText("RoleBreakup");
    this.AttributeLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.G1o, this.GetItem(5).GetOwner());
  }
  OnBeforeShow() {
    this.DOo = this.ExtraParams;
    this.FTt();
    this.P5e();
  }
  FTt() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var t = e.GetBreachConfig();
    var i = e.GetWeaponConfig();
    var r = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(i.BreachId, e.GetBreachLevel() + 1);
    this.GetText(0).SetText(r.LevelLimit.toString());
    var r = i.BreachId;
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(r);
    this.jxt(e.GetBreachLevel(), i);
    this.ROo = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachState(this.DOo);
    if (this.ROo === 3) {
      r = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t.ConditionId);
      this.b1o.SetButtonItemActive(false);
      this.b1o.SetLockItemActive(true);
      this.b1o.SetLockLocalText(r ?? "");
    } else {
      this.b1o.SetButtonItemActive(true);
      this.b1o.SetLockItemActive(false);
    }
    var o = [];
    var i = t.Consume;
    if (i) {
      for (var [n, a] of i) {
        n = {
          ItemId: n,
          IncId: 0,
          SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n),
          Count: a
        };
        o.push(n);
      }
    }
    r = t.GoldConsume;
    this.b1o.Update(o, ItemDefines_1.EItemId.Gold, r);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleBreakUpLevel", e.GetBreachLevel() + 1);
    this.k1o();
  }
  jxt(t, i) {
    this.StarLayout ||= new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.vke);
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
  k1o() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var t = e.GetWeaponConfig();
    this.UOo = ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(t);
    var i = e.GetBreachLevel();
    var r = i + 1;
    var o = e.GetLevel();
    var n = [];
    for (const _ of this.UOo) {
      var a = _.CurveId;
      var s = _.PropId;
      var l = s.Value;
      var h = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(a, l, o, i);
      let e = 0;
      if (i < r) {
        e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(a, l, o, r);
      }
      a = {
        Id: s.Id,
        IsRatio: s.IsRatio,
        CurValue: h,
        BgActive: true,
        ShowNext: e > h,
        NextValue: e
      };
      n.push(a);
    }
    this.AttributeLayout.RefreshByData(n);
  }
  P5e() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo).GetWeaponConfig();
    var t = e.WeaponName;
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId);
    var e = UE.Color.FromHex(e.DropColor);
    this.GetText(6).SetColor(e);
    this.GetText(6).ShowTextNew(t);
  }
  OnBeforeDestroy() {
    this.b1o.Destroy();
  }
}
exports.WeaponBreachView = WeaponBreachView;
//# sourceMappingURL=WeaponBreachView.js.map