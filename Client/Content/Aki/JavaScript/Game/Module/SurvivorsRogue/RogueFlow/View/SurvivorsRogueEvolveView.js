"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueEvolveView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const SurvivorsRogueRoleStatePanel_1 = require("../../../GameMainView/SurvivorsRogue/ChildPanel/SurvivorsRogueRoleStatePanel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueCardBase_1 = require("../../Card/SurvivorsRogueCardBase");
class SurvivorsRogueEvolveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CommandIncId = 0;
    this.Command = undefined;
    this.eVi = undefined;
    this.H7d = undefined;
    this.RIr = [];
    this.$7d = 0;
    this.tqd = false;
    this.W7d = true;
    this.xli = () => {
      this.Q7d().then(() => {
        this.$7d++;
        if (this.$7d >= this.RIr.length) {
          this.UiViewSequence.CloseSequenceName = this.W7d ? "Close" : "Close01";
          this.Command.Execute();
        } else {
          this.ubd(true, true);
        }
      });
    };
    this.Wpu = (i, e) => {
      if (i === "LevelUp" && e === "LevelUp" && (i = this.RIr.at(this.$7d)) && i.PlayTween && (e = i.SourceId, i = this.K7d(i.WeaponEvolveIds), e = this.H7d.GetWeaponGrid(e))) {
        e.SetQualityById(i);
        e.SetLevelUp();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIText], [6, UE.UITexture], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.xli]];
  }
  CloseView() {
    this.CloseMe();
  }
  async Q7d() {
    var i = this.RIr.at(this.$7d);
    if (i && i.PlayTween) {
      i = i.SourceId;
      this.W7d = false;
      this.G1a(i);
      await this.UiViewSequence.PlaySequenceAsync("LevelUp", new CustomPromise_1.CustomPromise(), true);
    } else {
      this.W7d = true;
    }
  }
  async OnBeforeStartAsync() {
    var i;
    this.CommandIncId = this.OpenParam.CommandIncId;
    if (this.CommandIncId) {
      if (!(i = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue.GetCommandByIncId(this.CommandIncId)) || (this.Command = i, this.X7d(), i = [], this.eVi = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase(), i.push(this.eVi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())), this.H7d = new SurvivorsRogueRoleStatePanel_1.SurvivorsRogueRoleStatePanel(true, false), i.push(this.H7d.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())), await Promise.all(i), await this.Z$1(), this.Y7d(), this.ubd(false, false), this.Command.AfterDelete)) {
        this.CloseMe();
      } else {
        this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
        this.Command.BindView(this);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 界面打开时缺少CommandIncId");
    }
  }
  X7d() {
    var i = this.Command.GetViewInfoList();
    this.RIr = i;
    this.$7d = 0;
  }
  OnBeforeShow() {}
  OnAfterShow() {}
  OnBeforeDestroy() {
    this.RootActor.OnSequencePlayEvent.Unbind();
    this.Command?.BindView(undefined);
  }
  Refresh() {
    this.X7d();
    this.Y7d();
    this.ubd(false, true);
  }
  ubd(e, t) {
    var i = new UiAsyncTask_1.UiAsyncTask("SurvivorsRogueEvolveView.Refresh", async () => {
      await this.ShowPromise?.Promise;
      var i = [];
      if (t) {
        i.push(this.Z$1());
      }
      if (e) {
        if (this.W7d) {
          i.push(this.UiViewSequence.PlaySequenceAsync("Switch", new CustomPromise_1.CustomPromise(), true));
        } else {
          i.push(this.UiViewSequence.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise(), true));
        }
        this.W7d = true;
      }
      await Promise.all(i);
      if (this.tqd) {
        await this.UiViewSequence.PlaySequenceAsync("Up", new CustomPromise_1.CustomPromise(), true);
      }
    });
    this.RunAsyncTask(i);
  }
  async Z$1() {
    var i = this.RIr.at(this.$7d);
    if (i) {
      this.tqd = false;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TitleId);
      switch (i.SourceType) {
        case 2:
          var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(i.SourceId);
          var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleEvolve(i.EvolveId);
          var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.TrialRoleId);
          var e = {
            Type: 2,
            Id: i.SourceId,
            LvUpCount: 0,
            Index: 0,
            QualityId: t.Quality,
            TitleText: e.GetName(),
            DescId: t.Describe
          };
          await this.eVi.Apply(e);
          this.GetItem(3).SetUIActive(false);
          break;
        case 1:
          t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(i.SourceId);
          e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponEvolve(i.EvolveId);
          t = {
            Type: 1,
            Id: i.SourceId,
            LvUpCount: 0,
            Index: 0,
            QualityId: e.Quality,
            TitleId: t.Name,
            DescId: e.Describe
          };
          await this.eVi.Apply(t);
          if (i.BondId) {
            this.tqd = true;
            e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(i.BondId);
            this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(4));
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "SurvivorsWeaponEvolution_SuperTips", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name));
            this.GetItem(3).SetUIActive(true);
          } else {
            this.GetItem(3).SetUIActive(false);
          }
      }
    }
  }
  G1a(e) {
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    var t = this.GetTexture(6);
    this.SetTextureShowUntilLoaded(i.Icon, t);
    var s = t.GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var r = s.Num();
    for (let i = 0; i < r; i++) {
      var o = s.Get(i);
      var a = o.GetPlayTween();
      var h = this.eVi.GetTextureIconItem();
      var n = this.H7d.GetWeaponGrid(e).GetRootItem();
      a.from = Vector_1.Vector.Create(h.GetLGUISpaceAbsolutePosition()).ToUeVectorOld();
      a.to = Vector_1.Vector.Create(n.GetLGUISpaceAbsolutePosition()).ToUeVectorOld();
      o.Stop();
      o.Play();
    }
  }
  Y7d() {
    for (const t of this.RIr) {
      var i;
      var e;
      if (t.WeaponEvolveIds && (i = t.SourceId, e = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponDataByWeaponId(i))) {
        e = e.Data.dEd.filter(i => !t.WeaponEvolveIds.includes(i));
        e = this.K7d(e);
        this.H7d.GetWeaponGrid(i)?.SetQualityById(e);
      }
    }
  }
  K7d(i) {
    let e = 0;
    for (const s of i) {
      var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponEvolve(s);
      e = Math.max(e, t.Quality);
    }
    return e;
  }
}
exports.SurvivorsRogueEvolveView = SurvivorsRogueEvolveView;
//# sourceMappingURL=SurvivorsRogueEvolveView.js.map