"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreLevelView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const ExploreProgressController_1 = require("../../ExploreProgress/ExploreProgressController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ExploreLevelController_1 = require("../ExploreLevelController");
const ExploreLevelItem_1 = require("./ExploreLevelItem");
const PLAY_PROGRESS_BAR_TIME = 300;
class ExploreLevelView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.fVt = undefined;
    this.RVt = undefined;
    this.bOe = undefined;
    this.UVt = undefined;
    this.PHs = 0;
    this.BHs = 0;
    this.wHs = 0;
    this.bHs = 0;
    this.qHs = 0;
    this.GHs = 0;
    this.OHs = 0;
    this.NHs = false;
    this.kHs = false;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("ExploreLevelView");
    };
    this.AVt = () => {};
    this.PVt = () => {
      this.wVt();
      var e = this.fVt.GetExploreScore();
      var t = this.RVt.GetMaxExploreScore();
      if (t < 0) {
        this.xVt();
      } else {
        this.FHs(this.PHs, this.BHs, e, t);
      }
    };
    this.BVt = () => {
      this.fVt = ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
      this.RVt = this.fVt.GetCurrentExploreLevelRewardData();
      var e = this.fVt.GetExploreScore();
      var t = this.RVt.GetMaxExploreScore();
      if (t < 0) {
        this.xVt();
      } else {
        this.FHs(this.PHs, this.BHs, e, t);
      }
    };
    this.FQe = (e, t) => {
      if (e === "ExploreLevelRewardView") {
        this.VHs(true);
      }
    };
    this.$Ge = (e, t) => {
      if (e === "ExploreLevelRewardView") {
        this.VHs(false);
      }
    };
    this.gVt = (e, t, i) => {
      var s = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      s.Initialize(t.GetOwner());
      s.RefreshByConfigId(e[0], e[1]);
      return {
        Key: i,
        Value: s
      };
    };
    this.qVt = () => {
      var e = new ExploreLevelItem_1.ExploreLevelItem();
      e.BindOnClickedReceiveButton(this.CVt);
      return e;
    };
    this.CVt = e => {
      var t = this.fVt.GetVisibleExploreScoreDataList();
      const i = {};
      t.forEach(e => {
        if (e.CanReceive()) {
          i[e.AreaId] = e.Progress;
        }
      });
      ExploreLevelController_1.ExploreLevelController.MultiExploreScoreRewardRequest(i);
      ExploreLevelController_1.ExploreLevelController.CountryExploreScoreInfoRequest(e.CountryId, () => {
        if (!e.GetIsReceived()) {
          this.PHs = this.fVt.GetExploreScore();
          this.BHs = this.RVt.GetMaxExploreScore();
          this.HHs();
        }
      });
    };
    this.GVt = () => {
      UiManager_1.UiManager.OpenView("ExploreLevelPreviewView", this.fVt, (e, t) => {
        if (e) {
          this.AddChildViewById(t);
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UILoopScrollViewComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UINiagara]];
    this.BtnBindInfo = [[6, this.GVt], [10, this.lyt]];
  }
  async OnBeforeStartAsync() {
    this.fVt = ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
    this.RVt = this.fVt.GetCurrentExploreLevelRewardData();
    await Promise.all([ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(), ExploreLevelController_1.ExploreLevelController.CountryExploreScoreInfoAsyncRequest(this.fVt.GetCountryId())]);
  }
  OnStart() {
    this.bOe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(5), this.gVt);
    this.UVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(8), this.GetItem(9).GetOwner(), this.qVt);
    this.bVt();
    this.xVt();
    this.wVt();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExploreScoreRewardResponse, this.AVt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse, this.PVt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExploreLevelNotify, this.BVt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExploreScoreRewardResponse, this.AVt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse, this.PVt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExploreLevelNotify, this.BVt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnBeforeDestroy() {
    this.bOe.ClearChildren();
    this.bOe = undefined;
    this.UVt.ClearGridProxies();
    this.UVt = undefined;
    this.fVt = undefined;
  }
  OnTick(e) {
    if (this.NHs && !this.kHs) {
      if (this.qHs < this.wHs) {
        const t = MathUtils_1.MathUtils.Lerp(this.wHs, this.bHs, this.OHs / PLAY_PROGRESS_BAR_TIME);
        this.jHs(t, this.bHs);
        if (t >= this.bHs) {
          this.FHs(0, this.GHs, this.qHs, this.GHs);
        }
        this.OHs += e;
      } else {
        const t = MathUtils_1.MathUtils.Lerp(this.wHs, this.qHs, this.OHs / PLAY_PROGRESS_BAR_TIME);
        this.jHs(t, this.GHs);
        if (this.OHs >= PLAY_PROGRESS_BAR_TIME) {
          this.bVt();
          this.xVt();
          this.WHs();
        } else {
          this.OHs += e;
        }
      }
    }
  }
  FHs(e, t, i, s) {
    this.wHs = e;
    this.bHs = t;
    this.qHs = i;
    this.GHs = s;
    this.OHs = 0;
    this.NHs = true;
  }
  VHs(e) {
    this.kHs = e;
  }
  WHs() {
    this.NHs = false;
    this.OHs = 0;
  }
  HHs() {
    var e = this.GetUiNiagara(14);
    if (e.IsUIActiveSelf()) {
      e.ActivateSystem(true);
    } else {
      e.SetUIActive(true);
    }
  }
  bVt() {
    this.Olt();
    this.kVt();
    this.FVt();
  }
  Olt() {
    var e = this.RVt.GetScoreNameId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
  }
  kVt() {
    var e = this.RVt.GetScoreTexturePath();
    var t = this.GetTexture(1);
    this.SetTextureByPath(e, t);
  }
  xVt() {
    var e;
    var t = this.RVt.GetMaxExploreScore();
    if (t <= 0) {
      this.GetItem(11)?.SetUIActive(false);
    } else {
      e = this.fVt.GetExploreScore();
      this.jHs(e, t);
      this.SetTextureByPath(ModelManager_1.ModelManager.ExploreLevelModel.ExploreScoreItemTexturePath, this.GetTexture(3));
      this.GetItem(11)?.SetUIActive(true);
    }
  }
  jHs(e, t) {
    e = Math.floor(Math.min(t, e));
    t = Math.floor(t);
    this.GetSprite(2).SetFillAmount(e / t);
    this.GetText(4).SetText(e + "/" + t);
  }
  FVt() {
    var e = this.fVt.GetExploreLevelRewardData(this.RVt.GetExploreLevel() + 1);
    if (e) {
      var e = e.GetDropItemNumMap();
      var t = [];
      if (e) {
        for (var [i, s] of e) {
          t.push([i, s]);
        }
      }
      this.bOe.RefreshByData(t);
      this.GetItem(13).SetUIActive(false);
    } else {
      this.bOe.ClearChildren();
      this.bOe.SetActive(false);
      this.GetItem(13).SetUIActive(true);
    }
  }
  wVt() {
    var e = this.fVt.GetVisibleExploreScoreDataList();
    e.sort((e, t) => {
      var i = e.GetIsReceived() ? 1 : 0;
      var s = t.GetIsReceived() ? 1 : 0;
      if (i != s || (i = e.CanReceive() ? -1 : 0) != (s = t.CanReceive() ? -1 : 0)) {
        return i - s;
      } else if ((i = e.AreaId) !== (s = t.AreaId)) {
        return i - s;
      } else if ((i = e.Progress) !== (s = t.Progress)) {
        return i - s;
      } else {
        return 0;
      }
    });
    this.UVt.ReloadData(e);
  }
}
exports.ExploreLevelView = ExploreLevelView;
//# sourceMappingURL=ExploreLevelView.js.map