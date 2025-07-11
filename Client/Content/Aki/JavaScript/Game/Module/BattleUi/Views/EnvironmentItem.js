"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class EnvironmentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Oya = [];
    this.Hnt = undefined;
    this.zst = undefined;
    this.Bst = 0;
    this.Zst = -1;
    this.dce = false;
    this.eat = undefined;
    this.tat = undefined;
    this.iat = 0;
    this.oat = -1;
    this.rat = 0.8;
    this.qte = 0;
    this.BY = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite]];
  }
  InitPropertyId(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "初始化环境叙事球", ["propertyId", t]);
    }
    this.zst = ModelManager_1.ModelManager.BattleUiModel.FormationData.GetUiEnvironmentProperty(t);
    this.rat = this.zst.WarningPercent;
  }
  async OnCreateAsync() {
    var t;
    var s;
    var i;
    var e;
    if (this.zst) {
      t = this.zst.IconFrame.AssetPathName.toString();
      s = this.zst.Icon.AssetPathName.toString();
      i = this.zst.IconFull.AssetPathName.toString();
      (e = []).push(this.kya(t, 0));
      e.push(this.kya(s, 1));
      e.push(this.kya(i, 2));
      await Promise.all(e);
    }
  }
  async kya(t, s) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, t => {
      if (t.IsValid()) {
        this.Oya[s] = t;
      }
      i.SetResult(true);
    });
    await i.Promise;
  }
  OnStart() {
    this.Nya(1, 0);
    this.Nya(4, 1);
    this.Nya(5, 2);
    this.Oya.length = 0;
    var t;
    var s = this.zst?.SceneEffect.ToAssetPathName();
    if (this.tat !== s) {
      this.nat();
      this.tat = s;
      this.sat();
    }
    var s = this.GetSprite(2);
    var i = this.GetSprite(11);
    if (this.zst && (t = this.zst.Colors).Num() >= 2) {
      s.SetColor(t.Get(0));
      i.SetColor(t.Get(1));
    }
    s.SetUIActive(false);
    this.Est(6);
    this.Est(7);
    this.Est(8);
    this.Est(9);
    this.Est(10);
  }
  Nya(t, s) {
    t = this.GetSprite(t);
    s = this.Oya[s];
    if (s) {
      t?.SetSprite(s, false);
    }
  }
  OnBeforeShow() {
    this.Fya(this.qte, this.BY);
  }
  SetPercent(t, s) {
    this.qte = t;
    this.BY = s;
    if (this.IsShowOrShowing) {
      this.Fya(t, s);
    }
  }
  Fya(i, e) {
    if (i <= 0 || e <= 0) {
      this.Bst = 0;
      this.aat(false);
    } else if (this.zst) {
      i = Math.min(1, Math.max(0, i / e));
      if (this.Bst !== i) {
        this.Bst = i;
        this.aat(true);
        let t = 0;
        let s = -1;
        if (i < this.rat) {
          t = 0;
        } else {
          s = i < 1 ? (t = 1, 7) : (t = 2, 8);
        }
        var e = this.GetSprite(3);
        e.SetFillAmount(i);
        if (this.Zst !== t) {
          this.Zst = t;
          if ((i = this.zst.BgColors).Num() > t) {
            this.GetSprite(0).SetColor(i.Get(t));
          }
          if ((i = this.zst.BarColors).Num() > t) {
            e.SetColor(i.Get(t));
          }
          e = this.GetSprite(4);
          i = this.GetSprite(5);
          if (t === 2) {
            e.SetUIActive(false);
            i.SetUIActive(true);
          } else {
            e.SetUIActive(true);
            i.SetUIActive(false);
          }
        }
        if (this.oat !== s && (this.oat >= 0 && this.Gnt(this.oat), (this.oat = s) >= 0 ? (this.bnt(this.oat), this.GetSprite(2)?.SetAlpha(0), this.GetSprite(2)?.SetUIActive(true)) : this.GetSprite(2)?.SetUIActive(false), t === 2)) {
          this.bnt(9);
        }
        this.hat();
      }
    }
  }
  aat(t) {
    if (t !== this.dce && (this.dce = t, this.eat)) {
      if (this.dce) {
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(this.eat);
        this.Gnt(10);
        this.bnt(6);
      } else {
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(this.eat);
        this.Gnt(6);
        if (this.oat >= 0) {
          this.Gnt(this.oat);
          this.GetSprite(2)?.SetUIActive(false);
          this.oat = -1;
        }
        this.bnt(10);
      }
    }
  }
  sat() {
    if (this.tat && !(this.tat.length <= 0)) {
      let s = true;
      this.iat = ResourceSystem_1.ResourceSystem.LoadAsync(this.tat, UE.EffectScreenPlayData_C, t => {
        this.iat = 0;
        s = false;
        this.eat = t;
        if (this.dce) {
          ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(this.eat);
          this.hat();
        }
      }, 102);
      if (!s) {
        this.iat = 0;
      }
    }
  }
  hat() {
    if (this.eat) {
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().UpdateSEEnvironmentFactor(this.eat, this.Bst);
    }
  }
  nat() {
    if (this.iat > 0) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.iat);
      this.iat = 0;
    }
    if (this.eat) {
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(this.eat);
      this.eat = undefined;
    }
    this.tat = undefined;
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.nat();
  }
  Est(t) {
    var s = [];
    var i = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var e = i.Num();
    for (let t = 0; t < e; t++) {
      s.push(i.Get(t));
    }
    this.Hnt ||= new Map();
    this.Hnt.set(t, s);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const s of t) {
        s.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const s of t) {
        s.Stop();
      }
    }
  }
}
exports.EnvironmentItem = EnvironmentItem;
//# sourceMappingURL=EnvironmentItem.js.map