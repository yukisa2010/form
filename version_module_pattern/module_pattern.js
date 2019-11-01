const params = [
  { 
    $target: document.getElementsByName('title')[0], 
    caption: 'タイトル',
    maxLength: 10, 
    minLength: 3
  },
  { 
    $target: document.getElementsByName('text-area')[0], 
    caption: '本文',
    maxLength: 20,
    minLength: 10
  },
]



const FromValidator = (function(){
  const $btn = document.getElementsByName('btn')[0];
  const $weather = document.getElementsByName('weather')[0]
  const $errorsField = document.getElementsByClassName('error-msg')[0];

  let errors = [];
  $btn.disabled = 'true';
  return {
    handleEvent:function() {
      const self = this
      params.forEach(function(element) {
        const target = element.$target
        target.addEventListener('keyup', function() {
          self.displayErrors()
        }) 
      });

      $weather.addEventListener('change', function() {
        self.displayErrors()
      })
    },
    valid: function() {
      errors = []

      //天気のvalidation
      const strWeather = $weather.value
      if (strWeather === '') {
        errors.push(`天気が選択されていません`)
      }
  
      //textbox, textareaのvalidation
      params.forEach(function(element) {
        const text = element.$target.value;
        if (text.length < element.minLength) {
          errors.push(`${element.caption}は${element.minLength}文字以上で入力してください`)
        } else if (text.length > element.maxLength) {
          errors.push(`${element.caption}は${element.maxLength}文字以下で入力してください`)
        }       
      })

      //返り値boolean
      return errors.length === 0
      
    } ,
    displayErrors: function() {
      $errorsField.innerHTML = ''
      if(!this.valid()) {
        errors.forEach(function(element) {
          const li = document.createElement('li')
          li.textContent = element
          $errorsField.appendChild(li)
        });
        $btn.disabled = 'true';
      } else {
        $btn.disabled = '';
      }
    }
      

  }
})(params)


FromValidator.handleEvent(params)
