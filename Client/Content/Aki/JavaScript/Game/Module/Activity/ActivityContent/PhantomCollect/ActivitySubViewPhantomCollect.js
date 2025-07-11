"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewPhantomCollectTaskItem = exports.ActivitySubViewPhantomCollectMonsterItem = exports.ActivitySubViewPhantomCollect = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const CalabashController_1 = require("../../../Calabash/CalabashController");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ItemController_1 = require("../../../Item/ItemController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityPhantomCollectController_1 = require("./ActivityPhantomCollectController");
class ActivitySubViewPhantomCollect extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.TaskGenericLayout = undefined;
    this.ActivityDataBase = undefined;
    this.TitleComponent = undefined;
    this.MonsterItemList = [];
    this.F2e = t => {
      this.RefreshTaskLayout();
    };
    this.V2e = () => new ActivitySubViewPhantomCollectTaskItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomCollectUpdate, this.F2e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomCollectUpdate, this.F2e);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    this.TaskGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.V2e);
    var t = this.GetItem(0);
    this.TitleComponent = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.TitleComponent.CreateThenShowByActorAsync(t.GetOwner());
    var e = [];
    for (let t = 0; t < 5; t++) {
      var i = this.GetItem(1 + t);
      var o = new ActivitySubViewPhantomCollectMonsterItem();
      e.push(o.CreateThenShowByActorAsync(i.GetOwner()));
      this.MonsterItemList.push(o);
    }
    await Promise.all(e);
  }
  OnStart() {
    this.ActivityDataBase = ActivityPhantomCollectController_1.ActivityPhantomCollectController.GetCurrentActivityDataById();
    this.TitleComponent.SetTitleByText(this.ActivityBaseData.GetTitle());
  }
  OnRefreshView() {
    this.RefreshTimerText();
    this.RefreshTaskLayout();
    this.RefreshMonster();
  }
  RefreshTimerText() {
    var [t, e] = this.GetTimeVisibleAndRemainTime();
    this.TitleComponent.SetTimeTextVisible(t);
    if (t) {
      this.TitleComponent.SetTimeTextByText(e);
    }
  }
  RefreshTaskLayout() {
    var t = ActivityPhantomCollectController_1.ActivityPhantomCollectController.GetCurrentActivityDataById();
    this.TaskGenericLayout.RefreshByDataAsync(t.PhantomCollectRewardList ?? []);
  }
  RefreshMonster() {
    var e = this.ActivityDataBase.GetCollectPhantomList();
    for (let t = 0; t < 5; t++) {
      this.MonsterItemList[t].Refresh(e[t]);
    }
  }
}
exports.ActivitySubViewPhantomCollect = ActivitySubViewPhantomCollect;
class ActivitySubViewPhantomCollectMonsterItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MonsterId = 0;
    this.H2e = () => {
      if (this.MonsterId !== 0) {
        CalabashController_1.CalabashController.JumpToCalabashCollectTabView(this.MonsterId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.H2e]];
  }
  Refresh(t) {
    this.MonsterId = t;
    var e = (ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(ActivityPhantomCollectController_1.ActivityPhantomCollectController.ActivityId)).PhantomActivityImage.get(t);
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(t);
    if (e && i) {
      this.SetTextureByPath(e, this.GetTexture(1));
    }
    this.GetItem(2).SetUIActive(i && !ModelManager_1.ModelManager.CalabashModel.CheckMonsterIdInRecord(t));
  }
}
exports.ActivitySubViewPhantomCollectMonsterItem = ActivitySubViewPhantomCollectMonsterItem;
class ActivitySubViewPhantomCollectTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RewardItem = undefined;
    this.Data = undefined;
    this.ItemId = undefined;
    this.OnBtnGo = () => {
      if (this.Data?.h5n === Protocol_1.Aki.Protocol.Cks.Proto_PhantomSideQuest) {
        var e = ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(ActivityPhantomCollectController_1.ActivityPhantomCollectController.ActivityId);
        for (let t = 0; t < e.phantomsidequestLength(); t++) {
          var i = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(e.PhantomSideQuest[t]);
          if (i === 2 || i === 1) {
            UiManager_1.UiManager.OpenView("QuestView", e.PhantomSideQuest[t]);
            return;
          }
          if (i === 0) {
            if (t === 0) {
              UiManager_1.UiManager.OpenView("QuestView", e.PhantomSideQuest[t]);
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ConditionGroup_12980013_HintText");
            }
            return;
          }
        }
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomSideQuestNoTask");
      } else if (this.Data?.h5n === Protocol_1.Aki.Protocol.Cks.Proto_DataDock) {
        UiManager_1.UiManager.OpenView("CalabashRootView");
      }
    };
    this.OnClickReward = () => {
      if (this.Data.Y4n === Protocol_1.Aki.Protocol.zps.CMs) {
        ActivityPhantomCollectController_1.ActivityPhantomCollectController.PhantomCollectRewardReceiveRequest(this.Data.h5n).then(t => {
          if (t) {
            this.Data = t;
            this.Refresh(this.Data, false, this.GridIndex);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Activity", 34, "声骸收集活动领取奖励失败", ["Type", this.Data.h5n]);
          }
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UISprite], [6, UE.UIItem]];
    this.BtnBindInfo = [[4, this.OnBtnGo], [0, this.OnClickReward]];
  }
  OnStart() {
    this.RewardItem = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.RewardItem.Initialize(this.GetItem(1).GetOwner());
    this.RewardItem.BindOnExtendTogglePress(t => {
      switch (this.Data.Y4n) {
        case Protocol_1.Aki.Protocol.zps.ovs:
        case Protocol_1.Aki.Protocol.zps.Z6n:
          if (this.ItemId) {
            ItemController_1.ItemController.OpenItemTipsByItemId(this.ItemId);
          }
          break;
        case Protocol_1.Aki.Protocol.zps.CMs:
          this.OnClickReward();
      }
    });
  }
  Refresh(e, t, i) {
    this.Data = e;
    var o = ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(ActivityPhantomCollectController_1.ActivityPhantomCollectController.ActivityId);
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 34, "声骸收集活动数据未查询到", ["ActivityId", ActivityPhantomCollectController_1.ActivityPhantomCollectController.ActivityId]);
      }
    } else {
      let t = 0;
      if (e.h5n === Protocol_1.Aki.Protocol.Cks.Proto_PhantomsCollect) {
        t = o.PhantomReward;
      } else if (e.h5n === Protocol_1.Aki.Protocol.Cks.Proto_DataDock) {
        t = o.DataDockReward;
      } else if (e.h5n === Protocol_1.Aki.Protocol.Cks.Proto_PhantomSideQuest) {
        t = o.PhantomSideQuestReward;
      }
      if (t !== 0) {
        l = ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreview(t);
        r = [{
          IncId: 0,
          ItemId: (l = Array.from(l))[0][0]
        }, l[0][1]];
        this.ItemId = l[0][0];
        this.RewardItem.Refresh(r);
        this.RewardItem.SetReceivedVisible(e.Y4n === Protocol_1.Aki.Protocol.zps.ovs);
        this.RewardItem.SetLockVisible(e.Y4n === Protocol_1.Aki.Protocol.zps.Z6n);
        this.RewardItem.SetReceivableVisible(e.Y4n === Protocol_1.Aki.Protocol.zps.CMs);
      }
      if (e.Y4n === Protocol_1.Aki.Protocol.zps.ovs) {
        l = UE.Color.FromHex("394449FF");
        this.GetSprite(5).SetColor(l);
        this.GetText(2)?.SetColor(l);
        this.GetButton(0)?.SetSelfInteractive(false);
        this.GetItem(6).SetUIActive(true);
      } else if (e.Y4n === Protocol_1.Aki.Protocol.zps.Z6n) {
        r = UE.Color.FromHex("394449FF");
        this.GetSprite(5).SetColor(r);
        this.GetText(2)?.SetColor(r);
        this.GetButton(0)?.SetSelfInteractive(true);
        this.GetItem(6).SetUIActive(false);
      } else if (e.Y4n === Protocol_1.Aki.Protocol.zps.CMs) {
        l = UE.Color.FromHex("A28129FF");
        this.GetSprite(5).SetColor(l);
        this.GetText(2)?.SetColor(l);
        this.GetButton(0)?.SetSelfInteractive(true);
        this.GetItem(6).SetUIActive(false);
      }
      var r = ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig.GetPhantomCollectTaskDesc(e.h5n);
      var l = ActivityPhantomCollectController_1.ActivityPhantomCollectController.GetCurrentActivityDataById();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r.Title, l.GetCollectPhantomCount(), l.GetCollectPhantomList().length);
      if (e.h5n === Protocol_1.Aki.Protocol.Cks.Proto_PhantomsCollect) {
        const n = [];
        const a = [];
        let s = MathUtils_1.MathUtils.LargeNumber;
        o.Phantoms.forEach(e => {
          if (ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(e)) {
            var i = [];
            let t = 0;
            for (const r of ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(e)) {
              var o = r.IsUnlock;
              i.push(o);
              if (o) {
                t++;
              }
            }
            if (s > t) {
              a.length = 0;
              a.push(e);
              s = t;
            } else if (s === t) {
              a.push(e);
            }
          } else {
            n.push(e);
          }
        });
        l = n.length > 0 ? Math.floor(Math.random() * n.length) : Math.floor(Math.random() * a.length);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), n.length > 0 ? o.PhantomDesc.get(n[l]) : o.PhantomDesc.get(a[l]));
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.Desc);
      }
      this.GetButton(4).GetRootComponent().SetUIActive(e.h5n !== Protocol_1.Aki.Protocol.Cks.Proto_PhantomsCollect && e.Y4n === Protocol_1.Aki.Protocol.zps.Z6n);
    }
  }
}
exports.ActivitySubViewPhantomCollectTaskItem = ActivitySubViewPhantomCollectTaskItem;
//# sourceMappingURL=ActivitySubViewPhantomCollect.js.map