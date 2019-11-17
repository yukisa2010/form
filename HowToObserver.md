>## AppModel
  - parameters
    - val
    - attrs => obj
    - listeners

  - function<br>
    > listenerを登録する機能
    - on
    - trigger
    > 値のセット
    - set
    >条件判定
    - required
    - minlength
    - maxlength
    >valid
    - validate
      - error.push
      - valid/invalid --- trigger


>## AppView
  
  > Modelの関連付けとobjの定義
  - initialize
    - obj(prop) + required
    - this.model = new AppModel(obj)
  > AppModelの設定
  - handleEvents
    - this.$el.on => onKeyup
    - this.model.on => onValid/onInvalid
  - prototype
    - onKeyup(e)
      -this.model.set(val)
    - onValid
    - onInvalid



```JavaScript
$("input").each(function(){
  new AppView()
})
```

>## イベントの流れ
> ## ■ AppView
- DOMから値の取得
- DOM操作

> ## ■ AppModel
- validate
- error push

> AppView
1. inputタグでAppViewのインスタンスが呼ばれる
2. AppViewのonKeyup(e)でイベント受け取り

> AppModel
3. model のvalに値がset()される
4. modelのvalidate()が呼ばれる
5. ```if(!this[key](val))```で各種function(required/min/max)が呼ばれ、errorがpushされる
6. error.lengthでvalid/invalidがtriggerされる

> AppView
7. AppView.prototype.onValid/onInvalidがよばれる
8. errorクラスのon/off => 表示/非表示の条件分岐が起こる
