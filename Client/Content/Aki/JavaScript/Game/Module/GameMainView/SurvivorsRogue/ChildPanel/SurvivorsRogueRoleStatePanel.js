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
    this.WJd = t;
    this.QJd = e;
    this.VNd = undefined;
    this.aKu = undefined;
    this.nKu = undefined;
    this.vKd = undefined;
    this.yKd = undefined;
    this.SKd = undefined;
    this.MKd = undefined;
    this.EKd = undefined;
    this.Mhm = undefined;
    this.Cmt = 0;
    this.dmt = new UE.Margin();
    this.snt = -1;
    this.j1t = 0;
    this.W1t = 0;
    this.IKd = -1;
    this.TKd = 0;
    this.cam = -1;
    this.bKd = undefined;
    this.RKd = false;
    this.wKd = undefined;
    this.CAd = undefined;
    this.RoleGrid = undefined;
    this.O6u = () => {
      return new SurvivorsRogueWeaponStateGrid_1.SurvivorsRogueWeaponStateGrid();
    };
    this.jNd = () => {
      this.InitPlayerData();
    };
    this.vAd = () => {
      this.RoleGrid.Refresh(ModelManager_1.ModelManager.SurvivorsRogueModel.CurRoleId, ModelManager_1.ModelManager.SurvivorsRogueModel.CurRoleLevel);
    };
    this.yAd = () => {
      this.CAd.RefreshByData(ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGridDataList());
    };
    this.vmt = () => {
      this.Pnt();
    };
    this.IHd = () => {
      this.Pnt(true);
    };
  }
  get LKd() {
    var t;
    if (this.VNd && (t = this.VNd.Get(3)) && t > 0) {
      return t;
    } else {
      return 0;
    }
  }
  get tRd() {
    var t;
    if (this.VNd && (t = this.VNd.Get(2)) && t > 0) {
      return this.cam = t;
    } else {
      return this.cam;
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
    this.vKd = this.GetSprite(9);
    this.yKd = this.GetSprite(6);
    this.SKd = this.GetText(5);
    this.MKd = this.GetText(8);
    this.EKd = this.GetItem(7).GetOwner().GetComponentByClass(UE.LGUICanvas.StaticClass());
    this.Mhm = this.GetItem(10);
    this.Cmt = this.SKd.GetWidth();
    this.CAd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.O6u, undefined);
    this.TKd = CommonParamById_1.configCommonParamById.GetIntConfig("PlayerHPAttenuateBufferSpeed");
    this.bKd = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetSprite(4));
    this.wKd = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeShow() {
    this.vAd();
    this.yAd();
    this.OnAddEventListener();
    this.InitPlayerData();
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.vmt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.IHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated, this.jNd);
    if (this.WJd) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, this.vAd);
    }
    if (this.QJd) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, this.yAd);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.vmt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.IHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated, this.jNd);
    if (this.WJd) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, this.vAd);
    }
    if (this.QJd) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, this.yAd);
    }
  }
  InitPlayerData() {
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.KscPlayerEntity;
    if (t = t && t.GetSkillComp()?.AttrSet_?.Attrs_) {
      this.VNd = t;
      this.Pnt();
      this.Mhm.SetUIActive(true);
    } else {
      this.Mhm.SetUIActive(false);
    }
  }
  OnTick(t) {
    this.nmt(t);
  }
  Pnt(t = false) {
    var e;
    var i;
    var s;
    if (this.VNd && (i = this.VNd.Get(4) ?? 0, e = this.LKd / this.tRd, i = Math.min(i / this.tRd, 1), this.dmt.Right = -(1 - e) * this.Cmt, this.EKd.SetRectClipOffset(this.dmt), s = Math.ceil(this.LKd) + "/" + Math.ceil(this.tRd), this.SKd.SetText(s), this.MKd.SetText(s), this.Cst(e), this.gst(i), this.dmt.Right = -(1 - e) * this.Cmt, this.EKd.SetRectClipOffset(this.dmt), t ? this.fst() : this.ist(), (this.snt = e) <= 0)) {
      this.wKd.PlayOrReplaySequenceByName(DEAD_SEQUENCE_NAME);
    }
  }
  gst(t) {
    var e = t > 0;
    this.aKu.SetUIActive(e);
    if (e) {
      this.aKu.SetFillAmount(t);
    }
    if (this.RKd !== e && (this.RKd = e)) {
      this.bKd.PlayLevelSequenceByName("Start");
    }
  }
  Cst(t) {
    (t <= LOW_HP_PERCENT ? (this.vKd.SetUIActive(true), this.nKu.SetUIActive(false), this.vKd) : (this.vKd.SetUIActive(false), this.nKu.SetUIActive(true), this.nKu)).SetFillAmount(t);
  }
  fst() {
    var t;
    var e;
    if (this.VNd) {
      t = this.LKd / this.tRd;
      if (!((e = this.snt) <= t)) {
        this.j1t = t;
        this.W1t = e;
        this.IKd = 0;
      }
    }
  }
  ist() {
    this.j1t = 0;
    this.W1t = 0;
    this.IKd = -1;
    this.yKd.SetUIActive(false);
  }
  ast(t) {
    this.yKd.SetFillAmount(t);
    this.yKd.SetUIActive(true);
  }
  nmt(t) {
    var e;
    if (this.IKd !== -1 && !(this.IKd >= this.TKd && this.ist(), this.j1t >= this.W1t)) {
      e = this.IKd / this.TKd;
      e = MathUtils_1.MathUtils.Lerp(this.W1t, this.j1t, e);
      this.ast(e);
      this.IKd = this.IKd + t;
    }
  }
  GetWeaponGrid(t) {
    return this.CAd.GetLayoutItemByKey(t);
  }
  GetWeaponGridByIndex(t) {
    return this.CAd.GetLayoutItemByIndex(t);
  }
  GetAllWeaponGrid() {
    return this.CAd.GetLayoutItemList();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (!(t.length <= 2)) {
      if ((e = t[2]) === "FirstWeapon") {
        return this.CAd?.GetLayoutItemByIndex(0)?.GetGuideUiItemAndUiItemForShowEx(t);
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