"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackLogicController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
class HonamiStoryBackpackLogicController {
  constructor() {
    this.BackpackView = undefined;
    this.Frm = undefined;
    this.Nrm = undefined;
    this.Bwm = undefined;
    this.PanelBaseList = [];
    this._ii = 0;
    this.com = undefined;
    this.dom = new Set();
    this.mom = 0;
    this.wsm = undefined;
    this.Lsm = undefined;
    this.TipsItem = undefined;
    this.vzi = undefined;
  }
  Destroy() {
    this.BCe();
  }
  OnClickGrid(t, i, o) {
    if (this.Nrm !== undefined && t !== this.Nrm) {
      this.Bwm?.CancelToggleSelect();
      this.BCe();
    }
    this.Bwm = o;
    this.Nrm = t;
    if (this.Frm && this.Frm.Valid()) {
      this.BCe();
      this.Bwm = undefined;
      return !(this.Nrm = undefined);
    } else {
      o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDoubleClickDelay();
      this.Frm = TimerSystem_1.TimerSystem.Delay(() => {
        this.Frm = undefined;
        this.Bwm = undefined;
        this.Nrm = undefined;
        i();
      }, o);
      return false;
    }
  }
  BCe() {
    if (this.Frm) {
      if (this.Frm.Valid()) {
        TimerSystem_1.TimerSystem.Remove(this.Frm);
      }
      this.Frm = undefined;
    }
  }
  RegisterPanel(t) {
    this.PanelBaseList.push(t);
  }
  RegisterValuePanel(t) {
    this.com = t;
  }
  RegisterTipsItem(t) {
    this.TipsItem = t;
  }
  RegisterBackpackView(t) {
    this.BackpackView = t;
  }
  IsBackpackView() {
    return this.BackpackView !== undefined;
  }
  SetLogicState(t, i = undefined, o = undefined) {
    this.BCe();
    var e = this._ii;
    this._ii = t;
    this.wsm = i;
    this.Lsm = o;
    if (t === 0) {
      this.dom.clear();
      this.InitDataSelectState();
      if (e === 4) {
        this.BackpackView?.SetSellMode(false);
      }
      this.HandleGamepadLogicToNormal();
    } else if (t === 4) {
      this.InitDataSelectState();
      this.BackpackView?.SetSellMode(true);
      this.dom.clear();
      this.mom = 0;
      this.com.SetValue(0);
    }
    for (const r of this.PanelBaseList) {
      r.OnBackpackLogicStateChange(t);
    }
  }
  GetLogicState() {
    return this._ii;
  }
  InitDataSelectState() {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1;
    for (const i of ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(t).GetItemDataList()) {
      i.SetIsSelected(false);
    }
  }
  HandleGamepadLogicToNormal() {
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic()?.TriggerCurItemEnterGrid();
  }
  OnUnlockSlot(t) {
    for (const i of this.PanelBaseList) {
      if (i.GetBackpackType() === 3) {
        i.RefreshUnlockSlot();
        return;
      }
    }
  }
  RefreshItemLockState(t, i) {
    for (const o of this.PanelBaseList) {
      if (o.GetBackpackType() === i) {
        o.RefreshSingleItem(t);
        return;
      }
    }
  }
  RegisterSingleSellItem(t) {
    var i = !t.GetIsSelected();
    t.SetIsSelected(i);
    if (i) {
      this.dom.add(t);
      this.mom += t.GetSellPrice();
    } else {
      this.dom.delete(t);
      this.mom -= t.GetSellPrice();
    }
    this.com.SetValue(this.mom);
  }
  DoSell() {
    if (this.dom.size === 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("HonamiStory_Sell_NoItem_Tip");
    } else {
      var t = [];
      for (const o of this.dom) {
        var i = {
          ItemData: o,
          BackpackType: 1
        };
        t.push(i);
      }
      UiManager_1.UiManager.OpenView("HonamiStorySellConfirmBoxView", {
        SellItemList: t,
        SellCallback: () => {
          this.dom.clear();
          this.mom = 0;
          this.com.SetValue(0);
          this.SetLogicState(0);
          ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetLockUseDragStateByPanelItem(this.BackpackView.GetRootItem(), false);
        }
      });
    }
  }
  DoSellToAll(t, i, o = 0) {
    var e = [];
    if (t) {
      for (const r of ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1).GetItemDataList()) {
        if (r.GetItemType() === i && !r.IsLock() && (o === 0 || o === r.GetQuality())) {
          r.SetIsSelected(true);
          e.push(r);
          this.dom.add(r);
        }
      }
      this.mom = 0;
      for (const s of this.dom) {
        this.mom += s.GetSellPrice();
      }
    } else {
      for (const h of this.dom) {
        if (h.GetItemType() === i && (o === 0 || o === h.GetQuality())) {
          e.push(h);
          h.SetIsSelected(false);
        }
      }
      for (const n of e) {
        this.dom.delete(n);
        this.mom -= n.GetSellPrice();
      }
    }
    this.com.SetValue(this.mom);
    for (const l of this.PanelBaseList) {
      if (l.GetBackpackType() === 0) {
        for (const a of e) {
          l.RefreshSingleItem(a);
        }
        return;
      }
    }
  }
  async DoTipsWithPluginsInstead(i, o) {
    if (!this.wsm) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "Enter TipsWithPlugins Error");
      }
      return false;
    }
    let e = false;
    if (this.Lsm !== 4) {
      let t = false;
      if (t = o !== undefined && this.Lsm === 1 ? ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1).GetCapacity() <= this.wsm.GetPosition() : t) {
        e = true;
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoSpaceForQuickAll");
      } else {
        e = await HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(this.wsm, o, this.wsm.GetPosition(), i, this.Lsm, 4);
      }
    } else {
      e = await HonamiStoryController_1.HonamiStoryController.RequestSwitchInSameBag(this.wsm, i, 4);
    }
    if (e) {
      this.TipsItem.OnClickedMask();
    }
    return e;
  }
  GetInsteadItem() {
    return this.wsm;
  }
  GetTipsOpen() {
    return this.GetLogicState() === 1 || this.GetLogicState() === 2;
  }
  CloseTips() {
    this.TipsItem.OnClickedMask();
  }
  SetInteractController(t) {
    this.vzi = t;
  }
  GetInteractController() {
    return this.vzi;
  }
  RefreshNeedQuickAll() {
    for (const t of this.PanelBaseList) {
      if (t.GetBackpackType() === 3) {
        HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView();
        t.RefreshNeedQuickAll();
        return;
      }
    }
  }
}
exports.HonamiStoryBackpackLogicController = HonamiStoryBackpackLogicController;
//# sourceMappingURL=HonamiStoryBackpackLogicController.js.map