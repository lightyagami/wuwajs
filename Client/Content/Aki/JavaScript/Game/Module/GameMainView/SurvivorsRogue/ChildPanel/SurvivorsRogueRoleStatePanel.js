"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueRoleStatePanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SurvivorsRogueRoleInfoGrid_1 = require("../../../SurvivorsRogue/RogueFlow/View/Components/SurvivorsRogueRoleInfoGrid");
const SurvivorsRogueWeaponStateGrid_1 = require("../../../SurvivorsRogue/RogueFlow/View/Components/SurvivorsRogueWeaponStateGrid");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LOW_HP_PERCENT = 0.2;
const DEAD_SEQUENCE_NAME = "Dead";
class SurvivorsRogueRoleStatePanel extends UiPanelBase_1.UiPanelBase {
  constructor(t = true, e = true) {
    super();
    this.k7d = t;
    this.O7d = e;
    this.fqd = undefined;
    this.aKu = undefined;
    this.nKu = undefined;
    this.u6d = undefined;
    this.c6d = undefined;
    this.d6d = undefined;
    this.m6d = undefined;
    this.f6d = undefined;
    this.dWd = undefined;
    this.Cmt = 0;
    this.dmt = new UE.Margin();
    this.snt = -1;
    this.j1t = 0;
    this.W1t = 0;
    this.g6d = -1;
    this.C6d = 0;
    this.R$d = -1;
    this.p6d = undefined;
    this.v6d = false;
    this.y6d = undefined;
    this.jwd = undefined;
    this.RoleGrid = undefined;
    this.O6u = () => {
      return new SurvivorsRogueWeaponStateGrid_1.SurvivorsRogueWeaponStateGrid();
    };
    this.gqd = () => {
      this.InitPlayerData();
    };
    this.$wd = () => {
      this.RoleGrid.Refresh(ModelManager_1.ModelManager.SurvivorsRogueModel.CurRoleId, ModelManager_1.ModelManager.SurvivorsRogueModel.CurRoleLevel);
    };
    this.Wwd = () => {
      this.jwd.RefreshByData(ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGridDataList());
    };
    this.vmt = () => {
      this.Pnt();
    };
    this.Z4d = () => {
      this.Pnt(true);
    };
  }
  get S6d() {
    var t;
    if (this.fqd && (t = this.fqd.Get(3)) && t > 0) {
      return t;
    } else {
      return 0;
    }
  }
  get LId() {
    var t;
    if (this.fqd && (t = this.fqd.Get(2)) && t > 0) {
      return this.R$d = t;
    } else {
      return this.R$d;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIText], [9, UE.UISprite], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.RoleGrid = new SurvivorsRogueRoleInfoGrid_1.SurvivorsRogueRoleInfoGrid();
    t.push(this.RoleGrid.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.aKu = this.GetSprite(4);
    this.nKu = this.GetSprite(3);
    this.u6d = this.GetSprite(9);
    this.c6d = this.GetSprite(6);
    this.d6d = this.GetText(5);
    this.m6d = this.GetText(8);
    this.f6d = this.GetItem(7).GetOwner().GetComponentByClass(UE.LGUICanvas.StaticClass());
    this.dWd = this.GetItem(10);
    this.Cmt = this.d6d.GetWidth();
    this.jwd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.O6u, undefined);
    this.C6d = CommonParamById_1.configCommonParamById.GetIntConfig("PlayerHPAttenuateBufferSpeed");
    this.p6d = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetSprite(4));
    this.y6d = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeShow() {
    this.$wd();
    this.Wwd();
    this.OnAddEventListener();
    this.InitPlayerData();
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.vmt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.Z4d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated, this.gqd);
    if (this.k7d) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, this.$wd);
    }
    if (this.O7d) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, this.Wwd);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.vmt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.Z4d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated, this.gqd);
    if (this.k7d) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, this.$wd);
    }
    if (this.O7d) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, this.Wwd);
    }
  }
  InitPlayerData() {
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.KscPlayerEntity;
    if (t = t && t.GetSkillComp()?.AttrSet_?.Attrs_) {
      this.fqd = t;
      this.Pnt();
      this.dWd.SetUIActive(true);
    } else {
      this.dWd.SetUIActive(false);
    }
  }
  OnTick(t) {
    this.nmt(t);
  }
  Pnt(t = false) {
    var e;
    var i;
    var s;
    if (this.fqd && (i = this.fqd.Get(4) ?? 0, e = this.S6d / this.LId, i = Math.min(i / this.LId, 1), this.dmt.Right = -(1 - e) * this.Cmt, this.f6d.SetRectClipOffset(this.dmt), s = Math.ceil(this.S6d) + "/" + Math.ceil(this.LId), this.d6d.SetText(s), this.m6d.SetText(s), this.Cst(e), this.gst(i), this.dmt.Right = -(1 - e) * this.Cmt, this.f6d.SetRectClipOffset(this.dmt), t ? this.fst() : this.ist(), (this.snt = e) <= 0)) {
      this.y6d.PlayOrReplaySequenceByName(DEAD_SEQUENCE_NAME);
    }
  }
  gst(t) {
    var e = t > 0;
    this.aKu.SetUIActive(e);
    if (e) {
      this.aKu.SetFillAmount(t);
    }
    if (this.v6d !== e && (this.v6d = e)) {
      this.p6d.PlayLevelSequenceByName("Start");
    }
  }
  Cst(t) {
    (t <= LOW_HP_PERCENT ? (this.u6d.SetUIActive(true), this.nKu.SetUIActive(false), this.u6d) : (this.u6d.SetUIActive(false), this.nKu.SetUIActive(true), this.nKu)).SetFillAmount(t);
  }
  fst() {
    var t;
    var e;
    if (this.fqd) {
      t = this.S6d / this.LId;
      if (!((e = this.snt) <= t)) {
        this.j1t = t;
        this.W1t = e;
        this.g6d = 0;
      }
    }
  }
  ist() {
    this.j1t = 0;
    this.W1t = 0;
    this.g6d = -1;
    this.c6d.SetUIActive(false);
  }
  ast(t) {
    this.c6d.SetFillAmount(t);
    this.c6d.SetUIActive(true);
  }
  nmt(t) {
    var e;
    if (this.g6d !== -1 && !(this.g6d >= this.C6d && this.ist(), this.j1t >= this.W1t)) {
      e = this.g6d / this.C6d;
      e = MathUtils_1.MathUtils.Lerp(this.W1t, this.j1t, e);
      this.ast(e);
      this.g6d = this.g6d + t;
    }
  }
  GetWeaponGrid(t) {
    return this.jwd.GetLayoutItemByKey(t);
  }
  GetWeaponGridByIndex(t) {
    return this.jwd.GetLayoutItemByIndex(t);
  }
  GetAllWeaponGrid() {
    return this.jwd.GetLayoutItemList();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (!(t.length <= 2)) {
      if ((e = t[2]) === "FirstWeapon") {
        return this.jwd?.GetLayoutItemByIndex(0)?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (e === "FirstTwoWeapon" && (t = this.GetGuideUiItem("1"))) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.SurvivorsRogueRoleStatePanel = SurvivorsRogueRoleStatePanel;
//# sourceMappingURL=SurvivorsRogueRoleStatePanel.js.map