"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapSummaryFettersTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const MapRogueFetterStarLvItem_1 = require("../../MapRogue/View/Components/MapRogueFetterStarLvItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueBattleMapFetterItem_1 = require("../Component/RogueBattleMapFetterItem");
const RogueBattleMapFetterTabItem_1 = require("../Component/RogueBattleMapFetterTabItem");
const RogueBattleMapRoleListGrid_1 = require("../Component/RogueBattleMapRoleListGrid");
class RogueBattleMapSummaryFettersTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Ny1 = undefined;
    this.SE1 = undefined;
    this.l01 = undefined;
    this.yvu = undefined;
    this.ypt = [];
    this.C5e = () => {
      return new RogueBattleMapFetterTabItem_1.RogueBattleMapFetterTabItem();
    };
    this.ME1 = () => {
      return new RogueBattleMapRoleListGrid_1.RogueBattleMapRoleLayoutGrid();
    };
    this.EE1 = () => {
      return new RogueBattleMapFetterItem_1.RogueBattleMapFetterInfoItem();
    };
    this.wvu = () => {
      return new MapRogueFetterStarLvItem_1.MapRogueFetterStarLvItem();
    };
    this.IE1 = e => {
      if (!this.UiViewSequence.HasSequenceNameInPlaying("Start")) {
        if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
          this.UiViewSequence.ReplaySequence("Switch");
        } else {
          this.UiViewSequence.PlaySequence("Switch");
        }
      }
      this.TE1(e);
      this.Ake(e);
      this.Wjt(e);
    };
    this.wx1 = () => {
      if (ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping) {
        ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping = false;
        let t = 0;
        let i = 0;
        for (const r of this.ypt) {
          i++;
          for (let e = 0; e < r.Config.length; e++) {
            if (r.Config[e] === ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond) {
              t = e / (r.Config.length + i);
              break;
            }
          }
          if (t !== 0) {
            break;
          }
        }
        const e = this.GetScrollViewWithScrollbar(0);
        this.Ny1?.BindLateUpdate(() => {
          e?.SetScrollProgress(t);
          this.Ny1?.UnBindLateUpdate();
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [14, UE.UIText], [7, UE.UIText], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIVerticalLayout], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [15, UE.UIHorizontalLayout], [16, UE.UIItem]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryBondUpdate, this.IE1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryFettersSubTabUpdate, this.wx1);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryBondUpdate, this.IE1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryFettersSubTabUpdate, this.wx1);
  }
  OnStart() {
    this.Ny1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.C5e);
    this.SE1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.ME1);
    this.l01 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(10), this.EE1);
    this.yvu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(15), this.wvu);
    this.GetItem(13)?.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
  }
  OnBeforeShow() {
    this.bE1();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  OnBeforeDestroy() {
    this.Ny1 = undefined;
    this.SE1 = undefined;
    this.l01 = undefined;
  }
  bE1() {
    var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBond();
    var t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondType();
    var i = new Map();
    for (const s of t) {
      i.set(s.Id, []);
    }
    for (const h of e) {
      var r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(h.Id);
      var a = r.Rarity;
      i.get(a)?.push(r.Id);
      if (!i.get(a)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RogueBattle", 77, "常驻肉鸽缺少羁绊类型", ["bondId", r.Id], ["type", a]);
        }
      }
    }
    var o = new Array();
    for (const g of t) {
      var n = i.get(g.Id);
      if (n && n.length !== 0) {
        (n = [...i.get(g.Id)]).sort((e, t) => {
          e = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
          t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t);
          if (e.F6n === t.F6n) {
            if (e.Whc === t.Whc) {
              return e.v9n - t.v9n;
            } else {
              return t.Whc - e.Whc;
            }
          } else {
            return t.F6n - e.F6n;
          }
        });
        if (ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond === 0 && n.length > 0) {
          ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond = n[0];
        }
        n = {
          IsSelected: i.get(g.Id).includes(ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond),
          Config: n
        };
        o.push(n);
      }
    }
    this.ypt = o;
    this.Ny1.RefreshByData(o, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryBondUpdate, ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond);
    });
  }
  TE1(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
    var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
    var t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(t.F6n);
    if (i) {
      t = UE.Color.FromHex(t.LvColor);
      this.GetText(6).SetColor(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "RogueResSynergyLV", i.F6n);
      this.GetText(14).SetText("" + i.Whc);
      i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e);
      this.GetText(5).SetColor(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.Name);
      this.SetTextureByPath(i.Icon, this.GetTexture(4));
      this.SetTextureByPath(i.Icon, this.GetTexture(3));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 77, "未找到羁绊", ["bondId", e]);
    }
  }
  Ake(e) {
    e = ModelManager_1.ModelManager.RogueBattleModel.GetRoleListByBond(e);
    this.SE1?.RefreshByData(e);
  }
  Wjt(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
    var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e);
    var r = new Array();
    var a = [];
    var i = Array.from(i.StarMap.entries()).sort((e, t) => e[0] - t[0]);
    if (i.length > 0) {
      var o;
      var n;
      var s = i.at(-1)[0];
      for ([o, n] of i) {
        var h = {
          StageLv: o,
          StageStarLv: n,
          CurrentLv: t.F6n,
          MaxLv: s
        };
        a.push(h);
        var h = {
          ConfigId: e,
          Level: o,
          IsReached: o <= t.F6n
        };
        r.push(h);
      }
      this.yvu.SetActive(true);
      this.l01.SetActive(true);
      this.yvu.RefreshByData(a, undefined, true);
      this.l01.RefreshByData(r);
    } else {
      this.yvu.SetActive(false);
      this.l01.SetActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (e && !(e.length < 3)) {
      t = Number(e[1]);
      return this.l01?.GetLayoutItemByIndex(t - 1)?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.RogueBattleMapSummaryFettersTabView = RogueBattleMapSummaryFettersTabView;
//# sourceMappingURL=RogueBattleMapSummaryFetterTabView.js.map