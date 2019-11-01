
class FromValidator {
  constructor(params) {

    this.params = params

    // this.$title = document.getElementsByName('title')[0];
    // this.$desc = document.getElementsByName('text-area')[0];
    this.$btn = document.getElementsByName('btn')[0];
    this.$weather = document.getElementsByName('weather')[0]
    this.$errorsField = document.getElementsByClassName('error-msg')[0];
    this.$btn.disabled = 'true';
    this.errors = [] 
    this.handleEvent()
  }

  handleEvent() {
    const self = this

    this.params.forEach(function(element) {
      const target = element.$target
      target.addEventListener('keyup', function() {
        self.displayErrors()
      }) 
    })

    this.$weather.addEventListener('change', function() {
      self.displayErrors()
    })
  }

  valid() {
    this.errors = []
    const self = this

    const strWeather = this.$weather.value
    if (strWeather === '') {
      this.errors.push(`天気が選択されていません`)
    }

    this.params.forEach(function(element) {
      const text = element.$target.value;
      if (text.length < element.minLength) {
        self.errors.push(`${element.caption}は${element.minLength}文字以上で入力してください`)
      } else if (text.length > element.maxLength) {
        self.errors.push(`${element.caption}は${element.maxLength}文字以下で入力してください`)
      }       
    })
    
    
    return this.errors.length === 0
    
  } 

  displayErrors() {
    const self = this;
    this.$errorsField.innerHTML = ''
    if(!this.valid()) {
      this.errors.forEach(function(element) {
        const li = document.createElement('li')
        li.textContent = element
        self.$errorsField.appendChild(li)
      });
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
    minLength: 3
  },
  { 
    $target: document.getElementsByName('text-area')[0], 
    caption: '本文',
    maxLength: 20,
    minLength: 10
  },
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


