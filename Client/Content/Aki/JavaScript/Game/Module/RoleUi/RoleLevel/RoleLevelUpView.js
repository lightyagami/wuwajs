"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevelUpView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ExpComponent_1 = require("../../Common/ExpTween/ExpComponent");
const SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleController_1 = require("../RoleController");
const RoleDefine_1 = require("../RoleDefine");
const AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData");
const RoleExpItemGridComponent_1 = require("./RoleExpItemGridComponent");
const RoleLevelUpSuccessController_1 = require("./RoleLevelUpSuccessController");
class RoleLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.AttributeLayout = undefined;
    this.RoleInstance = undefined;
    this.Juo = undefined;
    this.ypt = undefined;
    this.vji = new SelectableExpData_1.SelectableExpData();
    this.dji = undefined;
    this.zuo = undefined;
    this.dVi = undefined;
    this.lqe = undefined;
    this.CloseClick = () => {
      UiManager_1.UiManager.CloseView("RoleLevelUpView");
    };
    this.OnClickItemAdd = t => {
      var i = this.ypt;
      for (let e = i.length - 1; e >= 0; e--) {
        var r = i[e];
        if (r.ItemId === t) {
          if (r.Count === 0) {
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
          } else if (this.Zuo()) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponAddExpTipsText");
          } else if (r.Count > r.SelectedCount) {
            r.SelectedCount++;
            this.Aji();
          }
          break;
        }
      }
    };
    this.OnClickItemReduce = t => {
      var i = this.ypt;
      for (let e = i.length - 1; e >= 0; e--) {
        var r = i[e];
        if (r.ItemId === t) {
          if (r.SelectedCount > 0) {
            r.SelectedCount--;
          }
          break;
        }
      }
      this.Aji();
    };
    this.Pji = () => {
      var e = this.Juo.GetAutoButtonState();
      var t = this.ypt;
      if (e === 0) {
        let e = false;
        for (const r of t) {
          if (r.Count > 0) {
            e = true;
            break;
          }
        }
        if (!e) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMaterial");
          return;
        }
        var i = this.vji.GetExpDistanceToMax();
        ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(i, t, this.eco);
        this.Aji();
      } else if (e === 1) {
        for (const o of t) {
          o.SelectedCount = 0;
        }
      }
      this.Aji();
    };
    this.Ruo = t => {
      var i = this.ypt;
      for (let e = i.length - 1; e >= 0; e--) {
        var r = i[e];
        if (r.ItemId === t && r.Count > 0 && r.SelectedCount < r.Count && !this.Zuo()) {
          return true;
        }
      }
      return false;
    };
    this.Uuo = t => {
      var i = this.ypt;
      for (let e = i.length - 1; e >= 0; e--) {
        var r = i[e];
        if (r.ItemId === t && r.SelectedCount <= 0) {
          return false;
        }
      }
      return true;
    };
    this.eco = e => ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(e.ItemId);
    this.G1o = () => {
      return new AttributeItem_1.AttributeItem();
    };
    this.tco = () => {
      this.InitExp();
      this.ResetDataList();
      this.Aji();
    };
    this.ico = () => {
      var e = [];
      for (const r of this.zuo) {
        var t = r[0];
        var i = r[1];
        var i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
        e.push(i);
      }
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1010, e, this.oco);
    };
    this.rco = () => {
      var e = [];
      for (const r of this.zuo) {
        var t = r[0];
        var i = r[1];
        var i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
        e.push(i);
      }
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1010, e, this.nco);
    };
    this.qji = e => ModelManager_1.ModelManager.RoleModel.GetRoleLevelUpExp(this.RoleInstance.GetRoleId(), e + 1);
    this.oco = () => {
      UiManager_1.UiManager.CloseView("RoleLevelUpView");
    };
    this.nco = () => {
      RoleController_1.RoleController.SendRoleBreakThroughViewRequest(this.RoleInstance.GetRoleId(), this.Info.Name);
    };
    this.sco = () => {
      this.aco();
      this.dji.PlayExpTween(this.vji);
    };
    this.hco = e => {
      this.zuo = e;
    };
    this.qdi = () => {
      this.Cl();
    };
    this.Dji = () => {
      var e = this.ypt;
      let t = false;
      for (const r of e) {
        if (r.SelectedCount > 0) {
          t = true;
          break;
        }
      }
      if (t) {
        if (this.Juo.GetIsMoneyEnough()) {
          const o = new Array();
          e.forEach(e => {
            var t;
            if (e.SelectedCount > 0) {
              (t = new RoleDefine_1.ArrayIntInt()).Z4n = e.ItemId;
              t.e5n = e.SelectedCount;
              o.push(t);
            }
          });
          var i;
          var e = this.vji.GetOverExp();
          if (e > 0 && (e = ModelManager_1.ModelManager.RoleModel.CalculateExpBackItem(e)).size > 0) {
            (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap = e;
            i.FunctionMap.set(2, () => {
              RoleController_1.RoleController.SendPbUpLevelRoleRequest(this.RoleInstance.GetRoleId(), o, () => {
                UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.dVi);
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
          } else {
            RoleController_1.RoleController.SendPbUpLevelRoleRequest(this.RoleInstance.GetRoleId(), o, () => {
              UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.dVi);
            });
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMoney");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponSelectMaterialTipsText");
      }
    };
    this.OnAttributeChangeSequenceFinished = e => {
      this.UpdateAttributeItemValue(e);
    };
    this.UpdateAttributeItemValue = e => {
      var t = e.GetAttributeId();
      var i = this.vji.GetArrivedLevel();
      var r = this.vji.GetCurrentLevel();
      var o = this.RoleInstance.GetLevelData().GetBreachLevel();
      var s = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(this.RoleInstance.GetRoleId(), t, r, o);
      e.SetCurrentValue(s);
      let n = false;
      let a = 0;
      if (r < i) {
        if ((r = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(this.RoleInstance.GetRoleId(), r, o, i, o, t)) > 0) {
          a = s + r;
          n = true;
        }
      } else {
        n = false;
      }
      e.SetNextItemActive(n);
      if (n) {
        e.SetNextValue(a);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIGridLayout], [4, UE.UIItem]];
  }
  OnStart() {
    this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.RoleInstance = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (this.RoleInstance === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "无效的roleId", ["界面名称", "RoleLevelUpView"]);
      }
    } else {
      this.AttributeLayout = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.G1o);
      this.Juo = new RoleExpItemGridComponent_1.RoleExpItemGridComponent(this.Dji, this.Pji, this.OnClickItemAdd, this.OnClickItemReduce, this.Ruo, this.Uuo, "RoleLevelUpView");
      await this.Juo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
      this.Juo.SetButtonItemText("RoleLevelUp");
      this.vji.SetMaxExpFunction(this.qji);
      this.dji = new ExpComponent_1.ExpComponent(this.GetItem(0), false);
      this.dji.Init();
      this.dji.BindPlayCompleteCallBack(this.tco);
      this.dji.SetLevelFormatText("LevelNumber");
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4));
      this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
      this.lqe.SetCloseCallBack(this.CloseClick);
      await this.AU();
      this.Cl();
    }
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      e?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    }
    RoleController_1.RoleController.PlayRoleMontage(3, false, true);
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  lco() {
    this.ypt = [];
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
      var e = {
        IncId: 0,
        ItemId: t.Id,
        Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t.Id),
        SelectedCount: 0
      };
      this.ypt.push(e);
    }
    this.Juo.Update(this.ypt, ItemDefines_1.EItemId.Gold, 0);
  }
  Aji() {
    let t = 0;
    var e = this.ypt;
    this.Juo.UpdateByDataList(e);
    e.forEach(e => {
      t += this.eco(e) * e.SelectedCount;
    });
    this.vji.UpdateExp(t);
    this.dji.Update(this.vji);
    var e = this.vji.GetExpDistanceToMax();
    var e = ModelManager_1.ModelManager.RoleModel.GetMoneyToLevelUp(Math.min(e, t));
    this.Juo.UpdateMoney(ItemDefines_1.EItemId.Gold, e);
    if (t > 0) {
      this.Juo.SetAutoButtonText("PrefabTextItem_3035508725_Text");
    } else {
      this.Juo.SetAutoButtonText("PrefabTextItem_744293929_Text");
    }
    this.k1o();
  }
  _co(e, t) {
    var i = this.AttributeLayout.GetLayoutItemList();
    var r = [];
    var o = this.RoleInstance.GetLevelData();
    var s = this.RoleInstance.GetRoleId();
    var n = o.GetBreachLevel();
    for (const _ of i) {
      var a = _.GetAttributeId();
      var l = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(s, a, e, n);
      var h = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(s, a, t, n);
      if (l !== h) {
        l = new AttrListScrollData_1.AttrListScrollData(a, l, h, 0, false, 0);
        (h = RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(l)).Name = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(a).AnotherName;
        r.push(h);
      }
    }
    return r;
  }
  async AU() {
    this.lco();
    await this.uco();
    this.InitExp();
  }
  async uco() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay3");
    var i = [];
    var r = this.RoleInstance.GetAttributeData();
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var s = t[e];
      var s = {
        Id: s,
        IsRatio: false,
        CurValue: r.GetAttrValueById(s),
        BgActive: o > 2 && e % 2 == 0,
        UseAnotherName: true
      };
      i.push(s);
    }
    await this.AttributeLayout.RefreshByDataAsync(i);
  }
  InitExp() {
    this.UpdateExpData();
    this.dji.UpdateInitState(this.vji);
  }
  Cl() {
    this.k1o();
    this.UpdateButtonState();
    this.Aji();
  }
  ResetDataList() {
    for (const e of this.ypt) {
      e.SelectedCount = 0;
      e.Count = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.ItemId);
    }
  }
  k1o() {
    for (const e of this.AttributeLayout.GetLayoutItemList()) {
      this.UpdateAttributeItemValue(e);
    }
  }
  UpdateExpData() {
    var e = this.RoleInstance.GetLevelData();
    var t = e.GetLevel();
    var i = e.GetCurrentMaxLevel();
    var r = e.GetExp();
    var e = e.GetRoleMaxLevel();
    this.vji.UpdateComponent(t, i, r, e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleInfoUpdate, this.sco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleLevelUpReceiveItem, this.hco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleInfoUpdate, this.sco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleLevelUpReceiveItem, this.hco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  aco() {
    var t = this.vji.GetCurrentLevel();
    var i = this.RoleInstance.GetLevelData();
    var r = i.GetLevel();
    if (r !== t) {
      this.k1o();
      var o = this.zuo && this.zuo.length > 0;
      var s = this._co(t, r);
      let e = undefined;
      if (i.GetRoleIsMaxLevel()) {
        (e = {
          LevelInfo: {
            PreUpgradeLv: t,
            UpgradeLv: r,
            FormatStringId: "Text_LevelShow_Text",
            IsMaxLevel: true
          },
          AttributeInfo: s
        }).ClickFunction = o ? this.ico : this.oco;
      } else if (i.GetRoleNeedBreakUp()) {
        (e = {
          LevelInfo: {
            PreUpgradeLv: t,
            UpgradeLv: r,
            FormatStringId: "Text_LevelShow_Text",
            IsMaxLevel: true
          },
          ClickText: "Text_TurnToRoleBreach_Text",
          AttributeInfo: s
        }).ClickFunction = o ? this.rco : this.nco;
      } else {
        e = {
          LevelInfo: {
            PreUpgradeLv: t,
            UpgradeLv: r,
            FormatStringId: "Text_LevelShow_Text"
          },
          AttributeInfo: s
        };
      }
      if (e) {
        i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelUpSuccessDelayTime();
        UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", true);
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
          UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", false);
        }, i);
      }
    }
  }
  Zuo() {
    var e = this.vji.GetArrivedLevel();
    return this.RoleInstance.GetLevelData().GetCurrentMaxLevel() <= e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.Juo?.GetGenericScrollView()?.GetGenericLayout();
    if (t) {
      t = t.GetLayoutItemByIndex(Number(e[1]));
      if (t) {
        e = t.GetUiItemForGuide();
        if (e) {
          return [e, e];
        }
      }
    }
  }
  UpdateButtonState() {
    var e = this.RoleInstance.GetLevelData().GetRoleIsMaxLevel();
    this.Juo.SetMaxItemActive(e);
    this.Juo.SetButtonItemActive(!e);
  }
}
exports.RoleLevelUpView = RoleLevelUpView;
//# sourceMappingURL=RoleLevelUpView.js.map