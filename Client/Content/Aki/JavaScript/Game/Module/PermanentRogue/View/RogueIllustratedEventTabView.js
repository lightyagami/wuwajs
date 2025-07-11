"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedEventTabView = undefined;
const UE = require("ue");
const RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const RogueResGridEventById_1 = require("../../../../Core/Define/ConfigQuery/RogueResGridEventById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
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
const RogueIllustratedEventGrid_1 = require("./RogueIllustratedEventGrid");
class RogueIllustratedEventTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.cdi = [];
    this.$21 = 0;
    this.Kci = undefined;
    this.N5c = undefined;
    this.cHe = () => {
      var e = new RogueIllustratedEventGrid_1.RogueIllustratedEventItem();
      e.BindOnItemButtonClickedCallback(this.BTt);
      return e;
    };
    this.BTt = (e, t) => {
      var i;
      if (this.Kci === e) {
        i = this.cdi.indexOf(e);
        this.xqe.DeselectCurrentGridProxy(false);
        this.xqe.SelectGridProxy(i);
      } else {
        this.Xpt(e);
      }
    };
    this.V5c = () => {
      var e = this.Params;
      var t = e.Config;
      var i = [];
      for (const r of e.TabType === 1 ? ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNormalIndexSet(t) : ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetMapIndexSet(t)) {
        if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(r) === Protocol_1.Aki.Protocol.zps.CMs) {
          i.push(r);
        }
      }
      ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestIllustrationAward(i);
    };
    this.j5c = () => {
      if (this.Kci) {
        if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(this.Kci) !== Protocol_1.Aki.Protocol.zps.CMs) {
          ItemController_1.ItemController.OpenItemTipsByItemId(this.$21);
        } else {
          ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestIllustrationAward([this.Kci]);
        }
      }
    };
    this.H5c = () => {
      this.$5c();
      var e = this.Params.Config;
      this.cdi = this.W5c(e);
      this.xqe.UpdateData(this.cdi);
      this.xqe.DeselectCurrentGridProxy();
      this.xqe.SelectGridProxy(this.cdi.indexOf(this.Kci));
      this.RefreshItemTipsComp(this.Kci);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UITexture], [11, UE.UINiagara], [12, UE.UIItem], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[13, this.V5c], [6, this.j5c]];
  }
  async OnBeforeStartAsync() {
    this.N5c = new SmallItemGrid_1.SmallItemGrid();
    await this.N5c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.N5c.BindOnCanExecuteChange(() => false);
    this.N5c.BindOnExtendToggleClicked(this.j5c);
  }
  OnStart() {
    this.Vs1();
  }
  OnBeforeShow() {
    this.Q5c();
    this.$5c();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.H5c);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.H5c);
  }
  OnBeforeDestroy() {
    this.Kci = undefined;
    this.xqe = undefined;
    this.N5c = undefined;
  }
  Vs1() {
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.cHe);
  }
  Q5c() {
    var e = this.Params;
    var t = e.Config;
    this.cdi = this.W5c(t);
    this.xqe.RefreshByData(this.cdi, undefined, () => {
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(this.cdi[0]);
      this.BTt(this.cdi[0], e);
    }, true);
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEventCount(e.Config?.Id ?? 0, e.TabType === 1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RogueRes_UnlockProgress", t[0] + "/" + t[1]);
  }
  W5c(e) {
    let t = new Set();
    var i = this.Params.TabType === 1;
    t = i ? ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNormalIndexSet(e) : ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetMapIndexSet(e);
    var i = Array.from(t.values());
    const s = e => {
      switch (e) {
        case Protocol_1.Aki.Protocol.zps.Z6n:
          return 2;
        case Protocol_1.Aki.Protocol.zps.CMs:
          return 0;
        default:
          return 1;
      }
    };
    i.sort((e, t) => {
      var i = s(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(e));
      var r = s(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(t));
      if (i === r) {
        e = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
        t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(t);
        if (e.SortId === t.SortId) {
          return e.Id - t.Id;
        } else {
          return e.SortId - t.SortId;
        }
      } else {
        return i - r;
      }
    });
    return i;
  }
  Xpt(e) {
    if (e) {
      this.PCi(e);
    }
  }
  PCi(e) {
    if (this.Kci) {
      this.xqe.DeselectCurrentGridProxy();
    }
    var t = this.cdi.indexOf(e);
    if (!this.xqe.IsGridDisplaying(t)) {
      this.xqe.ScrollToGridIndex(t);
    }
    this.Kci = e;
    this.xqe.SelectGridProxy(t, true);
    this.xqe.RefreshGridProxy(t);
    this.RefreshItemTipsComp(e);
  }
  RefreshItemTipsComp(e) {
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
    var i = t.Id;
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(e);
    var i = RogueResGridEventById_1.configRogueResGridEventById.GetConfig(i);
    var r = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventPlotById(i.Plot);
    var r = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgById(r.BgResource);
    var r = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? r.HandBookBgFemalePath : r.HandBookBgPath;
    this.SetTextureByPath(r, this.GetTexture(3), undefined, () => {
      this.GetTexture(3).SetSizeFromTexture();
    });
    if (e !== Protocol_1.Aki.Protocol.zps.Z6n) {
      r = (StringUtils_1.StringUtils.IsBlank(t.Desc) ? i : t).Desc;
      this.GetItem(7)?.SetUIActive(false);
      this.GetItem(12)?.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r ?? "");
    } else {
      this.GetItem(7)?.SetUIActive(true);
      this.GetItem(12)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueRes_CollectionEventLock");
    }
    if (e === Protocol_1.Aki.Protocol.zps.ovs) {
      this.GetItem(8)?.SetUIActive(false);
    } else {
      this.GetItem(8)?.SetUIActive(true);
      this.X5c(t.Award, e === Protocol_1.Aki.Protocol.zps.Z6n);
    }
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
    e = t ? "RogueRes_Lock" : "RogueRes_Unlock";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
    this.GetButton(6)?.RootUIComp.SetUIActive(!t);
    e = this.GetTexture(10).changeColor;
    this.GetTexture(10).SetChangeColor(!t, e);
    if (this.GetUiNiagara(11).GetIsActive() && !t) {
      this.GetUiNiagara(11).ActivateSystem(true);
    } else {
      this.GetUiNiagara(11).SetUIActive(!t);
    }
    return true;
  }
  $5c() {
    var e = this.Params;
    var t = e.Config;
    var e = e.TabType === 1 ? ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveNormalAward(t ? t.Id : 0) : ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveMapAward(t ? t.Id : 0);
    this.GetButton(13)?.RootUIComp.SetUIActive(e);
  }
}
exports.RogueIllustratedEventTabView = RogueIllustratedEventTabView;
//# sourceMappingURL=RogueIllustratedEventTabView.js.map