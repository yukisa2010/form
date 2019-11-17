//Fragmentの設定
//引数によるSwitch

// const params = [
//   { 
//     $target: document.getElementsByName('title')[0], 
//     caption: 'タイトル',
//     maxLength: 10, 
//     minLength: 3,
//     type: 'text-box'
//   },
//   { 
//     $target: document.getElementsByName('text-area')[0], 
//     caption: '本文',
//     maxLength: 20,
//     minLength: 10,
//     type: 'text-box'
//   },
//   {
//     $target: document.getElementsByName('weather')[0],
//     caption: "天気",
//     require: true,
//     type: 'select'
//   }
// ]


class FromValidator {
  constructor() {

    this.$btn = document.getElementsByName('btn')[0];
    this.$errorsField = document.getElementsByClassName('error-msg')[0];
    this.$btn.disabled = 'true';
    this.errors = [] 
    this.handleEvent()

    this.data = {
      title: {
        val: "",
        caption: 'タイトル',
        condition: {
          minLength: 3,
          maxLength: 10,
          type: 'text-box'
        }
      },
      textArea: {
        val: "",
        caption: '本文',
        condition: {
          minLength: 10,
          maxLength: 20,
          type: 'text-box'
        }
      },
      weather: {
        val: '',
        caption: '天気',
        condition: {
          require: true,
          type: 'select'
        }
      },
      errors : []
    }//this.data
  }//constructor
  

  setTitle() {
    this.data.title.val = document.getElementsByName('title')[0].value
  }
  setTextArea() {
    this.data.textArea.val = document.getElementsByName('text-area')[0].value
  }
  setWeather() {
    this.data.weather.val = document.getElementsByName('weather')[0].value
  }

  handleEvent() {

    const self = this;

    const $title = document.getElementsByName('title')[0]
    const $textArea = document.getElementsByName('text-area')[0]
    const $weather = document.getElementsByName('weather')[0]

    
    $title.addEventListener('keyup', function(){
      self.setTitle()
      self.valid()
      self.displayErrors()
    })
    $textArea.addEventListener('keyup', function() {
      self.setTextArea()
      self.valid()
      self.displayErrors()
    })
    $weather.addEventListener('change', function() {
      self.setWeather()
      self.valid()
      self.displayErrors()
    })
  }

  valid() {
    this.data.errors = []

    const weatherText = this.data.weather.val
    const weatherCap = this.data.weather.caption
    if (weatherText === '') {
      this.data.errors.push(`${weatherCap}が選択されていません`)
    }

    const titleLength = this.data.title.val.length
    const titleMinLength = this.data.title.condition.minLength
    const titleMaxLength = this.data.title.condition.maxLength
    const titleCaption = this.data.title.caption
    if (titleLength < titleMinLength) {
      this.data.errors.push(`
        ${titleCaption}は${titleMinLength}文字以上で入力してください
        `)
    } else if (titleLength > titleMaxLength) {
      this.data.errors.push(`
        ${titleCaption}は${titleMaxLength}文字以下で入力してください
        `)
    }

    const textAreaLength =this.data.textArea.val.length
    const textAreaMinLength = this.data.textArea.condition.minLength
    const textAreaMaxLength = this.data.textArea.condition.maxLength
    const textAreaCaption = this.data.textArea.caption

    if (textAreaLength < textAreaMinLength) {
      this.data.errors.push(`
        ${textAreaCaption}は${textAreaMinLength}文字以上で入力してください
        `)
    } else if (textAreaLength > textAreaMaxLength) {
      this.data.errors.push(`
        ${textAreaCaption}は${textAreaMaxLength}文字以下で入力してください
        `)
    }

  } 


  displayErrors() {
    this.$errorsField.innerHTML = ''
    if(this.data.errors.length !== 0) {
      const fragment = document.createDocumentFragment()

      this.data.errors.forEach(function(error) {
        const li = document.createElement('li')
        li.textContent = error
        fragment.appendChild(li)
      });

      this.$errorsField.appendChild(fragment)
      this.$btn.disabled = 'true';

    } else {

      this.$btn.disabled = '';

    }
  }
}


new FromValidator()
