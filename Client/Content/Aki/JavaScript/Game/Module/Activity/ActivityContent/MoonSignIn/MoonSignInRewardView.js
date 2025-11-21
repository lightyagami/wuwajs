"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const MoonSignInController_1 = require("./MoonSignInController");
class MoonSignInRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Srd = undefined;
    this.Mrd = undefined;
    this.W2e = () => {
      return new NormalRewardItem();
    };
    this.Erd = () => {
      return new RewardItem();
    };
    this.Ird = () => {
      this.Srd?.RefreshByData(MoonSignInController_1.MoonSignInController.GetData()?.GetMoonNormalRewardData() ?? []);
      this.Trd();
      this.brd();
      this.Rrd();
    };
    this.YDo = () => {
      var e = MoonSignInController_1.MoonSignInController.GetData();
      if (e && e.GetCanGetMoonGrandReward()) {
        MoonSignInController_1.MoonSignInController.MoonPhaseRewardRequest(e.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
    this.BtnBindInfo = [[9, this.YDo]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = MoonSignInController_1.MoonSignInController.GetData()?.UseItemId;
    if (t) {
      e.push(this.lqe.SetCurrencyItemList([t]));
    }
    this.lqe.SetCurrencyItemVisible(true);
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    await Promise.all(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoonSignRewardRefresh, this.Ird);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoonSignRewardRefresh, this.Ird);
  }
  OnStart() {
    this.Srd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.W2e);
    this.Mrd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Erd);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(13).SetUIActive(true);
    this.Srd.BindScrollValueChange(e => {
      if (e) {
        this.GetItem(12).SetUIActive(e.X < 1);
        this.GetItem(13).SetUIActive(e.X > 0);
      }
    });
  }
  OnBeforeShow() {
    this.Ird();
  }
  Trd() {
    const e = MoonSignInController_1.MoonSignInController.GetData();
    if (e) {
      var t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonSignReward(e.Id);
      if (t) {
        var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t.Reward)?.DropPreview;
        if (i) {
          var r = e.MoonGrandReward;
          var n = new Array();
          for (const o of i.keys()) {
            const e = {
              ItemData: [{
                IncId: 0,
                ItemId: o
              }, i.get(o)],
              HaveFinish: r
            };
            n.push(e);
          }
          this.Mrd.RefreshByData(n);
        }
      }
    }
  }
  Rrd() {
    var e;
    var t = MoonSignInController_1.MoonSignInController.GetData();
    if (t && (e = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonSignReward(t.Id))) {
      t = t.HaveSelectMoonPhaseSelectList.length;
      e = e.NeedMoonNum;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "MoonSignInGrandRewardDes", e.toString(), t.toString(), e.toString());
    }
  }
  brd() {
    var e;
    var t = MoonSignInController_1.MoonSignInController.GetData();
    if (t) {
      e = t.MoonGrandReward;
      t = t.GetCanGetMoonGrandReward();
      this.GetItem(11).SetUIActive(e);
      this.GetItem(10).SetUIActive(!e && !t);
      this.GetButton(9).RootUIComp.SetUIActive(!e && t);
    }
  }
}
exports.MoonSignInRewardView = MoonSignInRewardView;
class NormalRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sOe = [];
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UITexture], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = new RewardItem();
    e.push(t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    var i = new RewardItem();
    e.push(i.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    var r = new RewardItem();
    e.push(r.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
    this.sOe.push(t);
    this.sOe.push(i);
    this.sOe.push(r);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(t, e, i) {
    var r = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(t);
    if (r) {
      this.GetItem(5).SetUIActive(i % 2 == 1);
      this.SetTextureByPath(r.Texture, this.GetTexture(0));
      this.SetTextureByPath(r.RewardTexture, this.GetTexture(1));
      this.SetTextureByPath(r.Texture, this.GetTexture(6));
      var n = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(r.Reward)?.DropPreview;
      if (n) {
        i = MoonSignInController_1.MoonSignInController.GetData();
        if (i) {
          var o = !i.CheckPhaseLock(t);
          this.GetTexture(6)?.SetUIActive(!o);
          var s = new Array();
          for (const l of n.keys()) {
            const t = {
              ItemData: [{
                IncId: 0,
                ItemId: l
              }, n.get(l)],
              HaveFinish: o
            };
            s.push(t);
          }
          for (let e = 0; e < this.sOe.length; e++) {
            var a = this.sOe[e];
            const t = s[e];
            a.OnRefresh(t);
          }
          this.SPe?.PlayLevelSequenceByName("Start");
        }
      }
    }
  }
}
class RewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = -1;
  }
  OnRefresh(e) {
    var t = e.ItemData[0];
    var i = e.ItemData[1];
    this.Mne = t.ItemId;
    var t = {
      Data: e,
      Type: 4,
      IsReceivedVisible: e.HaveFinish,
      ItemConfigId: this.Mne,
      BottomText: i > 0 ? "" + i : ""
    };
    this.Apply(t);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
}
//# sourceMappingURL=MoonSignInRewardView.js.map