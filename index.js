//Fragmentの設定
//引数によるSwitch


class FromValidator {
  constructor(params) {

    this.params = params

    this.$btn = document.getElementsByName('btn')[0];
    this.$errorsField = document.getElementsByClassName('error-msg')[0];
    this.$btn.disabled = 'true';
    this.errors = [] 
    this.handleEvent()
  }

  handleEvent() {
    const self = this

    this.params.forEach(function(obj) {
      const $el = obj.$target,
            type = obj.type,
            callback = function() {
              self.displayErrors()
            }
      
      switch(type) {
        case 'text-box': 
          $el.addEventListener('keyup', callback)
          break;
        case 'select':
          $el.addEventListener('change', callback)
          break;
        default:
      }
      
    })
  }

  valid() {
    this.errors = []
    const self = this

    this.params.forEach(function(element) {
      const text = element.$target.value;
      const type = element.type
      const label = element.caption

      switch(type) {
        case 'select':
          if (text === '') {
            self.errors.push(`${label}が選択されていません`)
          }
          break; 
        case 'text-box':
          if (text.length < element.minLength) {
            self.errors.push(`${label}は${element.minLength}文字以上で入力してください`)
          } else if (text.length > element.maxLength) {
            self.errors.push(`${label}は${element.maxLength}文字以下で入力してください`)
          }       
          break;

        default:
      }

    })
    return this.errors.length === 0
  } 

  displayErrors() {
    const self = this;
    this.$errorsField.innerHTML = ''
    if(!this.valid()) {
      const fragment = document.createDocumentFragment()

      this.errors.forEach(function(element) {
        const li = document.createElement('li')
        li.textContent = element
        fragment.appendChild(li)
      });

      self.$errorsField.appendChild(fragment)

      this.$btn.disabled = 'true';
    } else {
      this.$btn.disabled = '';
    }
  }
} 



const params = [
  { 
    $target: document.getElementsByName('title')[0], 
    caption: 'タイトル',
    maxLength: 10, 
    minLength: 3,
    type: 'text-box'
  },
  { 
    $target: document.getElementsByName('text-area')[0], 
    caption: '本文',
    maxLength: 20,
    minLength: 10,
    type: 'text-box'
  },
  {
    $target: document.getElementsByName('weather')[0],
    caption: "天気",
    require: true,
    type: 'select'
  }
]


new FromValidator(params)
// const titleConfig = {
//   name: 'title',
//   min: {
//     size: 3,
//     message: `タイトルは3文字以上入力してください`
//   },
//   max: {
//     size: 10,
//     message: `タイトルは10文字以上入力してください`
//   }
// }

// const textAreaConfig = {
//   name: 'text-area',
//   min: {
//     size: 10,
//     message: `本文は10文字以上入力してください`
//   },
//   max: {
//     size: 20,
//     message: `本文は20文字以上入力してください`
//   }
// }


// setErrorEvent(titleConfig)
// setErrorEvent(textAreaConfig)



// function setErrorEvent(obj) {
//   const $domElement = document.getElementsByName(obj.name)[0]

//   $domElement.addEventListener('keyup', function() {
//     const textSize = $domElement.value.length;
//     const btn = document.getElementsByName('btn')[0]

//     let messages = [];  
  
//     if (textSize < obj.min.size) {
//       message.push(obj.min.message)
//     } else if(textSize > obj.max.size) {
//       message = obj.max.message
//       btn.disabled = 'true'
//     } else {
//       message = ''
//       btn.disabled = 'false'
//     }

//     btn.disabled = 'true'
//     setErrorMsg(message)
//   })
// }

// function setErrorMsg(message) {
//   const ul = document.getElementsByClassName('error-msg')[0]
//   const textLi = document.getElementsByClassName('text')[0]
//   if(textLi == null) {
//     const li = document.createElement('li');
//     li.textContent = message;
//     li.className='text';  
//     ul.appendChild(li);
//   } else if(textLi.textContent !== message) {
//     textLi.textContent = message
//   }
// } 


// $title.addEventListener('keyup', function() {
//   const textSize = $title.value.length
//   const textAreaSize = $textArea.value.length
//   let message = ''

//   console.log(textSize < 3)

//   if (textAreaSize < 10) {
//     message = '本文は 10文字以上入力してください'
//   } else if(textAreaSize > 20) {
//     message = '本文は20文字以内にしてください'
//   } else {
//     message = ''
//   }
//   $errorMsg.textContent = message;
  
// })


