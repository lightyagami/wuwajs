"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSceneItemBase = exports.FurnitureLevelContext = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../../GlobalData");
class FurnitureLevelContext {
  constructor(t, s) {
    this.Transform = t;
    this.PrefabPath = s;
    this.LevelStreamingDynamic = undefined;
  }
}
exports.FurnitureLevelContext = FurnitureLevelContext;
class FurnitureSceneItemBase {
  constructor(t) {
    this.FurnitureConfigId = 0;
    this.SceneItemType = 0;
    this.Sjl = undefined;
    this.ac = 0;
    this.RootTransform = undefined;
    this.Nwg = false;
    this.FurnitureConfigId = t;
  }
  async LoadAndShowAsync(t) {
    return !!(await this.LoadAsync(t)) && this.Show();
  }
  async LoadAsync(t) {
    return this.ac === 0 && (this.RootTransform = t, this.ac = 1, this.Sjl = new CustomPromise_1.CustomPromise(), this.LoadAsyncImplement(t).then(t => {
      this.Sjl?.SetResult(t);
      this.ac = 2;
    }), await this.Sjl.Promise);
  }
  Show() {
    return (this.ac === 2 || this.ac === 4) && (this.ShowImplement(), this.ac = 3, true);
  }
  Hide() {
    return this.ac === 3 && (this.HideImplement(), this.ac = 4, true);
  }
  async LoadLevelInstanceAsync(t) {
    var s = t.Transform;
    var e = t.PrefabPath;
    if (StringUtils_1.StringUtils.IsBlank(e)) {
      return false;
    }
    var i = (0, puerts_1.$ref)(false);
    MathUtils_1.MathUtils.CommonTempVector.Reset();
    MathUtils_1.MathUtils.CommonTempRotator.Reset();
    const r = UE.LevelStreamingDynamic.LoadLevelInstance(GlobalData_1.GlobalData.World, e, s.GetLocation().ToUeVectorOld(), s.GetRotation().Rotator().ToUeRotator(), i);
    if (!(t.LevelStreamingDynamic = r)) {
      this.ac = 0;
      return false;
    }
    r.bInitiallyLoaded = true;
    r.bInitiallyVisible = false;
    r.SetShouldBeLoaded(true);
    r.SetShouldBeVisible(false);
    if (!(0, puerts_1.$unref)(i)) {
      this.ac = 0;
      return false;
    }
    const n = new CustomPromise_1.CustomPromise();
    const h = () => {
      r.OnLevelLoaded.Remove(h);
      n.SetResult();
    };
    r.OnLevelLoaded.Add(h);
    await n.Promise;
    return true;
  }
  UnloadLevelInstance(t) {
    var s = t.LevelStreamingDynamic;
    if (s && s.IsValid()) {
      s.OnLevelLoaded.Clear();
      s.SetShouldBeLoaded(false);
      s.SetShouldBeVisible(false);
      s.SetIsRequestingUnloadAndRemoval(true);
      t.LevelStreamingDynamic = undefined;
    }
  }
  ShowLevelInstance(t) {
    t.LevelStreamingDynamic?.SetShouldBeVisible(true);
  }
  HideLevelInstance(t) {
    t.LevelStreamingDynamic?.SetShouldBeVisible(false);
  }
  Unload() {
    if (this.ac !== 0 && this.ac !== 5) {
      this.UnloadImplement();
      if (this.ac === 1) {
        this.Sjl?.SetResult(false);
      }
      this.ac = 5;
    }
  }
  MarkAsNeedUnload() {
    this.Nwg = true;
  }
  IsNeedUnload() {
    return this.Nwg;
  }
  IsLoaded() {
    return this.ac === 2;
  }
  IsUnloaded() {
    return this.ac === 5;
  }
  IsLoading() {
    return this.ac === 1;
  }
  GetSceneItemType() {
    return this.SceneItemType;
  }
  IsEntityType() {
    return this.SceneItemType === 1 || this.SceneItemType === 2;
  }
}
exports.FurnitureSceneItemBase = FurnitureSceneItemBase;
//# sourceMappingURL=FurnitureSceneItemBase.js.map