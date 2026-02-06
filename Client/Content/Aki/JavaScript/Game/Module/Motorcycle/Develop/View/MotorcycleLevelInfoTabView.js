"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelInfoTabView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LongPressButtonItem_1 = require("../../../Common/Button/LongPressButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleLevelActiveTreeItem_1 = require("../Item/MotorcycleLevelActiveTreeItem");
const MotorcycleLevelAttachItem_1 = require("../Item/MotorcycleLevelAttachItem");
const MotorcycleLevelAttrItem_1 = require("../Item/MotorcycleLevelAttrItem");
const SHOW_GAP = 40;
class MotorcycleLevelInfoTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Wnu = undefined;
    this.R0m = undefined;
    this.s4e = undefined;
    this.vmf = undefined;
    this.scc = undefined;
    this.acc = undefined;
    this.PXf = undefined;
    this.Hea = undefined;
    this.ymf = [];
    this.Agg = undefined;
    this.qVl = -1;
    this.UQ = 1;
    this.AXf = false;
    this.Vhg = () => {
      var e;
      if (this.Wnu && (e = this.Wnu.FindNearestMiddleItem())) {
        e = e.GetCurrentPosition();
        this.GetSprite(1).SetAnchorOffsetX(-e);
      }
    };
    this.Smf = e => {
      this.Dgg();
      this.AXf = true;
      this.Wnu.AttachToIndex(e.GetCurrentShowItemIndex());
    };
    this.Emf = e => {
      this.qVl = e.GetCurrentShowItemIndex() + 1;
      this.mVf();
    };
    this.RHl = e => !this.Wnu.MovingState() && e?.Level !== this.qVl;
    this.Ugg = () => this.Agg === undefined;
    this.Imf = (e, t, i) => {
      var s = new MotorcycleLevelAttachItem_1.MotorcycleLevelAttachItem();
      s.CreateByActorAsync(e);
      s.OnClickAttachItem = this.Smf;
      s.OnSelectAttachItem = this.Emf;
      s.CheckToggleCanClick = this.RHl;
      s.GetSelectAnimEnable = this.Ugg;
      return s;
    };
    this.W2e = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = this.tmu;
      return e;
    };
    this.OWe = () => new MotorcycleLevelAttrItem_1.MotorcycleLevelAttrItem();
    this.Tmf = () => {
      var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
      this.qVl = e;
      this.rVg();
      this.Mmf();
    };
    this.kWm = () => {
      var e = [];
      for (const r of ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorLevelHintList()) {
        var t;
        var i;
        var s = {
          ConditionId: -1,
          ConditionTextId: r.Title,
          IsFinished: false,
          AccessId: r.AccessId,
          AccessType: r.Type,
          RecommendQuestId: 0
        };
        if (r.Type === 1) {
          t = this.rPf(r.JumpTaskList);
          i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t) === 3;
          s.RecommendQuestId = t;
          s.IsFinished = i;
        }
        e.push(s);
      }
      UiManager_1.UiManager.OpenView("MotorcycleConditionView", e);
    };
    this.qWm = () => {
      this.Dgg();
      this.AXf = true;
      this.Wnu.AttachToNextItem(-1);
    };
    this.OWm = () => {
      this.Dgg();
      this.AXf = true;
      this.Wnu.AttachToNextItem(1);
    };
    this.hcc = () => {
      this.Dgg();
      this.AXf = true;
      this.Wnu.AttachToNextItem(-1);
    };
    this._o = () => {
      this.Dgg();
      this.AXf = true;
      this.Wnu.AttachToNextItem(1);
    };
    this.bmf = () => {
      var e = this.Rmf(false);
      UiManager_1.UiManager.OpenView("MotorcycleLevelAttrDetailView", e);
    };
    this.FWm = () => {
      var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetAllPreviewReward();
      UiManager_1.UiManager.OpenView("MotorcycleRewardPreviewView", e);
    };
    this.wmf = () => {
      ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.RequestMotorLevelOneKeyReward();
    };
    this.tmu = e => {
      var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurRewardedMaxLv();
      return this.qVl <= t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIVerticalLayout], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIHorizontalLayout], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [21, UE.UIItem]];
    this.BtnBindInfo = [[5, this.kWm], [6, this.qWm], [7, this.OWm], [10, this.bmf], [11, this.FWm]];
  }
  async OnBeforeStartAsync() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.scc = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(7), 1, this._o);
    this.acc = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(6), 1, this.hcc);
    this.PXf = new ButtonItem_1.ButtonItem();
    this.scc.ShouldPlayLongPressSound = true;
    this.acc.ShouldPlayLongPressSound = true;
    this.Wnu = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(2).GetOwner(), true);
    this.Wnu.SetMoveItemsCallback(this.Vhg);
    this.GetItem(3).SetUIActive(false);
    this.Wnu.CreateItems(this.GetItem(3).GetOwner(), SHOW_GAP, this.Imf, 0);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(12), this.W2e);
    this.R0m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.OWe, this.GetItem(9).GetOwner());
    this.vmf = new MotorcycleLevelActiveTreeItem_1.MotorcycleLevelActiveTreeItem();
    await Promise.all([this.PXf.CreateThenShowByActorAsync(this.GetButton(14).GetOwner()), this.vmf.CreateThenShowByActorAsync(this.GetItem(17).GetOwner())]);
    this.Lmf();
    const t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
    var e = this.ymf.findIndex(e => e.Level === t);
    this.Wnu.ReloadView(this.ymf.length, this.ymf, e);
    this.PXf.SetFunction(this.wmf);
    this.qVl = t;
  }
  OnBeforeShow() {
    this.rVg();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDevelopInfoUpdate, this.Tmf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDevelopInfoUpdate, this.Tmf);
  }
  Lmf() {
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorLevelList();
    this.UQ = e.length;
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetNextLevelExp();
    for (const s of e) {
      var i = {
        Level: s.Level,
        Exp: t
      };
      this.ymf.push(i);
    }
  }
  xgg() {
    if (this.Agg) {
      TimerSystem_1.TimerSystem.Remove(this.Agg);
      this.Agg = undefined;
    }
  }
  Dgg() {
    if (this.Wnu?.GetItems()) {
      this.xgg();
      this.Agg = TimerSystem_1.TimerSystem.Delay(() => {
        var e = this.Wnu?.GetItemByShowIndex(this.qVl - 1);
        if (e && e instanceof MotorcycleLevelAttachItem_1.MotorcycleLevelAttachItem && e.GetSelectedState()) {
          e.PlaySelectTween();
        }
        this.xgg();
      }, 420);
    }
  }
  mVf() {
    new UiAsyncTask_1.UiAsyncTask("RefreshSkillInfo", async () => {
      await this.Mmf();
      if (this.AXf) {
        this.Hea.StopSequenceByKey("Change");
        this.Hea.PlayLevelSequenceByName("Change");
      }
    }).Run();
  }
  async Mmf() {
    this.Pmf();
    this.Dmf();
    await Promise.all([this.fVf(), this.gVf()]);
  }
  Rmf(e) {
    var t = [];
    for (const r of ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorAttrList()) {
      if (e && r.ShowMain === 1) {
        t.push(r);
      }
      if (e && r.SpecialLevelShow === this.qVl) {
        t.push(r);
      }
      if (!e && r.ShowProperty === 1) {
        t.push(r);
      }
    }
    t.sort(e ? (e, t) => e.SpecialLevelShow !== t.SpecialLevelShow ? e.SpecialLevelShow - t.SpecialLevelShow : e.ShowMainOrder - t.ShowMainOrder : (e, t) => e.ShowDetailOrder - t.ShowDetailOrder);
    var i = [];
    for (let e = 0; e < t.length; e++) {
      var s = t[e];
      var s = {
        AttrId: s.Id,
        Level: this.qVl,
        IsShowBg: (e + 1) % 2 != 0,
        IsSpecial: this.qVl === s.SpecialLevelShow
      };
      i.push(s);
    }
    return i;
  }
  rVg() {
    this.vmf.SetUiActive(ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() !== 0);
    this.vmf.Refresh();
  }
  Pmf() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurExp();
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetNextLevelExp();
    var t = StringUtils_1.StringUtils.Format("<color=#ece5d8>{0}/</color><color=#adadad>{1}</color>", t.toString(), i.toString());
    this.GetText(4).SetText(t);
    this.GetItem(21).SetUIActive(ModelManager_1.ModelManager.MotorcycleDevelopModel.IsDailyExpToLimit());
    this.GetButton(6).RootUIComp.SetUIActive(this.qVl > 1);
    this.GetButton(7).RootUIComp.SetUIActive(this.qVl < this.UQ);
    if (e === this.UQ) {
      this.GetText(4).SetText("--/--");
    }
  }
  async fVf() {
    var e = this.Rmf(true);
    await this.R0m.RefreshByDataAsync(e);
  }
  async gVf() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetPreviewRewardByLevel(this.qVl);
    await this.s4e.RefreshByDataAsync(e);
  }
  Dmf() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurRewardedMaxLv();
    var i = this.qVl > e;
    var t = this.qVl <= t;
    var e = this.qVl <= e && !t;
    this.GetItem(15).SetUIActive(i);
    this.GetItem(16).SetUIActive(t);
    this.PXf.SetActive(e);
    this.PXf.SetRedDotVisible(e);
  }
  rPf(t) {
    for (let e = t.length - 1; e >= 0; --e) {
      var i = t[e];
      var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i);
      var r = r === 2 || r === 1;
      if (s && s.CanShowInUiPanel() && r) {
        return i;
      }
    }
    return t[0];
  }
}
exports.MotorcycleLevelInfoTabView = MotorcycleLevelInfoTabView;
//# sourceMappingURL=MotorcycleLevelInfoTabView.js.map