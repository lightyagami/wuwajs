"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonCurrencyItem_1 = require("../../../Common/CommonCurrencyItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseTalentLockItem_1 = require("./TrapDefenseTalentLockItem");
const TrapDefenseTalentTreeDetailPanel_1 = require("./TrapDefenseTalentTreeDetailPanel");
const TrapDefenseTalentTreeRowItem_1 = require("./TrapDefenseTalentTreeRowItem");
const TrapDefenseTalentUnlockItem_1 = require("./TrapDefenseTalentUnlockItem");
const GRID_START_POS = -162;
class TrapDefenseTalentTreeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.m8t = undefined;
    this.s$c = undefined;
    this.hld = undefined;
    this.a$c = undefined;
    this.BZa = undefined;
    this.n1d = undefined;
    this.Hea = undefined;
    this.b4d = false;
    this.h$c = () => {
      var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.SelectedNode;
      if (e) {
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseTechUnlock(e.Id);
      }
    };
    this.l$c = (e, t) => {
      this.Clo();
      this._$c();
      if (t) {
        this.b4d = true;
      }
    };
    this.AOe = () => {
      this.c$c();
      this.Clo();
      this._$c(false);
      this.ITt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.RefreshLineTypeMap();
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi.SetHelpCallBack(() => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdTalentTree();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
    this.m8t = new ButtonItem_1.ButtonItem();
    this.m8t.SetFunction(this.h$c);
    this.s$c = new TrapDefenseTalentTreeDetailPanel_1.TrapDefenseTalentTreeDetailPanel();
    this.BZa = new TrapDefenseTalentLockItem_1.TrapDefenseTalentLockItem();
    this.n1d = new TrapDefenseTalentUnlockItem_1.TrapDefenseTalentUnlockItem();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = [];
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    e.push(this.m8t.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    e.push(this.s$c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    e.push(this.BZa.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    e.push(this.n1d.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "TrapDefenseTalentNodeUnlock");
    this.a$c = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), () => new TrapDefenseTalentTreeRowItem_1.TrapDefenseTalentTreeRowItem());
    this.hld = new CommonCurrencyItem_1.CommonCurrencyItem();
    await this.hld.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.Qyi.GetCostContent());
    this.hld.RefreshAddButtonActive();
    this.ITt();
    await this.c$c();
  }
  Tick(e) {
    var t;
    if (this.b4d && (t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.SelectedNode) && this.R4d(t)) {
      this.b4d = false;
      this.u$c(t);
    }
  }
  OnStart() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.AddDelegateOnNodeSelect(this.l$c);
    var e = this.w4d();
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.SelectNode(e, true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseTalentTreeUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseTalentTreeUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.RemoveDelegateOnNodeSelect(this.l$c);
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.OnViewClose();
  }
  async c$c() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.RowDataList;
    await this.a$c.RefreshByDataAsync(e);
  }
  Clo() {
    var e;
    var t;
    var i;
    var r = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelTalentTree.SelectedNode;
    if (r) {
      e = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.CanNodeUnlock(r);
      t = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.CanNodeAfford(r);
      this.GetItem(4).SetUIActive(!e && !r.IsUnlock);
      this.GetItem(5).SetUIActive(r.IsUnlock);
      i = r.GetCostData();
      this.m8t.SetEnableClick(t);
      this.m8t.SetActive(!r.IsUnlock && e);
      if (i.length > 0) {
        this.GetText(2).SetText(i[0].Cost.toString());
      }
      (r = this.GetText(2)).SetChangeColor(!t, r.changeColor);
    } else {
      this.m8t.SetActive(false);
      this.GetItem(4).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
    }
  }
  _$c(e = true) {
    this.Hea.StopSequenceByKey("Switch");
    if (e) {
      this.Hea.PlayLevelSequenceByName("Switch");
    }
    this.s$c.Refresh();
  }
  ITt() {
    var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTalentTreeCurrencyItemId();
    var t = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.RemainPoints;
    this.hld.RefreshTemp(e, t.toString());
  }
  async u$c(e, t = false) {
    await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME);
    var i = (0, puerts_1.$ref)(new UE.Vector2D(this.a$c.ContentItem.RelativeLocation));
    var e = this.a$c.GetItemByKey(Math.max(e.Row - 1, 1));
    this.GetScrollViewWithScrollbar(8).ScrollToTop(i, e, t);
  }
  w4d() {
    var e = this.OpenParam;
    let t = undefined;
    if (e && e.TalentFuncType) {
      t = ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.GetDefaultSelectNodeByFuncType(e.TalentFuncType);
    }
    return t = e && t ? t : ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.GetDefaultSelectNode();
  }
  R4d(e) {
    var e = Math.max(e.Row - 1, 1);
    var t = this.a$c.GetItemByKey(e);
    return !!t && !!t.IsValid() && (e <= 1 || t.RelativeLocation.Y < GRID_START_POS);
  }
}
exports.TrapDefenseTalentTreeView = TrapDefenseTalentTreeView;
//# sourceMappingURL=TrapDefenseTalentTreeView.js.map