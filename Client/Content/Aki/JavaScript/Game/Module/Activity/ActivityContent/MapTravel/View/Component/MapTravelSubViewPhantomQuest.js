"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTravelSubViewQuest = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
class MapTravelSubViewQuest extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ActivityBaseData = e;
    this.LevelSequencePlayer = undefined;
    this.AreaLayoutList = undefined;
    this.NeedDestroySelf = true;
    this.sGe = () => {
      return new AreaLayout(this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.AreaLayoutList = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.sGe);
  }
  async Refresh() {
    var t = this.ActivityBaseData.GetAllAreaData().filter(e => e.PhantomTaskIdSet.size > 0);
    let [i, r] = [-1, -1];
    for (let e = 0; e < t.length; e++) {
      for (const s of Array.from(t[e].PhantomTaskIdSet)) {
        if (this.ActivityBaseData.GetPhantomQuestDoneCheckState(s)) {
          i = e;
          break;
        }
        if (r === -1 && this.ActivityBaseData.GetPhantomQuestNewUnlockState(s)) {
          r = e;
        }
      }
    }
    await this.AreaLayoutList.RefreshByDataAsync(t);
    var e = Math.max(i >= 0 ? i : r, 0);
    var e = this.AreaLayoutList.GetItemByIndex(e);
    if (e) {
      this.AreaLayoutList.LateScrollTo(e);
    }
  }
  async PlayStartSequence() {
    await this.Refresh();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise(), true);
  }
  async PlayCloseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise(), true);
  }
}
exports.MapTravelSubViewQuest = MapTravelSubViewQuest;
class AreaLayout extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super();
    this.ActivityBaseData = e;
    this.QuestLayout = undefined;
    this.sGe = () => {
      return new QuestCardItem(this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIMultiTemplateLayout], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnStart() {
    this.QuestLayout = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(1), this.sGe);
  }
  GetTitleItem() {
    return this.GetText(0);
  }
  Refresh(e) {
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
    let [i, r] = [0, 0];
    t = Array.from(e.PhantomTaskIdSet).sort(this.ActivityBaseData.SortPhantomQuestItem);
    for (const o of t) {
      var s = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(o);
      var a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s.QuestId);
      var s = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(s.QuestReward)[0][1];
      if (a === 3) {
        i += s;
      }
      r += s;
    }
    this.QuestLayout.RefreshByData(t, undefined, true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "TravelPhantomQuest_Progress", i, r);
  }
}
class QuestCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super();
    this.ActivityBaseData = e;
    this.PhantomTaskId = 0;
    this.LevelSequencePlayer = undefined;
    this.UFe = () => {
      var e = this.mVl() > 0;
      var t = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(this.PhantomTaskId);
      if (e) {
        this.ActivityBaseData.SaveFirstCheckRedDotState(2, this.PhantomTaskId);
        this.CVl();
        ModelManager_1.ModelManager.MapModel.CreateTempMapMark(t.MapMarkId);
        e = {
          MarkId: t.MapMarkId,
          MarkType: 30
        };
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(1, false, e);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t.UnlockTips);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture]];
    this.BtnBindInfo = [[0, this.UFe]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e) {
    this.PhantomTaskId = e;
    var e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(e);
    var t = this.mVl();
    var i = t > 0;
    var t = t === 3;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i ? e.Name : e.LockName);
    this.GetTexture(1).SetUIActive(i);
    if (i) {
      this.SetTextureShowUntilLoaded(e.Texture, this.GetTexture(1));
    }
    this.GetItem(2).SetUIActive(t);
    this.CVl();
    this.vjl();
  }
  CVl() {
    this.GetItem(3).SetUIActive(this.ActivityBaseData.GetPhantomQuestNewState(this.PhantomTaskId));
  }
  vjl() {
    let e = false;
    if (this.ActivityBaseData.GetPhantomQuestNewUnlockState(this.PhantomTaskId)) {
      this.ActivityBaseData.SaveFirstCheckRedDotState(6, this.PhantomTaskId);
      this.LevelSequencePlayer.PlayLevelSequenceByName("Unlock");
      e = true;
    }
    if (this.ActivityBaseData.GetPhantomQuestDoneCheckState(this.PhantomTaskId)) {
      this.ActivityBaseData.SaveFirstCheckRedDotState(3, this.PhantomTaskId);
      if (!e) {
        this.LevelSequencePlayer.PlayLevelSequenceByName("Complete");
      }
    }
  }
  mVl() {
    var e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(this.PhantomTaskId);
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.QuestId);
  }
}
//# sourceMappingURL=MapTravelSubViewPhantomQuest.js.map