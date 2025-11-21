"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerDeTermSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const BabelTowerController_1 = require("./BabelTowerController");
const BabelTowerDeTermSelectDesItem_1 = require("./BabelTowerDeTermSelectDesItem");
const BabelTowerDeTermSelectItem_1 = require("./BabelTowerDeTermSelectItem");
class BabelTowerDeTermSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.yq = 0;
    this.Uoc = undefined;
    this.tvc = [];
    this.Boc = undefined;
    this.t2u = 0;
    this.SPe = undefined;
    this.L3e = () => {
      const e = [];
      var r;
      var t;
      var i;
      var o = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo;
      let n = 0;
      for ([r, t] of o) {
        if (t.State === 2) {
          e.push(r);
        }
        if (t.State === 2 || t.State === 3) {
          i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(r);
          n += i.Star;
        }
      }
      if (n < ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq).PassStar) {
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(277)).FunctionMap.set(2, () => {
          this.ivc(e, n);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      } else {
        this.ivc(e, n);
      }
    };
    this.ivc = (e, o) => {
      BabelTowerController_1.BabelTowerController.SelectBabelActivityDeTermRequest(this.yq, e).then(e => {
        if (e) {
          var e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq);
          var r = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
          var r = (e.IsDifficult ? r.HardLevelDataMap : r.NormalLevelDataMap).get(this.yq);
          var t = [];
          var i = r?.VX_ ?? [];
          for (let e = 0; e < 3; e++) {
            if (i.length > e) {
              t.push(i[e]);
            } else {
              t.push(0);
            }
          }
          r = {
            BabelTowerLevelId: this.yq,
            InstanceId: e.InstId,
            RoleList: t,
            BuffList: r?.Dt1 ?? [-1, -1],
            BuffCount: e.OptionalBabelBuffNum,
            StarNumber: o
          };
          if (e.IsDifficult) {
            UiManager_1.UiManager.OpenView("BabelTowerHardLevelInfoView", r);
          } else {
            UiManager_1.UiManager.OpenView("BabelTowerLevelInfoView", r);
          }
        }
      });
    };
    this.Ud_ = () => {
      if (BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()) {
        UiManager_1.UiManager.OpenView("BabelTowerQuestView");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BabelTowerIsNotOpen");
      }
    };
    this.koc = () => {
      var e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq);
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", e.InstId);
    };
    this.KAt = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(271);
      e.FunctionMap.set(2, () => {
        BabelTowerController_1.BabelTowerController.SelectBabelActivityDeTermRequest(this.yq, []);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.qoc = () => {
      return new BabelTowerDeTermSelectItem_1.BabelTowerDeTermSelectItem();
    };
    this.Ooc = () => {
      var e = new BabelTowerDeTermSelectDesItem_1.BabelTowerDeTermSelectDesItem();
      e.OnClickCallBack = this.rvc;
      return e;
    };
    this.Goc = e => {
      this.Foc(e);
    };
    this.rvc = r => {
      for (let e = 0; e < this.tvc.length; e++) {
        var t;
        if (this.tvc[e].AllDeTerm.includes(r)) {
          t = this.Uoc.GetItemByIndex(e);
          this.Uoc.ScrollTo(t);
          this.Uoc.GetScrollItemByIndex(e)?.PlayPositionSequence(r);
        }
      }
    };
    this.ovc = () => {
      for (const e of this.Uoc.GetScrollItemList()) {
        e.ClearSelect();
      }
      this.Noc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [10, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIArtText], [16, UE.UIButtonComponent], [17, UE.UIButtonComponent], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIItem]];
    this.BtnBindInfo = [[17, this.L3e], [4, this.KAt], [16, this.Ud_], [1, this.koc]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Uoc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.qoc);
    this.Boc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.Ooc);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    RedDotController_1.RedDotController.BindRedDot("BabelTowerQuestRedDot", this.GetItem(20));
    this.yq = this.OpenParam;
    this.GetText(9).SetUIActive(false);
    ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.clear();
    ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex = 0;
    this.Noc();
    this.GetScrollViewWithScrollbar(2).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
    this.GetScrollViewWithScrollbar(5).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
    ModelManager_1.ModelManager.BabelTowerModel.CurrentSelectLevel = this.yq;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BabelTowerRefreshLevelInfo, this.ovc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BabelTowerRefreshLevelInfo, this.ovc);
  }
  OnBeforeShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerQuestRedDot", this.GetItem(20));
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  Og() {
    var e;
    var r = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), r.NameText);
    this.GetItem(19).SetUIActive(r.IsDifficult);
    if (r.IsDifficult) {
      e = BabelTowerController_1.BabelTowerController.GetBabelTowerData().HardLevelDataMap.get(this.yq)?.jX_ ?? 0;
      this.GetText(10).SetText(e + "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), "BabelTowerHardStar");
    } else {
      this.GetText(10).SetText(r.PassStar + "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), "BabelTowerNormalStar");
    }
  }
  Noc() {
    var r = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq);
    this.tvc = [];
    var t = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    var i = t.GetDailyLevel().includes(this.yq) ? t.GetDailyDeTerm() : [];
    if (r.FixBabelDeTermds?.length > 0) {
      const s = [];
      let e = 1;
      for (const a of r.FixBabelDeTermds) {
        var o = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(a);
        for (e = 1; o.Star > e;) {
          s.push(0);
          e++;
        }
        s.push(a);
        e++;
        while (e <= 3) {
          s.push(0);
          e++;
        }
        var n = {
          State: 3,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(a, n);
      }
      t = {
        IsNecessary: true,
        AllDeTerm: s,
        DailyDeTerm: i,
        OnChangeSelectDeTerm: this.Goc
      };
      this.tvc.push(t);
    }
    let s = [];
    for (const l of r.BabelTowerDeTermMutexArray) {
      s = [];
      for (const h of ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTermMutual(l).MutexDeTermGroup) {
        s.push(...this.gcc(h));
      }
      var e = {
        IsNecessary: false,
        AllDeTerm: s,
        DailyDeTerm: i,
        OnChangeSelectDeTerm: this.Goc
      };
      this.tvc.push(e);
    }
    this.Uoc?.RefreshByData(this.tvc);
    this.Foc();
  }
  gcc(e) {
    var r;
    var t;
    var i = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    var o = [];
    var n = [];
    for (const l of ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTermByGroupId(e)) {
      n.push(l);
    }
    n.sort((e, r) => e.Line !== r.Line ? e.Line - r.Line : e.Star - r.Star);
    let s = 1;
    let a = 1;
    for (const h of n) {
      for (a !== h.Line && (a = h.Line, s = 1); h.Star > s;) {
        o.push(0);
        s++;
      }
      o.push(h.Id);
      if (i.GetDeTermIsLock(h.Id)) {
        r = {
          State: 1,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(h.Id, r);
      } else if (i.GetDeTermIsUse(this.yq, h.Id)) {
        r = {
          State: 2,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(h.Id, r);
      } else {
        t = {
          State: 0,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(h.Id, t);
      }
      s++;
    }
    while (s <= 3) {
      o.push(0);
      s++;
    }
    return o;
  }
  Foc(r) {
    var e = [];
    const t = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo;
    let i = 0;
    for (const [r, a] of t) {
      if (r !== 0 && (a.State === 2 || a.State === 3)) {
        e.push(r);
        const n = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(r);
        i += n.Star;
      }
    }
    e.sort((e, r) => t.get(r).SelectIndex - t.get(e).SelectIndex);
    this.Boc?.RefreshByData(e, () => {
      if (r) {
        for (const e of this.Boc.GetScrollItemList()) {
          if (e.DeTermId === r) {
            this.Boc?.LateScrollTo(e.GetRootItem());
            e.PlayChoseSequence();
          }
        }
      }
    });
    this.GetArtText(13).SetText((i < 10 ? "0" : "") + i);
    var o = i < ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq).PassStar;
    this.GetItem(11).SetUIActive(o);
    this.GetItem(7).SetUIActive(e.length <= 0);
    const n = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.yq);
    var s;
    var o = ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(n.ActivityId, i);
    if (o) {
      if (this.t2u < 2 && o.DifficultyId >= 2) {
        this.SPe?.PlaySequencePurely("Highest");
      } else if (this.t2u >= 2 && o.DifficultyId < 2) {
        this.SPe?.PlaySequencePurely("HighestClose");
      }
      this.t2u = o.DifficultyId;
      s = UE.Color.FromHex(o.TextBgColor);
      this.GetItem(14).SetColor(s);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), o.DifficultyTextKey);
    }
  }
}
exports.BabelTowerDeTermSelectView = BabelTowerDeTermSelectView;
//# sourceMappingURL=BabelTowerDeTermSelectView.js.map