function AppView() {
  this.initialize()
  this.handleEvents()
}

AppView.prototype = {
  initialize: function() {
    //DOM
    this.$weather = document.getElementsByName('weather')[0];
    this.$title = document.getElementsByName('title')[0];
    this.$textArea = document.getElementsByName('text-area')[0];
    this.$errorField = document.getElementById('error-msg')
    this.$submitBtn = document.getElementsByName('btn')[0]

    //errors
    this.errors = []

    //conditions
    const data ={
      weather: {
        required: "",
      },
      title: {
        minlength: 3,
        maxlength: 10
      },
      textArea: {
        minlength: 10,
        maxlength: 20
      }
    }

    this.$submitBtn.disabled = 'disabled'
    this.model = new AppModel(data)
  },

  handleEvents: function() {
    const self = this;
    this.$weather.addEventListener('change', function(e) {self.onKeyup(e)})
    this.$title.addEventListener('keyup', function(e) {self.onKeyup(e)})
    this.$textArea.addEventListener('keyup', function(e) {self.onKeyup(e)})

    this.model.on('weather_required', function() {self.weather_required()})
    this.model.on('title_minlength', function() {self.title_minlength()})
    this.model.on('title_maxlength', function() {self.title_maxlength()})
    this.model.on('textArea_minlength', function() {self.textArea_minlength()})
    this.model.on('textArea_maxlength', function() {self.textArea_maxlength()})
    this.model.on('clearErrors', function() {self.clearErrors()})
    this.model.on('displayErrors', function() {self.displayErrors()})
  },

  onKeyup: function(e) {
    const values = {
      weather: this.$weather.value,
      title: this.$title.value,
      textArea: this.$textArea.value
    }

    this.model.set(values)
  },
  weather_required: function() {
    this.errors.push('天気が入力されていません')
  },
  title_minlength: function() {
    this.errors.push('タイトルは3文字以上入力してください')
  },
  title_maxlength: function() {
    this.errors.push('タイトルは10文字以内にしてください')
  },
  textArea_minlength: function() {
    this.errors.push('テキストエリアは10文字以上入力してください')
  },
  textArea_maxlength: function() {
    this.errors.push('テキストエリアは20文字以内で入力してください')
  },
  displayErrors: function() {
    const existErrors = this.errors.length

    this.$submitBtn.disabled = existErrors ? 'disabled' : ''

    if(!existErrors) return

    const fragment = document.createDocumentFragment()
    this.errors.forEach(function(error) {
      const li = document.createElement('li')
      li.textContent = error
      fragment.appendChild(li)
    })
    this.$errorField.appendChild(fragment)
  },
  clearErrors: function() {
    this.$errorField.innerHTML = ''
    this.errors.length = 0;    
  }
}

function AppModel(data) {
  this.values = {
    weather: '',
    title: '',
    textArea: ''
  }

  this.data = data
  this.listeners = {
    weather_required: [],
    title_minlength: [],
    title_maxlength: [],
    textArea_minlength: [],
    textArea_maxlength: [],
    clearErrors: [],
    displayErrors: []
  }
}

AppModel.prototype = {
  set(values) {
    const self = this
    const targetKeys = Object.keys(this.values)

    const isAllValuesSameAsPrevious = targetKeys.every(function(targetKey) {
      return self.values[targetKey] === values[targetKey]
    })
    if(isAllValuesSameAsPrevious) {
      return
    } else {
      self.values = values
    }

    this.trigger('clearErrors')
    this.validate();
  },
  validate() {
    const targetKeys = Object.keys(this.values)
    const self = this
    targetKeys.forEach(function(targetKey) {
      for(let rule in self.data[targetKey]) {
        let triggerText = targetKey + '_' + rule
        if(self[rule](targetKey)) {
          self.trigger(triggerText)
        }
      }
    })
    this.trigger('displayErrors')
  },
  required: function(key) {
    return this.values[key] === ''
  },
  minlength: function(key) {
    return this.data[key].minlength >= this.values[key].length;
  },
  maxlength: function(key) {
    return this.data[key].maxlength <= this.values[key].length
  },
  on: function(event, func) {
    this.listeners[event].push(func)
  },
  trigger: function(event) {
    this.listeners[event].forEach(function(listener) {
      listener();
    })
  }
}

new AppView()
