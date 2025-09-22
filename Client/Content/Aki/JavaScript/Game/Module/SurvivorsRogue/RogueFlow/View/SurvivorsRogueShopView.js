"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueShopView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const SurvivorsRogueCardShopItem_1 = require("../../Card/SurvivorsRogueCardShopItem");
const SurvivorsRogueViewBase_1 = require("./Components/SurvivorsRogueViewBase");
class SurvivorsRogueShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CommandIncId = 0;
    this.Command = undefined;
    this.cbd = undefined;
    this.Sbd = undefined;
    this.Mbd = true;
    this.bFd = undefined;
    this.z7d = 0;
    this.Ebd = e => {
      this.Command.RequestCommand([e.fEd.w5n]);
    };
    this.Ibd = (i, t) => {
      this.Command.RequestLock(i.fEd.w5n, t, e => {
        if (e) {
          i.Y5n = t;
          this.Sbd?.GetLayoutItemByKey(i.fEd.w5n)?.CardItem?.SetLock(t);
        }
      });
    };
    this.Tbd = () => {
      var e = this.Command.GetViewInfo();
      if (ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetCurrencyCount() >= e.RefreshCost) {
        this.Mbd = true;
        this.Command.RequestCommand([Protocol_1.Aki.Protocol.wEd.Proto_Refresh]);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsStore_InsufficientCurrencyTips");
      }
    };
    this.L1i = () => {
      var e;
      if (!ModelManager_1.ModelManager.SurvivorsRogueModel.NotTipsShopPurchaseAvailable && this.Command.IsShopPurchaseAvailable()) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(385)).HasToggle = true;
        e.ToggleTextKey = "SurvivorsShopConfirmationDialog_PrompText";
        e.FunctionMap.set(2, () => {
          this.Command.Execute();
        });
        e.SetToggleFunction(e => {
          ModelManager_1.ModelManager.SurvivorsRogueModel.NotTipsShopPurchaseAvailable = e;
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.Command.Execute();
      }
    };
    this.Y5i = () => {
      var e = new SurvivorsRogueCardShopItem_1.SurvivorsRogueCardShopItem();
      e.OnPurchaseBtnClickCallback = this.Ebd;
      e.OnClickLockCallback = this.Ibd;
      e.OnStateChangeCallback = this.fbd;
      return e;
    };
    this.fbd = (e, i) => {
      this.Sbd.DeselectCurrentGridProxy();
      this.RFd(false);
      if (i) {
        this.Sbd.SelectGridProxy(e.c5n);
        this.bFd = e;
        this.RFd(true);
      }
    };
    this.ITt = () => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetCurrencyCount() >= this.z7d;
      var i = this.GetText(6);
      i.SetChangeColor(!e, i.changeColor);
    };
    this.$wd = () => {
      this.cbd.RoleStatePanel.RoleGrid?.SetLevelUp();
    };
    this.Wwd = (e, i) => {
      if (i) {
        this.cbd.RoleStatePanel.GetWeaponGrid(e)?.SetLevelUp();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UITexture], [6, UE.UIText]];
    this.BtnBindInfo = [[3, this.Tbd], [4, this.L1i]];
  }
  CloseView() {
    this.CloseMe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, this.$wd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, this.Wwd);
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.ITt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, this.$wd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, this.Wwd);
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.ITt);
  }
  async OnBeforeStartAsync() {
    var e;
    this.CommandIncId = this.OpenParam.CommandIncId;
    if (this.CommandIncId) {
      if (!(e = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue.GetCommandByIncId(this.CommandIncId)) || (this.Command = e, e = [], this.Sbd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.Y5i, undefined, true), this.cbd = new SurvivorsRogueViewBase_1.SurvivorsRogueViewBase(), e.push(this.cbd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), await Promise.all(e), this.cbd.SetMainTitleVisible(false), await this.Z$1(), this.Command.AfterDelete)) {
        this.CloseMe();
      } else {
        this.Command.BindView(this);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 界面打开时缺少CommandIncId");
    }
  }
  OnBeforeDestroy() {
    this.Command?.BindView(undefined);
  }
  Refresh() {
    var e = new UiAsyncTask_1.UiAsyncTask("SurvivorsRogueShopView.Refresh", async () => {
      await this.Z$1();
    });
    this.RunAsyncTask(e);
  }
  async Z$1() {
    var e;
    var i = this.Command.GetViewInfo();
    if (i) {
      this.z7d = i.RefreshCost;
      this.GetText(6).SetText(this.z7d.toString());
      this.ITt();
      this.Sbd.DeselectCurrentGridProxy();
      this.RFd(false);
      e = this.Mbd;
      this.Mbd = false;
      await this.Sbd.RefreshByDataAsync(i.DataList, e);
    }
  }
  RFd(e) {
    if (this.bFd) {
      var i = this.bFd.fEd;
      switch (i.R5n) {
        case "lEd":
          var t = i.lEd.nEd;
          if (e && (t.F6n === t.wJs || this.bFd.O2s)) {
            return;
          }
          this.cbd.RoleStatePanel.RoleGrid?.SetSelectOn(e);
          break;
        case "uEd":
          var t = i.uEd.zys;
          var s = i.uEd.sEd;
          if (e && (s.F6n === s.wJs || this.bFd.O2s)) {
            return;
          }
          this.cbd.RoleStatePanel.GetWeaponGrid(t)?.SetSelectOn(e);
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i;
    var t;
    if (!(e.length <= 0)) {
      if ((i = e[0]) === "ShopCardLock") {
        if (t = this.Sbd?.GetLayoutItemByIndex(0)?.GetGuideUiItem("0")) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (i === "SurvivorFightInfo") {
        return this.cbd?.RoleStatePanel?.GetGuideUiItemAndUiItemForShowEx(e);
      } else if (i === "EvolveBar" && (t = this.Sbd?.GetLayoutItemByIndex(0)?.GetGuideUiItem("2"))) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.SurvivorsRogueShopView = SurvivorsRogueShopView;
//# sourceMappingURL=SurvivorsRogueShopView.js.map