"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedTokenTabView = undefined;
const UE = require("ue");
const RogueResBuffPoolById_1 = require("../../../../Core/Define/ConfigQuery/RogueResBuffPoolById");
const RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const ActivityManager_1 = require("../../Activity/ActivityManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const ItemController_1 = require("../../Item/ItemController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RogueIllustratedTokenData_1 = require("../ItemData/RogueIllustratedTokenData");
const RogueIllustratedTokenItem_1 = require("./RogueIllustratedTokenItem");
const RogueIllustratedTokenMediumItemGrid_1 = require("./RogueIllustratedTokenMediumItemGrid");
class RogueIllustratedTokenTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.JPt = undefined;
    this.cdi = [];
    this.Kci = undefined;
    this.$21 = 0;
    this.xKt = undefined;
    this.N5c = undefined;
    this.cHe = () => {
      var e = new RogueIllustratedTokenMediumItemGrid_1.RogueIllustratedTokenMediumItemGrid();
      e.BindOnItemButtonClickedCallback(this.BTt);
      return e;
    };
    this.BTt = e => {
      var t;
      if (this.Kci === e) {
        t = this.cdi.indexOf(e);
        this.JPt.DeselectCurrentGridProxy(false);
        this.JPt.SelectGridProxy(t);
      } else {
        this.Xpt(e);
      }
    };
    this.V5c = () => {
      var e = this.Params.Config;
      var t = [];
      for (const i of ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenIndexSet(e)) {
        if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(i) === Protocol_1.Aki.Protocol.zps.CMs) {
          t.push(i);
        }
      }
      ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestIllustrationAward(t);
    };
    this.j5c = () => {
      if (this.Kci) {
        if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(this.Kci.GetCollectionIndex()) !== Protocol_1.Aki.Protocol.zps.CMs) {
          ItemController_1.ItemController.OpenItemTipsByItemId(this.$21);
        } else {
          ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestIllustrationAward([this.Kci.GetCollectionIndex()]);
        }
      }
    };
    this.H5c = () => {
      this.$5c();
      var e = this.Params.Config;
      var t = this.Kci?.GetConfigId();
      this.cdi = this.W5c(e);
      for (const i of this.cdi) {
        if (t === i.GetConfigId()) {
          this.Kci = i;
          break;
        }
      }
      this.JPt.UpdateData(this.cdi);
      this.PCi(this.Kci);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText], [9, UE.UITexture], [10, UE.UINiagara]];
    this.BtnBindInfo = [[2, this.V5c], [6, this.j5c]];
  }
  async OnBeforeStartAsync() {
    this.nCi();
    this.N5c = new SmallItemGrid_1.SmallItemGrid();
    await this.N5c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.N5c.BindOnCanExecuteChange(() => false);
    this.N5c.BindOnExtendToggleClicked(this.j5c);
    this.xKt = new RogueIllustratedTokenItem_1.RogueIllustratedTokenItem();
    await this.xKt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnBeforeShow() {
    this.Q5c();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.H5c);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.H5c);
  }
  OnStart() {
    this.$5c();
  }
  OnBeforeDestroy() {
    this.Kci = undefined;
    this.JPt = undefined;
    this.N5c = undefined;
  }
  nCi() {
    this.JPt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(7).GetOwner(), this.cHe);
  }
  Q5c() {
    var e = this.Params.Config;
    this.cdi = this.W5c(e);
    this.JPt.RefreshByData(this.cdi, undefined, () => {
      this.BTt(this.cdi[0]);
    }, true);
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenCount(e ? e.Id : 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "RogueRes_UnlockProgress", e[0] + "/" + e[1]);
  }
  W5c(e) {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenIndexSet(e);
    var t = [];
    var e = Array.from(e.values());
    const a = e => {
      switch (e) {
        case Protocol_1.Aki.Protocol.zps.Z6n:
          return 2;
        case Protocol_1.Aki.Protocol.zps.CMs:
          return 0;
        default:
          return 1;
      }
    };
    e.sort((e, t) => {
      var i;
      var o;
      var r = a(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(e));
      var s = a(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(t));
      if (r === s) {
        e = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
        t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(t);
        i = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(e.Id);
        o = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(t.Id);
        if (i?.Quality === o?.Quality) {
          if (e.SortId === t.SortId) {
            return e.Id - t.Id;
          } else {
            return e.SortId - t.SortId;
          }
        } else {
          return o.Quality - i.Quality;
        }
      } else {
        return r - s;
      }
    });
    for (const o of e) {
      var i = this.K5c(o);
      t.push(i);
    }
    return t;
  }
  Xpt(e) {
    if (e) {
      this.PCi(e);
    }
  }
  PCi(e) {
    if (this.Kci) {
      this.JPt.DeselectCurrentGridProxy();
    }
    var t = this.cdi.indexOf(e);
    if (!this.JPt.IsGridDisplaying(t)) {
      this.JPt.ScrollToGridIndex(t);
    }
    this.Kci = e;
    this.JPt.SelectGridProxy(t, true);
    this.JPt.RefreshGridProxy(t);
    this.RefreshItemTipsComp(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e.GetCollectionIndex());
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(t.IdKey);
    var i = this.GetItem(5);
    if (e === Protocol_1.Aki.Protocol.zps.ovs) {
      i.SetUIActive(false);
    } else {
      i.SetUIActive(this.X5c(t.Award, e === Protocol_1.Aki.Protocol.zps.Z6n));
    }
  }
  RefreshItemTipsComp(e) {
    e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenTipsData(e.GetConfigId());
    this.xKt?.Refresh(e, true, 0);
  }
  K5c(e) {
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel?.GetCollectItemState(e);
    var t = {
      ConfigId: t.Id,
      CollectionIndex: e,
      IsLock: i === Protocol_1.Aki.Protocol.zps.Z6n,
      HasRedDot: i === Protocol_1.Aki.Protocol.zps.CMs,
      IsSelectOn: false
    };
    return new RogueIllustratedTokenData_1.RogueTokenViewData(t);
  }
  X5c(e, t) {
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    if (!e) {
      return false;
    }
    for (const r of e.DropPreview) {
      var i = {
        Data: undefined,
        Type: 4,
        ItemConfigId: r[0],
        BottomText: r[1].toString()
      };
      this.$21 = r[0];
      this.N5c.Apply(i);
      this.N5c.SetLockBlackVisible(t);
      this.N5c.SetReceivableVisible(!t);
      break;
    }
    var e = t ? "RogueRes_Lock" : "RogueRes_Unlock";
    var o = this.GetTexture(9).changeColor;
    this.GetTexture(9).SetChangeColor(!t, o);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e);
    this.GetButton(6)?.RootUIComp.SetUIActive(!t);
    if (this.GetUiNiagara(10).GetIsActive() && !t) {
      this.GetUiNiagara(10).ActivateSystem(true);
    } else {
      this.GetUiNiagara(10).SetUIActive(!t);
    }
    return true;
  }
  $5c() {
    var e = this.Params.Config;
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveTokenAward(e ? e.Id : 0);
    this.GetButton(2)?.RootUIComp.SetUIActive(e);
  }
}
exports.RogueIllustratedTokenTabView = RogueIllustratedTokenTabView;
//# sourceMappingURL=RogueIllustratedTokenTabView.js.map