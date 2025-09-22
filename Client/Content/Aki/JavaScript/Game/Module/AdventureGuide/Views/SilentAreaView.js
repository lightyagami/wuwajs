"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const AdventureGuideController_1 = require("../AdventureGuideController");
const SilentAreaItem_1 = require("./SilentAreaItem");
const SILENT_HELP = 18;
class SilentAreaView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.X8e = undefined;
    this.$8e = 0;
    this.Y8e = undefined;
    this.J8e = undefined;
    this.O6e = undefined;
    this.k6e = undefined;
    this.YVe = (e, i, r) => {
      var o = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      o.Initialize(i.GetOwner());
      o.RefreshByConfigId(e.Id, e.Num, e);
      o.SetReceivedVisible(e.Received);
      return {
        Key: r,
        Value: o
      };
    };
    this.z8e = (e, i) => {
      if (this.J8e && this.J8e !== i) {
        this.J8e.SetToggleState(0);
      }
      this.J8e = i;
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId = e;
      var i = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(e);
      this.$8e = e;
      var e = this.GetText(2);
      var r = this.GetText(1);
      var o = i.Conf.Name;
      var t = this.GetText(17);
      t.SetUIActive(i.IsLock);
      this.GetButton(0).RootUIComp.SetUIActive(!i.IsLock);
      if (i.IsLock) {
        LguiUtil_1.LguiUtil.SetLocalText(r, AdventureGuideController_1.UNKNOWNTEXT);
        var n = i.Conf.LockCon;
        if (n) {
          n = ConditionGroupById_1.configConditionGroupById.GetConfig(n);
          LguiUtil_1.LguiUtil.SetLocalTextNew(t, n.HintText);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, o);
        let e = 0;
        for (const _ of i.Conf.LevelPlayList) {
          var l = ModelManager_1.ModelManager.AdventureGuideModel.GetLevelOfLevelPlay(_);
          if (l > e) {
            e = l;
          }
        }
      }
      var t = ControllerHolder_1.ControllerHolder.AdventureGuideController.GetMarkAreaText(i.Conf.MarkId);
      if (t === "") {
        e.SetUIActive(false);
      } else {
        e.SetUIActive(true);
        e.SetText(t);
      }
      var a = this.GetItem(7);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(AdventureGuideController_1.HIGHLEVELTEXTID));
      var s = this.GetItem(6);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(AdventureGuideController_1.MIDLEVELTEXTID));
      var d = this.GetItem(5);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(AdventureGuideController_1.LOWLEVELTEXTID));
      switch (i.Conf.DangerType) {
        case 1:
          a.SetUIActive(true);
          s.SetUIActive(false);
          d.SetUIActive(false);
          break;
        case 2:
          a.SetUIActive(false);
          s.SetUIActive(true);
          d.SetUIActive(false);
          break;
        case 3:
          a.SetUIActive(false);
          s.SetUIActive(false);
          d.SetUIActive(true);
      }
      n = this.GetTexture(4);
      r = this.GetItem(12);
      o = this.GetText(13);
      let h = "0";
      if (i.IsLock) {
        h = i.Conf.AttributesDescriptionLock;
        n.SetUIActive(false);
        r.SetUIActive(true);
        this.Y8e.SetInteractable(false);
        LguiUtil_1.LguiUtil.SetLocalText(o, AdventureGuideController_1.UNDISCOVERED);
      } else {
        h = i.Conf.AttributesDescriptionUnlock;
        r.SetUIActive(false);
        n.SetUIActive(true);
        this.Y8e.SetInteractable(true);
        LguiUtil_1.LguiUtil.SetLocalText(o, AdventureGuideController_1.DETECT);
        this.SetTextureByPath(i.Conf.TemporaryIconUnLock, n);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), h);
      e = this.GetText(8);
      e.SetUIActive(!i.IsLock);
      if (!i.IsLock) {
        e.SetText(ModelManager_1.ModelManager.AdventureGuideModel.GetCostOfLevelPlay(i.Conf.LevelPlayList[0]).toString());
      }
      t = this.GetText(9);
      t.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalText(t, AdventureGuideController_1.RECEIVED_COUNT, "");
      this.BuildRewardList(i.Conf.ShowReward);
    };
    this.Z8e = () => {
      UiManager_1.UiManager.ResetToBattleView(() => {
        var e = {
          MarkId: CommonParamById_1.configCommonParamById.GetIntConfig("BoPianExchangeMarkId"),
          MarkType: 8,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, e);
      });
    };
    this.t8e = () => {
      var e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AdventureGuide", 5, "点击无音区探测按钮 SilentAreaView");
      }
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
      } else {
        e = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(this.$8e);
        ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, e.Conf.LevelPlayList, this.$8e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UILoopScrollViewComponent], [11, UE.UIScrollViewWithScrollbarComponent], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIText], [15, UE.UIText], [16, UE.UIText], [17, UE.UIText], [18, UE.UIButtonComponent], [19, UE.UIItem], [20, UE.UIItem]];
    this.BtnBindInfo = [[0, this.t8e], [18, this.Z8e]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, SILENT_HELP);
  }
  async OnBeforeStartAsync() {
    this.X8e = new CommonCurrencyItem_1.CommonCurrencyItem();
    await this.X8e.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
  }
  OnStart() {
    this.O6e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(10), this.GetItem(20).GetOwner(), () => {
      var e = new SilentAreaItem_1.SilentAreaItem();
      e.BindCallback(this.z8e);
      return e;
    });
    this.H3e = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(11), this.YVe);
    if (this.Y8e === undefined) {
      this.Y8e = this.GetButton(0).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    }
    this.X8e.RefreshTemp(CommonParamById_1.configCommonParamById.GetIntConfig("BoPianId"));
    this.X8e.SetButtonActive(false);
    var e = this.ExtraParams;
    let i = e.OpenTabViewName === "DisposableChallengeView" ? Number(e.OpenParam) : undefined;
    if (!ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaConfVaild(i)) {
      i = undefined;
    }
    let r = undefined;
    (r = i ? (ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(i), ControllerHolder_1.ControllerHolder.AdventureGuideController.GetShowSilentAreasList(undefined, i)) : ControllerHolder_1.ControllerHolder.AdventureGuideController.GetShowSilentAreasList(0)).sort((e, i) => e.SilentAreaDetectionData.Conf.Id - i.SilentAreaDetectionData.Conf.Id);
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId = i ?? r[0].SilentAreaDetectionData.Conf.Id;
    this.k6e = r;
    this.O6e.ReloadData(r);
    this.JumpToTarget(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId);
  }
  OnBeforeDestroy() {
    if (this.H3e) {
      this.H3e.ClearChildren();
      this.H3e = undefined;
    }
    if (this.O6e) {
      this.O6e.ClearGridProxies();
      this.O6e = undefined;
    }
    if (this.X8e) {
      this.X8e.Destroy();
      this.X8e = undefined;
    }
  }
  BuildRewardList(e) {
    var i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e);
    var r = new Array();
    for (const t of i.keys()) {
      var o = {
        Id: t,
        Num: i.get(t),
        Received: false
      };
      r.push(o);
    }
    this.H3e.RefreshByData(r);
  }
  JumpToTarget(e) {
    let i = 0;
    for (const r of this.k6e) {
      if (e === r.SilentAreaDetectionData.Conf.Id) {
        this.O6e.DeselectCurrentGridProxy();
        this.O6e.ScrollToGridIndex(i, true);
        this.O6e.SelectGridProxy(i);
        return;
      }
      i++;
    }
  }
}
exports.SilentAreaView = SilentAreaView;
//# sourceMappingURL=SilentAreaView.js.map